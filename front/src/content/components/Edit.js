import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const Edit = (props) => {
  let [age, setAge] = useState('')
  let [location, setLocation] = useState('')
  let [languages, setLanguages] = useState('')
  let [about, setAbout] = useState('')
  let [smoke, setSmoke] = useState('')
  let [drink, setDrink] = useState('')
  let [category, setCategory] = useState('')
  let [redirect, setRedirect] = useState(false)

  let handleLanguages = (e) => {
    setLanguages(e.target.value)
  }
  let handleAbout = (e) => {
    setAbout(e.target.value)
  }
  let handleAge = (e) => {
    setAge(e.target.value)
  }
  let handleLocation = (e) => {
    setLocation(e.target.value)
  }
  let handleSmoke = (e) => {
    setSmoke(e.target.value)
  }
  let handleDrink = (e) => {
    setDrink(e.target.value)
  }
  let handleCategory = (e) => {
    setCategory(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    const User = {
      languages: languages,
      age: age,
      drink: drink,
      smoke: smoke,
      location: location,
      about: about,
      category: category,
      id: props.user.id
    }

    axios.put(`${process.env.REACT_APP_API}/api/users/profile/edit`, User)
      .then(res => {
        setRedirect(true)
      })
      .catch(err => console.log(err));
  }

  if (redirect) return <Redirect to="/Profile" />

  return (
    <div className="row mt-4">
      <div className="col-md-7 offset-md-3">
        <div className="card card-body">
          <h2 className="py-2">Edit Profile</h2>
          <form action="/profile" method="post" onSubmit={handleSubmit} >
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" name="location" value={location} onChange={handleLocation} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="languages">Languages</label>
              <input type="text" name="languages" value={languages} onChange={handleLanguages} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="text" name="age" value={age} onChange={handleAge} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="about">About</label>
              <input type="text" name="about" value={about} onChange={handleAbout} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="smoke">Smoke</label>
              <input type="text" name="smoke" value={smoke} onChange={handleSmoke} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="drink">Drink</label>
              <input type="text" name="drink" value={drink} onChange={handleDrink} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input type="text" name="category" value={category} onChange={handleCategory} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary float-right">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Edit;