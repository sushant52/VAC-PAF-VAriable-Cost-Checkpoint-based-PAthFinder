import React from 'react';
import Gridin from './Grid';
import Input from './Input';
import { withStyles, createStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

var idx_manager = {
    Start : 0,
    End : 1,
    Wall : 2,
    Erase : 3,
    Checkpoint1 : 4,
    Checkpoint2 : 5,
    Checkpoint3 : 6
}
var next_idx = 7;

const styles = theme => createStyles({
    buttonroot: {
        fontFamily: 'Kalam',
        width : '120px',
        height : '50px',
        marginTop : '10px',
        borderRadius : '30px',
        borderWidth : '1px',
        backgroundColor: '#323E3E',
        borderColor: '#00DBB3',
        color : 'white',
        '&:hover': {
          backgroundColor: '#00DBB3',
          borderColor: '#323E3E',
        },
        '&:active': {
          backgroundColor: '#00DBB3',
          borderColor: '#323E3E',
        },
        '&:disabled': {
            color : '#b0b0b0',
            borderColor: '#00a88a',
        }
    },
    select: {
        fontFamily: 'Kalam',
        width : '150px',
        height : '50px',
        marginTop : '20px',
        color : 'white',
        borderRadius : '30px',
    },
    customOutline: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#00DBB3'
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: '#00DBB3'
        },
        "&:active .MuiOutlinedInput-notchedOutline": {
            borderColor: '#00DBB3'
        }
    },
    icon: {
        fill: '#00DBB3',
    }
});

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
            value : "Wall",
            visualize : true,
            valuelist : [
                {Start : [1,[0,255,0]]},
                {End : [1,[255,0,0]]},
                {Wall : [0,[220,220,220]]},
                {Erase : [1,[250,250,250]]},
                {Checkpoint1 : [1,[247,239,10]]},
                {Checkpoint2 : [1,[247,211,10]]},
                {Checkpoint3 : [1,[247,168,10]]}
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
        const {name} = e.currentTarget
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
                <div className='drag-ui'
                    ref = {this.selector}
                    onMouseDown = {this.onMouseDown}
                    style={{
                        left : this.state.pos1,
                        top : this.state.pos2
                    }}
                    >
                    <div className='drag-ui-header'>
                        <span style={{marginTop:'10px'}}>VACC-PAF</span>
                    </div>
                    <div className='drag-ui-select'>
                        <FormControl variant="outlined" classes={{ root: this.props.classes.customOutline }}>
                        <Select
                            value={this.state.value}
                            onChange = {this.handleChange}
                            className={this.props.classes.select}
                            inputProps = {{classes:{icon : this.props.classes.icon}}}
                            >
                            {this.state.valuelist.map((block,idx) => {
                                return(<MenuItem key={Object.keys(block)[0]}
                                        value = {Object.keys(block)[0]}>
                                        {Object.keys(block)[0]}</MenuItem>)
                            })}
                        </Select>
                        </FormControl>
                        <Button 
                            name='addnew'
                            onClick={this.handleClick} 
                            className={this.props.classes.buttonroot}
                            variant="outlined">
                                New Cell
                        </Button>
                        <div style = {{
                            color : 'white',
                            marginTop : '10px'
                        }}>
                            <input 
                            name='visualize' 
                            type='checkbox' 
                            checked={this.state.visualize} 
                            onChange = {this.handleChange}/>
                            <span style={{fontFamily: 'Kalam'}}>Visualize Path</span>
                        </div>
                        <Button 
                            name='start'
                            onClick={this.handleClick} 
                            className={this.props.classes.buttonroot}
                            disabled = {this.state.start}
                            variant="outlined">
                                Start
                        </Button>
                        <Button 
                            name='end'
                            onClick={this.handleClick} 
                            className={this.props.classes.buttonroot}
                            disabled = {this.state.end}
                            variant="outlined">
                                End
                        </Button>
                        <Button 
                            name='clear'
                            onClick={this.handleClick} 
                            className={this.props.classes.buttonroot}
                            disabled = {this.state.clear}
                            variant="outlined">
                                Clear
                        </Button>
                    </div>  
                </div>
                <div>{added_component}</div>
            </div>
        )
    }    
}

export default withStyles(styles)(App);