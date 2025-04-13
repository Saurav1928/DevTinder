import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer footer-center bg-gray-900 text-white p-4 left-0 w-full z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-6 mb-2">
          <Link
            to="/privacy-policy"
            className="hover:text-blue-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">
            Contact Us
          </Link>
        </div>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Saurav
          Farkade
        </p>
      </div>
    </footer>
  )
}

export default Footer