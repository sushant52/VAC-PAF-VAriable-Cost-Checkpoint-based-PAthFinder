import React from 'react';
import App from './App';

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
        if(this.state.size.trim()=='' || this.state.timer.trim()=='' || isNaN(this.state.size) || isNaN(this.state.timer)) {
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
            error_msg = (<div>Errorlol!!!!</div>)
        }
        let init_form = null;
        if(!this.state.ready)
            init_form = (
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
                        <label>Size of each grid: 
                        <input type='text' 
                        id='size' 
                        name='size' 
                        value={this.state.size} 
                        onChange={this.handleChange}></input><br/>
                        </label>

                        <label>Timer: 
                        <input type='text' 
                        id='timer' 
                        name='timer' 
                        value={this.state.timer} 
                        onChange={this.handleChange}></input><br/>
                        </label>

                        <button onClick={this.handleClick}>Add this!</button><br/>
                    </form>
                    {error_msg}
                </div>
            </div>
        )
        let grid_gen = null;
        if(this.state.ready)
            grid_gen = (<App size = {parseInt(this.state.size)} timer= {parseInt(this.state.timer)} />)
        
        return(
            <div>
                {init_form}
                {grid_gen}
            </div>
        )
    }
}

export default Init;