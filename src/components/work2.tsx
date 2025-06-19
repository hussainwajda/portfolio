import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import tbt from "../assets/theboringteethumb.png"
import SS from "../assets/securesharethumb.png"
import Dealkaaro from "../assets/dealkaarothumb.png"
import shopmore from "../assets/shopmore4uthumb.png"

export interface ProjectItem {
  image: string;
  title: string;
  year: string;
  client: string;
  techStack: string[];
  url?: string;
}

export interface ChromaGridProps {
  items?: ProjectItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setX = useRef<((v: number | string) => void) | null>(null);
  const setY = useRef<((v: number | string) => void) | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ProjectItem[] = [
    {
      image: tbt,
      title: "TheBoringTee",
      year: "Ongoing",
      client: "TheBoringTee Inc",
      techStack: [ "React", "TypeScript", "Node.js", "TailwindCSS"],
      url: "https://theboringtee.com",
    },
    {
      image: SS,
      title: "SecureShare",
      year: "2025",
      client: "College Projects",
      techStack: ["React", "REST API", "TypeScript", "Node.js", "PostgreSQL"],
      url: "https://github.com/hussainwajda/SecureShare",
    },
    {
      image: Dealkaaro,
      title: "DealKaaro",
      year: "2024-25",
      client: "Salute Digital Marketing",
      techStack: ["Next.js", "Node.js", "MongoDB", "Express"],
      url: "https://dealkaaro.com",
    },
    {
      image: shopmore,
      title: "Shopmore4u",
      year: "2024",
      client: "Salute Digital Marketing",
      techStack: ["react", "Node.js", "MongoDB", "Express", "Amazon PAAPI"],
      url: "https://shopmore4u.com",
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  useEffect(() => {
    // Breathing animation for arrows
    arrowRefs.current.forEach((arrow) => {
      if (arrow) {
        gsap.to(arrow, {
          x: 5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-3 md:mx-10 mt-10 md:mt-20 work-section" id="projects">
    <h2 className="text-4xl md:text-6xl font-semibold mb-7 ml-2 md:ml-40"><span className="text-white">My</span> Work</h2>
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
        
      {data.map((project, i) => (
        <article
          key={i}
          onClick={() => handleCardClick(project.url)}
          className="group relative flex flex-col rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-900 to-black hover:border-[#40c4ff] hover:shadow-[0_0_25px_rgba(64,196,255,0.3)]"
        >
          <div className="relative z-10 h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
          </div>
          
          <div className="relative z-10 p-5 flex-1">
            <div className="flex justify-between items-start mb-3">
              <h3 className="m-0 text-xl font-bold text-white">{project.title}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#40c4ff] bg-gray-800 px-2 py-1 rounded">
                  {project.year}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="m-0 text-sm text-gray-400 font-medium">Client: {project.client}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="text-xs text-[#40c4ff] bg-gray-800/50 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Breathing arrow indicator */}
          <div 
            ref={el => arrowRefs.current[i] = el}
            className="absolute bottom-4 right-4 z-20 flex items-center space-x-1 text-[#40c4ff]"
          >
            <span className="text-sm font-medium">View Project</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          
          {/* Hover spotlight effect */}
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(64, 196, 255, 0.15), transparent 70%)",
            }}
          />
        </article>
      ))}

      {/* Grid overlay effect */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: "grayscale(1) brightness(0.85)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.85)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: "grayscale(1) brightness(0.85)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.85)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
</div>
  );
};

export default ChromaGrid;