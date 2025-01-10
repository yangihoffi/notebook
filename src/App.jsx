import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import notesService from "./services/notes.service";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    setLoading(true);

    notesService.getAll().then((res) => {
      setLoading(false);
      setNotes(res.data);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const newNoteObject = {
      id: uuidv4(),
      important: Math.random() < 0.5,
      content: newNote,
    };

    notesService.create(newNoteObject).then((res) => {
      setNotes(notes.concat(res.data));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };

    notesService.update(id, changedNote).then((res) => {
      setNotes(notes.map((n) => (n.id === id ? res.data : n)));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notebook</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
        <br />
      </div>
      <div>
        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter a note"
          />
          <button type="submit">Add note</button>
        </form>
      </div>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
