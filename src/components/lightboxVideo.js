import React, { Component, Fragment } from "react"
import "@reach/dialog/styles.css"

class LightboxVideo extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { videoData } = this.props

    return (
        <Fragment>
            <video controls autoPlay muted playsInline style={{ width: '350px', height: '100%', maxWidth: '100%', cursor: 'pointer'}} onClick={() => this.setState({ showLightbox: true })}>
                <source src={videoData} />
            </video>
        </Fragment>
    )
  }
}

export default LightboxVideo;