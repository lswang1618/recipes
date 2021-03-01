import React, {Component} from "react"
import homeStyles from "../components/homeStyles.module.css"
import "../components/layout.css"
import Img from "gatsby-image";
import largeImage from "../components/largeImage"
import { Link, graphql } from "gatsby";
import get from 'lodash/get'

export const query = graphql`
  query {
    food: file(relativePath: { eq: "food.jpg" }) {
      ...largeImage
    }
    allContentfulRecipe(sort: {fields: [postedDate], order: DESC}) {
      edges {
        node { 
          recipeName
          recipeDescription
          slug
          postedDate
          recipeImage {
            fixed(width: 400) {
                ...GatsbyContentfulFixed_tracedSVG
            }
          }
        }
      }
    }
}`

const RecipePreview = ({recipe}) => {
  return (
      <Link to={`/recipes/${recipe.slug}`}>
          <div className={homeStyles.recipePreview}>
              <div>
                  <div className={homeStyles.previewImage}>
                      <Img fixed={recipe.recipeImage.fixed} style={{
                          width: '100%', 
                          display: 'inline-block',
                          borderRadius: '10px',
                          maxHeight: '8rem'
                      }}/>
                  </div>
                  <div className={homeStyles.previewText}>
                      <h4>{recipe.recipeName}</h4>
                      <p className={homeStyles.previewSubtitle}>{recipe.recipeDescription}</p>
                      <p style={{marginBottom: '5px'}}>{recipe.postedDate}</p>
                  </div>
              </div>
          </div>
      </Link>
  )
}

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const recipes = get(this, 'props.data.allContentfulRecipe.edges');
        return(
            <div className={homeStyles.wrapper}>
                <div className={homeStyles.mainContent}>
                    <div className={homeStyles.text}>
                        <h1>Easy, homestyle Chinese recipes</h1>
                    </div>
                </div>
                <div className={homeStyles.mainImage}>
                    <Img fluid={this.props.data.food.childImageSharp.fluid} alt="" style={{display: 'block'}}/>
                </div>
                <div className={homeStyles.email}>
                    <h3>Subscribe for new recipes!</h3>
                    <input placeholder="Name"></input>
                    <input placeholder="Email"></input>
                    <button>Subscribe</button>
                </div>
                <div className={homeStyles.previews}>
                  {recipes.map(({ node }) => {
                    return (
                      <li key={node.slug} style={{marginBottom: 0}}>
                        <RecipePreview recipe={node} />
                      </li>
                    )
                  })}
                </div>
            </div>
        )
    }
}

export default Home;
