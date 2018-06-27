var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});
*/
router.get('/',function(req, res, next){
  console.log("inside index getform")
  res.render('index', { title: 'Welcome', school: 'Enter your school', dininghall: 'Enter dining hall name' })
})

router.post('/',function(req, res, next){
  console.log("inside postform")
  console.log(req.body.school)
  console.log(req.body.dininghall)
  console.log(req.body.quality)
  console.log(req.body.variety)
  res.render('index', { title: 'Welcome', school:req.body.school, dininghall: req.body.dininghall, quality: req.body.quality, variety: req.body.quality })
})

module.exports = router;
