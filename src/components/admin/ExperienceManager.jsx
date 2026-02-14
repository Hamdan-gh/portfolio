import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiTrash, HiPencil } from 'react-icons/hi';

const ExperienceManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('experience');
  const [form, setForm] = useState({ role: '', organization: '', duration: '', description: '', tools: '' });
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
      setForm({ role: '', organization: '', duration: '', description: '', tools: '' });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(item._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await deleteItem(id);
      toast.success('Deleted successfully');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Experience</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Role"
          required
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
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
          placeholder="Duration (e.g., Jan 2023 - Present)"
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
        <input
          type="text"
          placeholder="Tools (comma separated)"
          value={form.tools}
          onChange={(e) => setForm({ ...form, tools: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <button type="submit" className="bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600">
          {editing ? 'Update' : 'Add'} Experience
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => { setEditing(null); setForm({ role: '', organization: '', duration: '', description: '', tools: '' }); }}
            className="ml-2 bg-gray-600 px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {data.map(item => (
          <div key={item._id} className="bg-dark-200 p-4 rounded-lg flex justify-between items-start">
            <div>
              <h4 className="font-bold">{item.role}</h4>
              <p className="text-sm text-gray-400">{item.organization} | {item.duration}</p>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-primary hover:text-cyan-600">
                <HiPencil size={20} />
              </button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-600">
                <HiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
