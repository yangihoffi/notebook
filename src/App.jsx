import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => setNotes(res.data));
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const newNoteObject = {
      id: uuidv4(),
      important: Math.random() < 0.5,
      content: newNote,
    };

    axios.post("http://localhost:3001/notes", newNoteObject).then((res) => {
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

    axios.put(`http://localhost:3001/notes/${id}`, changedNote).then((res) => {
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
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
