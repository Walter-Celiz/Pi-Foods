import React from "react";

export default function Card({ name, healthScore, image, diets }) {
    return (
        <div>
            <p>{healthScore}</p>
            <img src={image} alt={name} width="200px" height="250px" />
            <h3>{name}</h3>
            <p>{diets}</p>
        </div>
    )
}