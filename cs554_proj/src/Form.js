import React, {Component} from 'react'

class Form extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: ''
        }
    }
    handlePicChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    render(){
        return(
            <form>
                <div>
                    <label>Choose Profile Picture</label>
                    <select value ={this.state.pic} onChange={this.handlePicChange}>
                        <option value="banana.jpg">Banana</option>
                        <option value="blueberry.jpg">Blueberry</option>
                        <option value="default.jpg">Default</option>
                        <option value="strawberry.jpg">Strawberry</option>
                        <option value="watermelon.jpg">Watermelon</option>
                    </select>
                    <input type='text' 
                    value = {this.state.username}
                    onChange={this.handleUsernameChange}/>
                </div>
            </form>
        )
    }
}