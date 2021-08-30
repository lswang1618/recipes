import React, {Component} from "react"
import homeStyles from "./homeStyles.module.css"

class ImgBackground extends Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        
        var cx=95;
        var cy=95;
        var radius=90;
        var amp=5;
        var sineCount=10;

        ctx.beginPath();
        for(var i=0;i<360;i++){
            var angle=i*Math.PI/180;
            var pt=this.sineCircleXYatAngle(cx,cy,radius,amp,angle,sineCount);
            ctx.lineTo(pt.x,pt.y);
        }
        ctx.closePath();
        ctx.fillStyle = "#C589E8";
        ctx.fill();
    }

    sineCircleXYatAngle(cx,cy,radius,amplitude,angle,sineCount) {
        var x = cx+(radius+amplitude*Math.sin(sineCount*angle))*Math.cos(angle);
        var y = cy+(radius+amplitude*Math.sin(sineCount*angle))*Math.sin(angle);
        
        return({x:x,y:y});
    }

    render() {
        return(
            <canvas ref={this.canvas} width="190" height="190" className={homeStyles.bg}/>
        )
    }
}

export default ImgBackground;