'use strict';
const Profile = require( '../models/profile' );
console.log("loading the profiles Controller")


// this displays all of the profiles
exports.getAllProfiles = ( req, res ) => {
  console.log('in getAllProfiles')
  Profile.find( {} )
    .exec()
    .then( ( Profiles ) => {
      res.render( 'profile', {
        Profiles: Profiles
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'profile promise complete' );
    } );
};




exports.saveProfile = ( req, res ) => {
  console.log("in saveProfile!")
  console.dir(req)
  let newProfile = new Profile( {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_id: req.body.user_id,
    school: req.body.school,
  } )

  console.log("profile = "+newProfile)

  newProfile.save()
    .then( () => {
      res.redirect( '/profile' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteProfile = (req, res) => {
  console.log("in deleteProfile")
  let profileName = req.body.deleteName
  if (typeof(profileName)=='string') {
      Profile.deleteOne({first_name:profileName})
           .exec()
           .then(()=>{res.redirect('/profile')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(profileName)=='object'){
      Profile.deleteMany({first_name:{$in:profileName}})
           .exec()
           .then(()=>{res.redirect('/profile')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(profileName)=='undefined'){
      console.log("This is if they didn't select a profile")
      res.redirect('/profile')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown profileName: ${profileName}`)
  }

};
