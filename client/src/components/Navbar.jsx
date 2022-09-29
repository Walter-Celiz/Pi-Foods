import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <div className="navbar__div">
                    <Link className="navbar__link" to="/home">
                        Home
                    </Link>
                </div>
                <div className="navbar__div">
                    <Link className="navbar__link" to="/recipes/create">
                        Create
                    </Link>
                </div>
            </div>
        </div>
    );
}
