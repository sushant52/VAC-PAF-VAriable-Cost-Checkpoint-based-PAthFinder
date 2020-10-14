import React from 'react';
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';

const styles = theme => createStyles({
    textroot: {
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
        boxSizing: 'border-box',
        color :'white',
        borderRadius : '30px',
        borderColor : 'white'
    }
});

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            colour : "#000000",
            name : '',
            cost : '0',
            error : false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.skip = this.skip.bind(this);
    }

    onMouseDown(e) {
        e.stopPropagation();
    }

    handleClick(e) {
        e.preventDefault();
        let temp = false;
        this.props.block_list.forEach(element => {
            if(element==this.state.name) {
                this.setState({
                    colour : "#000000",
                    name : '',
                    cost : '0',
                    error:true
                });
                temp = true;
            }
        });
        if(temp)
            return;
        let new_block = {[this.state.name] : 
            [parseInt(this.state.cost),[
                parseInt(this.state.colour.substring(1,3),16),
                parseInt(this.state.colour.substring(3,5),16),
                parseInt(this.state.colour.substring(5,7),16)
        ]]}

        this.props.block_add(true,new_block);
    }

    skip(e) {
        let temp = {a:1}
        this.props.block_add(false,temp);
        e.preventDefault();
    }

    handleChange(e) {
        const {name} = e.target;
        this.setState({[name] : e.target.value})
    }

    render() {
        let error_msg = null;
        if(this.state.error) {
            error_msg = (<div className='norm_text' style={{marginTop:'-5px', color:'red'}}>
            Error : Please ensure that name is unique and cost is greater than 0.
        </div>)
        }
        return(
            <div
            onMouseDown = {this.onMouseDown}
            className='faded_bg'
            >
                <div
                className='add-grid-init'
                >
                    <div className='input-header'>
                        <div className='big_head'>VACC-PAF</div>
                    </div>
                    <div className='input-init-form'>
                        <div className='small_head norm_text'>Enter Values for a new grid type !</div>
                        <div className='norm_text'>Name : An unique name for your new grid</div>
                        <div style={{textAlign:'center'}}>
                            Cost : A number representing the cost it takes for the algorithm to travel a single grid of this type.  <br/>
                            Default whitespaces have a cost of 1. 
                        </div>
                        <div className='norm_text'>Color : Represent the new grid with a color of your choice</div>
                        <div className='norm_text' style={{marginTop:'2%'}}>
                            <TextField
                            className={classNames(this.props.classes[`textroot`])}
                            InputProps = {{
                                className : this.props.classes.input
                            }}
                            name='name' 
                            value={this.state.name} 
                            onChange={this.handleChange}
                            autoComplete="off"
                            label='Name'
                            variant="outlined"/><br/>
                        </div>
                        <div className='norm_text'>
                            <TextField
                            className={classNames(this.props.classes[`textroot`])}
                            InputProps = {{
                                className : this.props.classes.input
                            }}
                            name='cost' 
                            value={this.state.cost} 
                            onChange={this.handleChange}
                            autoComplete="off"
                            label='Cost'
                            variant="outlined"/><br/>
                        </div>
                        
                        <div className='norm-text-lowmargin'>
                            <label>Pick Color:  <input type='color' 
                            id='colour' 
                            name='colour' 
                            value={this.state.colour} 
                            onChange={this.handleChange}></input><br/>
                            </label>
                        </div>
                        <div className='norm_text'>{error_msg}</div>
                    </div>
                    <div className='add-grid-footer'>
                        <div className='norm_text'>
                            <Button onClick={this.handleClick} 
                                style={{width:'150%',height:'70%'}}
                                className={classNames(this.props.classes[`buttonroot`])}
                                variant="outlined" 
                                color="primary">
                                    Add This!
                            </Button>
                        </div>
                        <div className='norm_text'>
                            <Button onClick={this.skip} 
                                style={{width:'150%',height:'70%'}}
                                className={classNames(this.props.classes[`buttonroot`])}
                                variant="outlined" 
                                color="primary">
                                    Skip!
                            </Button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withStyles(styles)(Input);