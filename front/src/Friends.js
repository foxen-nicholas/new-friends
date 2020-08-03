import React, { useState, useEffect } from 'react';
import FriendsCarousel from './content/components/FriendsCarousel'
import ProfileChat from './content/components/ProfileChat'
import axios from 'axios';
import AcceptedCard from './content/components/AcceptedCard';

const Friends = (props) => {

    let [acceptedRequests, setAcceptedRequests] = useState([])

    useEffect( () => {
        let token = localStorage.getItem("jwtToken")
        axios.get(`${process.env.REACT_APP_API}/api/users/acceptedRequests`, {headers: {Authorization: `Bearer ${token}`}})
        .then(allAcceptedRequests => {
            console.log('🤠🤠🤠🤠these are all the accepted requests', allAcceptedRequests.data)
            setAcceptedRequests(allAcceptedRequests.data)
        })
        .catch(err => console.log(err))
    }, [])

    const mappedAcceptedRequests = acceptedRequests.map( (request) => {
        return(
            <div key={request.friend._id}>
                <AcceptedCard friend={request.friend} user={props.user} />
            </div>
        )
    })

    return (
        <div className="newBodyBackground">
        <div>
            <h2>New Friends!</h2>
            {mappedAcceptedRequests}
            {/* <h1 className="chatheader"> Friend Matches </h1>
            <FriendsCarousel blog={props.blog} />
            <h1 className="chatheader"> Conversations </h1>
            <ProfileChat blog={props.blog}/> */}
        </div>
        </div>
    );
};

export default Friends;