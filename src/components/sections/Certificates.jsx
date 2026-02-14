import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import { fadeIn, staggerContainer } from '../../utils/animations';
import { HiX } from 'react-icons/hi';

const Certificates = () => {
  const { data: certificates } = useFirestore('certificates');
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-20 bg-dark-300">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeIn('down')}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Certificates & <span className="text-primary">Achievements</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={fadeIn('up', index * 0.1)}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCert(cert)}
                className="glass p-6 rounded-xl cursor-pointer"
              >
                <img
                  src={cert.imageUrl || 'https://via.placeholder.com/400x300'}
                  alt={cert.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-1">{cert.issuedBy}</p>
                <p className="text-gray-500 text-xs">{cert.date}</p>
              </motion.div>
            ))}
          </div>
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
              className="glass p-6 rounded-2xl max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="float-right text-2xl text-primary hover:text-cyan-600"
              >
                <HiX />
              </button>
              <img
                src={selectedCert.imageUrl || 'https://via.placeholder.com/800x600'}
                alt={selectedCert.title}
                className="w-full rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
              <p className="text-gray-400 mb-1">{selectedCert.issuedBy}</p>
              <p className="text-gray-500">{selectedCert.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
