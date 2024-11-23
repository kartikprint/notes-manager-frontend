import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Note } from '../types';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Others');
  const [error, setError] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await axios.get(`http://192.168.1.9:5000/api/notes/posts/${id}`);
      const note: Note = response.data;
      setTitle(note.title);
      setDescription(note.description);
      setCategory(note.category);
    } catch (err) {
      setError('Error fetching note');
    }
  };

  const getNotes = async () => {
    try {
      const res = await axios.get(`http://192.168.1.9:5000/api/notes/`);
      setNotes(res.data);
    } catch (err) {
      setError('Error fetching notes');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing note
        await axios.put(`http://192.168.1.9:5000/api/notes/posts/${id}`, {
          title,
          description,
          category,
        });
      } else {
        // Add new note
        await axios.post(`http://192.168.1.9:5000/api/notes/posts`, {
          title,
          description,
          category,
        });
      }
      getNotes();
    } catch (err) {
      setError('Error saving note');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.1.9:5000/api/notes/${id}`);
      getNotes();
    } catch (err) {
      setError('Error deleting note');
    }
  };

  const handleEdit = (note: Note) => {
    navigate(`/edit/${note._id}`);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-full sm:max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">{id ? 'Edit Note' : 'Add Note'}</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {id ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <div className="max-w-full sm:max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note._id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-gray-600">{note.description}</p>
              <p className="text-sm text-gray-500">Category: {note.category}</p>
              <p className="text-xs text-gray-400">
                Created At: {new Date(note.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleEdit(note)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-full sm:w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NoteForm;
