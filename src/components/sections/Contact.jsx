import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../config/api';
import { fadeIn, staggerContainer } from '../../utils/animations';
import { HiMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    setLoading(true);

    try {
      const response = await api.post('/messages', {
        ...formData,
        read: false,
        createdAt: new Date().toISOString()
      });
      console.log('Message sent successfully', response);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-300">
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
            Get In <span className="text-primary">Touch</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={fadeIn('right')} className="space-y-6">
              <div className="glass p-6 rounded-xl">
                <HiMail className="text-3xl text-primary mb-2" />
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:saeedhamdan360x@gmail.com" className="text-gray-400 hover:text-primary">
                  saeedhamdan360x@gmail.com
                </a>
              </div>

              <div className="glass p-6 rounded-xl">
                <FaWhatsapp className="text-3xl text-primary mb-2" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/233201307799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  +233 201307799
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={fadeIn('left')}
              onSubmit={handleSubmit}
              className="glass p-8 rounded-xl space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
