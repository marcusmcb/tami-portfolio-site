import React from 'react';

export default function HubSpokeGovernance() {
  const teams = [
    'Employee Workflows',
    'Customer Service',
    'IT Operations',
    'Platform Services',
    'Virtual Agent',
    'Search & Knowledge',
    'Predictive Intelligence',
    'Document Intelligence',
    'Now Assist',
    'Automation Engine',
    'Case Management',
    'Incident Management',
    'Change Management',
    'Asset Management',
    'Service Portal',
    'Mobile Experience',
    'Integration Hub',
    'App Engine',
    'Creator Workflows',
    'Performance Analytics'
  ];

  const radius = 280;
  const centerX = 400;
  const centerY = 350;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-5xl w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">AI Governance Model</h2>
          <p className="text-gray-600">Platform-wide enablement across 20+ product teams</p>
        </div>

        <svg width="800" height="700" viewBox="0 0 800 700" className="mx-auto">
          {/* Connecting lines from center to teams */}
          {teams.map((team, i) => {
            const angle = (i / teams.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            return (
              <line
                key={`line-${i}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="#14B8A6"
                strokeWidth="2"
                opacity="0.2"
              />
            );
          })}

          {/* Team circles */}
          {teams.map((team, i) => {
            const angle = (i / teams.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            return (
              <g key={`team-${i}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="32"
                  fill="#F0FDFA"
                  stroke="#14B8A6"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y + 50}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#374151"
                  className="font-medium"
                  style={{ maxWidth: '80px' }}
                >
                  {team.split(' ').map((word, wi) => (
                    <tspan key={wi} x={x} dy={wi === 0 ? 0 : 12}>
                      {word}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* Center hub */}
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r="90"
              fill="url(#gradient)"
              filter="url(#shadow)"
            />
            <text
              x={centerX}
              y={centerY - 10}
              textAnchor="middle"
              fontSize="16"
              fill="white"
              fontWeight="600"
            >
              AI Platform
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              fontSize="16"
              fill="white"
              fontWeight="600"
            >
              Design
            </text>
            <text
              x={centerX}
              y={centerY + 30}
              textAnchor="middle"
              fontSize="13"
              fill="white"
              opacity="0.9"
            >
              Governance
            </text>
          </g>

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
            </filter>
          </defs>
        </svg>

        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <div className="font-semibold text-teal-900 mb-1">Center Hub</div>
            <div className="text-teal-700">Principles, frameworks, governance</div>
          </div>
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
            <div className="font-semibold text-cyan-900 mb-1">20+ Teams</div>
            <div className="text-cyan-700">Adopting unified AI standards</div>
          </div>
        </div>
      </div>
    </div>
  );
}
