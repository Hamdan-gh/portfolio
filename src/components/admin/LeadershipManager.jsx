import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiTrash, HiPencil } from 'react-icons/hi';

const LeadershipManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('leadership');
  const [form, setForm] = useState({ position: '', organization: '', duration: '', description: '' });
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateItem(editing, form);
        toast.success('Updated successfully');
        setEditing(null);
      } else {
        await addItem(form);
        toast.success('Added successfully');
      }
      setForm({ position: '', organization: '', duration: '', description: '' });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Leadership</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Position"
          required
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Organization"
          required
          value={form.organization}
          onChange={(e) => setForm({ ...form, organization: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Duration"
          required
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <textarea
          placeholder="Description"
          required
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <button type="submit" className="bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600">
          {editing ? 'Update' : 'Add'} Leadership
        </button>
      </form>

      <div className="space-y-4">
        {data.map(item => (
          <div key={item._id} className="bg-dark-200 p-4 rounded-lg flex justify-between">
            <div>
              <h4 className="font-bold">{item.position}</h4>
              <p className="text-sm text-gray-400">{item.organization} | {item.duration}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setForm(item); setEditing(item._id); }} className="text-primary">
                <HiPencil size={20} />
              </button>
              <button onClick={() => deleteItem(item._id)} className="text-red-500">
                <HiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipManager;
