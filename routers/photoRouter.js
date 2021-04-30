// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const photoController = require('../controllers/photoController.js');

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
 * @apiBody {Number} ticket The Ticket of the Upload
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
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
 * @apiBody {Number} permcomment Who is Allowed to Comment on the Photo
 * @apiBody {Number} permaddmeta Who can Add Notes and Tags to the Photo
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

/**
 * @api {get} /photo/:id Get Display Details for a Photo
 * @apiVersion 1.0.0
 * @apiName GetInformation
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
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
 * @apiParam {String} id The Photo's ID
 * 
 * @apiBody {String} size All The Current Photo Size
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
 * @apiBody {String} tags All Tags for the Photo
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/tags');

/**
 * @api {post} /photo/ Add a Set of Tags to a Photo
 * @apiVersion 1.0.0
 * @apiName AddTags
 * @apiGroup Photo
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiBody {String} tags All Tags for the Photo
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
 * @apiParam {String} id The tagged ID to Remove
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiBody {String} tags All Tags to Delete
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
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiHeader {String} Token Authenticaton Token
 * 
 * @apiBody {Number} galleriesperpage Number of Galleries to return Per Page
 * @apiBody {Number} page The Page of Results to Return
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
 * @apiName GetAllContexts
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
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
 */
photoRouter.get('/:id/contexts/all');

//--------------------CHK
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
               "nextid: ",
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/contexts');

//-----------------WHY RETURN FROM AND TO DATES? AND SEND TWO DATES?
// ----------------ALSO WE DONT NEED ID OF USER TO SEND RIGHT
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
               "count: " ,
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
 * @apiParam {String} id The Photo's ID 
 * 
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {string} exif The EXIF of the Photo
 *  
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "Exif" : ,
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/exif');

/**
 * @api {get} /photo/:id/faves Get People who Favourites the Photo
 * @apiVersion 1.0.0
 * @apiName GetFavourites
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
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
               "idlist": [
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
 * @apiHeader {String} Token Authenticaton Token
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
 *             "nameofsize": [
 *
 *              ]
 *             "widths": [
 *
 *              ]
 *             "heights": [
 *
 *              ]
 *             "sizeurl": [
 *
 *              ]
 *             "sourceurl": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/sizes');

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
 * @apiBody {Number} contenttype The Content Type to be Set
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
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
 * @apiBody {Date} datetaken The Date the Photo was Taken
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
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {String} title The New Title to be Set
 * @apiBody {String} desc The New Description to be Set
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
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {Number} safetylevel The Safety Level to be set
 * @apiBody {Boolean} hidden Whether the Photo is to be Hidden from Public Searches or Not
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
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {String} commenttext The Text in the Comment
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
 * @apiParam {String} id The Comment's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {String} id The New Comment Text
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
 * @apiBody {Date} mindate Starting Date to Get Comments
 * @apiBody {Date} maxdate Latest Date to Get Comments
 *
 * @apiSuccess {Object[]} commentlist Array of Comments on a Photo
 * @apiSuccess {Object[]} permalink Array of Permalinks of Comments
 * @apiSuccess {Date[]} datelist Array of Dates Comment was Added
 *
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
 *              "permalinklist": [
 *
 *              ]
 *              "datelist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
photoRouter.get('/:id/comments');

//-----------------------SHOULD ID BE SENT HERE? SINCE IN ENDPOINT LINK
// ALSO PERMISSIONS RETURNED ARE OF WHO? THE COMMENTER? THE CONTECT? ME?
/**
 * @api {get} /photo/:id/comments/recent Get List of Recent Comments of Contact's Photos
 * @apiVersion 1.0.0
 * @apiName GetRecentforContacts
 * @apiGroup Photo
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiBody {Date} latestdate Latest Date to Get Comments
 * @apiBody {Object[]} userids User IDs to Get Comments of
 * @apiBody {Number} perpage Number of Comments Per Page to Return
 * @apiBody {Number} page The Page Number to Return
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
 * @apiHeader {String} Token Authenticaton Token
 * 
 * @apiSuccess {Object[]} location Location of Photo
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
               "location: ",
 *          }
 *      }
 *
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
 * @apiBody {String} latitude The Latitude to be Set
 * @apiBody {String} longtitude The Longtitude to be Set
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
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
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
 * @apiHeader {String} Token Authenticaton Token
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
 * @apiBody {Number} licenses The License to be Set
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse PhotoNotFoundError
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
 * @apiBody {Number} xcoordinate The Left Most Pixel Coordinate Around the Tagged Person
 * @apiBody {Number} ycoordinate The Top Most Pixel Coordinate Around the Tagged Person
 * @apiBody {Number} width The Width of the Box Around the Person
 * @apiBody {Number} heigth The Height of the Box Around the Person
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.post('/:id/tags/:userId');

/**
 * @api {delete} /photo/:id/tags/:userId Remove a User from a Photo
 * @apiVersion 1.0.0
 * @apiName RemovePerson
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
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 *
 * @apiSuccess {Object[]} taggedlist Array of User IDs Tagged in the Photo
 * @apiSuccess {Object[]} usernamelist Array of User Names of Users Tagged
 * @apiSuccess {Object[]} realnamelist Array of Real Names of Users Tagged
 * @apiSuccess {Object[]} addedbylist Array of Users who Added the Tag
 * @apiSuccess {Object[]} xlist Array of X Coordinate of the Box
 * @apiSuccess {Object[]} ylist Array of Y Coordinate of the Box
 * @apiSuccess {Object[]} heightlist Array of Height of the Box
 * @apiSuccess {Object[]} widthlist Array of Width of the Box
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "taggedlist": [
 *
 *              ]
 *              "usernamelist": [
 *
 *              ]
 *              "realnamelist": [
 *
 *              ]
 *              "addedbylist": [
 *
 *              ]
 *              "xlist": [
 *
 *              ]
 *              "ylist": [
 *
 *              ]
 *              "heightlist": [
 *
 *              ]
 *              "widthlist": [
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
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {Number} degrees Degrees by which you Rotate a Photo Clockwise
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
photoRouter.patch('/:id/rotate');

// EXPORT ROUTER
module.exports = photoRouter;
