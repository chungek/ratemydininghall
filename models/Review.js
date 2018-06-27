'use strict';
const mongoose = require( 'mongoose' );

var reviewSchema = mongoose.Schema( {
  name: String,
  school: String,
  dininghall: String,
  fQuality: var,
  fVariety: var
} );

module.exports = mongoose.model( 'Reviews', reviewSchema );
