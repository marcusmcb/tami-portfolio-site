import React, { useState } from 'react';

export default function OrgGrowthVisualization() {
  const [key, setKey] = useState(0);
  
  const phases = [
    { count: 15, period: 'Foundation', date: 'Oct 2022' },
    { count: 28, period: 'Rapid Scale', date: 'Apr 2023' },
    { count: 45, period: 'Expansion', date: 'Oct 2023' },
    { count: 62, period: 'Maturity', date: 'Mar 2025' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-5xl w-full">
        <div className="mb-12 flex items-start justify-between">
          <div>
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
          
          {/* Replay button */}
          <button
            onClick={() => setKey(k => k + 1)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Replay Animation
          </button>
        </div>

        {/* Timeline */}
        <div key={key} className="relative mb-12">
          {/* Growth arrow - animated */}
          <div 
            className="absolute top-24 left-8 right-8 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"
            style={{
              animation: 'expandArrow 1.5s ease forwards',
              transformOrigin: 'left',
              scaleX: 0
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-cyan-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"
              style={{
                animation: 'fadeIn 0.3s ease 1.2s forwards',
                opacity: 0
              }}
            ></div>
          </div>

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {phases.map((phase, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Count - with fade in */}
                <div 
                  className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent mb-2"
                  style={{
                    animation: 'fadeInUp 0.6s ease forwards',
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0
                  }}
                >
                  {phase.count}
                </div>

                {/* Period */}
                <div 
                  className="text-sm font-semibold text-gray-900 mb-1"
                  style={{
                    animation: 'fadeInUp 0.6s ease forwards',
                    animationDelay: `${index * 0.2 + 0.1}s`,
                    opacity: 0
                  }}
                >
                  {phase.period}
                </div>

                {/* Date */}
                <div 
                  className="text-xs text-gray-500 uppercase tracking-wide mb-8"
                  style={{
                    animation: 'fadeInUp 0.6s ease forwards',
                    animationDelay: `${index * 0.2 + 0.15}s`,
                    opacity: 0
                  }}
                >
                  {phase.date}
                </div>

                {/* Person dots visualization */}
                <div className="grid grid-cols-7 gap-1.5 w-40">
                  {Array.from({ length: phase.count }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500"
                      style={{
                        animation: `popIn 0.3s ease forwards`,
                        animationDelay: `${index * 0.2 + 0.3 + i * 0.015}s`,
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

        {/* Thin divider line */}
        <div 
          className="border-t border-gray-200 mb-8"
          style={{
            animation: 'expandWidth 0.8s ease 1.8s forwards',
            transformOrigin: 'left',
            scaleX: 0
          }}
        ></div>

        {/* Stats Grid */}
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
                animation: 'fadeInUp 0.5s ease forwards',
                animationDelay: `${2.0 + index * 0.1}s`,
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
