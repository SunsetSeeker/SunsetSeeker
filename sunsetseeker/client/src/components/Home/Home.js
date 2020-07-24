import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {

render() {
  return (
    <div>
        <h1>Hello!! <span>🌞</span></h1>
        <p>Use this app to get the best views based on your area!</p>
        <button><Link to ={`/list`}>See list</Link></button>
    </div>
  )
 }
}