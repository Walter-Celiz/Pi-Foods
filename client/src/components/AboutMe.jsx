import React from "react";
import { Link } from "react-router-dom";

export default function AboutMe() {
    return (
        <div>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <p>About Me</p>
        </div>
    );
}
