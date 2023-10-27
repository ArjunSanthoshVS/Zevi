import React, { useState, ReactNode } from "react";
import "./Accordion.scss";

interface AccordionProps {
  title: string;
  children: ReactNode; 
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <span className="accordion-title">{title}</span>
        <div className={`arrow ${isOpen ? "up" : "down"}`}>
          <i className="fa-solid fa-caret-up"></i>
        </div>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
