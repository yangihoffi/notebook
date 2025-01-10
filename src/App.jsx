import { useEffect, useState } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => setNotes(res.data));
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    setNewNote("");
  };

  return (
    <div>
      <h1>Notebook</h1>
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
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
