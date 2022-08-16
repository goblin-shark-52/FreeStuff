import React from 'react';
import './post.scss';

// this is a *functional* component (not a class component) because it's not stateful

const Post = props => {
    return (
        <div className="Post">
            <p>
                <strong>Name: </strong> {props.name}
            </p>
            <p>
                <strong>Description: </strong> {props.description}
            </p>
            <p>
                <strong>Date offered: </strong> {props.date.slice(0,10)}
            </p>
            <p>
                <strong>Quantity: </strong> {props.quantity}
            </p>
            <p>
                <strong>Picture: </strong> <img src={props.imageurl} />
            </p>
            <p>
                {/* currently no functionality here */}
                <button>Claim item!</button>
            </p>
        </div>
    )
};




export default Post;