// src/pages/AboutFashionEra.jsx
import { Sparkles, Users, Leaf, Cpu } from "lucide-react";

const AboutFashionEra = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1B1B1F] mb-6 tracking-tight">
            About <span className="text-[#581845]">Syber</span>Fashion
          </h1>
          <div className="w-24 h-1.5 bg-[#D6AE7B] mx-auto rounded-full mb-8" />
          <p className="text-[#B76E79] text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Your ultimate destination for fashion trends, digital insights, and the future of bespoke innovation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-[#1B1B1F]/80 leading-relaxed text-lg">
            <p>
              At <span className="text-[#581845] font-bold">SyberFashion</span>, we explore the ever-evolving world of style, from timeless sartorial classics to the cutting-edge trends defining the digital age. 
            </p>
            <p>
              Our platform serves as a bridge, connecting visionary designers, passionate enthusiasts, and the technology-driven advancements reshaping the global industry.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-[#B76E79]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-[#581845]">
              <Sparkles size={120} />
            </div>
            <h3 className="text-[#581845] font-bold text-2xl mb-4">Our Vision</h3>
            <p className="text-[#B76E79] font-medium leading-relaxed">
              To redefine the fashion narrative by placing innovation, creativity, and conscious technology at the forefront of every conversation.
            </p>
          </div>
        </div>

        {/* The Three Pillars */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Users className="text-[#581845]" />,
              title: "Community",
              desc: "A collaborative space for creators and lovers of style to share stories."
            },
            {
              icon: <Leaf className="text-[#581845]" />,
              title: "Sustainability",
              desc: "Deep dives into ethical practices and the future of slow fashion."
            },
            {
              icon: <Cpu className="text-[#581845]" />,
              title: "Innovation",
              desc: "Insights into how AI, 3D design, and tech are tailoring the future."
            }
          ].map((pillar, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-[#B76E79]/5 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-[#FAF9F6] rounded-xl flex items-center justify-center mx-auto mb-4">
                {pillar.icon}
              </div>
              <h4 className="font-bold text-[#1B1B1F] mb-2">{pillar.title}</h4>
              <p className="text-sm text-[#B76E79] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center bg-[#1B1B1F] p-10 rounded-[3rem] text-white">
          <h2 className="text-2xl font-bold mb-4 text-[#D6AE7B]">Join the Evolution</h2>
          <p className="max-w-lg mx-auto opacity-80 mb-6 text-sm md:text-base">
            Whether you're looking for the latest style inspirations or deep technical insights, SyberFashion has you covered.
          </p>
          <button className="bg-[#581845] hover:bg-white hover:text-[#581845] px-8 py-3 rounded-full font-bold transition-all active:scale-95">
            Explore the Feed
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AboutFashionEra;