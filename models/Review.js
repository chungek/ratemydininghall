'use strict';
const mongoose = require( 'mongoose' );

var reviewSchema = mongoose.Schema( {
  name: String,
  school: String,
  dininghall: String,
  fQuality: Number,
  fVariety: Number
} );

module.exports = mongoose.model( 'Reviews', reviewSchema );
