import NoteForm from "../components/NoteForm";
import { useAppContext } from "../context/AppProvider";

const NewNote = () => {
  const { onCreateNote } = useAppContext();
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-4xl">
        
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-blue-500 rounded-full mr-3"></div>
            <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Note
            </h1>
            <div className="w-12 h-1 bg-indigo-500 rounded-full ml-3"></div>
          </div>
          <p className="text-gray-600 text-lg mt-2">
            Organize your thoughts with tags and content
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          </div>
          <NoteForm onSubmit={onCreateNote} />
        </div>
      </div>
    </div>
  );
};

export default NewNote;