import React from 'react';
import Gridin from './Grid';
import Input from './Input';

var idx_manager = {
    Start : 0,
    End : 1,
    Gray : 2,
    White : 3
}
var next_idx = 4;

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
            newadd : false,
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
        this.addBlock = this.addBlock.bind(this);
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
            if(name==='end')
                return {end : !prevState.end}
            if(name==='addnew')
                return {newadd : !prevState.newadd}
        })
    }

    handleChange(e) {
        e.stopPropagation();
        this.setState({value : e.target.value})
        e.preventDefault();
    }

    addBlock(toAdd,new_block) {
        if(toAdd) {
            idx_manager = {...idx_manager,[Object.keys(new_block)[0]] : next_idx}
            let new_valuelist = 
            this.setState(prevstate => {
                let new_valuelist = prevstate.valuelist;
                new_valuelist.push(new_block);
                return(
                {
                    newadd : !prevstate.newadd,
                    valuelist : new_valuelist
                }
            )})
            next_idx++;
        }
        else{
            this.setState(prevstate => {return {newadd : !prevstate.newadd}})
        }
    }

    render() {
        console.log(idx_manager)
        let added_component = null
        if(this.state.newadd) {
            added_component = (<Input block_list={Object.keys(idx_manager)} block_add={this.addBlock} />)
        }

        return(
            <div>
                <div style={{zIndex :-1}}>
                    <Gridin 
                        start = {this.state.start}
                        end = {this.state.end}
                        current = {this.state.valuelist[idx_manager[(this.state.value)] ]}
                        size = {this.props.size}
                        timer = {this.props.timer}
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
                        className = 'interface-button'
                    >Start
                    </button>
                    <br/>
                    <button 
                        name = 'end'
                        onClick = {this.handleClick}
                        className = 'interface-button'
                    >End
                    </button>
                    <br/>
                    <select 
                    value={this.state.value}
                    onChange = {this.handleChange}
                    className = 'select-block'
                    >
                        {this.state.valuelist.map((block,idx) => {
                            return(<option key={Object.keys(block)[0]}>{Object.keys(block)[0]}</option>)
                        })}
                    </select>
                    <br/>
                    <button 
                        name = 'addnew'
                        onClick = {this.handleClick}
                        className = 'interface-button'
                    >Addnew
                    </button>
                </div>
                <div>{added_component}</div>
            </div>
        )
    }    
}

export default App;