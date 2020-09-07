import React from 'react';
import Gridin from './Grid';

var idx_manager = {
    Start : 0,
    End : 1,
    Gray : 2,
    White : 3
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.selector = React.createRef();
        this.state =
        {
            pos1 : 0,
            pos2 : 0,
            pos3 : 0,
            pos4 : 0,
            start : false,
            end : false,
            value : "Gray",
            valuelist : [
                {Start : [1,[0,255,0]]},
                {End : [1,[255,0,0]]},
                {Gray : [0,[220,220,220]]},
                {White : [1,[250,250,250]]}
            ]
        }
        this.onStart = this.onStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onMouseDown(e) {
        e.stopPropagation()
        if (e.button !== 0) return;
        this.onStart(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onStart(e) {
        e.stopPropagation()
        const box = this.selector.current.getBoundingClientRect();
        this.setState({
            pos1 : box.left,
            pos2 : box.top,
            pos3 : e.clientX,
            pos4 : e.clientY
        });
    }

    onMouseMove(e) {
        e.stopPropagation()
        this.setState(prevState => {
            return {
                pos1 : prevState.pos1 - (prevState.pos3 - e.clientX),
                pos2 : prevState.pos2 - (prevState.pos4 - e.clientY),
                pos3 : e.clientX,
                pos4 : e.clientY
            };
        })

        e.preventDefault();
    }

    onMouseUp(e) {
        e.stopPropagation()
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    handleClick(e) {
        const {name} = e.target
        this.setState( (prevState)=> {
            if(name==='start')
                return {start : !prevState.start}
            else
                return {end : !prevState.end}
        })
    }

    handleChange(e) {
        e.stopPropagation();
        this.setState({value : e.target.value})
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <div style={{zIndex :0}}>
                    <Gridin 
                        start = {this.state.start}
                        end = {this.state.end}
                        current = {this.state.valuelist[idx_manager[(this.state.value)] ]}
                    />
                </div>
                <div className='override'
                    ref = {this.selector}
                    onMouseDown = {this.onMouseDown}
                    style={{
                        position : 'absolute',
                        left : this.state.pos1,
                        top : this.state.pos2,
                        opacity : 0.7,
                        height : "300px",
                        width : "100px",
                        "backgroundColor" : "purple",
                        zIndex : 1
                    }}
                >
                    <button 
                        name = 'start'
                        onClick = {this.handleClick}
                        style={{
                        display : 'block',
                        top : '20px',
                        position : 'relative',
                        marginLeft : 'auto',
                        marginRight : 'auto',
                        width : '75px',
                        height : '50px',
                        backgroundColor : "black",
                        textAlign : "center",
                        borderRadius : "4px",
                        color : "white"
                    }}
                    >Start
                    </button>
                    <br/>
                    <button 
                        name = 'end'
                        onClick = {this.handleClick}
                        style={{
                        display : 'block',
                        position : 'relative',
                        top : "20px",
                        marginLeft : 'auto',
                        marginRight : 'auto',
                        width : '75px',
                        height : '50px',
                        backgroundColor : "black",
                        textAlign : "center",
                        borderRadius : "4px",
                        color : "white"
                    }}
                    >End
                    </button>
                    <br/>
                    <select 
                    value={this.state.value}
                    onChange = {this.handleChange}
                    
                    style={{
                        position : 'relative',
                        top : "20px",
                        display : 'block',
                        width : '75px',
                        marginLeft : 'auto',
                        marginRight : 'auto'
                    }}
                    >
                        <option>Gray</option>
                        <option>White</option>
                        <option>Start</option>
                        <option>End</option>
                    </select>
                    <br/>
                    <div> {this.state.value} </div>
                </div>
            </div>
        )
    }    
}

export default App;