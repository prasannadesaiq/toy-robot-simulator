import React from 'react';
import './Instruction.css';

const Instruction = ({ title, content }) => {
  return (
    <div className="information-container">
      <h2>{title}</h2>
      <ul>
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};


export default Instruction;
