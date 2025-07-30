import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Download, Code } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  const handleDownloadResume = () => {
    // This would typically download a PDF resume
    alert('Resume download functionality would be implemented here');
  };

  return (
    <section id="home" className="hero section">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="gradient-text">MANOJ SHINDE</span>
            </motion.h1>
            
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Full Stack Developer - .NET
            </motion.h2>

            <motion.div
              className="hero-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="info-item">
                <MapPin size={18} />
                <span>Mississauga, Ontario</span>
              </div>
              <div className="info-item">
                <Phone size={18} />
                <span>(647) 654-1383</span>
              </div>
              <div className="info-item">
                <Mail size={18} />
                <span>mailme.msshinde@gmail.com</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-links"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="https://www.linkedin.com/in/meetme-manoj-shinde/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <button onClick={handleDownloadResume} className="btn btn-primary">
                <Download size={18} />
                Download Resume
              </button>
            </motion.div>

            <motion.div
              className="work-permit-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              ✅ Open Work Permit until May 15, 2028 – No sponsorship required
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="code-animation">
              <div className="code-lines">
                <motion.div
                  className="code-line"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">developer</span> ={' '}
                  <span className="code-string">"Manoj Shinde"</span>;
                </motion.div>
                <motion.div
                  className="code-line"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.4, duration: 1 }}
                >
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">experience</span> ={' '}
                  <span className="code-number">12</span>;
                </motion.div>
                <motion.div
                  className="code-line"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.6, duration: 1 }}
                >
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">skills</span> = [
                </motion.div>
                <motion.div
                  className="code-line code-indent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.8, duration: 1 }}
                >
                  <span className="code-string">".NET"</span>,{' '}
                  <span className="code-string">"React"</span>,{' '}
                  <span className="code-string">"Azure"</span>
                </motion.div>
                <motion.div
                  className="code-line"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  ];
                </motion.div>
              </div>
              <motion.div
                className="floating-icon"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code size={40} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;