import { motion } from "framer-motion";
// import { FaThread } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative bg-black text-white h-screen flex items-center justify-center overflow-hidden">
      {/* Geometry Lines (SVG Background) */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="90%" y2="100%" stroke="gray" strokeWidth="1" />
          <line x1="90%" y1="0" x2="10%" y2="100%" stroke="gray" strokeWidth="1" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="gray" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="gray" strokeWidth="1" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center space-x-3"
        >
          {/* Needle & Thread Icon */}
          <div className="text-yellow-400 text-6xl animate-spin-slow" />
          <h1 className="text-4xl md:text-6xl font-bold">Tailoring Perfection</h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-xl text-gray-400"
        >
          AI-powered design matching, premium fabrics, and on-time delivery.
        </motion.p>

        {/* Call to Action Button */}
        <motion.button 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-yellow-500 transition"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
