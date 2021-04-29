

// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const photoController = require('../controllers/photoController.js');

// CREATE ROUTER
const photoRouter = express.Router();

// ROUTE URLs

/**
 * @api {post} /photo/ Upload a New Photo to camera Roll
 * @apiVersion 1.0.0
 * @apiName UploadPhoto
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.post('/');


/**
 * @api {patch} /photo/:id/perm Change a Photo's Privacy and Visibility 
 * @apiVersion 1.0.0
 * @apiName ChangePermissions
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * 
 * @apiBody {boolean} isfriend The Photo is Visible to Friends when Private or not
 * @apiBody {boolean} ispublic The Photo is Visible to the Public when Private or not
 * @apiBody {boolean} isfamily The Photo is Visible to Family when Private or not
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/perm');

/**
 * @api {patch} /photo/:id/perm Edit a Photo's Properties 
 * @apiVersion 1.0.0
 * @apiName EditPhotoInformation
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/');

/**
 * @api {delete} /photo/:id Delete a User's Photo
 * @apiVersion 1.0.0
 * @apiName DeletePhoto
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.delete('/:id/');


// ---------------- CHECK FORMAT FOR PERMISSIONS --------------
/**
 * @api {get} /photo/:id Check Visibility and Permissions for Photo
 * @apiVersion 1.0.0
 * @apiName GetPermissions
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {boolean} permissions The Photo's Viewing Permisions (only returned to User)
 * @apiSuccess {boolean} isfavourite Returns if the User Favourited the Photo
 * @apiSuccess {Number} rotationAngle Value by Which the Photo is Rotated
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "permissions": {
 *                0, 1, 1
 *              }
 *              "isfavourite : " 0,
 *              "rotationAngle: " 90
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id');

/**
 * @api {get} /photo/:id Gets a Photo's URL for Specific Size
 * @apiVersion 1.0.0
 * @apiName GetURLforSize
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {string} photourl The Photo's URL for the Chosen Size
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
                "photourl: " 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/url');

/**
 * @api {patch} /photo/:id/perm Edit a Photo's Properties 
 * @apiVersion 1.0.0
 * @apiName EditPhotoInformation
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {String} tags All Tags for the Photo
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/tags');

/**
 * @api {post} /photo/ Upload a New Photo to camera Roll
 * @apiVersion 1.0.0
 * @apiName UploadPhoto
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 * 
 * @apiParam {String} id The Photo's ID
 * @apiParam {String} tags All Tags for the Photo
 * 
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.post('/:id/tags');

/**
 * @api {delete} /photo/:id Remove a Tag
 * @apiVersion 1.0.0
 * @apiName RemoveTag
 * @apiGroup Photo
 *
 * @apiParam {String} id The tagged User's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.delete('/:id/tags');

/**
 * @api {get} /photo/:id/galleries Gets all Galleries Photo Belongs to
 * @apiVersion 1.0.0
 * @apiName GetGalleriesforPhoto
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {string} photourl The Photo's URL for the Chosen Size
 * @apiSuccess {Object[]} gallerylist Array of Gallery ID's Photo Belong to
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "gallerylist": [
 *
 *              ] 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/galleries');

/**
 * @api {get} /photo/:id/contexts/all Gets all Visible Sets and Pools Photo Belongs to
 * @apiVersion 1.0.0
 * @apiName GetContextsforPhoto
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {Object[]} contextlist Array of ID's of All Contexts Photo Belongs to
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "contextlist": [
 *
 *              ] 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/contexts/all');

/**
 * @api {get} /photo/:id/contexts Gets Previous and Next Photos for Current Photo
 * @apiVersion 1.0.0
 * @apiName GetContext
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {string} previousid ID of the Previous Photo if any
 * @apiSuccess {string} nextid ID of the Next Photo if any
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "previousid: ",
               "nextid: "
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/contexts');

/**
 * @api {get} /photo/:id/counts Gets Counts for a Photo
 * @apiVersion 1.0.0
 * @apiName GetCount
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {Date} startdate The Date where Adding Counts Starts 
 * @apiParam {String} id The Date where Adding Counts Ends
 * 
 * @apiSuccess {number} photocount The Count of Photos Between the Given Dates
 *  
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "count: " 12
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/counts');

/**
 * @api {get} /photo/:id/exif Gets Exif for a Photo
 * @apiVersion 1.0.0
 * @apiName GetExif
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {string} manufacturer The Manufacturer for the Camera Photo was taken by
 * 
 *  
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "Manufacturer: " Canon
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/exif');

/**
 * @api {get} /photo/:id/faves Gets all Visible Sets and Pools Photo Belongs to
 * @apiVersion 1.0.0
 * @apiName GetContextsforPhoto
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {Object[]} contextlist Array of ID's of All Contexts Photo Belongs to
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "contextlist": [
 *
 *              ] 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/faves');

/**
 * @api {get} /photo/:id/perm Gets Permissions and Visibility for a Photo
 * @apiVersion 1.0.0
 * @apiName GetPerms
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {boolean[]} permissions The Photo's Viewing Permisions 
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
                "permissions": {
 *                0, 1, 1
 *              }
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/perm');

//----------------------------------------- SIZES EDITED IN MODEL
photoRouter.get('/:id/sizes');

/**
 * @api {patch} /photo/:id/content Set a Photo's Content Type
 * @apiVersion 1.0.0
 * @apiName SetContent
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {Number} contenttype The Content Type to be Set
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/content');

//-------
/**
 * @api {patch} /photo/:id/date Set a Photo's Date
 * @apiVersion 1.0.0
 * @apiName SetDate
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {String} date The Date to be set to
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/date');

/**
 * @api {patch} /photo/:id/meta-data Set a Photo's Title or Description
 * @apiVersion 1.0.0
 * @apiName SetMetaData
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {String} title The New Title to be Set
 * @apiParam {String} desc The New Description to be Set
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/meta-data');

/**
 * @api {patch} /photo/:id/safety-level Set a Photo's Safety Level
 * @apiVersion 1.0.0
 * @apiName SetSafetyLevel
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {Number} safetylevel The Safety Level to be set
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/safety-level');

/**
 * @api {post} /photo/:id/comments Add a Comment to a Photo
 * @apiVersion 1.0.0
 * @apiName AddComment
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 * 
 * @apiParam {String} id The Photo's ID
 * @apiParam {String} commenttest The Text in the Comment
 * 
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.post('/:id/comments');

/**
 * @api {delete} /photo/comments/:id Delete a Comment by Commenting User
 * @apiVersion 1.0.0
 * @apiName DeleteComment
 * @apiGroup Photo
 *
 * @apiParam {String} id The Comment's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.delete('/comments/:id');

/**
 * @api {patch} /photo/comments/:id Edit a Text of a Comment as the Commenting User
 * @apiVersion 1.0.0
 * @apiName EditComment
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Comment's ID
 * @apiParam {String} id The New Comment Text
 * 
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/comments/:id');

/**
 * @api {get} /photo/:id/comments Get List of Comments for a Photo
 * @apiVersion 1.0.0
 * @apiName GetComments
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
  @apiSuccess {Object[]} commentlist Array of Comments on a Photo
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "commentist": [
 *
 *              ] 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/comments');

/**
 * @api {get} /photo/:id/comments/recent Get List of Recent Comments on Contact's Photos
 * @apiVersion 1.0.0
 * @apiName GetRecentCommentsforContacts
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Object[]} commentlist Array of Comments on 
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "commentist": [
 *
 *              ] 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/comments/recent');

/**
 * @api {get} /photo/:id/location Get Location of a Photo
 * @apiVersion 1.0.0
 * @apiName GetLocation
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
  @apiSuccess {string} location Location of Photo
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "location: "
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/location');

/**
 * @api {patch} /photo/:id/location Set a Photo's Location
 * @apiVersion 1.0.0
 * @apiName SetLocation
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {String} location The Location to be Set
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/location');

/**
 * @api {delete} /photo/:id/location Delete a Photo's Location
 * @apiVersion 1.0.0
 * @apiName DeleteLocation
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {Number} id The Photo's License
 * 
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.delete('/:id/location');

/**
 * @api {get} /photo/:id/licenses Get Location of a Photo
 * @apiVersion 1.0.0
 * @apiName GetLocation
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
  @apiSuccess {string} location Location of Photo
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "location: "
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/licenses');
photoRouter.patch('/:id/licenses');

/**
 * @api {post} /photo/:id/tags/:userId Tag a Person to a Photo
 * @apiVersion 1.0.0
 * @apiName TagUser
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} photoid ID of Photo to Tag in
 * @apiParam {String} userid ID of User to Tag
 * 
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.post('/:id/tags/:userId');

/**
 * @api {delete} /photo/:id/tags/:userId Delete a User's Photo
 * @apiVersion 1.0.0
 * @apiName DeletePhoto
 * @apiGroup Photo
 *
 * @apiParam {String} photoid The Photo's ID to Remove from
 * @apiParam {String} userid The User's ID to Remove
 * 
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.delete('/:id/tags/:userId');

/**
 * @api {get} /photo/:id/tags Gets a List of User's Tagged in a Photo
 * @apiVersion 1.0.0
 * @apiName GetTagged
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {Object[]} taggedlist Array of User IDs Tagged in the Photo
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "taggedlist": [
 *
 *              ] 
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/tags');

/**
 * @api {patch} /photo/:id/rotate Rotate a Photo  
 * @apiVersion 1.0.0
 * @apiName RotatePhoto
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam {Number} degrees Degrees by which you Rotate a Photo Clockwise
 * 
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/rotate')


// EXPORT ROUTER
module.exports = photoRouter;
