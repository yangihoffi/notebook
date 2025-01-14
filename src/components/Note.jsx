const Note = ({ note, toggleImportance, deleteNote }) => {
  return (
    <li>
      <button onClick={deleteNote}>Delete</button>{" "}
      <button onClick={toggleImportance}>Toggle Important</button>{" "}
      {note.content} {note.important ? <b>(IMPORTANT!)</b> : null}
    </li>
  );
};

export default Note;
