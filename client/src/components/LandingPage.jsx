import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function LandingPage() {
    return (
        <div className="landingContainer">
            <h2 className="landingContainer__h2">Henry Foods</h2>
            <Link className="landingContainer__link" to="/home">
                <button className="landingContainer__button">Lets go!!</button>
            </Link>
        </div>
    );
}
