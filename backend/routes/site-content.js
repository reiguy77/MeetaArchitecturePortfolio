const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { SiteContent } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/content/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get all site content
router.get('/', async (req, res) => {
  try {
    const content = await SiteContent.findAll();
    res.json(content);
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update site content (admin only)
router.put('/:key', authenticateToken, async (req, res) => {
  try {
    const { key } = req.params;
    let { value } = req.body;

    // Normalize line endings to \n
    if (typeof value === 'string') {
      value = value.replace(/\r\n/g, '\n');
    }

    let content = await SiteContent.findOne({ where: { key } });

    if (!content) {
      content = await SiteContent.create({
        key,
        value,
        type: 'text'
      });
    } else {
      await content.update({ value });
    }

    res.json(content);
  } catch (error) {
    console.error('Error updating site content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update image content (admin only)
router.put('/:key/image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { key } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    let content = await SiteContent.findOne({ where: { key } });
    const newImagePath = `/uploads/content/${req.file.filename}`;

    // If content exists and has an old image, delete it
    if (content && content.type === 'image' && content.value.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, '..', content.value);
      try {
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log(`Deleted old file: ${oldFilePath}`);
        }
      } catch (fileError) {
        console.error('Error deleting old file:', fileError);
      }
    }

    if (!content) {
      content = await SiteContent.create({
        key,
        value: newImagePath,
        type: 'image'
      });
    } else {
      await content.update({
        value: newImagePath,
        type: 'image'
      });
    }

    res.json(content);
  } catch (error) {
    console.error('Error updating image content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update JSON content (admin only)
router.put('/:key/json', authenticateToken, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (typeof value !== 'object') {
      return res.status(400).json({ error: 'Value must be a JSON object' });
    }

    let content = await SiteContent.findOne({ where: { key } });
    const jsonValue = JSON.stringify(value);

    if (!content) {
      content = await SiteContent.create({
        key,
        value: jsonValue,
        type: 'json'
      });
    } else {
      await content.update({
        value: jsonValue,
        type: 'json'
      });
    }

    res.json(content);
  } catch (error) {
    console.error('Error updating JSON content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;