import React from 'react';

export default function ImprovedCS2Visuals() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-12">
      
      {/* 1. IMPROVED HUB & SPOKE */}
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2">AI Governance Model</h2>
        <p className="text-gray-600 mb-8">Platform-wide enablement and support</p>
        
        <div className="relative">
          <svg width="100%" height="500" viewBox="0 0 900 500" className="mx-auto">
            {/* Background circles for depth */}
            <circle cx="450" cy="250" r="200" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
            <circle cx="450" cy="250" r="140" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
            
            {/* Connection lines */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
              const rad = (angle * Math.PI) / 180;
              const x = 450 + 200 * Math.cos(rad);
              const y = 250 + 200 * Math.sin(rad);
              return (
                <line
                  key={angle}
                  x1="450"
                  y1="250"
                  x2={x}
                  y2={y}
                  stroke="#14B8A6"
                  strokeWidth="2"
                  opacity="0.3"
                />
              );
            })}
            
            {/* Team nodes */}
            {[
              { angle: 0, label: 'Employee\nWorkflows' },
              { angle: 30, label: 'Customer\nService' },
              { angle: 60, label: 'IT Ops' },
              { angle: 90, label: 'Platform' },
              { angle: 120, label: 'Virtual\nAgent' },
              { angle: 150, label: 'Search' },
              { angle: 180, label: 'Predictive\nIntel' },
              { angle: 210, label: 'Document\nIntel' },
              { angle: 240, label: 'Now Assist' },
              { angle: 270, label: 'Automation' },
              { angle: 300, label: 'Case Mgmt' },
              { angle: 330, label: 'Incident\nMgmt' },
            ].map(({ angle, label }) => {
              const rad = (angle * Math.PI) / 180;
              const x = 450 + 200 * Math.cos(rad);
              const y = 250 + 200 * Math.sin(rad);
              return (
                <g key={angle}>
                  <circle
                    cx={x}
                    cy={y}
                    r="35"
                    fill="white"
                    stroke="#14B8A6"
                    strokeWidth="3"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="25"
                    fill="#F0FDFA"
                  />
                  <text
                    x={x}
                    y={y + 60}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="500"
                  >
                    {label.split('\n').map((line, i) => (
                      <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
            
            {/* Center hub with gradient */}
            <defs>
              <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="450" cy="250" r="100" fill="url(#hubGrad)" filter="url(#glow)"/>
            <text x="450" y="235" textAnchor="middle" fontSize="20" fill="white" fontWeight="700">
              AI Platform
            </text>
            <text x="450" y="255" textAnchor="middle" fontSize="20" fill="white" fontWeight="700">
              Design
            </text>
            <text x="450" y="275" textAnchor="middle" fontSize="16" fill="white" opacity="0.95">
              Governance
            </text>
          </svg>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200 text-center">
            <div className="text-3xl font-bold text-teal-700 mb-1">20+</div>
            <div className="text-sm font-medium text-teal-600">Product Teams</div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200 text-center">
            <div className="text-3xl font-bold text-teal-700 mb-1">500+</div>
            <div className="text-sm font-medium text-teal-600">Designers Supported</div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200 text-center">
            <div className="text-3xl font-bold text-teal-700 mb-1">100%</div>
            <div className="text-sm font-medium text-teal-600">Framework Adoption</div>
          </div>
        </div>
      </div>

      {/* 2. AI DESIGN PRINCIPLES - 4 PILLARS */}
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2">AI Design Principles</h2>
        <p className="text-gray-600 mb-8">Four pillars guiding all AI experience decisions</p>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-teal-400 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mt-1">Human-Centered</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We enable customers to choose where and when they leverage AI by clearly identifying when AI is used.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our messaging and documentation clearly identifies when AI is used.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We provide customers with guidance to leverage and deploy our AI responsibly.
            </p>
          </div>
          
          {/* Pillar 2 */}
          <div className="bg-gradient-to-br from-teal-900 to-teal-950 text-white p-8 rounded-xl border-2 border-teal-800 hover:border-teal-600 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-serif font-semibold mt-1">Inclusive</h3>
            </div>
            <p className="text-white/90 leading-relaxed mb-3">
              We believe in the power of technology to reduce complexity and make the world a more equitable place.
            </p>
            <p className="text-white/90 leading-relaxed mb-3">
              Our AI teams are broadly diverse and test our systems with datasets that reflect the diversity of our customers and users.
            </p>
            <p className="text-white/90 leading-relaxed">
              Used responsibly, we believe AI can improve how humans interact with technology to achieve their goals.
            </p>
          </div>
          
          {/* Pillar 3 */}
          <div className="bg-gradient-to-br from-teal-900 to-teal-950 text-white p-8 rounded-xl border-2 border-teal-800 hover:border-teal-600 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-serif font-semibold mt-1">Transparent</h3>
            </div>
            <p className="text-white/90 leading-relaxed mb-3">
              We communicate with customers about how AI is used to empower choices and inform AI use responsibly.
            </p>
            <p className="text-white/90 leading-relaxed mb-3">
              We help provide information to empower AI choices by providing product documentation and model cards that explain our systems.
            </p>
            <p className="text-white/90 leading-relaxed">
              We work to describe the limits and intended usage of AI in our products and communicate in areas people care about.
            </p>
          </div>
          
          {/* Pillar 4 */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-teal-400 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mt-1">Accountable</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              At ServiceNow, trust is the cornerstone of our AI operations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              We take our responsibilities regarding AI seriously and have implemented an oversight structure for accountability.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team works closely with external experts and the AI community to continually improve our approach, and we have established internal governance bodies to oversee daily operations.
            </p>
          </div>
        </div>
      </div>

      {/* 3. DECISION TREE */}
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2">AI Experience Decision Tree</h2>
        <p className="text-gray-600 mb-8">Framework for choosing the right AI interaction pattern</p>
        
        <div className="bg-gray-50 rounded-xl p-8">
          <svg width="100%" height="600" viewBox="0 0 1000 600" className="mx-auto">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#14B8A6" />
              </marker>
            </defs>
            
            {/* Start */}
            <rect x="350" y="20" width="300" height="60" rx="8" fill="#6366F1" />
            <text x="500" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">
              Start: Evaluate AI Experience
            </text>
            
            {/* Question 1 */}
            <line x1="500" y1="80" x2="500" y2="110" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <rect x="300" y="110" width="400" height="80" rx="8" fill="white" stroke="#14B8A6" strokeWidth="2"/>
            <text x="500" y="140" textAnchor="middle" fontSize="15" fontWeight="600">Is the user's goal specific and known?</text>
            <text x="500" y="165" textAnchor="middle" fontSize="13" fill="#6B7280">(e.g., "Delete this email")</text>
            
            {/* Yes path 1 */}
            <line x1="300" y1="150" x2="150" y2="150" stroke="#14B8A6" strokeWidth="2"/>
            <line x1="150" y1="150" x2="150" y2="220" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="180" y="145" fill="#14B8A6" fontSize="14" fontWeight="600">YES</text>
            <rect x="50" y="220" width="200" height="80" rx="8" fill="#0F766E"/>
            <text x="150" y="250" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Non-Conversational</text>
            <text x="150" y="275" textAnchor="middle" fill="white" fontSize="12">(Direct Manipulation)</text>
            
            {/* No path 1 - to Question 2 */}
            <line x1="500" y1="190" x2="500" y2="240" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="520" y="220" fill="#6B7280" fontSize="14" fontWeight="600">NO</text>
            
            {/* Question 2 */}
            <rect x="300" y="240" width="400" height="80" rx="8" fill="white" stroke="#14B8A6" strokeWidth="2"/>
            <text x="500" y="270" textAnchor="middle" fontSize="15" fontWeight="600">Does task require high precision?</text>
            <text x="500" y="295" textAnchor="middle" fontSize="13" fill="#6B7280">(e.g., Data entry, Photo editing)</text>
            
            {/* Yes path 2 */}
            <line x1="300" y1="280" x2="150" y2="280" stroke="#14B8A6" strokeWidth="2"/>
            <line x1="150" y1="280" x2="150" y2="350" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="180" y="275" fill="#14B8A6" fontSize="14" fontWeight="600">YES</text>
            <rect x="50" y="350" width="200" height="80" rx="8" fill="#0F766E"/>
            <text x="150" y="380" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Non-Conversational</text>
            <text x="150" y="405" textAnchor="middle" fill="white" fontSize="12">(Embedded AI/Predictive)</text>
            
            {/* No path 2 - to Question 3 */}
            <line x1="500" y1="320" x2="500" y2="370" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="520" y="350" fill="#6B7280" fontSize="14" fontWeight="600">NO</text>
            
            {/* Question 3 */}
            <rect x="300" y="370" width="400" height="80" rx="8" fill="white" stroke="#14B8A6" strokeWidth="2"/>
            <text x="500" y="400" textAnchor="middle" fontSize="15" fontWeight="600">Need iterative refinement?</text>
            <text x="500" y="425" textAnchor="middle" fontSize="13" fill="#6B7280">(Multi-step clarification)</text>
            
            {/* Yes path 3 */}
            <line x1="700" y1="410" x2="850" y2="410" stroke="#14B8A6" strokeWidth="2"/>
            <line x1="850" y1="410" x2="850" y2="480" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="760" y="405" fill="#14B8A6" fontSize="14" fontWeight="600">YES</text>
            <rect x="750" y="480" width="200" height="80" rx="8" fill="#06B6D4"/>
            <text x="850" y="510" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Conversational</text>
            <text x="850" y="535" textAnchor="middle" fill="white" fontSize="12">(Chat or Voice)</text>
            
            {/* No path 3 - to Question 4 */}
            <line x1="500" y1="450" x2="500" y2="500" stroke="#14B8A6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="520" y="480" fill="#6B7280" fontSize="14" fontWeight="600">NO</text>
            
            {/* Question 4 */}
            <rect x="350" y="500" width="300" height="60" rx="8" fill="white" stroke="#14B8A6" strokeWidth="2"/>
            <text x="500" y="535" textAnchor="middle" fontSize="15" fontWeight="600">Is action "High Stakes"?</text>
            
            {/* Yes path 4 - Hybrid */}
            <line x1="350" y1="530" x2="250" y2="530" stroke="#14B8A6" strokeWidth="2"/>
            <text x="280" y="525" fill="#14B8A6" fontSize="14" fontWeight="600">YES</text>
            <rect x="550" y="500" width="200" height="60" rx="8" fill="#F59E0B"/>
            <text x="650" y="535" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Hybrid (Chat + Button)</text>
            
            {/* No path 4 - Non-Conv */}
            <text x="320" y="555" fill="#6B7280" fontSize="14" fontWeight="600">NO</text>
            <rect x="150" y="500" width="200" height="60" rx="8" fill="#0F766E"/>
            <text x="250" y="535" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Non-Conversational</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
