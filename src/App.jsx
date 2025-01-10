import { useState } from "react";
import Note from "./components/Note";

const placeholder = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const App = () => {
  const [notes, setNotes] = useState(placeholder);
  const [newNote, setNewNote] = useState("");

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
