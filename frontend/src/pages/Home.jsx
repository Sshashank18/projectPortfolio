import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Buttons from '../components/Buttons';
import { projectsData } from '../data/projectsData';
import '../styles/Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [categories, setCategories] = useState(['ALL']);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch('http://localhost:5000/api/projects');
        const response = await fetch('https://projectportfolio-production-a923.up.railway.app/api/projects');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
        const allCategories = data.flatMap(p =>
          p.category
            .split(',')
            .map(cat => cat.trim().toUpperCase())
        );

        const uniqueCategories = ['ALL', ...new Set(allCategories)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'ALL') {
    setFilteredProjects(projects);
  } else {
    setFilteredProjects(
      projects.filter(p =>
        p.category
          .split(',')
          .map(cat => cat.trim().toUpperCase())
          .includes(activeCategory)
      )
    );
  }
  }, [activeCategory, projects]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="home-container">
      {/* Background Video */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="bg-overlay" />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">My Projects</h1>
          <p className="hero-description">
            Explore my journey through code, creativity, and innovation. Each project tells a story of problem-solving and technical excellence.
          </p>
        </div>
      </section>

      {/* Project Section */}
      <section className="projects-section">
        <div className="projects-content">
          <Buttons
            selectedCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
