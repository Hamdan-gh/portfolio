import { motion } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import { fadeIn, staggerContainer } from '../../utils/animations';
import { HiCalendar, HiOfficeBuilding } from 'react-icons/hi';

const Experience = () => {
  const { data: experiences } = useFirestore('experience');

  return (
    <section id="experience" className="py-20 bg-dark-300">
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
            Work <span className="text-primary">Experience</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={fadeIn('up', index * 0.1)}
                whileHover={{ y: -10 }}
                className="glass glass-hover p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <HiOfficeBuilding />
                  <span>{exp.organization}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <HiCalendar />
                  <span>{exp.duration}</span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tools?.split(',').map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full"
                    >
                      {tool.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
