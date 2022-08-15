import React, { Component } from 'react';

import Post from './Post'; // this should work without .jsx file ending, based on the "resolve" property in the module.exports object in webpack.config.js.




// this is a *class* component (not a functional component) because it's stateful


class PostsContainer extends Component {
    constructor(props) {
        super();
        this.state = {
            postObjsArr: [], // this comes from the database
        };
    };

    render() {
        postsArr = [];
        this.state.postObjsArr.forEach(post => {
            postsArr.push(
                <Post /> // TO-DO: pass down some props here
            )
        })
        postsArr = postsArr.slice(0,10);
        return (
            <div className="PostsContainer">
                Hello from the PostsContainer! And the ten most (least?) recent posts are: {postsArr}
            </div>
        );
    };
};