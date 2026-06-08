import React from "react";
import '../styles.css';

function Header() {
    return (
        <div className="header">
            <img className="logo" src="logo.png" alt="Logo"/>
            <h2 className="app-subtitle"> Find Your next Movie Here</h2>
        </div>
    );
}

export default Header;