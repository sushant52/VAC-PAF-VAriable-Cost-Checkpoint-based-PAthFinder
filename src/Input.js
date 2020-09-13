import React from 'react';

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
            error_msg = (<div>Errorlol!!!!</div>)
        }
        return(
            <div
            onMouseDown = {this.onMouseDown}
            style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
                background: 'rgba(0,0,0,0.7)',
                zIndex: '3'
            }}
            >
                <div
                style={{
                    position: 'relative',
                    width: '50%',
                    height: '50%',
                    margin: 'auto',
                    top: '25%',
                    backgroundColor : 'white'
                }}
                >
                    <form>
                        <label>Input Name: 
                        <input type='text' 
                        id='name' 
                        name='name' 
                        value={this.state.name} 
                        onChange={this.handleChange}></input><br/>
                        </label>

                        <label>Input Cost: 
                        <input type='text' 
                        id='cost' 
                        name='cost' 
                        value={this.state.cost} 
                        onChange={this.handleChange}></input><br/>
                        </label>

                        <label>Pick Color: 
                        <input type='color' 
                        id='colour' 
                        name='colour' 
                        value={this.state.colour} 
                        onChange={this.handleChange}></input><br/>
                        </label>

                        <button onClick={this.handleClick}>Add this!</button><br/>
                    </form>
                    <button onClick={this.skip}>Skip!</button>
                    {error_msg}
                </div>
                
            </div>
        )
    }
}

export default Input;