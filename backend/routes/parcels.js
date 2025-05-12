const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Parcel = require('../models/Parcel');
const User = require('../models/User');
const sendEmail = require('../utils/email');

// @route   POST /api/parcels
// @desc    Create a parcel (user only)
// @access  Private
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ msg: 'Only users can create parcels' });
  }
  try {
    const { pickupAddress, address, contact, recipientName } = req.body;

    if (!pickupAddress || !address || !contact) {
      return res.status(400).json({ msg: 'Please include all required fields' });
    }

    const parcel = new Parcel({
      user: req.user.userId,
      pickupAddress,
      address,
      contact,
      recipientName,
      status: 'Pending',
      history: [{ status: 'Pending', date: new Date() }],
    });

    await parcel.save();
    // Populate user info for email
    const user = await User.findById(req.user.userId);

    // Send email confirmation (async, no await)
    sendEmail({
      to: user.email,
      subject: 'Parcel Booking Confirmation',
      text: `Dear ${user.username}, your parcel has been booked successfully with status: Pending.`,
    });

    res.json(parcel);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/parcels
// @desc    Get parcels based on user role
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let parcels;
    if (req.user.role === 'admin') {
      parcels = await Parcel.find().populate('user', ['username', 'email']).sort({ createdAt: -1 });
    } else {
      parcels = await Parcel.find({ user: req.user.userId }).sort({ createdAt: -1 });
    }
    res.json(parcels);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/parcels/:id/status
// @desc    Update parcel status (admin only)
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Only admins can update parcel status' });
  }

  try {
    const { status } = req.body;
    const parcel = await Parcel.findById(req.params.id).populate('user', ['username', 'email']);

    if (!parcel) return res.status(404).json({ msg: 'Parcel not found' });

    if (!['Pending', 'In Transit', 'Delivered'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    parcel.status = status;
    parcel.updatedAt = new Date();
    parcel.history.push({ status, date: new Date() });
    await parcel.save();

    // Send status update email
    sendEmail({
      to: parcel.user.email,
      subject: 'Parcel Status Updated',
      text: `Dear ${parcel.user.username}, your parcel ${parcel._id} status is updated to ${status}.`,
    });

    res.json(parcel);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
