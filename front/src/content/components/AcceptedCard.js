import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

const AcceptedCard = (props) => {

  // console.log("🦖🦕 this is props user", props.user.name, props.user.id)
  // console.log("🥭🍔 this is props accepted friends", props.friend.name, props.friend._id)

  // const acceptHandler = () => {
  //   console.log("This is the current user's ID", props.user.name, props.user.id)
  //   console.log("This is the friend's ID", props.friend.name, props.friend._id)
    
  //   let token = localStorage.getItem("jwtToken")

  //   const requestInfo = {
  //     requestingUserId: props.user.id,
  //     requestedUserId: props.friend._id
  //   }

  //   axios.post(`${process.env.REACT_APP_API}/api/users/friendrequest`, requestInfo, {headers: {Authorization: `Bearer ${token}`}})
  //   .then(results => console.log(results))
  //   .catch(err => console.log(err))
  // }

  return (

    <div id="profileCard">


      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={`${props.friend.avatar}`} />
  <Card.Body>
    <Card.Title>{props.friend.name}</Card.Title>
    <Card.Text>
      {props.friend.about}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Location: {props.friend.location}</ListGroupItem>
    <ListGroupItem>Age: {props.friend.age}</ListGroupItem>
    <ListGroupItem>Languages: {props.friend.languages}</ListGroupItem>
  </ListGroup>
  </Card>


    </div>
  )
}

export default AcceptedCard;
