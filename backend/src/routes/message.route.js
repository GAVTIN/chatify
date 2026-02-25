import express from 'express';

const router = express.Router();

// Message route
router.get('/send', (req, res) => {
    res.send('Message endpoint change');
});

export default router;

