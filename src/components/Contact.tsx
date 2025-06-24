import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4 className="text-[#6e7d85]">Email</h4>
            <p>
              <a href="mailto:hussainwajda786@gmail.com" data-cursor="disable">
                hussainwajda786@gmail.com
              </a>
            </p>
            <h4 className="text-[#6e7d85]">Location</h4>
            <p>
              <a href="#" data-cursor="disable">
                Pimpri Chinchwad, Pune
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4 className="text-[#6e7d85]">Social</h4>
            <a
              href="https://github.com/hussainwajda"
              target="_blank"
              data-cursor="disable"
              className="contact-social flex flex-row"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/hussain-wajda-ba9a09265/"
              target="_blank"
              data-cursor="disable"
              className="contact-social flex flex-row"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/hussy.jsx/"
              target="_blank"
              data-cursor="disable"
              className="contact-social flex flex-row"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2 className="!tracking-wider">
              Designed and Developed <br /> by <span> Hussain Wajdawala </span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
