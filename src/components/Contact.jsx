import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please enter your name.';
    if (!form.email.trim())   e.email   = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Please write a message.';
    return e;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Big heading */}
          <motion.h2
            className="contact-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            One Buddy.<br />Endless Everyday<br />Possibilities.
          </motion.h2>

          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover a more connected way to experience everyday services.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="contact-ctas"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#contact-form" className="btn btn-primary">Get in Touch</a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            id="contact-form"
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <div className="contact-form">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">🎉</div>
                  <h3 className="success-title">Message sent!</h3>
                  <p className="success-body">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="form-title">Say Hello 👋</h3>
                  <p className="form-subtitle">
                    Have a question or want to collaborate? Drop us a message.
                  </p>

                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-name">Full Name</label>
                    <input
                      id="cf-name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={onChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-email">Email Address</label>
                    <input
                      id="cf-email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-message">Message</label>
                    <textarea
                      id="cf-message"
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      name="message"
                      placeholder="Tell us about yourself or your query…"
                      value={form.message}
                      onChange={onChange}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary form-submit">
                    Send Message
                  </button>

                  <p className="form-disclaimer">
                    This form is for demo purposes. No data is stored.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
