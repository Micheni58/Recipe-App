import React, { useState } from "react";
import "./Accordion.css";

export const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="accordion">
      <button className="accordion-header" onClick={toggleAccordion}>
        <span>{title}</span>
        <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};
