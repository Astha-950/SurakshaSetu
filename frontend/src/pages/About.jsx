import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, PhoneCall, Users } from 'lucide-react';
import Ayushi from '../assets/Ayushi.jpg'
import Bhoomi from '../assets/Bhoomi.jpg'
import Rohan from '../assets/Rohan.jpg'
import Neelesh from '../assets/Neelesh.jpg'

const AboutUs = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const teamMembers = [
    {
      name: "Bhoomi Garg",
      role: "Frontend Developer & Team Lead",
      quote: "Designing safe digital spaces where every woman feels seen, heard, and supported.",
      image: Bhoomi
    },
    {
      name: "Rohan Malakar",
      role: "Backend Developer & System Builder",
      quote: "Empowering change through every API that connects help with those in need.",
      image: Rohan
    },
    {
      name: "Ayushi Ranjan",
      role: "Frontend Developer & UI Designer",
      quote: "Translating empathy into interfaces that uplift and empower women daily.",
      image: Ayushi
    },
    {
      name: "Neelesh Baghel",
      role: "Backend Developer & Tech Support",
      quote: "Building systems fortified by code and driven by justice.",
      image: Neelesh
    }
  ];

  return (
    <div className="py-16 sm:px-6 bg-rose-50">
      {/* What is Sahayak Section */}
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <motion.h2 
          className="text-3xl font-bold text-rose-00 sm:text-4xl mb-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          What is Sahayak?
        </motion.h2>
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-gray-600"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sahayak is a comprehensive women's support platform designed to provide a safe space for 
          raising issues, sharing experiences, accessing essential helplines, and reading informative blogs. 
          We connect women with resources, support networks, and professionals who can help navigate 
          challenging situations and empower them to take control of their lives.
        </motion.p>
      </motion.div>

      {/* Our Aim Section */}
      <motion.div 
        className="bg-slate-100 rounded-2xl p-8 mb-16 shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-rose-100 p-3 rounded-full mb-4">
            <Shield className="h-8 w-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">Our Aim</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We aim to create a world where every woman feels safe, supported, and empowered. 
            By providing resources, community, and expert guidance, we strive to break the 
            silence around issues affecting women and build pathways to healing and strength.
          </p>
        </div>
      </motion.div>

      {/* Our Team Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-16"
      >
         

      
      </motion.div>
      
      {/* Helpline Section - Quick access */}
      <motion.div
        className="bg-gradient-to-r from-gray-100 to-slate-200 rounded-2xl p-6 shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need immediate help?</h3>
            <p className="text-gray-600">Our support line is available 24/7 for women in need.</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-rose-600 text-white px-6 py-3 rounded-full font-medium shadow-md"
          >
            <PhoneCall className="h-5 w-5 mr-2" />
            <a href='./contact'>Helpline</a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;