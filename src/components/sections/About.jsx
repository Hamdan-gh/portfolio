import { motion } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import { fadeIn, staggerContainer } from '../../utils/animations';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaJs, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaDatabase, FaFigma, FaVuejs, FaAngular,
  FaPhp, FaLaravel, FaWordpress, FaBootstrap, FaSass
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiTailwindcss, SiNextdotjs, SiExpress, SiDjango, SiFlask, SiSpring,
  SiKubernetes, SiGraphql, SiRedux, SiJest, SiCypress, SiWebpack,
  SiVite, SiNestjs, SiPrisma, SiSupabase
} from 'react-icons/si';

const iconMap = {
  react: FaReact,
  nodejs: FaNodeJs,
  typescript: SiTypescript,
  javascript: FaJs,
  python: FaPython,
  java: FaJava,
  html: FaHtml5,
  css: FaCss3Alt,
  tailwind: SiTailwindcss,
  bootstrap: FaBootstrap,
  sass: FaSass,
  nextjs: SiNextdotjs,
  vue: FaVuejs,
  angular: FaAngular,
  express: SiExpress,
  nestjs: SiNestjs,
  django: SiDjango,
  flask: SiFlask,
  spring: SiSpring,
  php: FaPhp,
  laravel: FaLaravel,
  wordpress: FaWordpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  redis: SiRedis,
  firebase: SiFirebase,
  supabase: SiSupabase,
  prisma: SiPrisma,
  graphql: SiGraphql,
  redux: SiRedux,
  git: FaGitAlt,
  docker: FaDocker,
  kubernetes: SiKubernetes,
  aws: FaAws,
  database: FaDatabase,
  figma: FaFigma,
  jest: SiJest,
  cypress: SiCypress,
  webpack: SiWebpack,
  vite: SiVite,
};

const About = () => {
  const { data: skills } = useFirestore('skills');
  const { data: profile } = useFirestore('profile');

  const bio = profile[0]?.bio || 'Loading...';

  return (
    <section id="about" className="py-20 bg-dark-200">
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
            About <span className="text-primary">Me</span>
          </motion.h2>

          <motion.div
            variants={fadeIn('up')}
            className="max-w-3xl mx-auto glass p-8 rounded-2xl mb-12"
          >
            <p className="text-lg text-gray-300 leading-relaxed">{bio}</p>
          </motion.div>

          <motion.div variants={fadeIn('up', 0.2)}>
            <h3 className="text-2xl font-semibold text-center mb-8">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => {
                const Icon = iconMap[skill.icon];
                
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="glass px-6 py-3 rounded-full flex items-center gap-2 text-primary font-medium cursor-pointer"
                  >
                    {Icon && <Icon className="text-2xl" />}
                    <span>{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
