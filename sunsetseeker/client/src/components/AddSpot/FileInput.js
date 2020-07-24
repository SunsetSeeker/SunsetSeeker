import React, { Component } from 'react'; 
import axios from 'axios'; 

class FileInput extends Component {
  constructor(){
    super(); 
    this.onChange=this.onChange.bind(this); 
    this.state={
      files:[], 
      uploadText: "Choose a photo"
    }
  }; 

  onChange(element) {
    this.setState({
      uploadText: "It's uploading..."
    }); 
    const uploadData=new FormData(); 
    uploadData.append("img", element.target.files[0]); 
    axios.post("/upload", uploadData)
    .then((res) => {
      this.props.handleFiles(res.data); 
      this.setState({uploadText: "Upload successfull."}); 
    })
  }

  removeFile(f) {
    this.setState({ files: this.state.files.filter((x) => x !== f) });
  }

  render() {
    return(
      <div className="fileInput">
        <input
        type="file"
        name="photo"
        data-cloudinary-field="img_id"
        onChange={(event) => this.onChange(event)}
        />
        {this.state.uploadText}
        {this.state.files.map((file) => (
          <div className="FilePreview" onClick={this.removeFile.bind(this, file)}>{file.name}</div>
        ))}
      </div>
    )
  }
}

export default FileInput; 