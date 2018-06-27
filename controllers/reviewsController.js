'use strict';
const Review = require( '../models/Review' );
console.log("loading the reviews Controller")


// this displays all of the reviews
exports.getAllReviews = ( req, res ) => {
  console.log('in getAllReviews')
  Review.find( {} )
    .exec()
    .then( ( reviews ) => {
      res.render( 'reviews', {
        reviews: reviews
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'review promise complete' );
    } );
};




exports.saveReview = ( req, res ) => {
  console.log("in saveReview!")
  console.dir(req)
  let newReview = new Review( {
    name: req.body.name,
    school: req.body.school,
    dininghall: req.body.dininghall,
    fQuality: req.body.fQuality,
    fVariety: req.body.fVariety
  } )

  console.log("review = "+newReview)

  newReview.save()
    .then( () => {
      res.redirect( '/reviews' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteReview = (req, res) => {
  console.log("in deleteReview")
  let reviewName = req.body.deleteReview
  if (typeof(reviewName)=='string') {
      Review.deleteOne({name:reviewName})
           .exec()
           .then(()=>{res.redirect('/reviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='object'){
      Review.deleteMany({name:{$in:reviewName}})
           .exec()
           .then(()=>{res.redirect('/reviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='undefined'){
      console.log("This is if they didn't select a review")
      res.redirect('/reviews')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown reviewName: ${reviewName}`)
  }

};
