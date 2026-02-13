import React from 'react';

export default function OrgGrowthVisualization() {
  const phases = [
    { count: 15, period: 'Foundation', date: 'Oct 2022' },
    { count: 28, period: 'Rapid Scale', date: 'Apr 2023' },
    { count: 45, period: 'Expansion', date: 'Oct 2023' },
    { count: 62, period: 'Maturity', date: 'Mar 2025' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-5xl w-full">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-3xl font-semibold text-gray-900">
              AI Platform Design Organization Growth
            </h2>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
              4× Scale
            </span>
          </div>
          <p className="text-gray-600">Oct 2022 – Mar 2025 • 29 months</p>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          {/* Growth arrow */}
          <div 
            className="absolute top-24 left-8 right-8 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"
            style={{
              animation: 'expandArrow 0.8s ease forwards',
              transformOrigin: 'left',
              scaleX: 0
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-cyan-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"
              style={{
                animation: 'fadeIn 0.2s ease 0.6s forwards',
                opacity: 0
              }}
            ></div>
          </div>

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {phases.map((phase, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent mb-2"
                  style={{
                    animation: 'fadeInUp 0.4s ease forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {phase.count}
                </div>

                <div 
                  className="text-sm font-semibold text-gray-900 mb-1"
                  style={{
                    animation: 'fadeInUp 0.4s ease forwards',
                    animationDelay: `${index * 0.1 + 0.05}s`,
                    opacity: 0
                  }}
                >
                  {phase.period}
                </div>

                <div 
                  className="text-xs text-gray-500 uppercase tracking-wide mb-8"
                  style={{
                    animation: 'fadeInUp 0.4s ease forwards',
                    animationDelay: `${index * 0.1 + 0.08}s`,
                    opacity: 0
                  }}
                >
                  {phase.date}
                </div>

                <div className="grid grid-cols-7 gap-1.5 w-40">
                  {Array.from({ length: phase.count }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500"
                      style={{
                        animation: `popIn 0.25s ease forwards`,
                        animationDelay: `${index * 0.1 + 0.15 + i * 0.008}s`,
                        opacity: 0,
                        transform: 'scale(0)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="border-t border-gray-200 mb-8"
          style={{
            animation: 'expandWidth 0.5s ease 1.2s forwards',
            transformOrigin: 'left',
            scaleX: 0
          }}
        ></div>

        <div className="grid grid-cols-3 gap-8">
          {[
            { value: '88%', label: 'Employee Engagement' },
            { value: '6', label: 'Leadership Roles Added' },
            { value: '20+', label: 'Product Areas Supported' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center"
              style={{
                animation: 'fadeInUp 0.4s ease forwards',
                animationDelay: `${1.4 + index * 0.08}s`,
                opacity: 0
              }}
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes expandArrow {
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes expandWidth {
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
