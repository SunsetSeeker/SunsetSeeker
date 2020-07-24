import React, {Component} from 'react'; 
import axios from 'axios'; 
import FileInput from './FileInput'; 

export default class AddSpot extends Component {
  state={
    title:"", 
    description:"", 
    file:"", 

  }; 

  onDrop=(picture)=> {
    this.setState({
      file:this.state.file.concat(picture)
    }); 
  }

  handleChange = event => {
    const name=event.target.name; 
    const value=event.target.value; 
    this.setState({
      [name]: value
    });
  }; 

  handleFile = element => {
    const uploadData=new FormData(); 
    uploadData.append("img", element.target.files[0]); 

    console.log("THIS IS THE"+element)
    this.setState({
      uploadOn:true 
    }); 
    axios
    .post("/server/list/upload", uploadData)
    .then(response =>{
      this.setState({file:response.data})
    })
    .catch(err=> console.log(err))
  }; 

  handleSubmit = event => {
    event.preventDefault(); 
    axios
    .post('/server/list', {
      title: this.state.title, 
      description: this.state.description, 
      file: this.state.file, 
    })
    .then((res) => {
      console.log(res)
      this.setState({
        title:" ", 
        description:" ", 
        file:" ", 
      }); 
    })
    .catch(err => {
      console.log(err); 
    });
  };

  render(){
    return(
      <div>
      <h2>Add a new sunset location:</h2>
      <form 
      onSubmit={this.handleSubmit}
      encType="multipart/form-data"
      >
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
          <input 
          type="file" 
          id="photo"
          name="photo"
          onChange={this.handleFile}
          />
          {/* <FileInput handleFile={this.handleFile} /> */}
        <button type="submit" value="Add"> Add this spot</button>
      </form>

        {/* <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
          onViewportChange={(viewport) => this.setState({viewport})}
        /> */}

      </div>
    )
  }
}
