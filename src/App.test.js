import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const { instructionsInput } = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})

test('recipe name from state appears in an unordered list', async () => {
  const { instructionsInput, nameInput, submitButton } = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  userEvent.type(instructionsInput, recipeInstructions)
  userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

test('adding additional recipes displays them all in an unordered list', async () => {
  const { instructionsInput, nameInput, submitButton } = setup();

  const recipes = [
    { recipeName: "Lean Pockets", recipeInstructions: "place in toaster oven on 350 for 45 minutes" },
    { recipeName: "Spaghettios", recipeInstructions: "Heat, covered, in microwavable serving bowl on high 1-1/2 to 2 min or until hot" },
    { recipeName: "Pizza Maker", recipeInstructions: "Preheat oven to 425F. Stir together mix from both pouches and 1-1/3 cups very warm water in medium bowl with fork." }
  ]

  for (let recipe of recipes) {
    userEvent.type(instructionsInput, recipe.recipeInstructions)
    userEvent.type(nameInput, recipe.recipeName)
    userEvent.click(submitButton);
    expect(screen.getByText(recipe.recipeName)).toBeInTheDocument();
  }

  expect(screen.getAllByRole('listitem')).toHaveLength(recipes.length)
})