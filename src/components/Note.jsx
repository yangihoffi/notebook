const Note = ({ note, toggleImportance, deleteNote }) => {
  return (
    <li>
      <button onClick={deleteNote}>Delete</button>{" "}
      <button onClick={toggleImportance}>Toggle</button>{" "}
      {note.important ? <b>{note.content}</b> : <>{note.content}</>}
    </li>
  );
};

export default Note;
