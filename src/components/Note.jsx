const Note = ({ note, toggleImportance }) => {
  return (
    <>
      <li>
        <button onClick={toggleImportance}>Toggle</button>{" "}
        {note.important ? <b>{note.content}</b> : <>{note.content}</>}
      </li>
    </>
  );
};

export default Note;
