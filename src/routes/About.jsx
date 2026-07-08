// src/pages/AboutFashionEra.jsx
import { Sparkles, Users, Leaf, Cpu } from "lucide-react";

const AboutFashionEra = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B1B1F] mb-4 md:mb-6 tracking-tight leading-tight">
            About <span className="text-[#581845]">Attire</span>Byte
          </h1>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#D6AE7B] mx-auto rounded-full mb-6 md:mb-8" />
          <p className="text-[#B76E79] text-sm sm:text-base md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed px-2">
            Your ultimate destination for fashion trends, digital insights, and the future of bespoke innovation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-14 md:mb-20">
          <div className="space-y-4 md:space-y-6 text-[#1B1B1F]/80 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              At <span className="text-[#581845] font-bold">AttireByte</span>, we explore the ever-evolving world of style, from timeless sartorial classics to the cutting-edge trends defining the digital age.
            </p>
            <p>
              Our platform serves as a bridge, connecting visionary designers, passionate enthusiasts, and the technology-driven advancements reshaping the global industry.
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-[#B76E79]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-[#581845]">
              <Sparkles size={100} className="md:w-[120px] md:h-[120px]" />
            </div>
            <h3 className="text-[#581845] font-bold text-lg md:text-2xl mb-3 md:mb-4">Our Vision</h3>
            <p className="text-[#B76E79] font-medium leading-relaxed text-sm md:text-base">
              To redefine the fashion narrative by placing innovation, creativity, and conscious technology at the forefront of every conversation.
            </p>
          </div>
        </div>

        {/* The Three Pillars */}
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20">
          {[
            {
              icon: <Users className="text-[#581845]" size={20} />,
              title: "Community",
              desc: "A collaborative space for creators and lovers of style to share stories."
            },
            {
              icon: <Leaf className="text-[#581845]" size={20} />,
              title: "Sustainability",
              desc: "Deep dives into ethical practices and the future of slow fashion."
            },
            {
              icon: <Cpu className="text-[#581845]" size={20} />,
              title: "Innovation",
              desc: "Insights into how AI, 3D design, and tech are tailoring the future."
            }
          ].map((pillar, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[#B76E79]/5 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FAF9F6] rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                {pillar.icon}
              </div>
              <h4 className="font-bold text-[#1B1B1F] text-sm md:text-base mb-1.5 md:mb-2">{pillar.title}</h4>
              <p className="text-xs md:text-sm text-[#B76E79] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center bg-[#1B1B1F] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#D6AE7B]">Join the Evolution</h2>
          <p className="max-w-lg mx-auto opacity-80 mb-5 md:mb-6 text-xs sm:text-sm md:text-base">
            Whether you're looking for the latest style inspirations or deep technical insights, AttireByte has you covered.
          </p>
          <button className="bg-[#581845] hover:bg-white hover:text-[#581845] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base transition-all active:scale-95">
            Explore the Feed
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutFashionEra;