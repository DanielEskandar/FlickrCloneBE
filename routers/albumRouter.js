// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
//const albumController = require('../controllers/albumController.js');

// CREATE ROUTER
const albumRouter = express.Router();

// APIDOC DEFINITIONS

/**
 * @apiDefine AlbumNotFoundError
 * @apiError AlbumNotFound No album is found by that album ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No album is found by that album ID"
 *      }
 */

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

// ROUTE URLs

/**
 * @api {get} /photoset/:id Get Album's Information
 * @apiVersion 1.0.0
 * @apiName GetAlbumInfo
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 *
 * @apiSuccess {String} title Album's Name
 * @apiSuccess {String} description Album's Description
 * @apiSuccess {Object[]} photos Array of Album's photos
 * @apiSuccess {Number} photoscount The count of Album's photos
 * @apiSuccess {Number} videoscount The count of Album's videos
 * @apiSuccess {ObjectID} primaryphoto The primary photo's id
 * @apiSuccess {Object[]} comments  Array of Album's comments
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "title": sunsets,
 *              "description": best sunset photos,
 *              "photos count": 17,
 *              "videos count": 3,
 *              "primaryphoto": 292882708,
 *              "photos": [
 *
 *               ]
 *              "comments" : [
 *
 *               ]
 *          }
 *      }
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.get('/:id');

/**
 * @api {get} /photoset/:id/context/:photoid Get next and previous photos for a photo
 * @apiVersion 1.0.0
 * @apiName GetAlbumInfo
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 * @apiParam {String} photoid The Photo's ID
 *
 * @apiSuccess {ObjectID} prevphoto Previous Photo
 * @apiSuccess {ObjectID} nextphoto Next Photo
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *
 *              "previous photo": 2980,
 *              "next photo": 2985
 *          }
 *      }
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse PhotoNotFoundError
 */

albumRouter.get('/:id/context/:photoid');

/**
 * @api {get} /photoset/:id/photos Get Album's Photos
 * @apiVersion 1.0.0
 * @apiName GetAlbumPhotos
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 *
 * @apiSuccess {Object[]} photos Array of Album's photos
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *               ]
 *          }
 *      }
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.get('/:id/photos');

/**
 * @api {get} /photoset/:id/comments Get Album Comments
 * @apiVersion 1.0.0
 * @apiName GetAlbumComments
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 *
 * @apiSuccess {Object[]} comments Array of Album comments
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "comments": [
 *
 *               ]
 *          }
 *      }
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.get('/:id/comments');

/**
 * @api {delete} /photoset/:id Delete an Album
 * @apiVersion 1.0.0
 * @apiName DeleteAlbum
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse UnauthError
 */

albumRouter.delete('/:id');

/**
 * @api {delete} /photoset/:id/photos Delete multiple photos
 * @apiVersion 1.0.0
 * @apiName DeletePhotos
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 *
 * @apiBody {Object[]} photos List of photos to remove from the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse UnauthError
 */

albumRouter.delete('/:id/photos');

/**
 * @api {delete} /photoset/:id/:photoid Delete Photo
 * @apiVersion 1.0.0
 * @apiName DeletePhoto
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 * @apiParam {String} photoid The Photo's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse PhotoNotFoundError
 *
 * @apiUse UnauthError
 */

albumRouter.delete('/:id/:photoid');

/**
 * @api {delete} /photoset/comments/:id Delete Comment
 * @apiVersion 1.0.0
 * @apiName DeleteComment
 * @apiGroup Album
 *
 * @apiParam {String} id The Comment's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiError CommentNotFoundError No comment is found by that comment ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No comment is found by that comment ID"
 *      }
 */

albumRouter.delete('/comments/:id');

/**
 * @api {post} /photoset/ Create a new album
 * @apiVersion 1.0.0
 * @apiName CreateAlbum
 * @apiGroup Album
 *
 * @apiBody {String} title Album's Name
 * @apiBody {String} description Album's Description
 * @apiBody {String} primaryphoto The first photo to add to your Album
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

albumRouter.post('/');

/**
 * @api {post} /photoset/:id/photos Add a photo
 * @apiVersion 1.0.0
 * @apiName AddPhoto
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiBody {String} photo The Photo to add to the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse UnauthError
 *
 */

albumRouter.post('/:id/photos');

/**
 * @api {post} /photoset/:id/comments Add a comment
 * @apiVersion 1.0.0
 * @apiName AddComment
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiBody {String} body The body of the comment
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.post('/:id/comments');

/**
 * @api {put} /photoset/:id/photos Add, Remove and Reorder photos
 * @apiVersion 1.0.0
 * @apiName EditPhotos
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiBody {String} primaryphoto The photo to use as primary photo for the album. Must also be included in the photos list
 * @apiBody {Object[]} photos The ordered list of photos to include in the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.put('/:id/photos');

/**
 * @api {patch} /photoset/:id/meta Modify the meta-data
 * @apiVersion 1.0.0
 * @apiName EditMeta
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiBody {String} title The title of the album
 * @apiBody {String} description The new description for the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.patch('/:id/meta');

/**
 * @api {patch} /photoset/comments/:id Edit the body of a comment
 * @apiVersion 1.0.0
 * @apiName EditComment
 * @apiGroup Album
 *
 * @apiParam {String} id The comment's ID
 *
 * @apiBody {String} body Update  the comment to this text
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiError CommentNotFoundError No comment is found by that comment ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No comment is found by that comment ID"
 *      }
 */

albumRouter.patch('/comments/:id');

/**
 * @api {patch} /photoset/:id/primary/:photoid Set album's primary photo
 * @apiVersion 1.0.0
 * @apiName SetPrimaryPhoto
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 * @apiParam {String} photoid The ID of the photo to set as primary
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse PhotoNotFoundError
 */

albumRouter.patch('/:id/primary/:photoid');

/**
 * @api {patch} /photoset/setorder Set the order of albums
 * @apiVersion 1.0.0
 * @apiName SetAlbumsOrder
 * @apiGroup Album
 *
 * @apiBody {Object[]} albums Ordered list of albums
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

albumRouter.patch('/setorder');

/**
 * @api {patch} /photoset/:id/reorder Set the order of photos
 * @apiVersion 1.0.0
 * @apiName SetPhotosOrder
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiBody {Object[]} photos Ordered list of photos
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.patch('/:id/reorder');

// EXPORT ROUTER
module.exports = albumRouter;
