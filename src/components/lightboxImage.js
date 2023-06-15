import React, { Component, Fragment } from "react"
import { Dialog } from "@reach/dialog"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "@reach/dialog/styles.css"
import * as lightboxStyles from "./lightbox.module.css"

class LightboxImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLightbox: false,
    }
  }


  render() {
    const { showLightbox } = this.state

    const { title, imageData } = this.props

    return (
        <Fragment>
            <div
                style={{width: '350px', maxWidth: '100%', height: '100%', cursor: 'pointer', display: 'block', marginBottom: '10px'}}
                onClick={() => this.setState({ showLightbox: true })}
            >
                <GatsbyImage 
                    image={getImage(imageData)}
                    title={title}

                />
            </div>
            {showLightbox && (
                <Dialog
                    style={{width: '80%', maxWidth: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', margin: 0, padding: '45px'}}
                >
                    <GatsbyImage 
                        image={getImage(imageData)}
                        title={title}
                        loading="eager"
                    />
                    <button
                        type="button"
                        onClick={() => this.setState({ showLightbox: false })}
                        className={lightboxStyles.close}
                    >
                        <i class="ri-close-circle-line" style={{pointerEvents: 'none'}}></i>
                    </button>
                </Dialog>
            )}
        </Fragment>
    )
  }
}

export default LightboxImage;