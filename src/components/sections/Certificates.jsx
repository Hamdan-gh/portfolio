import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import { fadeIn, staggerContainer } from '../../utils/animations';
import { HiX, HiDocumentText } from 'react-icons/hi';
import Loading from '../common/Loading';

const Certificates = () => {
  const { data: certificates, loading } = useFirestore('certificates');
  const [selectedCert, setSelectedCert] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  const handleViewPdf = (e, pdfUrl) => {
    e.stopPropagation();
    if (pdfUrl) {
      const newWindow = window.open();
      newWindow.document.write(
        `<iframe src="${pdfUrl}" width="100%" height="100%" style="border:none;"></iframe>`
      );
    }
  };

  if (loading) {
    return (
      <section id="certificates" className="py-20 bg-dark-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Certificates & <span className="text-primary">Achievements</span>
          </h2>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-20 bg-dark-300">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeIn('down')}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Certificates & <span className="text-primary">Achievements</span>
          </motion.h2>

          {certificates.length === 0 ? (
            <p className="text-center text-gray-400">No certificates yet</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert._id || cert.id}
                  variants={fadeIn('up', index * 0.1)}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCert(cert)}
                  className="glass p-6 rounded-xl cursor-pointer relative"
                >
                  <div className="relative w-full h-48 bg-dark-200 rounded-lg mb-4">
                    {!imageLoaded[cert._id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    )}
                    <img
                      src={cert.imageUrl || 'https://via.placeholder.com/400x300'}
                      alt={cert.title}
                      loading="lazy"
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [cert._id]: true }))}
                      className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                        imageLoaded[cert._id] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                  {cert.pdfUrl && (
                    <button
                      onClick={(e) => handleViewPdf(e, cert.pdfUrl)}
                      className="absolute top-8 right-8 bg-primary text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-cyan-600"
                    >
                      <HiDocumentText /> PDF
                    </button>
                  )}
                  <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">{cert.issuedBy}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="glass p-6 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedCert.title}</h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-2xl text-primary hover:text-cyan-600"
                >
                  <HiX />
                </button>
              </div>
              <img
                src={selectedCert.imageUrl || 'https://via.placeholder.com/800x600'}
                alt={selectedCert.title}
                className="w-full rounded-lg mb-4"
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 mb-1">{selectedCert.issuedBy}</p>
                  <p className="text-gray-500">{selectedCert.date}</p>
                </div>
                {selectedCert.pdfUrl && (
                  <button
                    onClick={(e) => handleViewPdf(e, selectedCert.pdfUrl)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                  >
                    <HiDocumentText /> View Full PDF
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
