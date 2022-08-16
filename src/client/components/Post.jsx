import React from 'react';

// this is a *functional* component (not a class component) because it's not stateful

const Post = props => {
    return (
        <div className="Post">
            <p>
                <strong>name: </strong> {props.name}
            </p>
            <p>
                <strong>description: </strong> {props.description}
            </p>
            <p>
                <strong>date offered: </strong> {props.date.slice(0,10)}
            </p>
            <p>
                <strong>quantity: </strong> {props.quantity}
            </p>
            <p>
                <strong>picture: </strong> <img src={props.imageurl} />
            </p>
            <p>
                {/* currently no functionality here */}
                <button>Claim item!</button>
            </p>
        </div>
    )
};




export default Post;


/*



            <p>
                <strong>description: </strong> {props.postObj.description}
            </p>
            <p>
                <strong>date offered: </strong> {props.postObj.date}
            </p>
            <p>
                <strong>quantity: </strong> {props.postObj.quantity}
            </p>
            <p>
                <strong>imageurl: </strong> add an image here
            </p>
            <p>
                    <strong>tag -- what will be passed back here?: </strong>
            </p>
            <p>
                    add a "claim this item" button here...
            </p>
    



*/




