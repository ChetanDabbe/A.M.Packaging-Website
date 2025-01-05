import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../styles/frame7.css";

function Frame7() {
  return (
    <>
      <div className="frame7_container">
        <h2 className="frame7_title">Get In Touch</h2>
        <div className="divide_cont">
          <div className="contact_cont">
            <div className="cont1">
              <h3>Contact Information</h3>
              <p style={{ marginBottom: "-0.1rem", marginRight: "1.4rem"}}>
                <FaMapMarkerAlt size={20} style={{ marginRight: "0.5rem"}} />
                Shimpi Lane Area, Sinnar, Nashik, Maharashtra
              </p>
              <p style={{ marginBottom: "-0.1rem" }}>
                <FaPhoneAlt size={20} style={{ marginRight: "0.5rem" }} />
                +91 08048988219
              </p>
              <p>
                <FaEnvelope size={20} style={{ marginRight: "0.5rem" }} />
                info@ampackaging.com
              </p>
            </div>

            <div className="cont2">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="mail_send">
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Your Message" />
            <button type="submit">Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Frame7;
