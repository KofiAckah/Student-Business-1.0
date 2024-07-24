import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="gradient w-full h-full">
      <div className="grid-cols-2">
        <div>
          <p>Categories</p>
          <ul>
            <li>
              <Link to="/clothes">Clothes</Link>
            </li>
            <li>
              <Link to="/electronics">Electronics</Link>
            </li>
            <li>
              <Link to="/food">Food</Link>
            </li>
            <li>
              <Link to="/home-appliances">Home Appliances</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/software">Software</Link>
            </li>
            <li>
              <Link to="/student-needs">Student Needs</Link>
            </li>
            <li>
              <Link to="/others">Others</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Company</p>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
          <p>Social</p>
          <ul>
            <li>
              <a href="https://www.facebook.com/">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
