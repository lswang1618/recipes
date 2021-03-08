import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import SEO from "./seo"
import recipeStyles from "./recipe.module.css"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

var script;
var images = [];
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
              return <li ref={newRef}>{children}</li>
            } 
          }
          return <li>{children}</li>
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            if (node.data.target.fields) {
                const { title, description, file } = node.data.target.fields;
                const mimeType = file['en-US'].contentType
                const mimeGroup = mimeType.split('/')[0]
    
                switch (mimeGroup) {
                    case 'image':
                      images.push(<img
                          title={ title ? title['en-US'] : null}
                          alt={description ?  description['en-US'] : null}
                          src={file['en-US'].url}
                          style={{ width: '100%', height: '100%'}}
                      />)
                    return <img
                        title={ title ? title['en-US'] : null}
                        alt={description ?  description['en-US'] : null}
                        src={file['en-US'].url}
                        style={{ width: '60%', height: '100%'}}
                    />;
                    case 'video':
                      images.push(<video src={file['en-US'].url}></video>)
                    return <video controls autoPlay muted style={{ width: '60%', height: '100%'}}>
                        <source src={file['en-US'].url} />
                    </video>;
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
      currentImage: 0,
    }

    this.recipeSteps = React.createRef();
    this.ingredients = [];
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.eval(script);
    //this.recipeSteps.current.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(){
    if (refs[this.state.currentImage+1].current.getBoundingClientRect().top - this.recipeSteps.current.getBoundingClientRect().top <= 10) {
      this.setState({currentImage: this.state.currentImage+1})
    } else if (this.state.currentImage - 1 >= 0 
      && refs[this.state.currentImage-1].current.getBoundingClientRect().top - this.recipeSteps.current.getBoundingClientRect().top <= 10
      && refs[this.state.currentImage-1].current.getBoundingClientRect().top - this.recipeSteps.current.getBoundingClientRect().top >= 0
      ) {
      this.setState({currentImage: this.state.currentImage-1})
    }
  }

  renderIngredients(list) {
    var ingredients = [];
    for (var j=0; j<list.length; j++) {
      const ingredient = list[j];
      const imgName = "/" + ingredient.ingredient.replace(/\s/g, '-').toLowerCase() + ".jpg";
      ingredients.push(
        <div key={j} className={recipeStyles.ingredient}>
          <div className={recipeStyles.ingredientImg}>
            <img src={imgName} onError={(event)=>event.target.setAttribute("src",imgName.substring(0, imgName.length - 5) + ".jpg")}></img>
          </div>
          <p>{ingredient.number + " " + ingredient.unit + " " + ingredient.ingredient}</p>
        </div>
      )
    }
    this.ingredients = ingredients;
  }

  render() {
    images = [];
    refs = [];
    const recipe = get(this.props, 'data.contentfulRecipe');
    this.renderIngredients(recipe.recipeIngredients.ingredients);
    const steps = documentToReactComponents(recipe.recipeSteps.json, richTextOptions);
    
    return (
      <div location={this.props.location}>
        <div>
          <SEO title={`${recipe.recipeName}`} description={`${recipe.recipeDescription}`} />
          <div>
            <div className={recipeStyles.header}>
              <div className={recipeStyles.headerContent}>
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
            <div className={recipeStyles.main}>
              <div className={recipeStyles.ingredients}>
                  <h2>Ingredients</h2>
                  <div>{this.ingredients}</div>
              </div>
              <div className={recipeStyles.stepWrapper}>
                <div ref={this.recipeSteps} className={recipeStyles.recipeText}>
                  {steps}
                </div>
                {/*<div className={recipeStyles.recipeImage}>
                  {images}
                </div>*/}
              </div>
            </div>
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