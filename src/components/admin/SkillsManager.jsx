import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiTrash, HiPencil } from 'react-icons/hi';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaJs, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaDatabase, FaFigma, FaVuejs, FaAngular,
  FaPhp, FaLaravel, FaWordpress, FaBootstrap, FaSass
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiTailwindcss, SiNextdotjs, SiExpress, SiDjango, SiFlask, SiSpring,
  SiKubernetes, SiGraphql, SiRedux, SiJest, SiCypress, SiWebpack,
  SiVite, SiNestjs, SiPrisma, SiSupabase
} from 'react-icons/si';

const iconOptions = [
  { value: 'react', label: 'React', icon: FaReact },
  { value: 'nodejs', label: 'Node.js', icon: FaNodeJs },
  { value: 'typescript', label: 'TypeScript', icon: SiTypescript },
  { value: 'javascript', label: 'JavaScript', icon: FaJs },
  { value: 'python', label: 'Python', icon: FaPython },
  { value: 'java', label: 'Java', icon: FaJava },
  { value: 'html', label: 'HTML5', icon: FaHtml5 },
  { value: 'css', label: 'CSS3', icon: FaCss3Alt },
  { value: 'tailwind', label: 'Tailwind CSS', icon: SiTailwindcss },
  { value: 'bootstrap', label: 'Bootstrap', icon: FaBootstrap },
  { value: 'sass', label: 'Sass', icon: FaSass },
  { value: 'nextjs', label: 'Next.js', icon: SiNextdotjs },
  { value: 'vue', label: 'Vue.js', icon: FaVuejs },
  { value: 'angular', label: 'Angular', icon: FaAngular },
  { value: 'express', label: 'Express', icon: SiExpress },
  { value: 'nestjs', label: 'NestJS', icon: SiNestjs },
  { value: 'django', label: 'Django', icon: SiDjango },
  { value: 'flask', label: 'Flask', icon: SiFlask },
  { value: 'spring', label: 'Spring', icon: SiSpring },
  { value: 'php', label: 'PHP', icon: FaPhp },
  { value: 'laravel', label: 'Laravel', icon: FaLaravel },
  { value: 'wordpress', label: 'WordPress', icon: FaWordpress },
  { value: 'mongodb', label: 'MongoDB', icon: SiMongodb },
  { value: 'postgresql', label: 'PostgreSQL', icon: SiPostgresql },
  { value: 'mysql', label: 'MySQL', icon: SiMysql },
  { value: 'redis', label: 'Redis', icon: SiRedis },
  { value: 'firebase', label: 'Firebase', icon: SiFirebase },
  { value: 'supabase', label: 'Supabase', icon: SiSupabase },
  { value: 'prisma', label: 'Prisma', icon: SiPrisma },
  { value: 'graphql', label: 'GraphQL', icon: SiGraphql },
  { value: 'redux', label: 'Redux', icon: SiRedux },
  { value: 'git', label: 'Git', icon: FaGitAlt },
  { value: 'docker', label: 'Docker', icon: FaDocker },
  { value: 'kubernetes', label: 'Kubernetes', icon: SiKubernetes },
  { value: 'aws', label: 'AWS', icon: FaAws },
  { value: 'database', label: 'Database', icon: FaDatabase },
  { value: 'figma', label: 'Figma', icon: FaFigma },
  { value: 'jest', label: 'Jest', icon: SiJest },
  { value: 'cypress', label: 'Cypress', icon: SiCypress },
  { value: 'webpack', label: 'Webpack', icon: SiWebpack },
  { value: 'vite', label: 'Vite', icon: SiVite },
];

const SkillsManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('skills');
  const [skillName, setSkillName] = useState('');
  const [skillIcon, setSkillIcon] = useState('react');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillData = { name: skillName, icon: skillIcon };
      
      if (editingId) {
        await updateItem(editingId, skillData);
        toast.success('Skill updated');
        setEditingId(null);
      } else {
        await addItem(skillData);
        toast.success('Skill added');
      }
      
      setSkillName('');
      setSkillIcon('react');
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (skill) => {
    setSkillName(skill.name);
    setSkillIcon(skill.icon || 'react');
    setEditingId(skill._id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setSkillName('');
    setSkillIcon('react');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Skills</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 glass p-6 rounded-xl">
        <div>
          <label className="block mb-2 font-semibold">Icon</label>
          <select
            value={skillIcon}
            onChange={(e) => setSkillIcon(e.target.value)}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          >
            {iconOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Skill Name</label>
          <input
            type="text"
            placeholder="e.g., React, Node.js, Python"
            required
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600"
          >
            {editingId ? <HiPencil /> : '+'}
            {editingId ? 'Update Skill' : 'Add Skill'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg bg-dark-200 hover:bg-dark-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Your Skills</h4>
        <div className="flex flex-wrap gap-3">
          {data.map(skill => {
            const iconInfo = iconOptions.find(opt => opt.value === skill.icon);
            const Icon = iconInfo?.icon;
            
            return (
              <div 
                key={skill._id} 
                className="glass px-4 py-3 rounded-lg flex items-center gap-3"
              >
                {Icon && <Icon className="text-2xl text-primary" />}
                <span className="font-medium">{skill.name}</span>
                <div className="flex gap-1 ml-2">
                  <button 
                    onClick={() => handleEdit(skill)} 
                    className="p-1 text-blue-500 hover:text-blue-600"
                  >
                    <HiPencil size={16} />
                  </button>
                  <button 
                    onClick={() => deleteItem(skill._id)} 
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <HiTrash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsManager;
