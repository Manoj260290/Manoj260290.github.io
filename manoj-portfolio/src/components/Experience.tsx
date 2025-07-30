import React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, MapPin, Briefcase } from 'lucide-react';
import './Experience.css';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  project: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Lead Software Engineer',
      company: 'Impetus Technologies',
      period: 'May 2023 – July 2025',
      location: 'India',
      project: 'CaaS / Payroll Relief – US',
      description: [
        'Developed secure RESTful APIs using .NET Core and VB.NET for payroll and tax workflows',
        'Wrote optimized SQL Server queries and procedures for reporting and data validation',
        'Built dynamic calendar UI using Knockout.js for tracking payroll events',
        'Created React component for logging and tracing API endpoint activity'
      ],
      technologies: ['.NET Core', 'VB.NET', 'SQL Server', 'Knockout.js', 'React']
    },
    {
      title: 'Lead .Net C# Developer',
      company: 'Data Dynamics Software Solutions India Pvt. Ltd.',
      period: 'Oct 2022 – May 2023',
      location: 'India',
      project: 'StorageX – Multi-Cloud Migration',
      description: [
        'Built backend APIs to orchestrate large-scale data migration to S3, Azure, and OneDrive',
        'Collaborated with C++ backend engine and designed interface logic',
        'Managed production issues and improved migration validation checks'
      ],
      technologies: ['C#', '.NET', 'AWS S3', 'Azure', 'OneDrive API', 'C++']
    },
    {
      title: 'Lead – Technology',
      company: 'Synechron Technologies Pvt. Ltd.',
      period: 'Sep 2021 – Oct 2022',
      location: 'India',
      project: 'SFE – Banking Integration Layer',
      description: [
        'Led backend optimization and request transformation service in banking ecosystem',
        'Analyzed performance bottlenecks and implemented database tuning',
        'Used Splunk to debug, monitor, and support production incidents'
      ],
      technologies: ['.NET', 'SQL Server', 'Splunk', 'Banking APIs', 'Performance Optimization']
    },
    {
      title: 'Tech Lead',
      company: 'Opus Consulting Solutions',
      period: 'Jul 2019 – Sep 2021',
      location: 'India',
      project: 'Paysecure – Payment Processing System',
      description: [
        'Built payment channel using .NET Core and Web API to integrate with VISA, Mastercard',
        'Ensured Web API security for PCI compliance using JWT, HTTPS, and anti-forgery tokens',
        'Developed React-based merchant portal and performed UAT testing',
        'Maintained code versioning and pipeline using Git'
      ],
      technologies: ['.NET Core', 'Web API', 'React', 'JWT', 'VISA/Mastercard APIs', 'Git']
    },
    {
      title: 'Senior Software Development Engineer',
      company: 'Effective Digital (formerly ADWEB Software)',
      period: 'Sep 2015 – Jul 2019',
      location: 'India',
      project: 'DataInTrans – Telematics Tracker',
      description: [
        'Developed MVC and React-based UI for asset tracking across geolocations',
        'Integrated AWS services and implemented Redux architecture',
        'Acted as Dev team SPOC for product alignment and implementation cycles'
      ],
      technologies: ['ASP.NET MVC', 'React', 'Redux', 'AWS', 'Geolocation APIs']
    },
    {
      title: 'System Developer',
      company: 'Triente Global Services Pvt. Ltd.',
      period: 'Jul 2014 – Sep 2015',
      location: 'India',
      project: 'Athena - Legacy ERP Enhancements',
      description: [
        'Enhanced ERP functionality using ASP.NET, C# and SQL Server',
        'Wrote stored procedures and improved backend performance'
      ],
      technologies: ['ASP.NET', 'C#', 'SQL Server', 'ERP Systems']
    },
    {
      title: 'Software Engineer',
      company: 'Innovatus Infotech India Pvt. Ltd.',
      period: 'Oct 2012 – Jul 2014',
      location: 'India',
      project: 'Master Data Management',
      description: [
        'Used 3-tier architecture to develop modules using C# and ASP.NET',
        'Implemented validations and wrote reusable SQL queries for core modules'
      ],
      technologies: ['C#', 'ASP.NET', '3-tier Architecture', 'SQL Server']
    }
  ];

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div className="card experience-card">
                  <div className="experience-header">
                    <div className="experience-title-section">
                      <h3 className="experience-title">{exp.title}</h3>
                      <div className="experience-meta">
                        <div className="meta-item">
                          <Building size={16} />
                          <span>{exp.company}</span>
                        </div>
                        <div className="meta-item">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="meta-item">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="experience-icon">
                      <Briefcase size={24} />
                    </div>
                  </div>

                  <div className="project-section">
                    <h4 className="project-title">📌 Project: {exp.project}</h4>
                  </div>

                  <div className="experience-description">
                    <ul>
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="technologies">
                    <h5 className="tech-title">Technologies:</h5>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-marker"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;