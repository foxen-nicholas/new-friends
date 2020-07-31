import React from 'react';

const Person = ({ person, modifySuperficialChoices }) => {
  const { name, desc, age, avatar } = person;

  return (
    <>
      <div className="person">
        <div className="person-photo">
        // gravtar goes here
        </div>

        <div className="person-description">
          <p className="person-name-age">
            {name}, <span>{age}</span>
          </p>
          <p className="person-info">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default Person;
