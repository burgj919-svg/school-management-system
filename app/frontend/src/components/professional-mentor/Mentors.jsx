import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Mentors = () => {
  const mentors = [
    {
      id: 1,
      name: "Dr. Arshad Khan",
      role: "Senior Research Scientist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Engr. Sara Ahmed",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Prof. Hassan Ali",
      role: "AI & Robotics Expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    }
  ];

  return (
    <section id="Mentors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        <div className="text-center mb-16">
          <h2 className="text-[#1a759f] font-black text-4xl md:text-5xl uppercase tracking-tighter">
            PROFESSIONAL MENTORS
          </h2>
          <p className="text-[#52b69a] font-bold text-xl tracking-[0.15em] mt-2">
            LEARN FROM THE EXPERTS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="group relative bg-[#f0f8fa] rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300">
              
              <div className="h-72 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                />
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{mentor.name}</h3>
                <p className="text-[#1a759f] font-semibold text-sm uppercase tracking-wide mb-6">
                  {mentor.role}
                </p>

                <div className="flex justify-center gap-4">
                  <a href="#" className="p-3 bg-white rounded-full text-slate-600 hover:text-[#1a759f] hover:shadow-md transition-all">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="p-3 bg-white rounded-full text-slate-600 hover:text-black hover:shadow-md transition-all">
                    <FaGithub size={20} />
                  </a>
                  <a href="#" className="p-3 bg-white rounded-full text-slate-600 hover:text-[#1DA1F2] hover:shadow-md transition-all">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Mentors;
