import React from "react";
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div>
            <h2>Bienvenidos</h2>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}

