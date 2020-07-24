import React, {Component} from "react";
import axios from "axios";
// import { Button } from 'react-bootstrap';
//import EditSpot from '../EditSpot/EditSpot';
import SpotList from '../SpotList/SpotList';

export default class SpotDetails extends Component {

    state= {
        title: "", 
        description: ""
          }; 

deleteProject = () => {
    const id = this.props.match.params.spotId;
    axios.delete(`/server/list/${id}`)
        .then(() => {
        this.props.history.push(`/list`);
        })

    }              

    handleChange = event => {
        const { title, description } = event.target;
        this.setState({
            [title] : title
        });
    };


      getData = () => {
        const id = this.props.match.params.spotId;
        console.log(id, " here ");
        axios
          .get(`/server/list/${id}`)
          .then(response => {
            console.log(response.data);
            this.setState({
              title: response.data.title,
              description: response.data.description
            });
          })
          .catch(err => {
            console.log(err.response);
            // handle err.response depending on err.response.status
            if (err.response.status === 404) {
              this.setState({ error: "Not found" });
            }
          });
      };

componentDidMount = () => {
    this.getData();
  };

  render() {
      console.log(this.state);
    if (this.state.error) return <div>{this.state.error}</div>;

    let allowedToDelete = false;
    // const user = this.props.user;
    // const owner = this.state.project.owner;
    // if (user && user._id === owner) allowedToDelete = true;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        {allowedToDelete && (
          <button variant='danger' onClick={this.deleteSpot}> Delete Project </button>
        )}

        <button onClick={this.toggleEditForm}> Edit Sunset Spot </button>
        <button onClick={this.deleteProject}> Delete Spot </button>
        
      </div>
    );
  }

}

