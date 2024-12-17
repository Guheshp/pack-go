import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} pack&go. All rights reserved.</p>
                <Link
                    to="https://www.linkedin.com/in/guheshp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    <FaLinkedin size={24} className="inline mr-2" />
                    Connect with me on LinkedIn
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
