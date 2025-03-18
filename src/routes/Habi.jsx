import { useState } from "react";
import { Menu, X, Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md p-5 flex justify-between items-center md:px-10">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-indigo-700 tracking-wide md:text-4xl">Habbi</motion.h1>
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#home" className="hover:text-indigo-600">Home</a>
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#order" className="hover:text-indigo-600">How to Order</a>
          <a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
          <a href="#faq" className="hover:text-indigo-600">FAQ</a>
        </nav>
        <button className="hidden md:block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Login</button>
        <Menu className="md:hidden cursor-pointer" onClick={() => setMenuOpen(true)} />
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10">
        <div className="max-w-lg">
          <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-4xl font-bold text-indigo-700 mb-4">Your Personalized Fashion Experience</motion.h1>
          <p className="text-gray-600 mb-6">Browse styles, select materials, input your measurements, and get tailor-made outfits with ease.</p>
          <blockquote className="italic text-indigo-600 text-lg">“Fashion is the armor to survive the reality of everyday life.”</blockquote>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700">Explore Now</button>
        </div>
        <motion.img src="https://source.unsplash.com/600x400/?fashion" alt="Fashion" className="mt-6 md:mt-0 rounded-lg shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Features</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {['Style Collection', 'Material Selection', 'Easy Customization', 'AI-Powered Suggestions', 'Secure Payment'].map((feature, index) => (
            <motion.div key={index} className="p-5 border rounded-lg shadow-sm" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold text-lg mb-3">{feature}</h3>
              <p>Experience top-notch fashion services with ease.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How to Order */}
      <section id="order" className="py-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">How to Order</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 text-center">
          {['Browse Styles', 'Select Material', 'Input Measurements', 'Make Payment', 'Receive Order'].map((step, index) => (
            <motion.div key={index} className="p-5 border rounded-lg shadow-md bg-white text-gray-900" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold text-lg mb-3">{index + 1}. {step}</h3>
              <p>Follow this simple step to get your outfit.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="mb-3">Follow Us</p>
        <div className="flex justify-center space-x-4">
          <Facebook className="cursor-pointer" />
          <Instagram className="cursor-pointer" />
          <Twitter className="cursor-pointer" />
        </div>
        <p className="mt-3">© 2025 Habbi. All rights reserved.</p>
      </footer>
    </div>
  );
}
