import Note from "./Note";

const NotesList = ({ loading, notesToShow, toggleImportance, deleteNote }) => {
  if (notesToShow.length === 0) {
    return <p>No notes to show</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
              deleteNote={() => deleteNote(note.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesList;
