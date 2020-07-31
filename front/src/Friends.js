import React from 'react';
import FriendsCarousel from './content/components/FriendsCarousel'
import ProfileChat from './content/components/ProfileChat'

const Friends = (props) => {
    return (
        <div className="newBodyBackground">
        <div>
            <h1 className="chatheader"> Friend Matches </h1>
            {/* <FriendsCarousel blog={props.blog} /> */}
            <h1 className="chatheader"> Conversations </h1>
           
        </div>
        </div>
    );
};

export default Friends;