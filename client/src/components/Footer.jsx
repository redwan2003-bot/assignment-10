import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-base-200 dark:bg-gray-900 text-base-content pt-10">
            <div className="footer p-6 md:p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">MovieMaster Pro</h2>
                    <p className="font-medium text-sm md:text-base">
                        Your ultimate destination for movie management.<br />
                        Organize, discover, and enjoy your collection.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <Link to="/" className="link link-hover">About us</Link>
                    <Link to="/" className="link link-hover">Contact</Link>
                    <Link to="/" className="link link-hover">Jobs</Link>
                    <Link to="/" className="link link-hover">Press kit</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </div>
            <div className="footer px-4 md:px-10 py-4 border-t bg-base-200 text-base-content border-base-300 dark:bg-gray-900 dark:border-gray-700 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <aside className="text-center md:text-left">
                    <p className="text-xs md:text-sm">Copyright © 2024 - All rights reserved by MovieMaster Pro</p>
                </aside>
                <nav className="flex justify-center">
                    <div className="grid grid-flow-col gap-4 text-2xl">
                        <a href="#" className="hover:text-primary transition-colors"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaYoutube /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaFacebook /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaInstagram /></a>
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
