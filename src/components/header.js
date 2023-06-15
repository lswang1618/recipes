import React, {Component} from "react"
import * as headerStyles from "./header.module.css"

class Header extends Component {
    constructor(props) {
        super(props);

        this.headerRef = React.createRef();
        this.boxShadowFunction = () => {
            window.requestAnimationFrame(() => {
                if (this.headerRef && this.headerRef.current) {
                    if (window.pageYOffset != 0) {
                        this.headerRef.current.style.boxShadow = "0 4px 4px rgba(0, 0, 0, 0.1)";
                    } else {
                        this.headerRef.current.style.boxShadow = "none";
                    }
                }
            })
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.boxShadowFunction);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.boxShadowFunction);
    }

    render() {
        return (
            <>
                <div ref={this.headerRef} className={headerStyles.headerWrapper}>
                    <header>
                        <div style={{display:"grid", gridTemplateColumns: "1fr auto 1fr"}}>
                            <div>
                                {/* <h5 className={headerStyles.navLink}>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </h5> */}
                            </div>
                            <div style={{height: '100%'}}>
                                <div className={headerStyles.logo}><b>88 chinese dishes</b></div>
                            </div>
                            <div style={{textAlign:"right"}}>
                                {/* <h5 className={headerStyles.navLink + (this.props.location === "/for-teachers" ? (" " + headerStyles.currentPage) : "")}>
                                    <Link to="/for-teachers">
                                        For Teachers
                                    </Link>
                                </h5> */}
                            </div>
                        </div>
                    </header>
                </div>
            </>
        )
    }
}

export default Header;