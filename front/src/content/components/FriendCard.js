import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

const FriendCard = ({user, friend}) => {
  console.log({user})
  console.log({friend})
  const acceptHandler = () => {
    console.log("This is the current user's ID", user.id)
    console.log("This is the friend's ID", friend._id)
    let token = localStorage.getItem("jwtToken")
    const requestInfo = {
      requestingUserId: user.id,
      requestedUserId: friend._id
    }
    axios.post(`${process.env.REACT_APP_API}/api/users/friendrequest`, requestInfo, {headers: {Authorization: `Bearer ${token}`}})
    .then(results => console.log(results))
    .catch(err => console.log(err))
  }
  return (
    <div id="profileCard">
      <img id="lessbtn" src="https://i.imgur.com/19kt8Pv.jpg" />
      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={`${friend.avatar}`} />
  <Card.Body>
    <Card.Title>{friend.name}</Card.Title>
    <Card.Text>
      {friend.about}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Location: {friend.location}</ListGroupItem>
    <ListGroupItem>Age: {friend.age}</ListGroupItem>
    <ListGroupItem>Languages: {friend.languages}</ListGroupItem>
  </ListGroup>
</Card>
<img id="addbtn" onClick={() => acceptHandler()} src="https://i.imgur.com/iSV3icM.jpg" />
    </div>
  )
}
export default FriendCard;
