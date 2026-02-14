import { useFirestore } from '../../hooks/useFirestore';
import { HiTrash, HiMail } from 'react-icons/hi';
import toast from 'react-hot-toast';

const MessagesViewer = () => {
  const { data: messages, deleteItem, updateItem } = useFirestore('messages');

  const markAsRead = async (id) => {
    await updateItem(id, { read: true });
    toast.success('Marked as read');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Contact Messages</h3>
      
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet</p>
        ) : (
          messages.map(msg => (
            <div
              key={msg._id}
              className={`bg-dark-200 p-4 rounded-lg ${!msg.read ? 'border-l-4 border-primary' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{msg.name}</h4>
                  <p className="text-sm text-gray-400">{msg.email}</p>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button onClick={() => markAsRead(msg._id)} className="text-primary">
                      <HiMail size={20} />
                    </button>
                  )}
                  <button onClick={() => deleteItem(msg._id)} className="text-red-500">
                    <HiTrash size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300">{msg.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesViewer;
