import { motion } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import { fadeIn, staggerContainer } from '../../utils/animations';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaWhatsapp, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

const SocialMedia = () => {
  const { data: socialLinks } = useFirestore('socialLinks');

  return (
    <section className="py-20 bg-dark-200">
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
            Connect With <span className="text-primary">Me</span>
          </motion.h2>

          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.platform.toLowerCase()];
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeIn('up', index * 0.1)}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="glass p-6 rounded-full text-4xl text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {Icon && <Icon />}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMedia;
