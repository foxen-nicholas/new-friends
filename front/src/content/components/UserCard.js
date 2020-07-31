import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

const UserCard = (props) => {
  let handleClick = (e) => {
    const newRequestIds = {
        requestingUser: props.user.id,
        userRequested: e.target.value
    }
    axios.post(`${process.env.REACT_APP_API}/api/users/friendRequests`, newRequestIds)
    .then(res => {
        console.log(newRequestIds)
    })
}

  return (

    <div id="profileCard">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`${props.avatar}`} alt="face of a person" />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.about}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Age: {props.age}</ListGroupItem>
          <ListGroupItem>Location: {props.location}</ListGroupItem>
          <ListGroupItem>Category: {props.category}</ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  )
}

export default UserCard;
