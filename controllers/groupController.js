// INCLUDE MODELS
const groupModel = require('../models/groupModel.js');

//GET ALL GROUPS
exports.GetInfo = async (req, res) => {
    try {
      const groups = await groupModel.find()
      res.status(200).send({
        status: 'success',
        data: {groups}
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  };

 //GET MEMBERS
 exports.GetMembers = async (req, res) => {
  try {
    const members = await groupModel.findById(req.params.id).select({_id : 0}).select('users')
    
    res.status(200).send({
      status: 'success',
      data: members
    });
  } catch (err)
   {
    res.status(400).send({
      status: 'error',
      message: err,
    });
   }
 }; 

 //GET PHOTO POOL
 
 exports.GetPhotoPool = async (req, res) => {
  try {
    const photos = await groupModel.findById(req.params.id).select({_id : 0}).select('photos')
    
    res.status(200).send({
      status: 'success',
      data: photos
    });
  } catch (err)
   {
    res.status(400).send({
      status: 'error',
      message: err,
    });
   }
 }; 