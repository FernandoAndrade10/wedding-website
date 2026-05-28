import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer className="bg-mauve text-white py-6 px-6 text-sm">
        <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-center items-center gap-x-4 gap-y-2">

          {/* Logo */}
          <div className="text-xl font-serif font-semibold tracking-wide bg-white text-mauve px-4 py-1 rounded">
            <Link to="/">F & B</Link>
          </div>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/__.brxanna"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-peach transition-colors text-sm"
            aria-label="Instagram"
          >
            <FaInstagram className="text-lg" />
            @__.brxanna
          </a>

          {/* Terms and Privacy */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Link to="/privacy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link to="/terms">Terms of Service</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Fernando & Breanna · Built with 💻 & 💖
          </p>
        </div>
      </footer>
    );
  }
  
