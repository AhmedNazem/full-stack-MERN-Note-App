import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function AddEditNotes({ noteData, type, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  const addNewNote = async () => {};
  const editNote = async () => {};
  const handleAddNote = () => {
    // Check if the title and content are provided
    if (!title) {
      setError("Please enter the title.");
      return;
    }
    if (!content) {
      setError("Please put some content.");
      return;
    }

    // Clear any previous errors
    setError(null);
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
    // Create the new note object
    const newNote = { title, content, tags };
    console.log("New Note Added:", newNote); // Placeholder for actual add functionality

    // Call the onClose function to close the modal
    onClose();
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym at 21pm"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Use 'e' instead of 'target'
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded-none"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)} // Use 'e' instead of 'target'
          rows={10}
        ></textarea>
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
}

export default AddEditNotes;
