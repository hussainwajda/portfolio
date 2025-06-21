import type React from "react"
import { useState } from "react"
import Magnet from "./magnet"
import { Database, Server, Settings, Globe } from "lucide-react"
import { Divider } from "./divider"

interface TechItem {
  name: string
  icon: string
  color: string
}

interface TechCategory {
  id: string
  name: string
  icon: React.ReactNode
  items: TechItem[]
}

const techCategories: TechCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Globe className="w-5 h-5" />,
    items: [
      { name: "React", icon: "/images/Frontend/react.svg", color: "#61DAFB" },
      { name: "Next.js", icon: "/images/Frontend/next.svg", color: "#000000" },
      { name: "TypeScript", icon: "/images/Frontend/ts.svg", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "/images/Frontend/tailwind.svg", color: "#06B6D4" },
      { name: "Angular", icon: "/images/Frontend/angular.svg", color: "#DD0031" },
      { name: "Vite", icon: "/images/Frontend/vite.svg", color: "#646CFF" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="w-5 h-5" />,
    items: [
      { name: "Node.js", icon: "/images/Backend/node.svg", color: "#339933" },
      { name: "Python", icon: "/images/Backend/python.svg", color: "#3776AB" },
      { name: "Express", icon: "/images/Backend/express.svg", color: "#000000" },
      { name: "REST API", icon: "/images/Backend/restapi.svg", color: "#009688" },
      { name: "Django", icon: "/images/Backend/django.svg", color: "#092E20" },
      { name: "PHP", icon: "/images/Backend/php.svg", color: "#6DB33F" },
      { name: "Web Socket", icon: "/images/Backend/socket.svg", color: "#E10098" },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: <Settings className="w-5 h-5" />,
    items: [
      { name: "Docker", icon: "/images/DevOps/docker.svg", color: "#2496ED" },
      { name: "Kubernetes", icon: "/images/DevOps/kubernetes.svg", color: "#326CE5" },
      { name: "AWS", icon: "/images/DevOps/aws.svg", color: "#FF9900" },
      { name: "Vercel", icon: "/images/DevOps/vercel.svg", color: "#000000" },
      { name: "GitHub Actions", icon: "/images/DevOps/github.svg", color: "#2088FF" },
      { name: "Caddy", icon: "/images/DevOps/caddy.svg", color: "#D33833" },
      { name: "Nginx", icon: "/images/DevOps/nginx.svg", color: "#009639" },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: "MongoDB", icon: "/images/Database/mongo.svg", color: "#47A248" },
      { name: "MySQL", icon: "/images/Database/mysql.svg", color: "#4479A1" },
      { name: "PostgreSQL", icon: "/images/Database/postgres.svg", color: "#336791" },
      { name: "Firestore", icon: "/images/Database/firestore.svg", color: "#FFCA28" },
    ],
  },
]

const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState("frontend")

  const activeCategory = techCategories.find((cat) => cat.id === activeTab)

  return (
  <>
    <Divider />  
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
          Tech <span className="text-[#40c4ff]">Stack</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore my technical expertise across different domains. Each technology represents a tool in my development
          arsenal.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {techCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
              ${
                activeTab === category.id
                  ? "bg-[#40c4ff] text-black shadow-lg shadow-[#40c4ff]/25"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }
            `}
          >
            {category.icon}
            <span className="hidden sm:inline">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {activeCategory?.items.map((tech, index) => (
          <Magnet key={tech.name} magnetStrength={3} padding={50} className="w-full">
            <div
              className="
                group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 
                rounded-2xl p-4 md:p-6 text-center transition-all duration-300 
                hover:border-[#40c4ff]/50 hover:shadow-lg hover:shadow-[#40c4ff]/20
                hover:bg-gray-800/50 cursor-pointer h-full
              "
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#40c4ff]/0 via-[#40c4ff]/5 to-[#40c4ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img src={tech.icon} alt={tech.name} className="w-12 h-12 md:w-16 md:h-16" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-[#40c4ff] transition-colors duration-300">
                  {tech.name}
                </h3>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#40c4ff]/20 to-transparent animate-pulse" />
              </div>
            </div>
          </Magnet>
        ))}
      </div>

      {/* Category Info */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700">
          {activeCategory?.icon}
          <span className="text-gray-300">
            {activeCategory?.items.length} {activeCategory?.name} Technologies
          </span>
        </div>
      </div>
    </div>
  </>
  )
}

export default TechStack
