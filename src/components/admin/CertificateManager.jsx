import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiTrash, HiPencil } from 'react-icons/hi';

const CertificateManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('certificates');
  const [form, setForm] = useState({ title: '', issuedBy: '', date: '', imageUrl: '' });
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
      setForm({ title: '', issuedBy: '', date: '', imageUrl: '' });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Certificates</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Certificate Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Issued By"
          required
          value={form.issuedBy}
          onChange={(e) => setForm({ ...form, issuedBy: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Date (e.g., Jan 2024)"
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <input
          type="url"
          placeholder="Image URL"
          required
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-2 h-32 rounded" />}
        <button type="submit" className="bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600">
          {editing ? 'Update' : 'Add'} Certificate
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map(item => (
          <div key={item._id} className="bg-dark-200 p-4 rounded-lg">
            <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.issuedBy} | {item.date}</p>
            <div className="flex gap-2 mt-2">
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

export default CertificateManager;
