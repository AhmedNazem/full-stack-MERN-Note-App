import NoteCard from "../../components/Cards/NoteCard.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import { useState } from "react";
import Modal from "react-modal";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3 gap-6">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd Apr 24"
            tags="#Meeting"
            isPinned={true}
            onDelete={() => {}}
            onEdit={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 fixed right-10 bottom-10 shadow-lg"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-3xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          },
        }}
        className="w-full max-w-2xl mx-auto my-10 bg-white rounded-lg p-5 shadow-lg outline-none"
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </>
  );
}

export default Home;
