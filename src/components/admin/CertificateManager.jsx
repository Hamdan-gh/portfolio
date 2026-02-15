import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiTrash, HiPencil, HiUpload, HiX, HiDocumentText } from 'react-icons/hi';

const CertificateManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('certificates');
  const [form, setForm] = useState({ title: '', issuedBy: '', date: '', imageUrl: '', pdfUrl: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [editing, setEditing] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const convertPdfToImage = async (pdfData) => {
    try {
      setIsProcessing(true);
      
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      
      const scale = 2;
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (error) {
      console.error('PDF conversion error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    
    if (file.type === 'application/pdf') {
      reader.onload = async (event) => {
        const toastId = toast.loading('Converting PDF to image...');
        try {
          const arrayBuffer = event.target.result;
          const pdfData = new Uint8Array(arrayBuffer);
          
          const imageData = await convertPdfToImage(pdfData);
          
          const base64String = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          
          setForm({ 
            ...form, 
            imageUrl: imageData,
            pdfUrl: `data:application/pdf;base64,${base64String}`
          });
          setImagePreview(imageData);
          toast.success('PDF converted successfully!', { id: toastId });
        } catch (error) {
          console.error('PDF processing error:', error);
          toast.error('Failed to process PDF. Please try an image file instead.', { id: toastId });
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type.startsWith('image/')) {
      reader.onloadend = () => {
        setForm({ ...form, imageUrl: reader.result, pdfUrl: '' });
        setImagePreview(reader.result);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a PDF or image file');
    }
  };

  const handleRemoveImage = () => {
    setForm({ ...form, imageUrl: '', pdfUrl: '' });
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.imageUrl) {
      toast.error('Please upload a certificate image or PDF');
      return;
    }

    try {
      if (editing) {
        await updateItem(editing, form);
        toast.success('Certificate updated');
        setEditing(null);
      } else {
        await addItem(form);
        toast.success('Certificate added');
      }
      setForm({ title: '', issuedBy: '', date: '', imageUrl: '', pdfUrl: '' });
      setImagePreview('');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setImagePreview(item.imageUrl);
    setEditing(item._id);
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ title: '', issuedBy: '', date: '', imageUrl: '', pdfUrl: '' });
    setImagePreview('');
  };

  const handleViewPdf = (pdfUrl) => {
    if (pdfUrl) {
      const newWindow = window.open();
      newWindow.document.write(
        `<iframe src="${pdfUrl}" width="100%" height="100%" style="border:none;"></iframe>`
      );
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage Certificates</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 glass p-6 rounded-xl">
        <div>
          <label className="block mb-2 font-semibold">Certificate File (PDF or Image)</label>
          {imagePreview ? (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Certificate preview" 
                className="w-full h-64 object-contain bg-dark-200 rounded-lg border-2 border-primary/30"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                <HiX />
              </button>
              {form.pdfUrl && (
                <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <HiDocumentText /> PDF
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-64 bg-dark-200 rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center">
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
                  <p className="text-gray-400">Converting PDF to image...</p>
                </>
              ) : (
                <>
                  <HiUpload className="text-6xl text-gray-500 mb-2" />
                  <p className="text-gray-400 text-center px-4">
                    Upload certificate (PDF or Image)
                    <br />
                    <span className="text-sm">PDF will be auto-converted to image</span>
                  </p>
                </>
              )}
            </div>
          )}
          
          <div className="mt-4">
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
              id="certificate-file"
              disabled={isProcessing}
            />
            <label
              htmlFor="certificate-file"
              className={`inline-flex items-center gap-2 bg-dark-200 border border-primary/30 px-4 py-2 rounded-lg cursor-pointer hover:bg-dark-100 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <HiUpload /> Choose File (PDF or Image)
            </label>
            <p className="text-sm text-gray-400 mt-2">
              Upload PDF (auto-converts to image) or image file, max 10MB
            </p>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Certificate Title</label>
          <input
            type="text"
            placeholder="e.g., AWS Certified Developer"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Issued By</label>
          <input
            type="text"
            placeholder="e.g., Amazon Web Services"
            required
            value={form.issuedBy}
            onChange={(e) => setForm({ ...form, issuedBy: e.target.value })}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Date</label>
          <input
            type="text"
            placeholder="e.g., January 2024"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600"
            disabled={isProcessing}
          >
            {editing ? <HiPencil /> : <HiUpload />}
            {editing ? 'Update Certificate' : 'Add Certificate'}
          </button>
          {editing && (
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
        <h4 className="text-xl font-semibold">Your Certificates</h4>
        {data.length === 0 ? (
          <p className="text-gray-400">No certificates added yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(item => (
              <div key={item._id} className="glass p-4 rounded-lg">
                <div className="relative">
                  <img 
                    src={item.imageUrl || 'https://via.placeholder.com/400x300'} 
                    alt={item.title} 
                    className="w-full h-48 object-cover rounded-lg mb-3" 
                  />
                  {item.pdfUrl && (
                    <button
                      onClick={() => handleViewPdf(item.pdfUrl)}
                      className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-cyan-600"
                    >
                      <HiDocumentText /> View PDF
                    </button>
                  )}
                </div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-400 mb-1">{item.issuedBy}</p>
                <p className="text-xs text-gray-500 mb-3">{item.date}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="flex-1 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-1"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button 
                    onClick={() => deleteItem(item._id)} 
                    className="flex-1 p-2 bg-red-500 rounded-lg hover:bg-red-600 flex items-center justify-center gap-1"
                  >
                    <HiTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateManager;
