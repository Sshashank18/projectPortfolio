import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Chip,
  IconButton,
  Box,
  Stack
} from '@mui/material';
import { Add, Save, Delete, Edit } from '@mui/icons-material';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    githubLink: '',
    deployedLink: '',
    images: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch projects from MongoDB on load
  useEffect(() => {
    // fetch('http://localhost:5000/api/projects')
    fetch('https://projectportfolio-tj9c.onrender.com/api/projects',{ withCredentials: true })
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      images: Array.isArray(formData.images)
        ? formData.images.join(',') // converts array to string
        : formData.images // already a string
    };

    try {
      let response;
      if (editingProject) {
        // Update existing project
        // response = await fetch(`http://localhost:5000/api/projects/${editingProject._id}`, {
        response = await fetch(`https://projectportfolio-tj9c.onrender.com/api/projects/${editingProject._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        },{ withCredentials: true });
      } else {
        // Create new project
        // response = await fetch('http://localhost:5000/api/projects', {
        response = await fetch('https://projectportfolio-tj9c.onrender.com/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        },{ withCredentials: true });
      }

      const savedProject = await response.json();

      const updatedProjects = editingProject
        ? projects.map(p => (p._id === savedProject._id ? savedProject : p))
        : [...projects, savedProject];

      setProjects(updatedProjects);
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      githubLink: '',
      deployedLink: '',
      images: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      tags: project.tags.join(', '),
      images: project.images.join(', ')
    });
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // slight delay to ensure form is rendered
  };

  const handleDelete = async (id) => {
    try {
      // await fetch(`http://localhost:5000/api/projects/${id}`, {
      await fetch(`https://projectportfolio-tj9c.onrender.com/api/projects/${id}`, {
        method: 'DELETE'
      },{ withCredentials: true });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Admin Panel</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Add Project'}
        </Button>
      </Stack>

      {showForm && (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography ref={formRef} variant="h6" mb={2}>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Title" fullWidth required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Category" fullWidth required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" fullWidth multiline rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Tags (comma separated)" fullWidth required value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="GitHub Link" fullWidth value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Deployed Link" fullWidth value={formData.deployedLink} onChange={(e) => setFormData({ ...formData, deployedLink: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Images (comma separated URLs)" fullWidth value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField type="date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" type="submit" startIcon={<Save />}>{editingProject ? 'Update' : 'Save'}</Button>
                  <Button variant="outlined" onClick={resetForm}>Cancel</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}

      <Typography variant="h6" mb={2}>Manage Projects</Typography>
      {projects.length === 0 ? (
        <Typography>No projects added yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {projects.map((project) => (
            <Paper key={project._id} elevation={2} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{project.description}</Typography>
                  <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                    {project.tags.map((tag, idx) => (
                      <Chip key={idx} label={tag} variant="outlined" color="primary" />
                    ))}
                  </Stack>
                  <Typography variant="caption" display="block" mt={1}>
                    Category: {project.category} | Date: {project.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton onClick={() => handleEdit(project)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(project._id)} color="error">
                      <Delete />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Admin;
