import React, { Component } from 'react';
import axios from 'axios'; 
import trash from './trash.png'

class EditSpot extends Component {
render() { 
    return(
      <div>
        <h2>Edit the spot you created:</h2>
        <form onSubmit={this.props.handleSubmit}
      encType="multipart/form-data">
        <label>Change the name of the sunset spot:</label><br/>
            <input 
            type="text" 
            id="title"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
            /><br/>
        <label>Change the description: </label><br/>
            <input
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
            /><br/>

          <label>Delete pictures: </label>
          {this.props.img.map(singleImg => {
                    return (
                      <div>
                      <button variant='danger' onClick={this.props.deleteImage}>  
                      <img src={singleImg} style={{width:"100px"}} alt="pic"/><span><img src={trash} style={{width:"15px"}}/></span></button>
                      </div>);
                })}

        <label>...or add more pictures:</label><br/>
        <img src={this.props.img} style={{width:"100px"}}/>
        <input 
          type="file" 
          id="photo"
          name="photo"
          multiple
          onChange={(event)=> this.props.handleFile(event)}
          />

        
        <input type="submit" value="Save"/>
      </form>
      </div>
    )
  }
}

export default EditSpot; 