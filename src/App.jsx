import { useEffect, useState } from "react";
import notesService from "./services/notes.service";
import Notification from "./components/Notification";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const getAllNotes = () => {
    setLoading(true);

    notesService.getAll().then((allNotes) => {
      setNotes(allNotes);
      setLoading(false);
    });
  };

  const addNote = (e) => {
    e.preventDefault();

    const newNoteObject = {
      important: Math.random() < 0.5,
      content: newNote,
    };

    notesService.create(newNoteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };

    notesService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id === id ? returnedNote : n)));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("A problem has occurred...");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  };

  const deleteNote = (id) => {
    const foundNote = notes.find((note) => note.id === id);

    if (foundNote) {
      console.log("deleting note");

      notesService
        .remove(id)
        .then((deletedNote) => {
          setNotes(notes.filter((note) => note.id !== deletedNote.id));
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      console.log("can't delete note");
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(getAllNotes, []);

  return (
    <div>
      <h1>Notebook</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <br />
      <NoteForm
        addNote={addNote}
        newNote={newNote}
        setNewNote={(e) => setNewNote(e.target.value)}
      />
      <NotesList
        loading={loading}
        notesToShow={notesToShow}
        toggleImportance={toggleImportanceOf}
        deleteNote={deleteNote}
      />
    </div>
  );
};

export default App;
