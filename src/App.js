import React from 'react';
import Gridin from './Grid';
import Input from './Input';

var idx_manager = {
    Start : 0,
    End : 1,
    Gray : 2,
    White : 3,
    Chk1 : 4,
    Chk2 : 5,
    Chk3 : 6
}
var next_idx = 7;

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
            end : true,
            clear : true,
            action : 'none',
            newadd : false,
            value : "Gray",
            visualize : true,
            valuelist : [
                {Start : [1,[0,255,0]]},
                {End : [1,[255,0,0]]},
                {Gray : [0,[220,220,220]]},
                {White : [1,[250,250,250]]},
                {Chk1 : [1,[247,239,10]]},
                {Chk2 : [1,[247,211,10]]},
                {Chk3 : [1,[247,168,10]]}
            ]
        }
        this.onStart = this.onStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addBlock = this.addBlock.bind(this);
        this.reset = this.reset.bind(this);
        this.clear = this.clear.bind(this);
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
                return {
                    start : true,
                    end : false,
                    clear : false,
                    action : name
                }
            if(name==='end')
                return {
                    action : name
                }
            if(name==='clear')
                return {
                    action : name
                }
            if(name==='addnew')
                return {newadd : !prevState.newadd}
        })
    }

    reset() {
        this.setState({
            action : 'none',
            start : false,
            end : true,
            clear : false
        })
    }

    clear() {
        this.setState({
            action : 'none',
            start : false,
            end : true,
            clear : true
        })
    }

    handleChange(e) {
        const {name, value, type, checked} = e.target
        e.stopPropagation();
        type === 'checkbox' ? this.setState(prevState => {return{[name] : !prevState.visualize}}): this.setState({value : value})
    }

    addBlock(toAdd,new_block) {
        if(toAdd) {
            idx_manager = {...idx_manager,[Object.keys(new_block)[0]] : next_idx}
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
        let added_component = null
        if(this.state.newadd) {
            added_component = (<Input block_list={Object.keys(idx_manager)} block_add={this.addBlock} />)
        }

        return(
            <div>
                <div style={{zIndex :-1}}>
                    <Gridin 
                        action = {this.state.action}
                        reset = {this.reset}
                        clear = {this.clear}
                        visualize = {this.state.visualize}
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
                        height : "400px",
                        width : "150px",
                        "backgroundColor" : "purple",
                        zIndex : 1
                    }}
                >
                    <button 
                        name = 'start'
                        onClick = {this.handleClick}
                        className = 'interface-button'
                        disabled = {this.state.start}
                    >Start
                    </button>
                    <br/>
                    <button 
                        name = 'end'
                        onClick = {this.handleClick}
                        className = 'interface-button'
                        disabled = {this.state.end}
                    >End
                    </button>
                    <br/>
                    <button 
                        name = 'clear'
                        onClick = {this.handleClick}
                        className = 'interface-button'
                        disabled = {this.state.clear}
                    >Clear
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
                    <input 
                    name='visualize' 
                    type='checkbox' 
                    checked={this.state.visualize} 
                    onChange = {this.handleChange}/>
                    <span>Visualize Path</span>
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