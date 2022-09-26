import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <div>
                </div>
                <div>
                    <Link className="navbar__link" to="/home">
                        Home
                    </Link>
                </div>
                <div>
                    <Link className="navbar__link" to="/recipes/create">
                        Create / Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}
