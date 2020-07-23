import React, {Component} from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import SpotList from './components/SpotList/SpotList'; 
import AddSpot from './components/AddSpot/AddSpot'; 
import SpotDetails from './components/SpotDetails/SpotDetails'; 
import EditSpot from './components/EditSpot/EditSpot'; 


class App extends Component {
  // state={
  //   user:this.props.user
  // }
  // setUser = user => {
  //   this.setState({
  //     user: user
  //   })
  // }

  render() {
    return(
      <div className="App">

        <Route 
        exact path="/list"
        component={SpotList}
        />

        <Route
        exact path="/addSpot"
        component={AddSpot}
        />

        <Route 
        exact path="/editSpot"
        component={EditSpot}
        />

      </div>
    )

  }
}

export default App;
