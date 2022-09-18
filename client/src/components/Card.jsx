import React from "react";

export default function Card({ name, healthScore, image, diets }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{healthScore}</p>
            <img src={image} alt={name} width="200px" height="250px" />
            <p>{diets}</p>
        </div>
    )
}