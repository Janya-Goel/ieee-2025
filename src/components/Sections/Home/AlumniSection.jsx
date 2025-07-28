import React, { useState, useEffect, useCallback } from 'react';

const AlumniReflections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Alumni data
  const alumniData = [
    {
      name: "Prof. Raj Senani",
      title: "IEEE Member",
      quote: "IEEE has been instrumental in my career, providing a platform to collaborate with peers and stay updated on analog electronics. Being recognized as an IEEE Fellow is an honor, and I'm grateful for the chance to contribute to the IEEE CAS Society. IEEE continues to inspire innovation and excellence in engineering."
    },
    {
      name: "Dr. Rakesh Kumar",
      title: "IEEE Member", 
      quote: "My association with IEEE has been key to my growth as a computer engineer. The conferences and workshops expanded my knowledge and connected me with industry leaders. Publishing in IEEE journals gave my research global visibility, and I'm proud to be part of this prestigious organization."
    },
    {
      name: "Dr. Neeta Pandey",
      title: "IEEE Member",
      quote: "IEEE has been a fantastic platform for advancing my career and contributing to engineering. The Women in Engineering (WIE) initiatives have been especially inspiring, encouraging more women to pursue STEM careers. The wealth of resources and vibrant community make IEEE an invaluable part of my professional life."
    },
    {
      name: "Dr. Sanjeev Jain", 
      title: "IEEE Member",
      quote: "IEEE has been crucial to my growth in power electronics and renewable energy. Through its committees and conferences, I've collaborated with global experts and stayed at the forefront of technology. IEEE's commitment to innovation is commendable."
    },
    {
      name: "Prof. Yogesh Singh",
      title: "IEEE Member",
      quote: "IEEE has been essential to my growth in computer science and engineering. Its support through conferences, publications, and resources is unmatched, offering countless opportunities to grow, collaborate, and contribute to the field."
    }
  ];

  // Update cards to show based on screen size
  const updateCardsToShow = useCallback(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      setCardsToShow(1); // Mobile: 1 card
    } else if (width <= 1024) {
      setCardsToShow(2); // Tablet: 2 cards  
    } else {
      setCardsToShow(3); // Desktop: 3 cards
    }
  }, []);

  // Get maximum index
  const getMaxIndex = useCallback(() => {
    return Math.max(0, alumniData.length - cardsToShow);
  }, [alumniData.length, cardsToShow]);

  // Navigation functions
  const nextSlide = () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        prevSlide();
      } else if (e.key === 'ArrowRight' && currentIndex < getMaxIndex()) {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, getMaxIndex]);

  // Handle window resize
  useEffect(() => {
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, [updateCardsToShow]);

  // Ensure currentIndex doesn't exceed maxIndex when cardsToShow changes
  useEffect(() => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, getMaxIndex]);

  const translateX = -(currentIndex * (360 + 32)); // 360px card width + 32px gap

  return (
    <div className="min-h-screen" style={{
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      background: 'radial-gradient(ellipse at top, #1a1a1a 0%, #000000 50%, #0a0a0a 100%)',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 107, 166, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 168, 204, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0, 98, 155, 0.06) 0%, transparent 50%)
          `,
          animation: 'shimmer 8s ease-in-out infinite alternate'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 opacity-0" style={{animation: 'fadeInUp 0.8s ease-out 0.2s forwards'}}>
          <h1 
            className="font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 20px rgba(0, 168, 204, 0.5)'
            }}
          >
            Alumni Reflections
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Celebrating the achievements and contributions of our distinguished IEEE community members
          </p>
        </div>

        {/* Carousel */}
        <div 
          className="relative max-w-5xl mx-auto flex justify-center items-center opacity-0"
          style={{animation: 'fadeInUp 0.8s ease-out 0.4s forwards'}}
        >
          {/* IEEE Logo */}
          <div 
            className="absolute -top-12 right-0 w-20 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white text-sm z-50 border border-cyan-500/30"
            style={{
              letterSpacing: '2px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 107, 166, 0.4)'
            }}
          >
            IEEE
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/80 border border-cyan-500/40 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-xl font-bold backdrop-blur-sm z-10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= getMaxIndex()}
            className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/80 border border-cyan-500/40 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-xl font-bold backdrop-blur-sm z-10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
          >
            ›
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden py-8 w-full flex justify-center">
            <div className="overflow-hidden max-w-6xl mx-auto">
              <div 
                className="flex gap-8 transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {alumniData.map((alumni, index) => (
                  <div
                    key={index}
                    className="flex-none w-90 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transition-all duration-700 min-h-[480px] relative flex flex-col justify-between z-10 group hover:transform hover:-translate-y-5 hover:scale-105 hover:rotate-x-1 hover:z-20"
                    style={{
                      width: '360px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                      transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      animation: `fadeInUp 0.8s ease-out ${0.6 + (index * 0.1)}s forwards`,
                      opacity: 0,
                      transform: 'translateY(30px)'
                    }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 to-cyan-500/4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                    <div 
                      className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-cyan-500/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                      style={{animation: 'glowPulse 2s ease-in-out infinite alternate'}}
                    />

                    <div className="flex-1 flex flex-col relative z-10">
                      {/* Quote Mark */}
                      <div 
                        className="text-5xl text-cyan-500/30 font-bold float-right leading-none transition-all duration-700 font-serif group-hover:text-cyan-500/90 group-hover:scale-125 group-hover:rotate-15 group-hover:-translate-y-2"
                        style={{
                          transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                          textShadow: '0 0 20px rgba(0, 168, 204, 0.8)'
                        }}
                      >
                        "
                      </div>

                      {/* Quote Text */}
                      <div className="text-base leading-relaxed text-white/90 my-6 flex-1 transition-all duration-500 group-hover:text-white group-hover:-translate-y-1">
                        {alumni.quote}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div 
                      className="flex flex-col gap-2 transition-transform duration-500 border-t border-white/10 pt-6 group-hover:-translate-y-2"
                      style={{transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'}}
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white transition-all duration-500 group-hover:text-cyan-400 group-hover:translate-x-1">
                            {alumni.name}
                          </h3>
                          <div className="text-sm text-white/70 uppercase tracking-wider mt-1 transition-all duration-500 group-hover:text-white/90 group-hover:translate-x-1">
                            {alumni.title}
                          </div>
                        </div>
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide border border-white/20 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-1 group-hover:-rotate-2"
                          style={{
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                          }}
                        >
                          IEEE
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0.6;
            transform: scale(1.5) rotate(1deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowPulse {
          0% {
            opacity: 0.3;
            filter: blur(3px);
          }
          100% {
            opacity: 0.8;  
            filter: blur(1px);
          }
        }

        .group:hover {
          box-shadow: 
            0 0 30px rgba(0, 168, 204, 0.6), 
            0 0 60px rgba(0, 168, 204, 0.4), 
            0 0 90px rgba(0, 168, 204, 0.2),
            0 25px 50px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-color: rgba(0, 168, 204, 0.8);
        }

        @media (max-width: 768px) {
          .group {
            width: 320px !important;
            min-height: 400px !important;
            padding: 1.5rem !important;
          }
          
          .group:hover {
            transform: translateY(-15px) scale(1.05) rotateX(3deg) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .group:hover {
            transform: translateY(-5px) scale(1.02) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AlumniReflections;
