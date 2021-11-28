import React, {Component} from "react"
import homeStyles from "../components/homeStyles.module.css"
import ImgBackground from "../components/imageBackground"
import "../components/layout.css"
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";
import get from 'lodash/get'

import logo2 from "../images/logo2.png"
import profile from "../images/profile.jpg"

export const query = graphql`
  query {
    allContentfulRecipe(sort: {fields: [postedDate], order: DESC}) {
      edges {
        node { 
          recipeName
          chineseName
          recipeDescription
          slug
          postedDate
          recipeImage {
            fixed(width: 300) {
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
                  <div style={{position: 'relative', margin: '0 auto', width: 'max-content'}}>
                    <ImgBackground width={190} color="#C589E8"/>
                    <div className={homeStyles.previewImage}>
                        <Img fixed={recipe.recipeImage.fixed} style={{
                            width: '150px', 
                            height: '150px',
                            display: 'inline-block',
                            borderRadius: '10px',
                            position: 'absolute',
                            top: '18px',
                            left: '19px',
                        }}/>
                    </div>
                  </div>
                  <div className={homeStyles.previewText}>
                      <h4 style={{marginBottom: '5px'}}>{recipe.recipeName}</h4>
                      <h4 style={{marginTop: '5px'}}>{recipe.chineseName}</h4>
                      <p className={homeStyles.previewSubtitle}>{recipe.recipeDescription}</p>
                  </div>
              </div>
          </div>
      </Link>
  )
}

const favorites = {
  lily: [0, 1, 2, 3, 4],
  larry: [2, 4, 5, 6, 7],
  lisa: [3, 4, 5, 6, 7],
  shang: [9, 8, 7, 6, 5]
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
          width: '0px',
          topFive: 'lily'
        }
    }

    componentDidMount() {
      this.setState({
        width: Math.min(450, window.innerWidth > 757 ? (window.innerWidth - 504) * 0.6 : window.innerWidth * 0.7)
      })
    }

    render() {
        const recipes = get(this, 'props.data.allContentfulRecipe.edges');
        const main = Math.floor(Math.random() * recipes.length);
        const mainRecipe = recipes[main].node;

        const { width, topFive } = this.state;

        return(<div>
            {/* <Header /> */}
              <div className={homeStyles.wrapper}>
                <div className={homeStyles.mainDish}>
                  <div>
                    <img src={logo2} style={{width: '75px', marginTop: '10px', marginLeft: '10px'}}/>
                  </div>
                  <Link to={`/recipes/${mainRecipe.slug}`} className={homeStyles.mainThumbnail}>
                      <div style={{width: `${width}px`, margin: '0 auto'}}>
                          <div style={{position: 'relative'}}>
                              <div style={{position: 'relative', width: `${width}px`}}>
                                <ImgBackground width={width} color="#FCFE00"/>
                                <div className={homeStyles.previewImage}>
                                    <Img fixed={mainRecipe.recipeImage.fixed} style={{
                                        width: `${width * 0.8}px`,
                                        height: `${width * 0.8}px`, 
                                        display: 'inline-block',
                                        borderRadius: '10px',
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translateX(-50%) translateY(-50%)'
                                    }}/>
                                </div>
                              </div>
                              <svg className={homeStyles.title} x="0px" y="0px" width={`${width * 1.3}px`} height={`${width * 1.3}px`} style={{ left: `${width * -0.15}px`, top: `${width * -0.15}px`}} viewBox="0 0 350 350" enable-background="new 0 0 350 350" xmlSpace="preserve">
                                <defs>
                                    <path id="circlePath" d="M 175, 175 m -150, 0 a 150,150 0 0,1 300,0 a 150,150 0 0,1 -300,0 "/>
                                </defs>
                                <circle cx="175" cy="175" r="150" fill="none"/>
                                <g>
                                    <use xlinkHref="#circlePath" fill="none"/>
                                    <text fill="#000" style={{fontFamily: "SFPro"}}>
                                        <textPath xlinkHref="#circlePath">tasty Chinese cooking 😋</textPath>
                                    </text>
                                </g>
                            </svg>
                          </div>
                      </div>
                  </Link>
                </div>
                <div className={homeStyles.thumbnails}>
                  <div className={homeStyles.previews}>
                      {recipes.map(({ node }, i) => {
                        if (i === main) { return <></> }
                        return (
                          <li key={node.slug} style={{marginBottom: 0}}>
                            <RecipePreview recipe={node} />
                          </li>
                        )
                      })}
                    </div>
                </div>
              </div>
              <div className={homeStyles.banner}>
                  <div className={homeStyles.bannerTrack}>
                      welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 · huān yíng · welcome · 欢迎 
                  </div>
              </div>
              <div style={{backgroundColor: "#fb5607"}}>
                <div className={homeStyles.bio}>
                  <div style={{position: 'relative', margin: '2rem 0 0', height: 'max-content'}}>
                    <div className={homeStyles.bioImageBackground}></div>
                    <img className={homeStyles.bioImage} src={profile} />
                  </div>
                  <div style={{color: "white"}}>
                    <h1>Welcome! 👋🏻</h1>
                    <h3>I'm Lily (刘艳竹)</h3>
                    <p>Selecting nutritious foods to create delicious dishes is a long tradition in my family. Both my grandma and my mom passed down recipes and techniques for picking fresh foods and combining them in old and new ways to make tasty dishes.</p>
                      
                    <p>As a family project, we're sharing these recipes through this website. I hope we can help you create a space to explore the fun and creativity of cooking Chinese dishes.</p>
                  </div>
                </div>
              </div>
              <div style={{backgroundColor: "#f7f7f7", width: '90%', maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px', paddingRight: '20px'}}>
                <div style={{position: 'relative'}}>
                  <div className={homeStyles.carouselBackground}></div>
                  <div className={homeStyles.topFive}>
                    <div className={homeStyles.carouselWave}>
                      Shann's Too Five Helloooo
                    </div>
                    <div className={homeStyles.carouselTitle}>
                      <select onChange={(e) => this.setState({topFive: e.target.value})}>
                        <option value="lily">Lily 👩🏻‍🍳</option>
                        <option value="larry">Larry 👨🏻‍💼</option>
                        <option value="lisa">Lisa 👩🏻‍💻</option>
                        <option value="shang">Shang 👨🏻‍🎨</option>
                      </select>'s Top Five 👑
                    </div>
                    
                    <div style={{overflow: 'scroll', marginTop: '20px'}}>
                      <div className={homeStyles.carousel}>
                        {favorites[topFive].map((val, i) => (<div>
                          <Link to={`/recipes/${recipes[val].node.slug}`} style={{textDecoration: 'none', color: 'black', width: '264px'}} className={homeStyles.thumbnail}>
                              <div className={homeStyles.recipePreview} style={{width: '180px'}}>
                                  <div>
                                      <div style={{position: 'relative', margin: '0 auto', width: 'max-content'}}>
                                        <ImgBackground width={150} color="#C589E8"/>
                                        <div className={homeStyles.previewImage}>
                                            <Img fixed={recipes[val].node.recipeImage.fixed} style={{
                                                width: '110px', 
                                                height: '110px',
                                                display: 'inline-block',
                                                borderRadius: '10px',
                                                position: 'absolute',
                                                top: '18px',
                                                left: '19px',
                                            }}/>
                                        </div>
                                      </div>
                                      <div style={{display: 'grid', gridAutoFlow: 'column', gap: '5px', marginTop: '10px', width: 'max-content', maxWidth: '180px', alignItems: 'center'}}>
                                        <div style={{backgroundColor: "#C589E8", borderRadius: '20px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "white", alignSelf: 'baseline'}}>
                                          {i+1}
                                        </div>
                                        {recipes[val].node.recipeName}
                                      </div>
                                  </div>
                              </div>
                          </Link>
                        </div>))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Home;
