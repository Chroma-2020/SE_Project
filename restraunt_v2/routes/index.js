const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { Food, User, Booking, Restaurant } = require('../models');
// const { findAll } = require('../models/user');
const { findAll } = require('../models/booking');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.get('/contact', function(req, res, next) {
  res.render('contact.html', {
  });
});
router.get('/event', function(req, res, next) {
  res.render('event.html', {
  });
});
router.get('/contact', function(req, res, next) {
  res.render('contact.html', {
  });
});
router.get('/login', function(req, res, next) {
  res.render('login.html', {
  });
});
router.get('/reservation', isLoggedIn, function(req, res, next) {

  // User.findOne = (data, callback) => {
  //   return user.findOne({ where : { id : '1'}})
  //     .then(result => {
  //       callback(result)
  //     })
  //     .catch(err => {
  //       callback(err)
  //     })
  // }
  // const {table, date, time, cover, name, check} = req.query;
  // try{
    // user.findOne({ where: { 
    //   id } });
    
  // }catch(error){
  //   console.error(error);
  //   return next(error);
  // }
  // return res.redirect('/reservation');

  res.render('reservation.html', {
  });
});
// router.get('/seat', isLoggedIn,  function(req, res, next) {
//   res.render('seat.html', {
//   });
// });
router.get('/menu_dessert', function(req, res, next) {
  res.render('menu_dessert.html', {
  });
});
router.get('/menu_steak', function(req, res) {
  res.render('menu_steak.html', {
  });
});
router.get('/menu_pasta', function(req, res) {
  res.render('menu_pasta.html', {
  });
});
router.get('/join', function(req, res) {
  res.render('join.html', {
  });
});
router.get('/manager', function(req, res) {
  res.render('manager.html', {
  });
});
router.get('/statistic', function(req, res) {
  res.render('statistic.html', {
  });
});
router.get('/customer_info', function(req, res) {
  res.render('customer_info.html', {
  });
});

router.post('/manager', (req, res) => {
  console.log(req.body.code);
  if(req.body.code === 'se_project'){
    console.log('성공');
    return res.redirect('/manager');
  }
  else{
    res.send('<script>alert("인증코드 불일치");location.href="/";</script>');
}
});

router.post('/booking', async (req, res, next) => {
  // var name = User.name;

  const {name, cover, time, date, table } = req.body;

  console.log(req.body.name);
  console.log(req.body.table);
  console.log(req.body.date);
  console.log(req.body.time);
  console.log(req.body.cover);

  await Booking.create({
    table,
    date,
    cover,
    time,
    name,
  });
  
  return res.redirect('/');
})

function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";
  params = params.split("&");
  for (var i = 0; i < params.length; i++) {
    temp = params[i].split("=");
    if ([temp[0]] == sname) { sval = temp[1]; }
  }
  return sval;
}



router.get("/seat", async(req, res, next) => {

  // const { Op } = require("sequelize");
  // const bookingInfo = await Booking.findAll({
    // where:{
    //   [Op.and]: [ { name: "두강현" }]
    // }
  // })
  // return res.json(bookingInfo)

  res.render('seat.html', {
  });
});

/*
router.get('/test',async( req,res,next)  => {
  try {
    const user = await User.findOne({where : {provider : 'local'}});
    console.log(user.id);
    res.render('test.ejs', {  
      title: 'test',
      user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
*/

module.exports = router;