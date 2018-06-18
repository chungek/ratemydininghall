'use strict';
const mongoose = require( 'mongoose' );

var profileSchema = mongoose.Schema( {
  first_name: String,
  last_name: String,
  user_id: String,
  school: String,
} );

module.exports = mongoose.model( 'profile', profileSchema );
