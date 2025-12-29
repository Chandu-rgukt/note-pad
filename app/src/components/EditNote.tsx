import { Navigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import NoteForm from "./NoteForm";
import type { NoteData } from '../types/types';
import { wordsCount } from '../utils/noteAnalysis';

const EditNote = () => {
  const { id } = useParams();
  const { getNoteByID, upDateNote } = useAppContext();
  
  if (!id) {
    return <Navigate to="/" replace />;
  }
  
  const note = getNoteByID(id);
  const textBody = note?.text;
  const totalWords = wordsCount(textBody);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-4xl">
      
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mr-3"></div>
            <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Edit Note
            </h1>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full ml-3"></div>
          </div>
          <p className="text-gray-600 text-lg mt-2">
            Update your note details below
          </p>
        </div>

      
       
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-bl-3xl transform translate-x-12 -translate-y-12 rotate-45"></div>
          
        
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 text-sm font-medium border border-emerald-200 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              Editing Mode
            </span>
          </div>
          <></>

    
          {note && (
            <NoteForm 
              intialData={note} 
              onSubmit={(noteData: NoteData) => upDateNote({ id, note: noteData })}
            />
          )}
        </div>
        
      </div>

    
  );
};

export default EditNote;