const express = require('express');
const Project = require('../models/project.model');
const router = express.Router();

// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects', error });
    }
});

// Create a new project
router.post('/create-project', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error });
    }
});

// Update an existing project
router.put('/update-project/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(400).json({ message: 'Error updating project', error });
    }
});

// Delete a project
router.delete('/delete-project/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
});

module.exports = router;
