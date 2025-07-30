import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically send the form data to a backend service
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mailme.msshinde@gmail.com',
      href: 'mailto:mailme.msshinde@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(647) 654-1383',
      href: 'tel:+16476541383'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mississauga, Ontario, Canada',
      href: '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'meetme-manoj-shinde',
      href: 'https://www.linkedin.com/in/meetme-manoj-shinde/'
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="contact-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            I'm always interested in new opportunities and exciting projects. 
            Whether you're looking for a full-stack developer, have a project in mind, 
            or just want to connect, I'd love to hear from you!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="card contact-card">
              <h3 className="contact-title">
                <MessageCircle size={24} />
                Let's Connect
              </h3>
              <div className="contact-list">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="contact-item"
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="contact-icon">
                      <item.icon size={20} />
                    </div>
                    <div className="contact-details">
                      <div className="contact-label">{item.label}</div>
                      <div className="contact-value">{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="availability-badge">
                <div className="status-indicator"></div>
                <span>Available for new opportunities</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card form-card">
              <h3 className="form-title">
                <Send size={24} />
                Send a Message
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="references-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card references-card">
            <h3>📋 References</h3>
            <p>Professional references are available upon request.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;