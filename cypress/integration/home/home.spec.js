describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", () => {
        cy.findByRole('heading').should('contain', 'My Recipes')
        cy.get('p')
            .findByText('There are no recipes to list.')
            .should('exist')
    })

    it("contains an add recipe button that when clicked opens a form", () => {
        cy.findByRole('button').click();

        cy.get('form')
            .findByRole('button')
            .should('exist')
    })

    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        cy.findByRole('button').click();
        expect(cy.findByRole('textbox', { name: /Recipe name/i })).toExist()
        cy.findByRole('textbox', { name: /instructions/i }).should('exist')
    })

    it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
        const recipeName = 'Tofu Scramble Tacos';
        cy.findByRole('button').click()
        cy.findByRole('textbox', { name: /Recipe name/i }).type(recipeName)
        cy.findByRole('textbox', { name: /instructions/i }).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")

        cy.findByRole('button').click()

        cy.findByRole('listitem', /tofu scramble tacos/i).should('exist')
    })

    it("displays a recipe names for all added recipes", () => {

        cy.findByRole('button').click()

        const recipes = [
            { recipeName: "Lean Pockets", recipeInstructions: "place in toaster oven on 350 for 45 minutes" },
            { recipeName: "Spaghettios", recipeInstructions: "Heat, covered, in microwavable serving bowl on high 1-1/2 to 2 min or until hot" },
            { recipeName: "Pizza Maker", recipeInstructions: "Preheat oven to 425F. Stir together mix from both pouches and 1-1/3 cups very warm water in medium bowl with fork." }
        ]

        for (let recipe of recipes) {
            cy.findByRole('textbox', { name: /Recipe name/i }).type(recipe.recipeName)
            cy.findByRole('textbox', { name: /instructions/i }).type(recipe.recipeInstructions)

            cy.findByRole('button').click()

            cy.findByText(recipe.recipeName).should('exist')

        }

        cy.findAllByRole('listitem').should('have.length', recipes.length)
                })
        }

        cy.findAllByRole('listitem').then((arr) => expect(arr).toHaveLength(recipes.length))
    })
})