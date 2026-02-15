import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { HiUpload, HiDownload, HiTrash, HiDocumentText } from 'react-icons/hi';

const CVManager = () => {
  const { data, addItem, updateItem, deleteItem } = useFirestore('cv');
  const [cvFile, setCvFile] = useState('');
  const [cvPreview, setCvPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [cvId, setCvId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setCvFile(data[0].fileData || '');
      setCvPreview(data[0].fileData || '');
      setFileName(data[0].fileName || 'CV.pdf');
      setCvId(data[0]._id);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const base64String = btoa(
          new Uint8Array(event.target.result).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        const fileData = `data:application/pdf;base64,${base64String}`;
        setCvFile(fileData);
        setCvPreview(fileData);
        setFileName(file.name);
        toast.success('CV uploaded successfully!');
      } catch (error) {
        console.error('File processing error:', error);
        toast.error('Failed to process file');
      } finally {
        setIsProcessing(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleRemoveCV = () => {
    setCvFile('');
    setCvPreview('');
    setFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvFile) {
      toast.error('Please upload a CV file');
      return;
    }

    try {
      const cvData = {
        fileData: cvFile,
        fileName: fileName,
        uploadedAt: new Date().toISOString()
      };

      if (cvId) {
        await updateItem(cvId, cvData);
        toast.success('CV updated successfully');
      } else {
        const newCV = await addItem(cvData);
        setCvId(newCV._id);
        toast.success('CV uploaded successfully');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    if (!cvId) return;
    
    if (window.confirm('Are you sure you want to delete your CV?')) {
      try {
        await deleteItem(cvId);
        setCvFile('');
        setCvPreview('');
        setFileName('');
        setCvId(null);
        toast.success('CV deleted successfully');
      } catch (error) {
        toast.error('Failed to delete CV');
      }
    }
  };

  const handleViewCV = () => {
    if (cvPreview) {
      const newWindow = window.open();
      newWindow.document.write(
        `<iframe src="${cvPreview}" width="100%" height="100%" style="border:none;"></iframe>`
      );
    }
  };

  const handleDownloadCV = () => {
    if (cvPreview) {
      const link = document.createElement('a');
      link.href = cvPreview;
      link.download = fileName || 'CV.pdf';
      link.click();
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Manage CV/Resume</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 glass p-6 rounded-xl">
        <div>
          <label className="block mb-2 font-semibold">Upload CV (PDF)</label>
          
          {cvPreview ? (
            <div className="space-y-4">
              <div className="glass p-6 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <HiDocumentText className="text-5xl text-primary" />
                  <div>
                    <p className="font-semibold text-lg">{fileName}</p>
                    <p className="text-sm text-gray-400">PDF Document</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleViewCV}
                    className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                    title="View CV"
                  >
                    <HiDocumentText className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCV}
                    className="p-2 bg-green-500 rounded-lg hover:bg-green-600"
                    title="Download CV"
                  >
                    <HiDownload className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveCV}
                    className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                    title="Remove CV"
                  >
                    <HiTrash className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 bg-dark-200 rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center">
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
                  <p className="text-gray-400">Processing CV...</p>
                </>
              ) : (
                <>
                  <HiUpload className="text-6xl text-gray-500 mb-2" />
                  <p className="text-gray-400 text-center px-4">
                    Upload your CV/Resume (PDF)
                  </p>
                </>
              )}
            </div>
          )}
          
          <div className="mt-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="cv-file"
              disabled={isProcessing}
            />
            <label
              htmlFor="cv-file"
              className={`inline-flex items-center gap-2 bg-dark-200 border border-primary/30 px-4 py-2 rounded-lg cursor-pointer hover:bg-dark-100 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <HiUpload /> Choose PDF File
            </label>
            <p className="text-sm text-gray-400 mt-2">
              Upload your CV/Resume in PDF format, max 10MB
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg hover:bg-cyan-600"
            disabled={isProcessing || !cvFile}
          >
            <HiUpload />
            {cvId ? 'Update CV' : 'Save CV'}
          </button>
          {cvId && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600"
            >
              <HiTrash /> Delete CV
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 glass p-6 rounded-xl">
        <h4 className="text-xl font-semibold mb-4">CV Status</h4>
        {cvId ? (
          <div className="flex items-center gap-3 text-green-500">
            <HiDocumentText className="text-2xl" />
            <div>
              <p className="font-semibold">CV Uploaded</p>
              <p className="text-sm text-gray-400">Your CV is available for download on the website</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-gray-400">
            <HiDocumentText className="text-2xl" />
            <div>
              <p className="font-semibold">No CV Uploaded</p>
              <p className="text-sm">Upload your CV to make it available for download</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVManager;
