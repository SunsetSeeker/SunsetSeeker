import React, { Component } from 'react';
import axios from 'axios'; 

class EditSpot extends Component {
  state={
    files: [], 
  }; 

  onDrop=(picture)=> {
    this.setState({
      file:this.state.file.concat(picture)
    }); 
  }  

  // fileChangeHandler = (e) => {
  //   console.log("this is executed")
  //   const files=[...this.state.files]; 
  //   files.push(...e.target.files); 
  //   this.setState({
  //     files
  //   })
  // }

  // handleSubmit = element => {
  //   const uploadData=new FormData(); 
  //   uploadData.append("img", element.target.files); 
  //   axios
  //   .post("/server/list/upload", uploadData)
  //   .then(response =>{
  //     this.setState({
  //       files:response.data, 
  //     })
  //   })
  //   .catch(err=> console.log(err))
  // };


  
  render() {
    console.log(this.state); 
    return(
      <div>
        <h2>Edit the spot you created:</h2>
        <form onSubmit={this.props.handleSubmit}>
        <label>Name of the place:</label><br/>
            <input 
            type="text" 
            id="title"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
            /><br/>
        <label>Tell us more about the place:</label><br/>
            <input
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
            /><br/>
        {/* change photo */}

        {/* add an additional photo */}

        <label>Choose another nice photo:</label><br/>
        <img src={this.props.img} style={{width:"100px"}}/>
        <input 
          type="file" 
          id="photo"
          name="photo"
          multiple onChange={this.props.handleFile}
          />

        {/* delete photo */}
        
        <input type="submit" value="Save"/>
      </form>
      </div>
    )
  }
}

export default EditSpot; 