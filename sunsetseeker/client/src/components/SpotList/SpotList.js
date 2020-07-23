import React from 'react';
import { Link } from 'react-router-dom';

export default function SpotList(props) {
    console.log(props.spots)
    return(
        <div>
            <h2> Input field for searching the loc </h2>
            <h2> List of Views next to the location </h2>
            {props.spots.map(spot => {
                return (
                    <div key={spot._id}>
                        <h3>
                            <Link to={'/spots/${spots._id}'} > {spot.title}</Link>
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}
