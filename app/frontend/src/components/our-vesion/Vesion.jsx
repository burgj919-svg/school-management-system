import React from 'react';
import { FaRocket, FaLightbulb, FaGlobe } from 'react-icons/fa';

const Vision = () => {
  return (
    <section id="Vision" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        <div className="text-center mb-16">
          <h2 className="text-[#1a759f] font-bold tracking-[0.2em] text-sm mb-4 uppercase">
            Our Purpose
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800">
            Our <span className="text-[#52b69a]">Vision & Mission</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#52b69a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="bg-[#f0f8fa] p-10 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-[#1a759f] transition-all">
              <FaRocket className="text-[#1a759f] group-hover:text-white" size={30} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Innovation</h3>
            <p className="text-slate-600 leading-relaxed">
              Humara maqsad Pakistan mein science aur technology ko nayi unchaiyon tak le jana hai, jahan har student practical kaam seekh sakay.
            </p>
          </div>

          <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl lg:-translate-y-6">
            <div className="w-16 h-16 bg-[#52b69a] rounded-2xl flex items-center justify-center shadow-sm mb-8">
              <FaLightbulb className="text-white" size={30} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Quality Education</h3>
            <p className="text-slate-300 leading-relaxed">
              Step2Scientist ka vision hai ke har naujawan ko wo skills sikhayi jayein jo aaj ki modern dunya ki zaroorat hain, taake wo dunya ka muqabla kar sakein.
            </p>
          </div>

          <div className="bg-[#f0f8fa] p-10 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-[#52b69a] transition-all">
              <FaGlobe className="text-[#52b69a] group-hover:text-white" size={30} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Global Impact</h3>
            <p className="text-slate-600 leading-relaxed">
              Hum chahte hain ke humare institute se parh kar nikalne wale scientists dunya bhar mein Pakistan ka naam roshan karein.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
