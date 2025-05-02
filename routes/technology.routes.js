const express = require('express');
const Technology = require('../models/technology.model');
const router = express.Router();

// Get all technologies
router.get('/techs', async (req, res) => {
    try {
        const technologies = await Technology.find();
        res.json({ message: 'Technologies retrieved successfully', technologies });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving technologies', error });
    }
});

// Create a new technology
router.post('/create-tech', async (req, res) => {
    try {
        const technology = new Technology(req.body);
        await technology.save();
        res.status(201).json({ message: 'Technology created successfully', technology });
    } catch (error) {
        res.status(400).json({ message: 'Error creating technology', error });
    }
});

// Update an existing technology
router.put('/update-tech/:id', async (req, res) => {
    try {
        const technology = await Technology.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!technology) {
            return res.status(404).json({ message: 'Technology not found' });
        }
        res.json({ message: 'Technology updated successfully', technology });
    } catch (error) {
        res.status(400).json({ message: 'Error updating technology', error });
    }
});

// Delete a technology
router.delete('/delete-tech/:id', async (req, res) => {
    try {
        const technology = await Technology.findByIdAndDelete(req.params.id);
        if (!technology) {
            return res.status(404).json({ message: 'Technology not found' });
        }
        res.json({ message: 'Technology deleted successfully', technology });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting technology', error });
    }
});

module.exports = router;
