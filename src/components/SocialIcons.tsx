import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import HoverLinks from "./HoverLinks";
import resume from "../assets/HussainResume.pdf";
import bgMusic from "../assets/bgmusic.mp3"; // Add your music file in assets

const SocialIcons = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handles background animation for icons
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  // Autoplay music when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      audio.play().catch((e) => console.log("Autoplay blocked:", e));
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="icons-section">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={bgMusic} type="audio/mpeg" />
      </audio>

      {/* Social Media Icons */}
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/hussainwajda" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/hussain-wajda-ba9a09265/"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/hussy.jsx/" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>

      {/* Music Mute Button */}
      <button className="Music-button" onClick={toggleMusic}>
        <HoverLinks text={isPlaying ? "Mute" : "Play"} />
        <span>{isPlaying ? <GiSpeaker /> : <GiSpeakerOff />}</span>
      </button>

      {/* Resume Download Button */}
      <a className="resume-button" href={resume} download={true}>
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
