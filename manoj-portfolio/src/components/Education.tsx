import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, School } from 'lucide-react';
import './Education.css';

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  grade: string;
  icon: React.ElementType;
}

const Education: React.FC = () => {
  const educationData: EducationItem[] = [
    {
      degree: 'B.E. Information Technology',
      institution: 'Pune University',
      year: '2012',
      grade: 'First Class with Distinction (69.4%)',
      icon: GraduationCap
    },
    {
      degree: 'H.S.C. (Higher Secondary Certificate)',
      institution: 'Maharashtra Board',
      year: '2008',
      grade: '74.83%',
      icon: School
    },
    {
      degree: 'S.S.C. (Secondary School Certificate)',
      institution: 'Maharashtra Board',
      year: '2006',
      grade: '91.33%',
      icon: Award
    }
  ];

  const achievements = [
    'First Class with Distinction in B.E. Information Technology',
    '12+ years of continuous professional growth',
    'Led multiple high-impact projects across various domains',
    'Expertise in modern software development practices',
    'Strong foundation in computer science fundamentals'
  ];

  return (
    <section id="education" className="education section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <div className="education-content">
          <motion.div
            className="education-list"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                className="education-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card education-card">
                  <div className="education-header">
                    <div className="education-icon">
                      <edu.icon size={24} />
                    </div>
                    <div className="education-info">
                      <h3 className="education-degree">{edu.degree}</h3>
                      <div className="education-meta">
                        <div className="meta-item">
                          <School size={16} />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="meta-item">
                          <Calendar size={16} />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="education-grade">
                    <div className="grade-badge">
                      🎓 {edu.grade}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="achievements-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="card achievements-card">
              <h3 className="achievements-title">🏆 Key Achievements</h3>
              <div className="achievements-list">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="achievement-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <div className="achievement-bullet">✓</div>
                    <span>{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="education-summary"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="card summary-card">
            <div className="summary-content">
              <div className="summary-text">
                <h3>Educational Foundation</h3>
                <p>
                  Strong academic background in Information Technology with consistent 
                  high performance throughout educational journey. The comprehensive 
                  curriculum in software engineering, database systems, and computer 
                  networks provided a solid foundation for my professional career.
                </p>
              </div>
              <div className="summary-stats">
                <div className="stat">
                  <div className="stat-number">12+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-number">B.E.</div>
                  <div className="stat-label">Information Technology</div>
                </div>
                <div className="stat">
                  <div className="stat-number">69.4%</div>
                  <div className="stat-label">First Class Distinction</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;