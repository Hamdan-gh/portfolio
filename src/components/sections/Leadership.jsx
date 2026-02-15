import { motion } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Loading from '../common/Loading';

const Leadership = () => {
  const { data: leadership, loading } = useFirestore('leadership');

  if (loading) {
    return (
      <section id="leadership" className="py-20 bg-dark-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Leadership <span className="text-primary">Journey</span>
          </h2>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section id="leadership" className="py-20 bg-dark-200">
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
            Leadership <span className="text-primary">Journey</span>
          </motion.h2>

          {leadership.length === 0 ? (
            <p className="text-center text-gray-400">No leadership experience yet</p>
          ) : (
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />

              {leadership.map((item, index) => (
                <motion.div
                  key={item._id || item.id}
                  variants={fadeIn('right', index * 0.2)}
                  className="relative pl-20 pb-12"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-6 top-0 w-5 h-5 bg-primary rounded-full border-4 border-dark-200"
                    whileHover={{ scale: 1.5 }}
                  />

                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {item.position}
                    </h3>
                    <p className="text-gray-400 mb-2">{item.organization}</p>
                    <p className="text-sm text-gray-500 mb-4">{item.duration}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;
