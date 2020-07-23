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
    event.preventDefault(); 
    axios
    .post('/server/list', {
      title: this.state.title, 
      description: this.state.description
    })
    .then((res) => {
      console.log(res)
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
      <div>
      <h2>Add a new sunset location:</h2>
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
        <input type="submit" value="Add"/>
      </form>
      </div>
    )
  }
}
