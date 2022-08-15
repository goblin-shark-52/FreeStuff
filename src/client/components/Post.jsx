import React from 'react';


// this is a *functional* component (not a class component) because it's not stateful

const Post = props => {
    return (
        <div className="Post">
            <p>
                <strong>name: </strong> {props.postObj.name}
            </p>
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
                <strong>imageurl: </strong>
                {/* add an img tag here  */}
            </p>
            <p>
                <strong>tag: </strong>
                {/* what will this be called when passed back from the database? not just "name", probably? */}
            </p>
            <p>
                {/* add a "claim this item" button */}
            </p>
        </div>
    )
};





export default Post;