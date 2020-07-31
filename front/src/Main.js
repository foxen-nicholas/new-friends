import React, { useState } from 'react';
import './App.css';
import Person from './content/components/Person';
import Lonely from './content/components/Lonely';

const Main = () => {
  const [people, setPeople] = useState(data);
  const [likedUsers, setLikedUsers] = useState([]);
  const [superLikedUsers, setSuperLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const activeUser = 0;

  const removedPersonFromDataSrc = (peopleSource, userId) =>
    peopleSource.filter(user => user.id !== userId);

    switch (action) {
      default:
        return people;
    }
  };

  return (
    <div className="newBodyBackground">
    <div className="app">
      {people[1] ? (
        
        <Person
          key={people[1].id}
          person={people[1]}
          modifySuperficialChoices={modifySuperficialChoices}
          likedUsers={likedUsers}
        />
      ) : (
        <Lonely
          activeUserImage={people[activeUser].image}        />
      )}
    </div>
    </div>
  );








export default Main;


