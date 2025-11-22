import React from 'react';

const IndiaMap: React.FC = () => {
  // Fixed coordinates for dots to ensure they are inside the map and evenly distributed
  // Coordinates are tuned for the viewBox="0 0 650 750"
  const dots = [
    // North (J&K, Ladakh, HP, Punjab, Haryana, Delhi)
    { x: 220, y: 80, delay: 0 }, 
    { x: 250, y: 110, delay: 1.5 }, 
    { x: 200, y: 150, delay: 0.5 },
    { x: 230, y: 190, delay: 2 }, // Near Delhi

    // West (Rajasthan, Gujarat, Maharashtra)
    { x: 150, y: 250, delay: 1 }, 
    { x: 180, y: 300, delay: 2.2 }, 
    { x: 100, y: 350, delay: 0.2 }, // Gujarat
    { x: 160, y: 420, delay: 1.8 }, // Mumbai region
    { x: 200, y: 450, delay: 0.8 }, // Pune region

    // Central (MP, UP, Chhattisgarh)
    { x: 300, y: 280, delay: 1.2 }, // UP
    { x: 280, y: 350, delay: 2.5 }, // MP
    { x: 350, y: 380, delay: 0.5 }, 

    // East (Bihar, WB, Odisha, Northeast)
    { x: 400, y: 280, delay: 1.5 }, // Bihar
    { x: 460, y: 350, delay: 0.3 }, // WB/Kolkata
    { x: 580, y: 260, delay: 2 }, // Northeast
    { x: 420, y: 400, delay: 1.2 }, // Odisha

    // South (Karnataka, Telangana, Andhra, Tamil Nadu, Kerala)
    { x: 280, y: 500, delay: 0.6 }, // Hyderabad
    { x: 240, y: 550, delay: 2.8 }, // Bangalore
    { x: 320, y: 580, delay: 1.5 }, // Chennai
    { x: 260, y: 650, delay: 0.4 }, // TN/Kerala
    { x: 300, y: 620, delay: 2.1 }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-900 select-none">
      {/* Subtle radial gradient background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pointer-events-none" />
      
      <svg
        viewBox="0 0 650 750"
        className="w-full h-full max-h-[85vh] z-10"
        style={{ 
            filter: 'drop-shadow(0px 0px 15px rgba(59, 130, 246, 0.3))', // Soft neon glow
            overflow: 'visible'
        }}
      >
        {/* India Map Silhouette - High Quality Path */}
        <path
          d="M319.5,16.2 L335.2,28.5 L345.6,25.4 L361.8,43.2 L358.5,57.8 L366.8,65.1 L386.5,65.1 L395.4,56.5 L410.4,61.5 L413.8,75.2 L402.5,86.5 L408.5,98.8 L419.4,97.5 L432.1,108.5 L424.4,121.1 L432.1,131.8 L420.1,136.1 L412.8,146.8 L416.8,160.8 L430.4,161.8 L442.4,168.8 L452.4,162.1 L462.8,168.1 L470.8,162.1 L485.4,164.5 L501.1,161.1 L511.1,152.5 L521.1,159.8 L532.4,158.1 L545.8,144.8 L559.4,144.8 L573.8,138.5 L582.8,146.8 L579.8,162.8 L563.8,174.5 L566.8,188.8 L578.8,194.8 L568.4,206.1 L566.8,219.1 L553.4,225.8 L553.4,238.5 L542.1,242.5 L528.8,236.1 L522.4,242.5 L524.8,252.5 L515.4,262.5 L517.1,276.1 L509.8,286.1 L492.8,289.5 L488.4,302.5 L478.4,304.8 L471.8,319.5 L462.8,325.1 L465.4,336.8 L458.1,346.8 L448.4,349.8 L435.8,349.8 L430.4,362.5 L413.8,369.8 L411.4,382.8 L419.4,392.5 L413.8,408.5 L402.5,416.8 L398.8,432.8 L386.5,444.8 L382.8,456.8 L369.4,462.8 L366.8,476.1 L352.1,482.5 L353.8,494.5 L348.4,502.5 L338.8,508.8 L332.1,519.8 L329.5,536.1 L319.5,544.8 L315.8,559.8 L309.8,568.5 L312.4,584.5 L302.5,592.5 L298.8,608.8 L289.4,616.8 L286.1,629.1 L276.8,636.5 L268.8,646.5 L258.4,656.5 L248.4,664.5 L242.4,656.5 L232.4,656.5 L222.4,646.5 L214.4,632.5 L206.4,622.5 L198.4,612.5 L192.4,598.5 L186.4,582.5 L182.4,568.5 L174.4,556.5 L168.4,542.5 L164.4,528.5 L158.4,516.5 L154.4,502.5 L148.4,488.5 L144.4,476.5 L142.4,462.5 L138.4,452.5 L134.4,442.5 L132.4,428.5 L128.4,416.5 L124.4,406.5 L122.4,396.5 L120.4,386.5 L120.4,376.5 L118.4,366.5 L114.4,356.5 L110.4,346.5 L108.4,336.5 L102.4,326.5 L94.4,316.5 L88.4,308.5 L82.4,302.5 L72.4,296.5 L64.4,292.5 L56.4,288.5 L48.4,284.5 L42.4,278.5 L38.4,272.5 L36.4,262.5 L42.4,256.5 L52.4,252.5 L62.4,248.5 L72.4,244.5 L82.4,240.5 L92.4,236.5 L102.4,232.5 L110.4,226.5 L118.4,220.5 L126.4,212.5 L134.4,206.5 L142.4,198.5 L152.4,194.5 L162.4,188.5 L172.4,184.5 L180.4,178.5 L188.4,172.5 L196.4,168.5 L204.4,162.5 L210.4,156.5 L218.4,150.5 L224.4,142.5 L228.4,136.5 L234.4,128.5 L238.4,120.5 L242.4,112.5 L248.4,106.5 L254.4,98.5 L260.4,92.5 L264.4,84.5 L270.4,76.5 L276.4,68.5 L282.4,62.5 L288.4,54.5 L294.4,48.5 L300.4,42.5 L306.4,36.5 L312.4,28.5 L319.5,16.2 Z"
          fill="#1e293b"
          stroke="rgba(51, 65, 85, 0.5)" // slate-700 with opacity
          strokeWidth="1"
          className="transition-colors duration-300"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Pulsing Dots */}
        {dots.map((dot, i) => (
          <g key={i} transform={`translate(${dot.x}, ${dot.y})`}>
             {/* Outer Glow Ring */}
             <circle 
               r="6" 
               className="fill-red-500/40 animate-ping" 
               style={{ animationDuration: '3s', animationDelay: `${dot.delay}s` }}
             />
             {/* Soft Glow Background */}
             <circle 
               r="3" 
               className="fill-red-500/20" 
             />
             {/* Core Dot */}
             <circle 
                r="2" 
                className="fill-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,1)]" 
             />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default IndiaMap;