import React, {Component} from 'react'; 
import axios from 'axios'; 

export default class AddSpot extends Component {
  state={
    title:"", 
    description:""
  }; 

  handleChange = event => {
    const name=event.target.name; 
    const value=event.target.value; 
    this.setState({
      [name]: value
    });
  }; 

  handleSubmit = event => {
    alert(`A spot was submitted: ${this.state.title}.`);
    event.preventDefault(); 
    axios
    .post('/', {
      title: this.state.title, 
      description: this.state.description
    })
    .then(() => {
      this.setState({
        title:"", 
        description:""
      }); 
      this.props.getData(); 
    })
    .catch(err => {
      console.log(err); 
    });
  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Name of the place:</label> 
            <input 
            type="text" 
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            />
        <label>Tell us more about the place:</label>
            <input
            type="text"
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            />
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
