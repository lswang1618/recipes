const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
      const recipeTemplate = path.resolve(`src/components/recipeTemplate.js`)
      resolve(
        graphql(`
          {
            allContentfulRecipe {
              edges {
                node {
                  recipeName
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          throw result.errors
        }
    
        // Create  post pages.
        const recipes = result.data.allContentfulRecipe.edges
        recipes.forEach(recipe => {
          createPage({
            // Path for this page — required
            path: `/recipes/${recipe.node.slug}/`,
            component: recipeTemplate,
            context: {
              slug: recipe.node.slug,
            },
          })
        })
      })
      )
    })
  }