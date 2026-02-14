import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiUpload, HiX } from 'react-icons/hi';

const ProfileManager = () => {
  const { data, addItem, updateItem } = useFirestore('profile');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [profileId, setProfileId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (data.length > 0 && !isInitialized) {
      setName(data[0].name || '');
      setBio(data[0].bio || '');
      setProfileImage(data[0].profileImage || '');
      setImagePreview(data[0].profileImage || '');
      setProfileId(data[0]._id);
      setIsInitialized(true);
    }
  }, [data, isInitialized]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = { 
        name, 
        bio,
        profileImage 
      };
      
      if (profileId) {
        await updateItem(profileId, profileData);
        toast.success('Profile updated');
      } else {
        const newProfile = await addItem(profileData);
        setProfileId(newProfile._id);
        toast.success('Profile created');
      }
      // Don't reset initialization flag so form keeps current values
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Operation failed');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Profile</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Upload */}
        <div>
          <label className="block mb-2 font-semibold">Profile Image</label>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-primary"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <HiX />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 bg-dark-200 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
                <HiUpload className="text-4xl text-gray-500" />
              </div>
            )}
            
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <label
                htmlFor="profile-image"
                className="inline-flex items-center gap-2 bg-dark-200 border border-primary/30 px-4 py-2 rounded-lg cursor-pointer hover:bg-dark-100"
              >
                <HiUpload /> Choose Image
              </label>
              <p className="text-sm text-gray-400 mt-2">
                Recommended: Square image, max 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
        </div>

        {/* Bio Input */}
        <div>
          <label className="block mb-2 font-semibold">Bio</label>
          <textarea
            placeholder="Write your professional bio..."
            required
            rows="6"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
        </div>

        <button type="submit" className="bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileManager;
