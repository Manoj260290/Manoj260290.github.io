import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Settings, Shield, GitBranch } from 'lucide-react';
import './Skills.css';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages & Frameworks',
      icon: Code,
      skills: ['.NET', 'C#', '.NET Core', 'ASP.NET MVC', 'Web API', 'VB.NET'],
      color: '#3182ce'
    },
    {
      title: 'Frontend Technologies',
      icon: Code,
      skills: ['ReactJS', 'Redux', 'TypeScript', 'JavaScript', 'Knockout.js', 'HTML5', 'CSS3'],
      color: '#10b981'
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['SQL Server (2005–2019)', 'T-SQL', 'LINQ', 'Entity Framework'],
      color: '#f59e0b'
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['Azure', 'AWS (S3, EC2)', 'GCP', 'Docker', 'Kubernetes'],
      color: '#8b5cf6'
    },
    {
      title: 'Tools & Version Control',
      icon: GitBranch,
      skills: ['Git', 'TFS', 'Azure DevOps', 'Jenkins', 'Visual Studio'],
      color: '#ef4444'
    },
    {
      title: 'Security',
      icon: Shield,
      skills: ['JWT', 'SSL/TLS', 'Anti-forgery Tokens', 'PCI Compliance'],
      color: '#06b6d4'
    }
  ];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Technical Skills
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="card skill-card">
                <div className="skill-header">
                  <div 
                    className="skill-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    <category.icon size={24} />
                  </div>
                  <h3 className="skill-title">{category.title}</h3>
                </div>
                
                <div className="skill-items">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="skill-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: (index * 0.1) + (skillIndex * 0.05) 
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="skill-bullet" style={{ backgroundColor: category.color }}>•</span>
                      <span className="skill-name">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card summary-card">
            <h3 className="summary-title">💻 Technical Expertise Summary</h3>
            <div className="summary-content">
              <div className="summary-item">
                <strong>Backend:</strong> Extensive experience with .NET ecosystem, building scalable APIs and microservices
              </div>
              <div className="summary-item">
                <strong>Frontend:</strong> Modern React development with TypeScript, Redux state management
              </div>
              <div className="summary-item">
                <strong>Database:</strong> Advanced SQL Server optimization, stored procedures, and ORM frameworks
              </div>
              <div className="summary-item">
                <strong>Cloud:</strong> Multi-cloud experience with Azure, AWS, and containerization technologies
              </div>
              <div className="summary-item">
                <strong>Security:</strong> Implementation of secure authentication, authorization, and compliance standards
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;