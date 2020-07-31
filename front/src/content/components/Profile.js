import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {

  let [smoke, setSmoke] = useState('')
  let [drink, setDrink] = useState('')
  let [languages, setLanguages] = useState('')
  let [about, setAbout] = useState('')
  let [location, setLocation] = useState('')
  let [age, setAge] = useState('')
  let [category, setCategory] = useState('')

  useEffect(() => {
    let token = localStorage.getItem("jwtToken")
    axios.get(`${process.env.REACT_APP_API}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setSmoke(response.data.smoke)
        setAbout(response.data.about)
        setLanguages(response.data.languages)
        setDrink(response.data.drink)
        setAge(response.data.age)
        setLocation(response.data.location)
        setCategory(response.data.category)
      }).catch(err => console.log(err))
  }, [])

  let userData = props.user
    ? <div>
      <h1>Profile</h1>
      <img src={props.user.avatar} alt={props.user.name} className="mb-4" />
      <p><strong>Name:</strong> {props.user.name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>location:</strong> {location}</p>
      <p><strong>about:</strong> {about}</p>
      <p><strong>languages:</strong> {languages}</p>
      <p><strong>smoke:</strong> {smoke}</p>
      <p><strong>drink:</strong> {drink}</p>
      <p><strong>category:</strong> {category}</p>
      <Link to='/Edit'>Edit Profile</Link>
    </div>
    : <h4>Loading...</h4>
  let errorDiv = () => {
    return (
      <div className="text-center pt-4"><h3>Please <Link to='/Login'>login</Link> to view this page</h3></div>
    )
  }
  return (
    <div>
      <div>
        {props.user ? userData : errorDiv()}
      </div>
      <div>
      </div>
    </div>
  )
}
export default Profile;