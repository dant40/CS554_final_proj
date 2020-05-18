import React, {Component} from 'react'
import TopBar from "./TopBar"

class Form extends Component{
    constructor(props){
        super(props)
       
        this.state = {
            username: props.user.username,
            url:props.user.profilePic
        }
    }
    handlePicChange = async (event) => {

        let bod = {username: this.state.username, newPhoto: event.target.value}
        console.log(bod)
        const response = await fetch("http://localhost:3001/api/uploadNewPhoto",{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(bod)
        })
        let res = await response.json();
        console.log(res)
        this.props.onProfilePicChange(res);
    }
    render(){
        return(
            <div>
                <TopBar></TopBar>
                <form>
                    <div>
                        <label>Choose Profile Picture</label>
                        <select onChange={this.handlePicChange}>
                            <option value="banana.jpg">Banana</option>
                            <option value="blueberry.jpg">Blueberry</option>
                            <option value="default.jpg">Default</option>
                            <option value="strawberry.jpg">Strawberry</option>
                            <option value="watermelon.jpg">Watermelon</option>
                        </select>
                        <input type='text' 
                        value = {this.state.url}/>
                    </div>
                </form>
            </div>
        )
    }
}export default Form