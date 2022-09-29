import React from "react";
import "../styles/Paginate.css"

export default function Paginate({ recipesPerPage, allRecipes, paginated }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        //round all characters / number of characters per page
        pageNumbers.push(i);
    }

    return (
        <div className="paginateContainer">
            <ul className="paginate__ul">
                {pageNumbers.map((number) => {
                    return (
                        <li
                            key={number}
                            onClick={() => paginated(number)}
                            id={number}
                            className="paginate__li"
                        >
                            <span>{number}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
