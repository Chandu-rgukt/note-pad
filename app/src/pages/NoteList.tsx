import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Tag } from "../types/types";
import { useAppContext } from "../context/AppProvider";
import Modal from "../components/Modal";

const NoteList = () => {
  const { tags, notesWithTags, deleteTag } = useAppContext();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notesWithTags.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((t) => t.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notesWithTags]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                My Notes
              </h1>
              <p className="text-gray-600">
                {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/new">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Note
                </button>
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:border-gray-400 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Manage Tags
              </button>
            </div>
          </div>

          {/* Search & Filter Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title Search */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <label className="font-semibold text-gray-700">Search Notes</label>
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search by title..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tag Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <label className="font-semibold text-gray-700">Filter by Tags</label>
                </div>
                <ReactSelect
                  isMulti
                  value={selectedTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  options={tags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  onChange={(items) =>
                    setSelectedTags(
                      items.map((i) => ({
                        id: i.value,
                        label: i.label,
                      }))
                    )
                  }
                  className="w-full"
                  classNamePrefix="select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "4px",
                      minHeight: "52px",
                      "&:hover": {
                        borderColor: "#3b82f6",
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#eff6ff",
                      borderRadius: "8px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#1e40af",
                      fontWeight: "500",
                    }),
                  }}
                  placeholder="Select tags to filter..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or create a new note.</p>
            <Link to="/new">
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                Create Your First Note
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((card) => (
              <Link
                key={card.id}
                to={`/${card.id}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Note Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 px-2 py-1 rounded bg-gray-50">
                      {card.tags.length} tag{card.tags.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {card.title}
                  </h2>
                </div>

                {/* Preview Content */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {card.text.substring(0, 120)}...
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium border border-blue-100"
                    >
                      {tag.label}
                    </span>
                  ))}
                  {card.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
                      +{card.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Click to view</span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300">
                    <svg className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Tags Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Manage Tags">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">You have {tags.length} tag{tags.length !== 1 ? 's' : ''}</p>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Done
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <span className="font-medium text-gray-700">{tag.label}</span>
                </div>
                <button
                  onClick={() => deleteTag(tag.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors duration-200 group-hover:opacity-100"
                  aria-label={`Delete ${tag.label} tag`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {tags.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">No tags created yet</p>
              <p className="text-sm text-gray-500">Create tags when making notes</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default NoteList;