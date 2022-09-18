import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginated }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) { //redondea todos los personajes / cantidad de personajes por pagina
        pageNumbers.push(i)
    }
    return (
        <ul>
            {
                pageNumbers.map(number => {
                    return <li key={number} onClick={() => paginated(number)} id={number}>
                        <span style={{ cursor: 'pointer' }}>{number}</span>
                    </li>
                })
            }
        </ul>
    )
}