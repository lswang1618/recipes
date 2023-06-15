import React, {Component} from "react"
import * as homeStyles from "./homeStyles.module.css"

class ImgBackground extends Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.width !== this.props.width) {
            this.draw();
        }
    }

    draw() {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        
        var cx=this.props.width / 2;
        var cy=this.props.width / 2;
        var radius=cx - (this.props.width / 38);
        var amp=this.props.width / 38;
        var sineCount=10;

        ctx.beginPath();
        for(var i=0;i<360;i++){
            var angle=i*Math.PI/180;
            var pt=this.sineCircleXYatAngle(cx,cy,radius,amp,angle,sineCount);
            ctx.lineTo(pt.x,pt.y);
        }
        ctx.closePath();
        ctx.fillStyle = this.props.color;
        ctx.fill();
    }

    sineCircleXYatAngle(cx,cy,radius,amplitude,angle,sineCount) {
        var x = cx+(radius+amplitude*Math.sin(sineCount*angle))*Math.cos(angle);
        var y = cy+(radius+amplitude*Math.sin(sineCount*angle))*Math.sin(angle);
        
        return({x:x,y:y});
    }

    render() {
        return(
            <canvas ref={this.canvas} width={`${this.props.width}px`} height={`${this.props.width}px`} className={homeStyles.bg}/>
        )
    }
}

export default ImgBackground;