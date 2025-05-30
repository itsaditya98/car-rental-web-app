const express = require('express');

const router = express.Router();

const db = require('../db/db');

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(403).send('Unauthorized access');
  }
}

router.get("/login", (req, res) => {
    res.render('login')
});

router.post('/login', async (req, res) => {
        const username = req.body.user
        const password = req.body.password
        const us = await db.collection('users').findOne({user: username})

        if(us.password == password) {
            try {
        req.session.user={username};
        res.redirect('/admin/dashboard');
        } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).send('Error fetching bookings');
        }}
});

router.get("/dashboard", isAuthenticated, async (req, res) => {
    try{
      const bookings = await db.collection('booking').find({}).toArray();
      res.render('dashboard', { docs: bookings });
    } catch (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Error fetching bookings');
    }
});

router.post("/search", isAuthenticated, async (req, res) => {

    const phone = req.body.phone;
    try {
    const search = await db.collection('booking').find({phone: phone}).toArray();
    res.render('search', { docs: search });
    } catch (err) {
      console.error('Error fetching result:', err);
      res.status(500).send('Error fetching result');
    }
});

const { ObjectId } = require('mongodb');

router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await db.collection('booking').deleteOne({  _id: new ObjectId(id) });
    res.redirect('/admin/dashboard');
    console.log('one record deleted')
  } catch (err) {
    console.error("Delete failed", err);
    res.status(500).send("Failed to delete booking.");
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/admin/login');
  });
});

module.exports = router;