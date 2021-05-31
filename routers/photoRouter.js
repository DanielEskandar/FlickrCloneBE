// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const photoController = require('../controllers/photoController.js');
const authController = require('../controllers/authController.js');
const uploadController = require('../controllers/uploadController.js');

// CREATE ROUTER
const photoRouter = express.Router();

// ROUTE URLs

/**
 * @apiDefine PhotoNotFoundError
 * @apiError PhotoNotFoundError No photo is found by that photo ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No photo is found by that photo ID"
 *      }
 */

/**
 * @apiDefine UnauthError
 * @apiError Unauthorized User does not have access to this API
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "status": "error",
 *          "message": "The user is not authenticated"
 *      }
 */

/**
 * @apiDefine ForbiddenError
 * @apiError Forbidden User does not have permission to use this API
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden
 *      {
 *          "status": "error",
 *          "message": "The user is not authorized"
 *      }
 */

/**
 * @apiDefine UserNotFoundError
 * @apiError UserNotFound No user is found by that user ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No user is found by that user ID"
 *      }
 */

/**
 * @apiDefine SuccessRes
 * @apiSuccess {String} status Status of the Operation
 * @apiSuccess {String} data Success Message
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data": "ok"
 *      }
 */

/**
 * @api {post} /photo/ Upload a New Photo to camera Roll
 * @apiVersion 1.0.0
 * @apiName UploadPhoto
 * @apiGroup Photo
 *
 * @apiParam (Request Body) {Number} ticket The Ticket of the Upload
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *            "permissions": {
 *            "public": false,
 *            "friend": false,
 *            "family": false,
 *            "comment": 3,
 *            "addMeta": 0
 *          },
 *          "sizes": {
 *            "size": {
 *              "original": {
 *                "height": 854,
 *                "width": 1280,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228651/photo-0-608d55c7e512b74ee00791db-1622228648958-o.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228651/photo-0-608d55c7e512b74ee00791db-1622228648958-o.jpg"
 *              },
 *              "large": {
 *                "height": 683,
 *                "width": 1024,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228652/photo-1-608d55c7e512b74ee00791db-1622228648958-b.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228652/photo-1-608d55c7e512b74ee00791db-1622228648958-b.jpg"
 *              },
 *              "medium800": {
 *                "height": 534,
 *                "width": 800,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228653/photo-2-608d55c7e512b74ee00791db-1622228648958-c.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228653/photo-2-608d55c7e512b74ee00791db-1622228648958-c.jpg"
 *              },
 *              "medium640": {
 *                "height": 427,
 *                "width": 640,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228654/photo-3-608d55c7e512b74ee00791db-1622228648958-z.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228654/photo-3-608d55c7e512b74ee00791db-1622228648958-z.jpg"
 *              },
 *              "medium": {
 *                "height": 334,
 *                "width": 500,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228656/photo-4-608d55c7e512b74ee00791db-1622228648958.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228656/photo-4-608d55c7e512b74ee00791db-1622228648958.jpg"
 *              },
 *              "small320": {
 *                "height": 214,
 *                "width": 320,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228657/photo-5-608d55c7e512b74ee00791db-1622228648958-n.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228657/photo-5-608d55c7e512b74ee00791db-1622228648958-n.jpg"
 *              },
 *              "small": {
 *                "height": 160,
 *                "width": 240,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228658/photo-6-608d55c7e512b74ee00791db-1622228648958-m.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228658/photo-6-608d55c7e512b74ee00791db-1622228648958-m.jpg"
 *              },
 *              "thumbnail": {
 *                "height": 67,
 *                "width": 100,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228658/photo-7-608d55c7e512b74ee00791db-1622228648958-t.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228658/photo-7-608d55c7e512b74ee00791db-1622228648958-t.jpg"
 *              },
 *              "largeSquare": {
 *                "height": 150,
 *                "width": 150,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228659/photo-8-608d55c7e512b74ee00791db-1622228648958-q.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228659/photo-8-608d55c7e512b74ee00791db-1622228648958-q.jpg"
 *              },
 *              "square": {
 *                "height": 75,
 *                "width": 75,
 *                "source": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228660/photo-9-608d55c7e512b74ee00791db-1622228648958-s.jpg",
 *                "url": "https://res.cloudinary.com/dpuxq7nuq/image/upload/v1622228660/photo-9-608d55c7e512b74ee00791db-1622228648958-s.jpg"
 *              }
 *            },
 *            "canDownload": false
 *          },
 *          "comments": [],
 *          "favourites": 0,
 *          "views": 0,
 *          "tags": [],
 *          "hidden": true,
 *          "_id": "60b13eb4f67eb137b8815dbb",
 *          "userId": "608d55c7e512b74ee00791db",
 *          "title": "Hello",
 *          "description": "best photo ever",
 *          "dateUploaded": "2021-05-28T19:04:20.110Z",
 *          "peopleTagged": [],
 *          "__v": 0
 *          }
 *        }
 *
 * @apiUse UnauthError
 *
 */
photoRouter.post(
  '/',
  authController.protect,
  uploadController.uploadToFile,
  uploadController.photoProcessor,
  uploadController.uploadToCloud,
  photoController.uploadPhoto
);

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
 * @apiParam (Request Body) {boolean} isfriend The Photo is Visible to Friends when Private or not
 * @apiParam (Request Body) {boolean} ispublic The Photo is Visible to the Public when Private or not
 * @apiParam (Request Body) {boolean} isfamily The Photo is Visible to Family when Private or not
 * @apiParam (Request Body) {Number} permcomment Who is Allowed to Comment on the Photo
 * @apiParam (Request Body) {Number} permaddmeta Who can Add Notes and Tags to the Photo
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 *
 */
photoRouter.patch('/:id/perm');

/**
 * @api {patch} /photo/:id/perm Edit a Photo's Properties
 * @apiVersion 1.0.0
 * @apiName EditPhotoInformation
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 * @apiParam (Request Body) {String} title Photo's Name
 * @apiParam (Request Body) {String} description Photo's Description
 * @apiParam (Request Body) {[String]} tags Photo's Tags
 * @apiParam (Request Body) {Date}  dateUploaded Date Uploaded
 * @apiParam (Request Body) {Date} dateTaken   Date Taken
 * @apiParam (Request Body) {Object} permissions  The Photo's Viewing Permisions
 * @apiParam (Request Body) {Number}  license License Number (From 0 to 10)  
 * @apiParam (Request Body) {Number} safetyLevel Safety Level 
 * @apiParam (Request Body) {String} contentType Content Type 

 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
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
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.delete('/:id/');

/**
 * @api {get} /photo/:id Get Display Details for a Photo
 * @apiVersion 1.0.0
 * @apiName GetInformation
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
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
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id', photoController.getInformation);

/**
 * @api {get} /photo/:id Gets a Photo's URL for Specific Size
 * @apiVersion 1.0.0
 * @apiName GetURLforSize
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 * 
 * @apiParam (Request Body) {String} size All The Current Photo Size
 * 
 * @apiSuccess {string} photourl The Photo's URL for the Chosen Size
 * 
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
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 * 
 */
photoRouter.get('/:id/url');

/**
 * @api {patch} /photo/:id/tags Set Tags for a Photo
 * @apiVersion 1.0.0
 * @apiName SetTags
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiParam (Request Body) {String} tags All Tags for the Photo
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch('/:id/tags', authController.protect, photoController.setTags);

/**
 * @api {post} /photo/ Add a Set of Tags to a Photo
 * @apiVersion 1.0.0
 * @apiName addTag
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiParam (Request Body) {String} tags All Tags for the Photo
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.post('/:id/tags', authController.protect, photoController.addTag);

/**
 * @api {delete} /photo/:id Remove a Tag
 * @apiVersion 1.0.0
 * @apiName RemoveTag
 * @apiGroup Photo
 *
 * @apiParam {String} id The tagged ID to Remove
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam (Request Body) {String} tags All Tags to Delete
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.delete(
  '/:id/tags',
  authController.protect,
  photoController.removeTag
);

/**
 * @api {get} /photo/:id/galleries Gets all Galleries Photo Belongs to
 * @apiVersion 1.0.0
 * @apiName GetGalleriesforPhoto
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiParam (Request Body) {Number} galleriesperpage Number of Galleries to return Per Page
 * @apiParam (Request Body) {Number} page The Page of Results to Return
 * @apiParam (Request Body) {Number} perpage Number of Comments Per Page to Return
 * @apiParam (Request Body) {Number} page The Page Number to Return
 * 
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
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 * 
 */
photoRouter.get('/:id/galleries');

/**
 * @api {get} /photo/:id/contexts/all Gets all Visible Sets and Pools Photo Belongs to
 * @apiVersion 1.0.0
 * @apiName GetAllContexts
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiSuccess {Object[]} contextlist Array of ID of All Contexts Photo Belongs to
 * @apiSuccess {String[]} titlelist Array of Titles of Corresponding Contexts 
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
 *             "titlelist": [
 *
 *              ] 
 *                  
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 * 
 */
photoRouter.get('/:id/contexts/all');

/**
 * @api {get} /photo/:id/contexts Gets Previous and Next Photos for Current Photo
 * @apiVersion 1.0.0
 * @apiName GetContext
 * @apiGroup Photo
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
 *             "previousid: ",
 *             "nextid: ",
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/contexts');

/**
 * @api {get} /photo/:id/counts Gets Count of Photos Uploaded 
 * @apiVersion 1.0.0
 * @apiName GetCount
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam {Date} startdate The Date where Adding Counts Starts 
 * @apiParam {String} id The Date where Adding Counts Ends
 * 
 * @apiSuccess {Number} photocount The Count of Photos Between the Given Dates
 *  
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "photocount: " ,
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 * 
 */
photoRouter.get('/:id/counts');

/**
 * @api {get} /photo/:id/exif Gets Exif for a Photo
 * @apiVersion 1.0.0
 * @apiName GetExif
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiSuccess {string} exif The EXIF of the Photo
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *             "Exif" : ,
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/exif');

/**
 * @api {get} /photo/:id/faves Get People who Favourites the Photo
 * @apiVersion 1.0.0
 * @apiName GetFavourites
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiSuccess {Object[]} idlist Array of IDs of Users who Favourited the Photo
 * @apiSuccess {Object[]} usernamelist Array of Users who Favourited the Photo
 * @apiSuccess {Date[]} datefavourited Date at Which the User Favourited the Photo
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *             "idlist": [
 *
 *              ]
 *             "usernamelist": [
 *
 *              ]
 *             "datefavourited": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/faves', photoController.getFavourites);

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
 * @apiSuccess {Object[]} permissions The Photo's Viewing Permisions
 * @apiSuccess {Boolean} permcomment Whether the User is Allowed to Comment on the Photo or not
 * @apiSuccess {Boolean} permaddmeta Whether the User is Allowed to Add to Meta Data of the Photo or not
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
 *              "permcomment" : ,
 *              "permaddmeta" : ,
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/perm');

/**
 * @api {get} /photo/:id/sizes Get All Available Sizes for Photo
 * @apiVersion 1.0.0
 * @apiName GetSizes
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiSuccess {String[]} nameofsize Array of The Labels for the Size
 * @apiSuccess {Number[]} widths Array of the Widths of the Photo in Each Size
 * @apiSuccess {Number[]} heigths Array of the Heights of the Photo in Each Size
 * @apiSuccess {String[]} sizeurl Array of the URLs of the Photo in each Size
 * @apiSuccess {String[]} sourceurl Array of the Source URLs
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/sizes', photoController.getSizes);

/**
 * @api {patch} /photo/:id/content Set a Photo's Content Type
 * @apiVersion 1.0.0
 * @apiName SetContent
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Number} contenttype The Content Type to be Set
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */

photoRouter.patch('/:id/content');

/**
 * @api {patch} /photo/:id/date Set Photo's Dates
 * @apiVersion 1.0.0
 * @apiName SetDates
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Date} datetaken The Date the Photo was Taken
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch('/:id/date');

/**
 * @api {patch} /photo/:id/meta-data Set a Photo's Title or Description
 * @apiVersion 1.0.0
 * @apiName SetMetaData
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {String} title The New Title to be Set
 * @apiParam (Request Body) {String} desc The New Description to be Set
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch('/:id/meta-data');

/**
 * @api {patch} /photo/:id/safety-level Set a Photo's Safety Level
 * @apiVersion 1.0.0
 * @apiName SetSafetyLevel
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Number} safetylevel The Safety Level to be set
 * @apiParam (Request Body) {Boolean} hidden Whether the Photo is to be Hidden from Public Searches or Not
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch('/:id/safety-level');

/**
 * @api {post} /photo/:id/comments Add a Comment to a Photo
 * @apiVersion 1.0.0
 * @apiName AddComment
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {String} commenttext The Text in the Comment
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.post(
  '/:id/comments',
  authController.protect,
  photoController.addComment
);

/**
 * @api {delete} /photo/comments/:id Delete a Comment by Commenting User
 * @apiVersion 1.0.0
 * @apiName DeleteComment
 * @apiGroup Photo
 *
 * @apiParam {String} photoId The Photo's ID
 * @apiParam {String} commentId The Comment's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.delete(
  '/:id/comments/:commentid',
  authController.protect,
  photoController.deleteComment
);

/**
 * @api {patch} /photo/comments/:id Edit a Text of a Comment as the Commenting User
 * @apiVersion 1.0.0
 * @apiName EditComment
 * @apiGroup Photo
 *
 * @apiParam {String} id The Comment's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {String} id The New Comment Text
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch(
  '/comments/:id',
  authController.protect,
  photoController.editComment
);

/**
 * @api {get} /photo/:id/comments Get List of Comments for a Photo
 * @apiVersion 1.0.0
 * @apiName GetComments
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiSuccess {Object[]} commentlist Array of Comments on a Photo
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "commentlist": [
 *
 *              ]
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/comments', photoController.getComments);

/**
 * @api {get} /photo/:id/comments/recent Get List of Recent Comments of Contact's Photos
 * @apiVersion 1.0.0
 * @apiName GetRecentforContacts
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Date} latestdate Latest Date to Get Comments
 * @apiParam (Request Body) {Object[]} userids User IDs to Get Comments of
 * @apiParam (Request Body) {Number} perpage Number of Comments Per Page to Return
 * @apiParam (Request Body) {Number} page The Page Number to Return
 *
 * @apiSuccess {Object[]} commentlist Array of Comments on
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "commentlist": [
 *
 *              ]
 *
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/comments/recent');

/**
 * @api {get} /photo/:id/location Get Location of a Photo
 * @apiVersion 1.0.0
 * @apiName GetLocation
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiSuccess {Object[]} location Location of Photo
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *             "location: ",
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 */
photoRouter.get('/:id/location');

/**
 * @api {patch} /photo/:id/location Set a Photo's Location
 * @apiVersion 1.0.0
 * @apiName SetLocation
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {String} latitude The Latitude to be Set
 * @apiParam (Request Body) {String} longtitude The Longtitude to be Set
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch('/:id/location');

/**
 * @api {delete} /photo/:id/location Delete a Photo's Location
 * @apiVersion 1.0.0
 * @apiName DeleteLocation
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.delete('/:id/location');

/**
 * @api {get} /photo/:id/licenses Get Licenses of a Photo
 * @apiVersion 1.0.0
 * @apiName GetLicenses
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID 
 *
 * @apiSuccess {Number} license License of Photo
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "license: "
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 * 
 */
photoRouter.get('/:id/licenses');

/**
 * @api {patch} /photo/:id/licenses Set License of a Photo
 * @apiVersion 1.0.0
 * @apiName SetLicense
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Number} licenses The License to be Set
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 *
 */
photoRouter.patch('/:id/licenses');

/**
 * @api {post} /photo/:id/tags/:userId Tag a Person to a Photo
 * @apiVersion 1.0.0
 * @apiName AddPeople
 * @apiGroup Photo
 *
 * @apiParam {String} photoid ID of Photo to Tag in
 * @apiParam {String} userid ID of User to Tag
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Number} xcoordinate The Left Most Pixel Coordinate Around the Tagged Person
 * @apiParam (Request Body) {Number} ycoordinate The Top Most Pixel Coordinate Around the Tagged Person
 * @apiParam (Request Body) {Number} width The Width of the Box Around the Person
 * @apiParam (Request Body) {Number} heigth The Height of the Box Around the Person
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.post(
  '/:id/tags/:userid',
  authController.protect,
  photoController.tagUser
);

/**
 * @api {delete} /photo/:id/tags/:userId Remove a User from a Photo
 * @apiVersion 1.0.0
 * @apiName removePerson
 * @apiGroup Photo
 *
 * @apiParam {String} photoid The Photo's ID to Remove from
 * @apiParam {String} userid The User's ID to Remove
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UserNotFoundError
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.delete(
  '/:id/tags/:userid',
  authController.protect,
  photoController.removePerson
);

/**
 * @api {get} /photo/:id/tags Gets a List of User's Tagged in a Photo
 * @apiVersion 1.0.0
 * @apiName GetTagged
 * @apiGroup Photo
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
 *              "peopleTagged": [
 *                          {
 *                               _id: '609093af84b808271488fafd',
 *                               userId: '608d5450ec00005468604a0c',
 *                               tagDate: '2012-04-13T18:25:43.511Z',
 *                           },
 *              ]
 *
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.get('/:id/tags', photoController.getTagged);

/**
 * @api {patch} /photo/:id/rotate Rotate a Photo
 * @apiVersion 1.0.0
 * @apiName RotatePhoto
 * @apiGroup Photo
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {Number} degrees Degrees by which you Rotate a Photo Clockwise
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenError
 * @apiUse PhotoNotFoundError
 *
 */
photoRouter.patch('/:id/rotate');

// EXPORT ROUTER
module.exports = photoRouter;
