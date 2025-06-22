import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -25;
    const rotateY = ((x / width) - 0.5) * 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease-out'; 
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.transition = 'transform 0.3s ease-in-out';
  };

  const handleClick = () => {
    navigate(`/project/${project._id}`);
  };

  return (
    <div className="project-card-wrapper">
      <div
        className="project-card"
        ref={cardRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <img src={project.images?.[0] || './vite.svg'} alt="project" className="card-image" />
        <div className="card-overlay">
          <h3 className="card-title">{project.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
