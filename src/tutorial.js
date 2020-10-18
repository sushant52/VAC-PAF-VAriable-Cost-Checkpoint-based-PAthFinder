import React from 'react';
import tutorial from './tutorial.png'
import App from './App';

class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            ready : false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            ready : true
        });
    }

    render() {
        let img_tutorial = null
        let grid_gen = null
        if(!this.state.ready) {
            img_tutorial = (
                <img src={tutorial} height={window.height} width={window.width} alt ='tutorial' onClick={this.handleClick}></img>
            )
        }
        if(this.state.ready) {
            grid_gen = (<App size = {this.props.size} timer= {this.props.timer} />)
        }
        return(
            <div>
                {img_tutorial}
                {grid_gen}
            </div>
        )
    }
}

export default Tutorial;