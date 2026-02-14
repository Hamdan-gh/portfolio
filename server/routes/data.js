import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const getModel = (collectionName) => {
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }
  const schema = new mongoose.Schema({}, { strict: false, timestamps: true });
  return mongoose.model(collectionName, schema, collectionName);
};

router.get('/:collection', async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:collection', authMiddleware, async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const item = new Model(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:collection/:id', authMiddleware, async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:collection/:id', authMiddleware, async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
