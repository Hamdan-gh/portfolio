import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiTrash } from 'react-icons/hi';

const SkillsManager = () => {
  const { data, addItem, deleteItem } = useFirestore('skills');
  const [skillName, setSkillName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem({ name: skillName });
      toast.success('Skill added');
      setSkillName('');
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Skills</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Skill name"
          required
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="flex-1 bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
        />
        <button type="submit" className="bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600">
          Add Skill
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        {data.map(skill => (
          <div key={skill._id} className="bg-dark-200 px-4 py-2 rounded-full flex items-center gap-2">
            <span>{skill.name}</span>
            <button onClick={() => deleteItem(skill._id)} className="text-red-500 hover:text-red-600">
              <HiTrash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
