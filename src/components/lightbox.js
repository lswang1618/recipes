import React, { Component, Fragment } from "react"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import lightboxStyles from "./lightbox.module.css"

class Lightbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLightbox: false,
    }
  }


  render() {
    const { showLightbox } = this.state

    const { title, description, file } = this.props.fields

    return (
        <Fragment>
            { this.props.type === "image"
                ? <img
                    title={title ? title['en-US'] : null}
                    alt={description ? description['en-US'] : null}
                    src={file['en-US'].url}
                    style={{width: '60%', height: '100%', cursor: 'pointer'}}
                    onClick={() => this.setState({ showLightbox: true })}
                />
                : <video controls autoPlay muted playsInline style={{ width: '90%', height: '100%', maxWidth: '300px', cursor: 'pointer'}} onClick={() => this.setState({ showLightbox: true })}>
                    <source src={file['en-US'].url} />
                </video>
            }
            {showLightbox && (
            <Dialog
                style={{width: '80%', maxWidth: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', margin: 0, padding: '45px'}}
            >
                { this.props.type === "image"
                    ? <img
                        title={title ? title['en-US'] : null}
                        alt={description ? description['en-US'] : null}
                        src={file['en-US'].url}
                        style={{width: '100%', height: '100%'}}
                    />
                    : <video controls autoPlay muted playsInline style={{ width: '100%', height: '100%' }}>
                        <source src={file['en-US'].url} />
                    </video>
                }
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

export default Lightbox;