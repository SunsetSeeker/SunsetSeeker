import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import SpotList from './components/SpotList/SpotList'; 
import AddSpot from './components/AddSpot/AddSpot'; 
import SpotDetails from './components/SpotDetails/SpotDetails'; 
import EditSpot from './components/EditSpot/EditSpot';
import Map from './components/Map/Map';
import Profile from './components/Profile/Profile'; 
// import CommentList from './components/CommentList/CommentList';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render() {
    return (
      <div className="App" >

        <Navbar 
          user={this.state.user} 
          setUser={this.setUser} 

        />


        {/* <Route
          exact
          path='/'
          // component={SpotList}
          render={props => {
            if (this.state.user) return <SpotList {...props} />
            else return <Redirect to='/' />
          }}
        /> */}


        <Route
          exact
          path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path='/'
          render={props => <Home {...props} />}
        />

        <Route
          exact
          path='/login'
          render={props => <Login setUser={this.setUser} {...props} />}
        />
        
        <Route 
        exact path='/list'
        component={SpotList}
        />


        <Route
        exact path="/addSpot"
        // component={AddSpot}
        render={props=> {
          if (this.state.user) return <AddSpot {...props} />
          else return <Redirect to="/signup"/>
        }}
        />

        <Route 
        exact path="/edit/:spotId"
        component={EditSpot}
        // render={props => <EditSpot user={this.state.user} {...props}/>}
        />

        <Route
        exact path="/profile"
        component={Profile}
        />

        <Route 
        exact path="/map"
        component={Map}
        />
        
        <Route
        exact path="/spotdetails/:spotId"
        // component={SpotDetails}
        render={props => <SpotDetails user={this.state.user} {...props}/>}
        />
      
      </div>
    );
  }

}
export default App;