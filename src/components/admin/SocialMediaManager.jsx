import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaWhatsapp, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { value: 'github', label: 'GitHub', icon: FaGithub },
  { value: 'twitter', label: 'Twitter/X', icon: FaTwitter },
  { value: 'facebook', label: 'Facebook', icon: FaFacebook },
  { value: 'instagram', label: 'Instagram', icon: FaInstagram },
  { value: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp },
  { value: 'youtube', label: 'YouTube', icon: FaYoutube },
  { value: 'tiktok', label: 'TikTok', icon: FaTiktok },
];

const SocialMediaManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('socialLinks');
  const [platform, setPlatform] = useState('linkedin');
  const [url, setUrl] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const socialData = { platform, url };
      
      if (editingId) {
        await updateItem(editingId, socialData);
        toast.success('Social link updated');
        setEditingId(null);
      } else {
        await addItem(socialData);
        toast.success('Social link added');
      }
      
      setPlatform('linkedin');
      setUrl('');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setPlatform(item.platform);
    setUrl(item.url);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this social link?')) {
      try {
        await deleteItem(id);
        toast.success('Social link deleted');
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setPlatform('linkedin');
    setUrl('');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Social Media</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8 glass p-6 rounded-xl">
        <div>
          <label className="block mb-2 font-semibold">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          >
            {platformOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">URL</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
          <p className="text-sm text-gray-400 mt-1">
            Enter the full URL to your profile
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600"
          >
            {editingId ? <HiPencil /> : <HiPlus />}
            {editingId ? 'Update Link' : 'Add Link'}
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
        <h4 className="text-xl font-semibold">Your Social Links</h4>
        {data.length === 0 ? (
          <p className="text-gray-400">No social links added yet</p>
        ) : (
          <div className="grid gap-4">
            {data.map((item) => {
              const platformInfo = platformOptions.find(p => p.value === item.platform);
              const Icon = platformInfo?.icon;
              
              return (
                <div
                  key={item._id}
                  className="glass p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {Icon && <Icon className="text-3xl text-primary" />}
                    <div>
                      <p className="font-semibold">{platformInfo?.label || item.platform}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {item.url}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      <HiPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      <HiTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaManager;
