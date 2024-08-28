import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaWhatsapp, FaGlobe } from 'react-icons/fa';

const ContactPage = () => {
  const socialMediaLinks = [
    { platform: 'Social Fusion', url: 'https://social-fusion.onrender.com/authors/author/66cf3d0fce7ad9beeb414b9b', icon: <FaGlobe /> },
    // { platform: 'Facebook', url: 'https://www.facebook.com/yourprofile', icon: <FaFacebookF className="text-blue-600" /> },
    // { platform: 'Twitter', url: 'https://www.twitter.com/yourprofile', icon: <FaTwitter className="text-blue-400" /> },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/raahat-khan-93722a22a', icon: <FaLinkedinIn className="text-blue-700" /> },
    { platform: 'Instagram', url: 'https://www.instagram.com/captainr01', icon: <FaInstagram className="text-pink-500" /> },
    { platform: 'GitHub', url: 'https://www.github.com/raahatctrack001', icon: <FaGithub className="text-gray-800 dark:text-white" /> },
    { platform: 'Email', url: 'mailto:socialfusion001.sf@gmail.com', icon: <FaEnvelope className="text-red-600" /> },
    { platform: 'WhatsApp', url: 'https://wa.me/+918920151361', icon: <FaWhatsapp className="text-green-500" /> },
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
