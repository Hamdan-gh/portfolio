import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ExperienceManager from '../components/admin/ExperienceManager';
import LeadershipManager from '../components/admin/LeadershipManager';
import CertificateManager from '../components/admin/CertificateManager';
import SkillsManager from '../components/admin/SkillsManager';
import ProfileManager from '../components/admin/ProfileManager';
import SocialMediaManager from '../components/admin/SocialMediaManager';
import MessagesViewer from '../components/admin/MessagesViewer';
import { HiLogout } from 'react-icons/hi';

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', component: ProfileManager },
    { id: 'experience', label: 'Experience', component: ExperienceManager },
    { id: 'leadership', label: 'Leadership', component: LeadershipManager },
    { id: 'certificates', label: 'Certificates', component: CertificateManager },
    { id: 'skills', label: 'Skills', component: SkillsManager },
    { id: 'social', label: 'Social Media', component: SocialMediaManager },
    { id: 'messages', label: 'Messages', component: MessagesViewer },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-dark-300 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <HiLogout /> Logout
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'glass hover:bg-dark-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="glass p-6 rounded-xl">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
