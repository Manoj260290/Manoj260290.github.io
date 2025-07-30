import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Calendar, Target } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  const stats = [
    { icon: Calendar, label: 'Years Experience', value: '12+' },
    { icon: Award, label: 'Projects Completed', value: '50+' },
    { icon: Target, label: 'Technologies Mastered', value: '15+' },
    { icon: User, label: 'Client Satisfaction', value: '100%' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <h3 className="about-subtitle">Professional Summary</h3>
              <p className="about-description">
                Full Stack Developer with <strong>12+ years of experience</strong> building scalable, 
                secure applications using Microsoft technologies (.NET Core, Web API, C#), JavaScript 
                frameworks (React, Redux, TypeScript), and cloud platforms (Azure, AWS).
              </p>
              <p className="about-description">
                Skilled in containerization (Docker, Kubernetes), Agile practices, and delivering 
                production-grade solutions with a focus on <strong>code quality and performance</strong>. 
                I have a proven track record of leading development teams and architecting complex 
                systems that serve thousands of users.
              </p>
              <p className="about-description">
                Currently based in <strong>Mississauga, Ontario</strong> with an open work permit 
                until May 2028, ready to contribute to innovative projects and collaborative teams.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">
                    <stat.icon size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="specialties"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="specialties-title">Core Specialties</h3>
          <div className="specialties-grid">
            {[
              'Full Stack Development',
              'Cloud Architecture',
              'API Design & Development',
              'Database Optimization',
              'DevOps & CI/CD',
              'Team Leadership',
            ].map((specialty, index) => (
              <motion.div
                key={specialty}
                className="specialty-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {specialty}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;