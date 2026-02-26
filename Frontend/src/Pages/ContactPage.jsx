import React, { useState } from 'react';
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from 'react-icons/hi';

const contactInfo = [
  {
    icon: HiOutlineMail,
    title: 'Email Us',
    detail: 'support@gatenet-practice.in',
    subtext: 'We reply within 24 hours',
  },
  {
    icon: HiOutlinePhone,
    title: 'Call Us',
    detail: '+91 0000000000',
    subtext: 'Mon–Sat, 9 AM – 6 PM IST',
  },
  {
    icon: HiOutlineLocationMarker,
    title: 'Office',
    detail: 'Lucknow, Uttar Pradesh',
    subtext: 'India',
  },
  {
    icon: HiOutlineClock,
    title: 'Support Hours',
    detail: 'Mon – Sat',
    subtext: '9:00 AM – 6:00 PM IST',
  },
];

const faqs = [
  {
    q: 'Is the platform free to use?',
    a: 'Yes! You can access practice tests and basic analytics for free. Premium plans offer advanced features.',
  },
  {
    q: 'How quickly will I get a response?',
    a: 'We aim to respond to all queries within 24 hours on business days.',
  },
  {
    q: 'Can I request questions on a specific topic?',
    a: 'Absolutely. Use the form to share your topic preferences and we\'ll prioritize adding them.',
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#3475d9] to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            We're here to help
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have a question, suggestion, or need support? Our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <info.icon className="text-xl text-[#3475d9]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{info.title}</h3>
                <p className="text-gray-700 text-sm font-medium mt-0.5">{info.detail}</p>
                <p className="text-xs text-gray-400 mt-0.5">{info.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineCheckCircle className="text-4xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. We'll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-[#3475d9] font-medium hover:underline flex items-center gap-1 mx-auto"
                  >
                    Send Another Message <HiOutlineArrowRight />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3475d9] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3475d9] focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#3475d9] focus:border-transparent transition appearance-none bg-white"
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="content">Content / Question Request</option>
                      <option value="bug">Report a Bug</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3475d9] focus:border-transparent transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#3475d9] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Send Message
                    <HiOutlineArrowRight />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Sidebar */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Frequently Asked</h3>
              <p className="text-sm text-gray-500 mb-5">Quick answers to common questions</p>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{faq.q}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra CTA */}
            <div className="mt-6 bg-gradient-to-br from-[#3475d9] to-blue-700 rounded-2xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our support team is available Mon–Sat, 9 AM – 6 PM IST.
              </p>
              <a
                href="mailto:support@gatenet-practice.in"
                className="inline-flex items-center gap-2 bg-white text-[#3475d9] font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                <HiOutlineMail />
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
