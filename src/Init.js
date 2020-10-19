import React from 'react';
import Tutorial from './tutorial';
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

var height = window.innerHeight;
var width = window.innerWidth;

const styles = theme => createStyles({
    textroot: {
        fontFamily: 'Kalam',
      "& .MuiFormLabel-root": {
        color: "#ffffff",
        opacity : 0.5
      },
      '& label.Mui-focused': {
        color: '#00DBB3',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#00DBB3',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#00DBB3',
        },
        '&:hover fieldset': {
          borderColor: '#00DBB3',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#00DBB3',
        }
      }
    },
    buttonroot: {
        fontFamily: 'Kalam',
        borderRadius : '30px',
        marginTop:'-10px',
        borderWidth : '1px',
        backgroundColor: '#323E3E',
        borderColor: '#00DBB3',
        color : 'white',
        '&:hover': {
          borderWidth: "1px",
          backgroundColor: '#00DBB3',
          borderColor: '#323E3E',
        },
        '&:active': {
          borderWidth: "1px",
          backgroundColor: '#00DBB3',
          borderColor: '#323E3E',
        }
    },
    input: {
        fontFamily: 'Kalam',
        boxSizing: 'border-box',
        color :'white',
        borderRadius : '30px',
        borderColor : 'white'
    }
});

class Init extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            size : '',
            timer : '',
            error : false,
            ready : false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onMouseDown(e) {
        e.stopPropagation();
    }

    handleClick(e) {
        e.preventDefault();
        if(this.state.size.trim()=='' || this.state.timer.trim()=='' || isNaN(this.state.size) || isNaN(this.state.timer) || parseInt(this.state.size)<5 || height/parseInt(this.state.size) < 1 || width/parseInt(this.state.size) < 2) {
            this.setState({
                size : '',
                timer : '',
                error : true
            });
        }
        else {
            this.setState({ready : true});
        }
    }

    handleChange(e) {
        const {name} = e.target;
        this.setState({[name] : e.target.value})
    }

    render() {
        let error_msg = null;
        if(this.state.error) {
            error_msg = (<div className='norm_text' style={{marginTop:'-15px', color:'red'}}>
                Error : Please ensure that size is a minimum of 5 and enough to generate atleast two grids.
            </div>)
        }
        let init_form = null;
        if(!this.state.ready)
            init_form = (
            <div
            onMouseDown = {this.onMouseDown}
            className = 'faded_bg'
            >
                <div
                className = 'grid_init'>
                    <div className='header'>
                        <div className='big_head'>Welcome to VACC-PAF</div>
                        <div className='small_head'>An A* Pathfinding Algorithm Sandbox</div>
                    </div>
                    <div className='init_form'><div>
                        <div className='small_head norm_text' style={{marginTop:'2%'}}>Enter the initialization values for the grid</div>
                        <div className='norm_text'>Size : A number that defines the size of each small grid in pixels.</div>
                        <div className='norm_text'>Timer : Number defining time in milliseconds used for controlling visualization speed.</div>
                        <div className='norm_text'>If it's your first time, starting size of 30 and a timer of 2 is recommended.</div>
                        <div className='norm_text'>
                            <TextField
                            style={{top:'10px'}}
                            className={this.props.classes.textroot}
                            InputProps = {{
                                className : this.props.classes.input
                            }}
                            InputLabelProps ={{
                                className : this.props.classes.input
                            }}
                            name='size' 
                            value={this.state.size} 
                            onChange={this.handleChange}
                            autoComplete="off"
                            label='Size'
                            variant="outlined"/><br/>
                        </div>
                        <div className='norm_text'>
                            <TextField
                            className={this.props.classes.textroot}
                            InputProps = {{
                                className : this.props.classes.input
                            }}
                            InputLabelProps ={{
                                className : this.props.classes.input
                            }}
                            name='timer' 
                            value={this.state.timer} 
                            onChange={this.handleChange}
                            autoComplete="off"
                            label='Timer'
                            variant="outlined"/><br/>
                        </div>
                        <div className='norm_text' >
                            <Button onClick={this.handleClick} 
                            className={this.props.classes.buttonroot}
                            variant="outlined" 
                            color="primary">
                                Start!
                            </Button><br/>
                        </div>
                        {error_msg}
                    </div>
                    </div>
                    <div className='footer'> 
                        Take a peek at the source code by <a style={{color:'white'}}
                        href='https://github.com/sushant52/VAC-PAF-VAriable-Cost-Checkpoint-based-PAthFinder'>
                         sushant52 </a>
                    </div>
                    
                </div>
            </div>
        )
        let img_tutorial = null;
        if(this.state.ready)
            img_tutorial = (<Tutorial size = {parseInt(this.state.size)} timer= {parseInt(this.state.timer)} />)
        
        return(
            <div>
                {init_form}
                {img_tutorial}
            </div>
        )
    }
}

export default withStyles(styles)(Init);