import React from "react";
import { Link } from "react-router-dom"
import "../styles/Card.css"

export default function Card({ id, name, healthScore, image, diets }) {
    return (
        <div className="card__container">
            <div className="card">
                <p className="card__p">Health Score: {healthScore}</p>
                <div>
                    <Link to={`/recipes/${id}`}>
                        <img src={image} alt={name} className="card__img" />
                    </Link>
                </div>
                <h3 className="card__h3">{name}</h3>
                <p className="card__p2">{diets}</p>
            </div>
        </div>
    );
}

