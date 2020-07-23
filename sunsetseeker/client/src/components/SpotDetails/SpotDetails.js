import React, { Component } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
//import EditSpot from '../EditSpot/EditSpot';
import AddSpot from '../AddSpot/AddSpot';
import SpotList from '../SpotList/SpotList';

export default class SpotDetails extends Component {

    state= {
        title: "", 
        description: ""
          }; 

deleteProject = () => {
    const id = this.props.match.params.id;
    axios.delete(`/Spot/${id}`)
        .then(() => {
        this.props.history.push(`/`);
        })

    }              

    handleChange = event => {
        const { title, description } = event.target;
        this.setState({
            [title] : title
        });
    };

    toggleTaskForm = () => {
        this.setState({
            taskForm: !this.state.taskForm
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const id = this.props.match.params.id;
        axios.put(`/spots/${id}`, {
          title: this.state.title,
          description: this.state.description
        })
          .then(response => {
            this.setState({
              spot: response.data,
              description: response.data.description,
              editForm: false
            })
          })
          .catch(err => {
            console.log(err);
          })
      }

      toggleEditForm = () => {
        this.setState({
          editForm: !this.state.editForm
        })
      }

      getData = () => {
        const id = this.props.match.params.id;
        axios
          .get(`/SpotList/${id}`)
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
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.project) return (<></>)

    let allowedToDelete = false;
    const user = this.props.user;
    const owner = this.state.project.owner;
    // if (user && user._id === owner) allowedToDelete = true;
    return (
      <div>
        <h1>{this.state.spot.title}</h1>
        <p>{this.state.project.description}</p>

        {allowedToDelete && (
          <Button variant='danger' onClick={this.deleteSpot}> Delete Project </Button>
        )}

        <Button onClick={this.toggleEditForm}> Show Edit Form </Button>
        <Button onClick={this.toggleTaskForm}> Show Task Form </Button>
        /* {this.state.editForm && (
          <EditProject
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )} */
        
      </div>
    );
  }

}

