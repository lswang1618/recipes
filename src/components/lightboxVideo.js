import React, { Component, Fragment } from "react"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import * as lightboxStyles from "./lightbox.module.css"

class LightboxVideo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLightbox: false,
    }
  }


  render() {
    const { showLightbox } = this.state

    const { videoData } = this.props

    return (
        <Fragment>
            <video controls autoPlay muted playsInline style={{ width: '350px', height: '100%', maxWidth: '100%', cursor: 'pointer'}} onClick={() => this.setState({ showLightbox: true })}>
                <source src={videoData} />
            </video>
            {showLightbox && (
                <Dialog
                    style={{width: '80%', maxWidth: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', margin: 0, padding: '45px'}}
                >
                     <video controls autoPlay muted playsInline style={{ width: '100%', height: '100%' }}>
                        <source src={videoData} />
                    </video>
                    <button
                        type="button"
                        onClick={() => this.setState({ showLightbox: false })}
                        className={lightboxStyles.close}
                    >
                        <i class="ri-close-circle-line"></i>
                    </button>
                </Dialog>
            )}
        </Fragment>
    )
  }
}

export default LightboxVideo;