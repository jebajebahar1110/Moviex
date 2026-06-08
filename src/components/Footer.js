import React from "react";
import '../styles.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <p className="footer-text"> {currentYear} © MovieDucks all rights reserved</p>
        </div>
    );
}

export default Footer;