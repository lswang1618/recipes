import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import SEO from "./seo"
import recipeStyles from "./recipe.module.css"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Lightbox from "./lightbox"
import 'remixicon/fonts/remixicon.css'

var script;
var refs = [];
const richTextOptions = {
    renderMark: {
      [MARKS.CODE]: text => {
        var extractscript=/<script>(.+)<\/script>/gi.exec(text);
        if (extractscript) {
          var x = text.replace(extractscript[0],"");
          script = extractscript[1];
          return <div dangerouslySetInnerHTML={{__html: `${x}`}} ></div>
        } else {
          return <div dangerouslySetInnerHTML={{__html: `${text}`}}></div>
        }

      }
    },
    renderNode: {
        [BLOCKS.LIST_ITEM]: (node, children) => {
          for (var k=0; k<node.content.length; k++) {
            if (node.content[k].nodeType === "embedded-asset-block") {
              const newRef = React.createRef();
              refs.push(newRef);
              return <li ref={newRef}>
                <div>{children}</div>
              </li>
            } 
          }
          return <li><div>{children}</div></li>
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            if (node.data.target.fields) {
                const { title, description, file } = node.data.target.fields;
                const mimeType = file['en-US'].contentType
                const mimeGroup = mimeType.split('/')[0]
    
                switch (mimeGroup) {
                    case 'image':
                      return <Lightbox fields = {node.data.target.fields} type="image"/>
                    case 'video':
                      return <Lightbox fields = {node.data.target.fields} type="video"/>
                    case 'application':
                        return <a
                            alt={description ?  description['en-US'] : null}
                            href={file['en-US'].url}
                            target="_blank"
                            >{ title ? title['en-US'] : file['en-US'].details.fileName }
                        </a>
                    default:
                        return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
                }
            }
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            const fields = node.data.target.fields;
            switch (node.data.target.sys.contentType.sys.id) {
                case 'blockquote':
                    return <div>{fields.quoteText['en-US']}</div>
                default:
                    return <div></div>
  
            }
        },
    }
}

class RecipeTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileSelected: 0,
      mobile: false
    }

    this.recipeSteps = React.createRef();
    this.ingredients = [];

    this.mobileHeaderRef = React.createRef();
    this.mainRef = React.createRef();
    this.ingredientsRef = React.createRef();
    this.stepWrapperRef = React.createRef();
  }

  componentDidMount() {
    window.eval(script);

    if (window.innerWidth <= 600) {
      this.setState({ 
        mobile: true,
        oldPos: "x",
        startingPos: this.mobileHeaderRef.current.getBoundingClientRect().bottom - this.mobileHeaderRef.current.getBoundingClientRect().height,
      })
    }

    // if (window.innerWidth <= 600) {
    //   this.observer = new IntersectionObserver( 
    //     ([e]) => {
    //       if (e.intersectionRatio < 1 && this.mainRef.current) {
    //         this.mainRef.current.style.height = "100vh";
    //         this.ingredientsRef.current.style.overflow = "scroll";
    //         this.stepWrapperRef.current.style.overflow = "scroll";
    //       } else if (this.mainRef.current) {
    //           this.ingredientsRef.current.scrollTo(0, 0);
  
    //           this.mainRef.current.style.height = "";
    //           this.ingredientsRef.current.style.overflow = "hidden";
    //           this.stepWrapperRef.current.style.overflow = "hidden";
    //       }
    //     },
    //     { threshold: [1] }
    //   );

    //   this.observer.observe(this.mobileHeaderRef.current)
    // }
    
  }

  renderIngredients(list) {
    var ingredients = [];
    for (var j=0; j<list.length; j++) {
      const ingredient = list[j];
      const imgName = "/" + ingredient.ingredient.replace(/ /g, '-').toLowerCase() + ".jpg";
      ingredients.push(
        <div key={j} className={recipeStyles.ingredient}>
          <div className={recipeStyles.ingredientImg}>
            <img src={imgName}></img>
          </div>
          <p>{ingredient.number + " " + ingredient.unit + " " + ingredient.ingredient}</p>
        </div>
      )
    }
    this.ingredients = ingredients;
  }

  updateTab(newTab) {
    if (newTab === this.state.mobileSelected) { return }

    var userAgent = window.navigator.userAgent;
    var offset = 0;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      offset = this.mobileHeaderRef.current.getBoundingClientRect().height;
    }

    console.log(userAgent)

    var oldPos = 0;

    if (newTab === 0) {
      oldPos = this.stepWrapperRef.current.getBoundingClientRect().top - offset;
    } else if (newTab === 1) {
      oldPos = this.ingredientsRef.current.getBoundingClientRect().top - offset;
    }

    this.setState({mobileSelected: newTab}, () => {
      if (this.state.oldPos === "x" && oldPos <= 0) {
        window.scrollTo(0, this.state.startingPos + offset);

        this.setState({ oldPos: this.state.startingPos - oldPos + this.mobileHeaderRef.current.getBoundingClientRect().height});
      } else if (this.state.oldPos !== "x") {
        window.scrollTo(0, this.state.oldPos);

        this.setState({ oldPos: this.state.startingPos - oldPos + this.mobileHeaderRef.current.getBoundingClientRect().height });
      } 
    });
  }

  render() {
    refs = [];
    const recipe = get(this.props, 'data.contentfulRecipe');
    this.renderIngredients(recipe.recipeIngredients.ingredients);
    const steps = documentToReactComponents(recipe.recipeSteps.json, richTextOptions);

    const { mobileSelected, mobile} = this.state;
    
    return (
      <div location={this.props.location}>
        <div>
          <SEO title={`${recipe.recipeName}`} description={`${recipe.recipeDescription}`} />
          <div>
            <div className={recipeStyles.mobileHeader}>
              <div className={recipeStyles.header}>
                <div className={recipeStyles.headerContent}>
                  <a href="/" className={recipeStyles.back}>
                    <i class="ri-arrow-left-line"></i>
                  </a>
                  <div className={recipeStyles.thumbnail}>
                    <img src={recipe.recipeImage.fluid.src}></img>
                  </div>
                  <div className={recipeStyles.title}>
                    <p className={recipeStyles.type}>{recipe.recipeType}</p>
                    <h1>{recipe.recipeName}</h1>
                    <p style={{lineHeight: '1.5rem'}}>{recipe.recipeDescription}</p>
                  </div>
                </div>
              </div>
            </div>
            <div ref={this.mobileHeaderRef} className={recipeStyles.tabs}>
              <div className={recipeStyles.mobileMenu}>
                <button className={mobileSelected === 0 ? recipeStyles.selectedMenu : ""} onClick={() => this.updateTab(0)}>
                  <h2>Ingredients</h2>
                </button>
                <button className={mobileSelected === 1 ? recipeStyles.selectedMenu : ""} onClick={() => this.updateTab(1)}>
                  <h2>Steps</h2>
                </button>
              </div>
            </div>
            { mobile 
                ? <>
                    <div className={mobileSelected === 0 ? recipeStyles.hidden : recipeStyles.selected} ref={this.stepWrapperRef} style={{overflow: 'visible'}}>
                      <div>
                        <div className={recipeStyles.stepWrapper}>
                          <div ref={this.recipeSteps} className={recipeStyles.recipeText}>
                            {steps}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={mobileSelected === 1 ? recipeStyles.hidden : recipeStyles.selected} ref={this.ingredientsRef} style={{overflow: "visible"}}>
                      <div className={recipeStyles.ingredients}>
                          <div className={recipeStyles.ingredientWrapper} style={{paddingBottom: '2rem'}}>
                            <h2>Ingredients</h2>
                            <div>{this.ingredients}</div>
                          </div>
                      </div>
                    </div>
                </>
                : <div className={recipeStyles.main} ref={this.mainRef}>
                <div ref={this.ingredientsRef} style={{overflow: "scroll"}}>
                  <div className={recipeStyles.ingredients}>
                      <div className={recipeStyles.ingredientWrapper} style={{paddingBottom: '2rem'}}>
                        <h2>Ingredients</h2>
                        <div>{this.ingredients}</div>
                      </div>
                  </div>
                </div>
                <div ref={this.stepWrapperRef} style={{overflow: "scroll"}}>
                  <div className={recipeStyles.stepWrapper}>
                    <div ref={this.recipeSteps} className={recipeStyles.recipeText}>
                      {steps}
                    </div>
                  </div>
                </div>
              </div>
            }
            
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeTemplate

export const pageQuery = graphql`
    query RecipeBySlug($slug: String!) {
      contentfulRecipe (slug: { eq: $slug }) {
        recipeName
        recipeType
        recipeDescription
        recipeIngredients {
            ingredients {
              unit
              number
              ingredient
            }
        }
        recipeSteps {
            json
        }
        recipeImage {
            fluid(maxWidth: 1180, background: "rgb:000000") {
              ...GatsbyContentfulFluid_tracedSVG
            }
        }
    }
  }
`