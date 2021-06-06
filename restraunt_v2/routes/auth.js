const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const Booking = require('../models/booking');
const router = express.Router();

router.post('/join', isNotLoggedIn, async ( req, res, next) => {
  const {email, password, name, phoneNumber} = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
      console.log('존재하는 아이디입니다.');
    }
    const hash = await bcrypt.hash(password, 12);
    
  console.log(req.body);
    await User.create({
      email,
      password: hash,
      name,
      phoneNumber,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});


router.get('/naver',passport.authenticate('naver',null),
function(req, res) { 
  console.log("/");
 }); 

router.get('/naver/callback', passport.authenticate('naver', 
{ successRedirect: '/', 
failureRedirect: '/' }) 
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});


module.exports = router;