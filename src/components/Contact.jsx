import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Send, CheckCircle, AlertCircle , UserRound } from 'lucide-react';

export default function EnhancedContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [selectedContact, setSelectedContact] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', { ...formData, requestType: selectedContact });
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSelectedContact('personal');
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 
    focus:outline-none focus:ring-2 transition-all duration-200
    ${errors[fieldName] 
      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
      : 'border-white/20 focus:border-purple-400 focus:ring-purple-400/20'
    }
  `;

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-[#1a1026] via-[#2d0a3a] to-[#0a0613]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
          {/* Main Container */}
          <div className="relative z-10 w-full max-w-lg sm:max-w-2xl lg:max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
              
              {/* Left Panel - Contact Information */}
              <div className="w-full lg:w-2/5 p-4 sm:p-8 lg:p-12 text-white relative overflow-hidden bg-gradient-to-br from-purple-600/20 to-indigo-600/20">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      Get In Touch
                    </h2>
                    <p className="text-purple-100 mb-8 text-lg leading-relaxed">
                      Ready to bring your ideas to life? Fill out the form and our team will respond within 24 hours.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 group">
                        <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-purple-200">0333-2650596</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 group">
                        <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-purple-200">ammarsqaasmi@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 group">
                        <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                          <UserRound  className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Contact Person</p>
                          <p className="text-purple-200">Ammar Qasmi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-purple-200 mb-4 font-medium">Follow me on social media</p>
                    <div className="flex space-x-4">
                      <a href="https://www.facebook.com/ammar.qasmi.54" target="_blank" rel="noopener noreferrer" 
                         className="p-3 bg-white/20 rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer">
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a href="https://www.instagram.com/ammarqasmi1/?next=%2F" target="_blank" rel="noopener noreferrer" 
                         className="p-3 bg-white/20 rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href="https://www.linkedin.com/in/ammarqasmi/" target="_blank" rel="noopener noreferrer" 
                         className="p-3 bg-white/20 rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="w-full lg:w-3/5 p-4 sm:p-8 lg:p-12 bg-white/5">
                <div className="w-full max-w-md sm:max-w-lg mx-auto">
                  <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Contact Us
                    </h1>
                    <p className="text-blue-100 text-base sm:text-lg">Let's start a conversation</p>
                  </div>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <p className="text-green-100">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-red-100">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={inputClasses('firstName')}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-300 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={inputClasses('lastName')}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-300 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={inputClasses('email')}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={inputClasses('phone')}
                          placeholder="Your phone number"
                        />
                        {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-3">What type of request do you need?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { value: 'personal', label: 'Personal' },
                          { value: 'commercial', label: 'Commercial' },
                          { value: 'support', label: 'Landing Page' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                            <input
                              type="radio"
                              name="requestType"
                              value={option.value}
                              checked={selectedContact === option.value}
                              onChange={(e) => setSelectedContact(e.target.value)}
                              className="w-4 h-4 text-purple-400 bg-white/10 border-white/20 focus:ring-purple-400 focus:ring-2"
                            />
                            <span className="text-blue-100 font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={inputClasses('message')}
                        placeholder="Tell us about your project or how we can help you..."
                      />
                      {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 
                        hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 
                        disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700
                        text-white font-semibold py-3 sm:py-4 px-4 sm:px-8 rounded-lg transition-all duration-300 
                        transform hover:scale-105 disabled:hover:scale-100 shadow-lg 
                        flex items-center justify-center space-x-2 disabled:opacity-50 text-base sm:text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}