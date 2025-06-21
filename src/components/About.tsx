import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am  Passionate and results-driven<span className="font-bold"> Full-Stack Developer</span> with a strong background in crafting intuitive <span className="font-bold"> UIs</span>, integrating secure <span className="font-bold"> Backend APIs </span>, and optimizing performance
        </p>
        <p className="para mt-3">  
          Skilled in cloud-based development with hands-on exposure to <span className="font-bold"> AWS services</span>, <span className="font-bold"> containerization (Docker)</span>, and <span className="font-bold"> MongoDB</span>
        </p>
      </div>
    </div>
  );
};

export default About;
