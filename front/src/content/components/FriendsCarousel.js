import React from 'react'
import UserCard from './UserCard'

const FriendsCarousel = (props) => {
    return (
        <div>
            <section className="mainboxouter">
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
            </section>
        </div>
    );
};

export default FriendsCarousel;