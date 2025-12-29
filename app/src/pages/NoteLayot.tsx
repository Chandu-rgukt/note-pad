import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import type { Note } from '../types/types';

const NoteLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteByID, deleteNote } = useAppContext();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const note: Note | undefined = getNoteByID(id);

  if (note == null) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Notes
          </button>
        </div>

        {/* Note Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with gradient accent */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {note?.title}
                  </h1>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium text-sm border border-blue-200 flex items-center gap-1.5"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 shrink-0">
                <Link to={`/${id}/edit`}>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this note?')) {
                      deleteNote(id);
                      navigate('/');
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:from-red-600 hover:to-pink-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 to-indigo-200 rounded-full"></div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg pl-4">
                {note?.text}
              </p>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="px-8 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Created recently
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {note.tags.length} tag{note.tags.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                ID: {id.substring(0, 8)}...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteLayout;