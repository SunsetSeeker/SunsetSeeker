import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

export default class Home extends Component {

render() {
  return (
    <div className="home">
        <br/>
        <h4>You're a sunset seeker? <span>🌞</span></h4>
        <p>Use this app to discover the best suns spots</p>
        <button><Link to ={`/list`}>Start exploring!</Link></button>
    </div>
  )
 }
}