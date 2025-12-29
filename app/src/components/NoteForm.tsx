import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import type { NoteData, Tag } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../context/AppProvider";

type Props = {
  onSubmit: (data: NoteData) => void;
  intialData?: NoteData;
};

const NoteForm = ({ onSubmit, intialData }: Props) => {
  const { onAddTag, tags } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    intialData?.tags ?? []
  );
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: inputRef.current!.value,
      text: textRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Title & Tags Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Title Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <label htmlFor="title" className="text-lg font-semibold text-gray-700">
              Title
            </label>
          </div>
          <div className="relative group">
            <input
              id="title"
              type="text"
              ref={inputRef}
              defaultValue={intialData?.title}
              placeholder="Enter a descriptive title..."
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-focus-within:w-full transition-all duration-300"></div>
          </div>
        </div>

        {/* Tags Select */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <label htmlFor="tags" className="text-lg font-semibold text-gray-700">
              Tags
            </label>
          </div>
          <div className="group">
            <CreatableSelect
              isMulti
              onCreateOption={(label) => {
                const newTag = { id: uuidv4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              value={selectedTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              options={tags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => ({
                    label: tag.label,
                    id: tag.value,
                  }))
                );
              }}
              className="w-full"
              classNamePrefix="select"
              styles={{
                control: (base) => ({
                  ...base,
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "4px",
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
              placeholder="Select or create tags..."
            />
          </div>
        </div>
      </div>

      {/* Content Textarea */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <label htmlFor="content" className="text-lg font-semibold text-gray-700">
            Content
          </label>
        </div>
        <div className="relative group">
          <textarea
            id="content"
            rows={12}
            ref={textRef}
            defaultValue={intialData?.text}
            placeholder="Start writing your thoughts here..."
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white shadow-sm resize-y min-h-[200px]"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-focus-within:w-full transition-all duration-300"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
        <Link to="..">
          <button
            type="button"
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Note
          </span>
        </button>
      </div>
    </form>
  );
};

export default NoteForm;