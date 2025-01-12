const NoteForm = ({ addNote, newNote, setNewNote }) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={setNewNote}
          placeholder="Enter a note"
          required
        />
        <button type="submit">Add note</button>
      </form>
    </div>
  );
};

export default NoteForm;
