import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const socialMediaLinks = [
    { platform: 'Social Fusion', url: 'https://www.socialfusion.com', icon: 
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- Central Node --> */}
  <circle cx="12" cy="12" r="3" fill="#4A90E2" />
  
  {/* <!-- Extended Nodes and Connections --> */}
  {/* <!-- Top Branch --> */}
  <line x1="12" y1="12" x2="12" y2="2" stroke="#4A90E2" strokeWidth="2" />
  <circle cx="12" cy="2" r="2" fill="#4A90E2" />
  
  {/* <!-- Bottom Branch --> */}
  <line x1="12" y1="12" x2="12" y2="22" stroke="#4A90E2" strokeWidth="2" />
  <circle cx="12" cy="22" r="2" fill="#4A90E2" />
  
  {/* <!-- Left Branch --> */}
  <line x1="12" y1="12" x2="2" y2="12" stroke="#4A90E2" strokeWidth="2" />
  <circle cx="2" cy="12" r="2" fill="#4A90E2" />
  
  {/* <!-- Right Branch --> */}
  <line x1="12" y1="12" x2="22" y2="12" stroke="#4A90E2" strokeWidth="2" />
  <circle cx="22" cy="12" r="2" fill="#4A90E2" />
  
  {/* <!-- Create a Closed Polygon --> */}
  <line x1="2" y1="12" x2="12" y2="2" stroke="#4A90E2" strokeWidth="2" />
  <line x1="12" y2="2" x2="22" y2="12" stroke="#4A90E2" strokeWidth="2" />
  <line x1="22" y2="12" x2="12" y2="22" stroke="#4A90E2" strokeWidth="2" />
  <line x1="12" y2="22" x2="2" y2="12" stroke="#4A90E2" strokeWidth="2" />
</svg>

},
    { platform: 'Facebook', url: 'https://www.facebook.com/yourprofile', icon: <FaFacebookF className="text-blue-600" /> },
    { platform: 'Twitter', url: 'https://www.twitter.com/yourprofile', icon: <FaTwitter className="text-blue-400" /> },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/yourprofile', icon: <FaLinkedinIn className="text-blue-700" /> },
    { platform: 'Instagram', url: 'https://www.instagram.com/yourprofile', icon: <FaInstagram className="text-pink-500" /> },
    { platform: 'GitHub', url: 'https://www.github.com/yourprofile', icon: <FaGithub className="text-gray-800 dark:text-white" /> },
    { platform: 'Email', url: 'mailto:your.email@example.com', icon: <FaEnvelope className="text-red-600" /> },
    { platform: 'WhatsApp', url: 'https://wa.me/yourWhatsAppNumber', icon: <FaWhatsapp className="text-green-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Me</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
        {socialMediaLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">{link.icon}</div>
            <div className="text-lg font-semibold">{link.platform}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
