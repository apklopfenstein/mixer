const router = require('express').Router();
const { Project, User, Comment } = require('../models');

router.get('/', (req,res)=>{
    const data = {};

    if (req.query.error) {
        data.error = req.query.error;
    }

    res.render('homepage', data);
})

router.get('/newsong', (req,res)=>{
    res.render('newsong')
})

router.get('/project-select', (req,res)=>{
    res.render('project-select');
})

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});



module.exports = router;