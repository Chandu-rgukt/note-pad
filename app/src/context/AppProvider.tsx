import React, {createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useMemo } from "react"
import type { Note, NoteData, RawNote, Tag } from "../types/types"
import {v4 as uuidv4} from "uuid"
import { Navigate } from 'react-router-dom'

type AppContextType = {
  notes: RawNote[]
  tags: Tag[]
  notesWithTags: Note[]
  onCreateNote: (data: NoteData) => void
  onAddTag: (data: Tag) => void
  getNoteByID: (id:string) => Note | undefined
  upDateNote: ({id,note}:updateProps) => void
  deleteNote: (id:string) => void
  deleteTag: (id:string) => void
}

type updateProps={
  id:string,
  note:NoteData
}


const AppContext = createContext<AppContextType | undefined>(undefined)


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => ({
      ...note,
      tags: tags.filter(tag => note.tags.includes(tag.id))
    }))
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes: RawNote[]) => [
      ...prevNotes,
      {
        ...data,
        id: uuidv4(),
        tags: tags.map(tag => tag.id)
      }
    ])
  }

  const onAddTag  = (tag:Tag) =>{
    setTags((prev:Tag[])=>[...prev,tag])
  }

  const getNoteByID = (id:string)=>{
    const note = notesWithTags.find(it=>it.id === id)
    return note;
  }

  const upDateNote = ({ id, note }: updateProps) => {
    setNotes((prev: RawNote[]) =>
      prev.map(n =>
        n.id === id
          ? {
              ...n,
              title: note.title,
              text: note.text,
              tags: note.tags.map(t => t.id)
            }
          : n
      )
    )
  }

  const deleteNote = (id:string)=>{
    setNotes(notes.filter(note=>note.id != id))
    return <Navigate to="/" replace/>
  }

  const deleteTag = (id:string)=>{
    setTags(tags.filter(tag=>tag.id != id))  
  }
  
  


  return (
    <AppContext.Provider
      value={{
        notes,
        tags,
        notesWithTags,
        onCreateNote,
        onAddTag,
        getNoteByID,
        upDateNote,
        deleteNote,
        deleteTag
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider")
  }

  return context
}
