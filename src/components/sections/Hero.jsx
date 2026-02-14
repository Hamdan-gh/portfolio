import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiDownload, HiMail, HiCode } from 'react-icons/hi';
import { fadeIn } from '../../utils/animations';
import { useFirestore } from '../../hooks/useFirestore';

const Hero = () => {
  const { data: profileData } = useFirestore('profile');
  const [text, setText] = useState('');
  const [profileName, setProfileName] = useState('Your Name');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/400');
  const fullText = 'BSc Computer Science Student | Developer | Youth Leader';

  useEffect(() => {
    if (profileData.length > 0) {
      setProfileName(profileData[0].name || 'Your Name');
      setProfileImage(profileData[0].profileImage || 'https://via.placeholder.com/400');
    }
  }, [profileData]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={fadeIn('right')}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I'm <span className="text-primary">{profileName}</span>
            </motion.h1>

            <div className="h-20 mb-8">
              <p className="text-xl md:text-2xl text-gray-300">
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-primary"
                >
                  |
                </motion.span>
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={fadeIn('up', 0.5)}
              initial="hidden"
              animate="show"
            >
              <a
                href="#experience"
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <HiCode /> View Projects
              </a>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 glass px-6 py-3 rounded-lg hover:bg-dark-100 transition-colors"
              >
                <HiDownload /> Download CV
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <HiMail /> Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center"
            variants={fadeIn('left')}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="relative w-64 h-64 md:w-96 md:h-96"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-600 rounded-full blur-2xl opacity-30" />
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-full h-full object-cover rounded-full border-4 border-primary"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
