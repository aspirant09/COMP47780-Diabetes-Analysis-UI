// Details.js

import React, { useState } from 'react';
import './Details.css';

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false); // Set initial state to false

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <div className="section-header" onClick={toggleSection}>
        <h2>{title}</h2>
        <span className={`toggle-icon ${isOpen ? 'open' : 'closed'}`}></span>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

const DrugList = ({ drugs }) => {
  return (
    <ul className="drug-list">
      {Object.entries(drugs).map(([drug, count]) => (
        <li key={drug}>
          <span className="drug-name">{drug}:</span> {count}
        </li>
      ))}
    </ul>
  );
};

const AgeGroupList = ({ ageGroups }) => {
  return (
    <ul className="age-group-list">
      {Object.entries(ageGroups).map(([ageGroup, drugs]) => (
        <li key={ageGroup}>
          <span className="age-group">{ageGroup}</span>
          <DrugList drugs={drugs} />
        </li>
      ))}
    </ul>
  );
};

const GenderList = ({ genderData }) => {
  return (
    <ul className="gender-list">
      {Object.entries(genderData).map(([gender, ageGroups]) => (
        <li key={gender}>
          <span className="gender">{gender}</span>
          <AgeGroupList ageGroups={ageGroups} />
        </li>
      ))}
    </ul>
  );
};

const Details = ({ jsonData }) => {
  return (
    <div className="details-container">
      <h1>Analysed Details are as af follows</h1>
      <CollapsibleSection title="Over number of drug usage">
        <DrugList drugs={jsonData.drugs} />
      </CollapsibleSection>
      <CollapsibleSection title="Gender & agewise drug usage">
        <GenderList genderData={jsonData.gender_age} />
      </CollapsibleSection>
    </div>
  );
};

export default Details;
