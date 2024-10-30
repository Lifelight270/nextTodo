"use client";

import React, { useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

function Noteapp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  const saveNote = () => {
    if (!title || !content)
      return alert("Please enter both title and content.");

    if (isEditing && currentNoteId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === currentNoteId ? { ...note, title, content } : note
        )
      );
      setIsEditing(false);
    } else {
      if (notes.some((note) => note.title === title))
        return alert("Note title already exists.");
      const newNote: Note = { id: Date.now(), title, content };
      setNotes([...notes, newNote]);
    }
    resetForm();
  };

  const editNote = (note: Note) => {
    setIsEditing(true);
    setCurrentNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = (id: number) =>
    setNotes(notes.filter((note) => note.id !== id));

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCurrentNoteId(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Note Taking App</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2 h-24"
      />
      <button
        onClick={saveNote}
        className="bg-blue-500 text-white p-2 px-6 rounded mb-4">
        {isEditing ? "Save" : "Add"}
      </button>

      <ul>
        {notes.map((note) => (
          <li key={note.id} className="border px-2 py-2">
            <h3 className="font-semibold">{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => editNote(note)}
              className="text-blue-500 mr-2">
              Edit
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Noteapp;
