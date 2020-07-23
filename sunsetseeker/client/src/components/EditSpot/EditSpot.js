import React, { Component } from 'react';

class EditSpot extends Component {
  render() {
    console.log(this.props.title); 
    return(
      <div>
        <h2>Edit the spot you created:</h2>
        <form onSubmit={this.props.handleSubmit}>
        <label>Name of the place:</label> 
            <input 
            type="text" 
            id="title"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
            />
        <label>Tell us more about the place:</label>
            <input
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
            />
        <input type="submit" value="Save"/>
      </form>
      </div>
    )
  }
}

export default EditSpot; 