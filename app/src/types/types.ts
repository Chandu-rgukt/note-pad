
export type Note={
  id:string
} & NoteData

export type RawNote={
  id:string
} & RawNoteData

export type RawNoteData={
  title:string,
  text:string,
  tags:string[]
}

export type NoteData={
  title:string,
  text:string,
  tags:Tag[]
}

export type Tag={
  label:string,
  id:string
}