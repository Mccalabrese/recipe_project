import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeForm = ({ recipeId, onSubmitSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState([{ step_number: 1, instruction: ''}]);

    const isEdit = !!recipeId;

    useEffect(() => {
        if (isEdit) {
            axios.get(`/api/recipes/${recipeId}/`)
                .then(response => {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setSteps(response.data.steps.length > 0 ? response.data.steps : [{ step_number: 1, instruction: ''}]);
                })
                .catch(error => {
                    console.error("There was an error fetching the recipe!", error);
                });
        }
    }, [recipeId]);

    const handleStepChange = (index, event) => {
        const newSteps = steps.map((step, stepIndex) => {
            if (index !== stepIndex) return step;
            return { ...step, instruction: event.target.value };
        });
        setSteps(newSteps);
    }

    const handleAddStep = () => {
        setSteps([...steps, { step_number: steps.length + 1, instruction: ''}]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipeData = { title, description, steps };

        if (isEdit) {
            axios.put(`/api/recipes/${recipeId}/`, recipeData)
                .then(response => {
                    onSubmitSuccess();
                })
                .catch(error => {
                    console.error("There was an error updating the recipe!", error);
                });
        } else {
            axios.post('/api/recipes/', recipeData)
                .then(response => {
                    onSubmitSuccess();
                })
                .catch(error => {
                    console.error("There was an error creating the recipe!", error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Steps:</label>
                {steps.map((step, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder={'Step ${index + 1}'}
                            value={step.instruction}
                            onChange={(e) => handleStepChange(index, e)}
                            required
                        />
                    </div>
                ))}
            </div>
            <button type="submit">{isEdit ? 'Update' : 'Create'} Recipe</button>
        </form>
    );
};

export default RecipeForm;