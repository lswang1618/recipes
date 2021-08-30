import React, {Component} from "react"
import homeStyles from "../components/homeStyles.module.css"
import ImgBackground from "../components/imageBackground"
import "../components/layout.css"
import Img from "gatsby-image";
import largeImage from "../components/largeImage"
import { Link, graphql } from "gatsby";
import get from 'lodash/get'

import logo from "../images/logo.png"


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
            fixed(width: 150) {
                ...GatsbyContentfulFixed_tracedSVG
            }
          }
        }
      }
    }
}`

const RecipePreview = ({recipe}) => {
  return (
      <Link to={`/recipes/${recipe.slug}`} style={{textDecoration: 'none', color: 'black'}} className={homeStyles.thumbnail}>
          <div className={homeStyles.recipePreview}>
              <div>
                  <div style={{position: 'relative'}}>
                    <ImgBackground />
                    <div className={homeStyles.previewImage}>
                        <Img fixed={recipe.recipeImage.fixed} style={{
                            width: '150px', 
                            display: 'inline-block',
                            borderRadius: '10px',
                            position: 'absolute',
                            top: '18px',
                            left: '19px',
                        }}/>
                    </div>
                  </div>
                  <div className={homeStyles.previewText}>
                      <h4>{recipe.recipeName}</h4>
                      <p className={homeStyles.previewSubtitle}>{recipe.recipeDescription}</p>
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
        return(<>
            {/* <Header /> */}
            <div className={homeStyles.wrapper}>
              <div className={homeStyles.image}>
                  <div style={{textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
                    <img src={logo} style={{width: '450px'}}/>
                    <div className={homeStyles.email}>
                      <h3>Subscribe for new recipes!</h3>
                      <div style={{display: 'flex', gap: '10px'}}>
                        <input placeholder="Name"></input>
                        <input placeholder="Email"></input>
                        <button>Subscribe</button>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={homeStyles.thumbnails}>
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
                
                {/* <div className={homeStyles.email}>
                    <h3>Subscribe for new recipes!</h3>
                    <input placeholder="Name"></input>
                    <input placeholder="Email"></input>
                    <button>Subscribe</button>
                </div> */}
            </div>
            </>
        )
    }
}

export default Home;
