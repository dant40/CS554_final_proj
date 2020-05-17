import React, {Component} from 'react'

class Form extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: props.user,
            url:''
        }
    }
    handlePicChange = async (event) => {
        this.setState({
            url: event.target.value
        })
        let bod = {username: this.state.username, newPhoto: this.state.url}
        const response = await fetch("http://localhost:3001/api/uploadNewPhoto",{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(bod)
        })
        let res = await response.json();
        this.props.onChangeProfilePic(res);
    }
    render(){
        return(
            <form>
                <div>
                    <label>Choose Profile Picture</label>
                    <select value ={this.state.url} onChange={this.handlePicChange}>
                        <option value="../../public/images/banana.jpg">Banana</option>
                        <option value="../../public/images/blueberry.jpg">Blueberry</option>
                        <option value="../../public/images/default.jpg">Default</option>
                        <option value="../../public/images/strawberry.jpg">Strawberry</option>
                        <option value="../../public/images/watermelon.jpg">Watermelon</option>
                    </select>
                    <input type='text' 
                    value = {this.state.url}/>
                </div>
            </form>
        )
    }
}export default Form