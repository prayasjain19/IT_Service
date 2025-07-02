'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface NavbarItem {
  id: number;
  title: string;
  href: string;
}

export default function NavbarManager() {
  const [title, setTitle] = useState('');
  const [href, setHref] = useState('');
  const [items, setItems] = useState<NavbarItem[]>([]);
  
  // ⚠️ ADDED: Loading state to prevent hydration mismatch
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    // ⚠️ ADDED: Set loading state to true before fetching
    setIsLoading(true);
    try {
      const res = await axios.get('/api/header');
      setItems(res.data);
    } catch {
      toast.error('Failed to fetch navbar items');
    } finally {
      // ⚠️ ADDED: Set loading state to false after fetch completes (success or failure)
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!href.trim()) return toast.error("Href is required");

    try {
      await axios.post('/api/header', {
        title,
        href,
      });
      toast.success("Navbar item added");
      setTitle('');
      setHref('');
      // After adding, re-fetch the list to get the updated data
      fetchItems();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to add");
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/header/${id}`);
      toast.success("Deleted");
      // After deleting, re-fetch the list to get the updated data
      fetchItems();
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#131B4D] to-[#1A1F3E] text-white">
      <h1 className="text-2xl font-bold mb-6">Manage Navbar Links</h1>

      <div className="bg-[#1A1F3E] p-6 rounded-xl shadow-md max-w-lg space-y-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title (e.g., About)"
          className="w-full p-2 bg-[#0e132f] border border-gray-600 rounded"
        />
        <input
          value={href}
          onChange={e => setHref(e.target.value)}
          placeholder="Href (e.g., #about)"
          className="w-full p-2 bg-[#0e132f] border border-gray-600 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
        >
          Add Navbar Link
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Current Navbar Items</h2>
        
        {/* ⚠️ ADDED: Conditional rendering based on loading state */}
        {isLoading ? (
          <div className="text-center text-gray-400 mt-4">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400 mt-4">No navbar items found. Add one above!</div>
        ) : (
          <ul className="space-y-3">
            {items.map(item => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-[#0e132f] p-3 rounded-md"
              >
                <span>
                  <strong>{item.title}</strong> → {item.href}
                </span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}