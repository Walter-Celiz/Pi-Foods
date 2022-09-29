import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

import "../styles/CreateRecipe.css";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Your recipe needs a Name";
    } else if (input.summary.length > 255) {
        errors.summary = "Please tell us what is your recipe about";
    } else if (input.healthScore > 100 || input.healthScore < 0) {
        errors.healthScore = "The health score must be a number between 0 and 100";
    } else if (!input.image) {
        errors.image = "It would be nice if you show us how it looks";
    } else if (!input.steps) {
        errors.steps = "Don't you wanna tell us how to do it ourselves?";
    }
    return errors;
}

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        //state, setstate
        name: "",
        summary: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate(input));
    }

    function handleCheck(e) {
        console.log(input);
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postRecipe(input));
        alert("recipe created");
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            image: "",
            steps: "",
            diets: [],
        });
        history.push("/home"); //hook to redirect
    }

    useEffect(() => {
        dispatch(getDiets());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="createMain">
            <Navbar />

            <div className="createContainer">
                <div className="create">
                    <h3 className="create__h3">Create your own recipe!</h3>

                    <form onSubmit={(e) => handleSubmit(e)} className="create__form">
                        <div className="create__divName">
                            <label className="create__divName__label create__divName__label-margin">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={(e) => handleChange(e)}
                                className="create__form__input"
                            />
                            {errors.name && <h5 className="create__error">{errors.name}</h5>}
                        </div>

                        <div className="create__divHealthScore">
                            <label className="create__divName__label create__divHealScore__label-margin">
                                healthScore:
                            </label>
                            <input
                                type="number"
                                name="healthScore"
                                value={input.healthScore}
                                onChange={(e) => handleChange(e)}
                                className="create__form__input"
                            />
                            {errors.healthScore && (
                                <h5 className="create__error">{errors.healthScore}</h5>
                            )}
                        </div>

                        <div className="create__divImage">
                            <label className="create__divName__label create__divImage__label-margin">
                                Image:
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={input.image}
                                onChange={(e) => handleChange(e)}
                                className="create__form__input"
                            />
                            {errors.image && <h5 className="create__error">{errors.image}</h5>}
                        </div>

                        <div className="create__divSummary">
                            <label className="create__divName__label create__divSummary__label-margin">
                                Summary:
                            </label>
                            <input
                                type="text"
                                name="summary"
                                value={input.summary}
                                onChange={(e) => handleChange(e)}
                                className="create__form__input"
                            />
                            {errors.summary && <h5 className="create__error">{errors.summary}</h5>}
                        </div>

                        <div className="create__divSteps">
                            <label className="create__divName__label create__divSteps__label-margin">
                                Step by step:
                            </label>
                            <input
                                type="text"
                                name="steps"
                                value={input.steps}
                                onChange={(e) => handleChange(e)}
                                className="create__form__input"
                            />
                            {errors.steps && <h5 className="create__error">{errors.steps}</h5>}
                        </div>

                        <div className="create__divDiets">
                            <h3 className="create__divDiets__h3">
                                Select which diet it belongs to
                            </h3>
                            {diets.map((diet) => {
                                return (
                                    <span key={`${diet.id}`} className="create__divDiets__span">
                                        <input
                                            type="checkbox"
                                            value={`${diet.id}`}
                                            name={`${diet.name}`}
                                            onChange={(e) => handleCheck(e)}
                                            className="create__divDiets__input"
                                        />
                                        {`${diet.name} `}
                                    </span>
                                );
                            })}
                        </div>

                        <div>
                            <button type="submit" className="create__button">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
