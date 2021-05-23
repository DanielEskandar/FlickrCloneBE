// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const albumController = require('../controllers/albumController.js');
const authController = require('../controllers/authController.js');

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
 * @apiSuccess {String} albumName Album's Name
 * @apiSuccess {String} description Album's Description
 * @apiSuccess {Object[]} photos Array of Album's photos
 * @apiSuccess {Number} photoscount The count of Album's photos
 * @apiSuccess {ObjectID} primaryphoto The primary photo's id
 * @apiSuccess {Object[]} comments  Array of Album's comments
 * @apiSuccess {Date} createdAt created At Date
 * @apiSuccess {Date} updatedAt  updated At Date
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *  *            "_id": "5590beb07237ad1fb4458fae",
 *              "albumName": sunsets,
 *              "description": best sunset photos,
 *              "photoscount": 17,
 *              "primaryphoto": 292882708,
 *              "photos": [
 *
 *               ]
 *              "comments" : [
 *
 *               ]
 *             "createdAt": "2021-05-03T00:07:30.005Z",
 *             "updatedAt": "2021-05-03T00:07:30.005Z"
 *          }
 *      }
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.get('/:id', albumController.getInfo);

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

albumRouter.get('/:id/photos', albumController.getPhotos);

/**
 * @api {get} /photoset/:id/comments Get Album Comments
 * @apiVersion 1.0.0
 * @apiName GetComments
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

albumRouter.get('/:id/comments', albumController.getComments);

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
 * @apiName RemovePhotos
 * @apiGroup Album
 *
 * @apiParam {String} id The Album's ID
 *
 * @apiParam (Request Body) {Object[]} photos List of photos to remove from the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse UnauthError
 */

albumRouter.delete(
  '/:id/photos',
  authController.protect,
  albumController.removePhotos
);

/**
 * @api {delete} /photoset/:id/:photoid Delete Photo
 * @apiVersion 1.0.0
 * @apiName RemovePhoto
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

albumRouter.delete('/:id/:photoid', albumController.removePhoto);

/**
 * @api {delete} /photoset/comments/:id Delete Comment
 * @apiVersion 1.0.0
 * @apiName DeleteComment
 * @apiGroup Album
 *
 * @apiParam {String} id The Comment's ID
 *
 * @apiDefine SuccessRes
 * @apiSuccess {String} status Status of the Operation
 * @apiSuccess {String} data Success Message
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 204 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *            "_id": "5590beb07237ad1fb4458fae",
 *            "userId": "608d5450ec00005468607a0c",
 *            "body": "good one",
 *            "date": "2021-05-14T20:53:10.256Z"
 *         }
 *      }
 *
 * @apiUse UnauthError
 *
 * @apiError CommentNotFoundError No Comment Found with This ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No Comment Found with This ID"
 *      }
 */

albumRouter.delete(
  '/:id/comments/:commentid',
  authController.protect,
  albumController.deleteComment
);

/**
 * @api {post} /photoset/ Create a new album
 * @apiVersion 1.0.0
 * @apiName CreateAlbum
 * @apiGroup Album
 *
 * @apiParam (Request Body) {String} title Album's Name
 * @apiParam (Request Body) {String} description Album's Description
 * @apiParam (Request Body) {String} primaryphoto The first photo to add to your Album
 *
 * @apiSuccess {String} albumName Album's Name
 * @apiSuccess {String} description Album's Description
 * @apiSuccess {Object[]} photos Array of Album's photos
 * @apiSuccess {Number} photoscount The count of Album's photos
 * @apiSuccess {ObjectID} primaryphoto The primary photo's id
 * @apiSuccess {Object[]} comments  Array of Album's comments
 * @apiSuccess {Date} createdAt created At Date
 * @apiSuccess {Date} updatedAt  updated At Date
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "_id": "5590beb07237ad1fb4458fae",
 *              "albumName": sunsets,
 *              "description": best sunset photos,
 *              "photocount": 17,
 *              "primaryphoto": 292882708,
 *              "photos": [
 *
 *               ]
 *              "comments" : [
 *
 *               ]
 *             "createdAt": "2021-05-03T00:07:30.005Z",
 *             "updatedAt": "2021-05-03T00:07:30.005Z"
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

albumRouter.post('/', albumController.createAlbum);

/**
 * @api {post} /photoset/:id/photos Add a photo
 * @apiVersion 1.0.0
 * @apiName AddPhoto
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiParam (Request Body) {String} photo The Photo to add to the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse AlbumNotFoundError
 *
 * @apiUse UnauthError
 *
 */

albumRouter.post(
  '/:id/photos',
  authController.protect,
  albumController.addPhoto
);

/**
 * @api {post} /photoset/:id/comments Add a comment
 * @apiVersion 1.0.0
 * @apiName AddComment
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiParam (Request Body) {String} body The body of the comment
 *
 * @apiDefine SuccessRes
 * @apiSuccess {String} status Status of the Operation
 * @apiSuccess {String} data Success Message
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *            "_id": "5590beb07237ad1fb4458fae",
 *            "userId": "608d5450ec00005468607a0c",
 *            "body": "good one",
 *            "date": "2021-05-14T20:53:10.256Z"
 *         }
 *      }
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.post(
  '/:id/comments',
  authController.protect,
  albumController.addComment
);

/**
 * @api {patch} /photoset/:id/photos Add, Remove and Reorder photos
 * @apiVersion 1.0.0
 * @apiName EditPhotos
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiParam (Request Body) {String} primaryphoto The photo to use as primary photo for the album. Must also be included in the photos list
 * @apiParam (Request Body) {Object[]} photos The ordered list of photos to include in the album
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse AlbumNotFoundError
 */

albumRouter.patch('/:id/photos');

/**
 * @api {patch} /photoset/:id/meta Modify the meta-data
 * @apiVersion 1.0.0
 * @apiName EditMeta
 * @apiGroup Album
 *
 * @apiParam {String} id The album's ID
 *
 * @apiParam (Request Body) {String} title The title of the album
 * @apiParam (Request Body) {String} description The new description for the album
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
 * @apiParam (Request Body) {String} body Update  the comment to this text
 *
 * @apiDefine SuccessRes
 * @apiSuccess {String} status Status of the Operation
 * @apiSuccess {String} data Success Message
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *            "_id": "5590beb07237ad1fb4458fae",
 *            "userId": "608d5450ec00005468607a0c",
 *            "body": "good one",
 *            "date": "2021-05-14T20:53:10.256Z"
 *         }
 *      }
 *
 * @apiUse UnauthError
 *
 * @apiError CommentNotFoundError No Comment Found with This ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No Comment Found with This ID"
 *      }
 */

albumRouter.patch(
  '/comments/:id',
  authController.protect,
  albumController.editComment
);

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
 * @apiParam (Request Body) {Object[]} albums Ordered list of albums
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
 * @apiParam (Request Body) {Object[]} photos Ordered list of photos
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
