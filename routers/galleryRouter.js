// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const galleryController = require('../controllers/galleryController.js');

// CREATE ROUTER
const galleryRouter = express.Router();

// APIDOC DEFINITIONS

/**
 * @apiDefine GalleryNotFoundError
 * @apiError GalleryNotFound No gallery is found by that gallery ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No gallery is found by that gallery ID"
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
 * @api {get} /gallery/:id Get Gallery's Information
 * @apiVersion 1.0.0
 * @apiName GetGalleryInfo
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 *
 * @apiSuccess {String} status Status of the Operation
 * @apiSuccess {String} title Gallery's Name
 * @apiSuccess {String} description Gallery's Description
 * @apiSuccess {Object[]} photos Array of gallery's photos
 * @apiSuccess {Number} photoscount The count of gallery's photos
 * @apiSuccess {Number} viewscount The count of views
 * @apiSuccess {ObjectID} primaryphoto The primary photo's id
 * @apiSuccess {Object[]} comments  Array of gallery's comments
 * @apiSuccess {Date} createdAt created At Date
 * @apiSuccess {Date} updatedAt  updated At Date
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "_id" : "708f34a634413f11f020b139"
 *              "galleryName": sunsets,
 *              "description": best sunset photos,
 *              "photos count": 17,
 *              "views count": 20,
 *              "createdAt": "2021-05-03T00:07:30.005Z",
 *              "updatedAt": "2021-05-03T00:07:30.005Z",
 *              "primary photo id": 292882708,
 *              "photos": [
 *
 *               ]
 *              "comments" : [
 *
 *               ],
 *             "createdAt": "2021-05-03T00:07:30.005Z",
 *             "updatedAt": "2021-05-03T00:07:30.005Z"
 *
 *          }
 *      }
 *
 * @apiUse GalleryNotFoundError
 */

galleryRouter.get('/:id', galleryController.getInfo);

/**
 * @api {get} /gallery/:id/photos Get Gallery's Photos
 * @apiVersion 1.0.0
 * @apiName GetGalleryPhotos
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 *
 * @apiSuccess {Object[]} photos Array of gallery's photos
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
 * @apiUse GalleryNotFoundError
 */

galleryRouter.get('/:id/photos', galleryController.getPhotos);

/**
 * @api {get} /gallery/:id/comments Get Gallery's Comments
 * @apiVersion 1.0.0
 * @apiName GetComments
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 *
 * @apiSuccess {Object[]} comments Array of gallery's comments
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
 * @apiUse GalleryNotFoundError
 */

galleryRouter.get('/:id/comments', galleryController.getComments);

/**
 * @api {delete} /gallery/:id Delete a Gallery
 * @apiVersion 1.0.0
 * @apiName DeleteGallery
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse GalleryNotFoundError
 *
 * @apiUse UnauthError
 */

galleryRouter.delete('/:id');

/**
 * @api {delete} /gallery/:id/:photoid Delete Photo
 * @apiVersion 1.0.0
 * @apiName DeletePhoto
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 * @apiParam {String} photoid The Photo's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse GalleryNotFoundError
 *
 * @apiUse PhotoNotFoundError
 *
 * @apiUse UnauthError
 */

galleryRouter.delete('/:id/:photoid');

/**
 * @api {delete} /gallery/comments/:id Delete Comment
 * @apiVersion 1.0.0
 * @apiName DeleteComment
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Comment's ID
 *
 * @apiUse SuccessRes
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

galleryRouter.delete(
  '/:id/comments/:commentid',
  galleryController.deleteComment
);

/**
 * @api {post} /gallery/ Create a new gallery
 * @apiVersion 1.0.0
 * @apiName CreateGallery
 * @apiGroup Gallery
 *
 * @apiParam (Request Body) {String} title Gallery's Name
 * @apiParam (Request Body) {String} description Gallery's Description
 * @apiParam (Request Body) {String} primaryphoto The first photo to add to your gallery
 *
 * @apiDefine SuccessRes
 * @apiSuccess {String} status Status of the Operation
 * @apiSuccess {String} title Gallery's Name
 * @apiSuccess {String} description Gallery's Description
 * @apiSuccess {Object[]} photos Array of gallery's photos
 * @apiSuccess {Number} photoscount The count of gallery's photos
 * @apiSuccess {Number} viewscount The count of views
 * @apiSuccess {ObjectID} primaryphoto The primary photo's id
 * @apiSuccess {Object[]} comments  Array of gallery's comments
 * @apiSuccess {Date} createdAt created At Date
 * @apiSuccess {Date} updatedAt  updated At Date
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "_id" : "708f34a634413f11f020b139"
 *              "galleryName": sunsets,
 *              "description": best sunset photos,
 *              "photos count": 17,
 *              "views count": 20,
 *              "createdAt": "2021-05-03T00:07:30.005Z",
 *              "updatedAt": "2021-05-03T00:07:30.005Z",
 *              "primary photo id": 292882708,
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

galleryRouter.post('/', galleryController.createGallery);

/**
 * @api {post} /gallery/:id/photos Add a photo
 * @apiVersion 1.0.0
 * @apiName AddPhoto
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
 *
 * @apiParam (Request Body) {String} photo The Photo to add to the gallery
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 */

galleryRouter.post('/:id/photos');

/**
 * @api {post} /gallery/:id/comments Add a comment
 * @apiVersion 1.0.0
 * @apiName AddComment
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
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
 * @apiUse GalleryNotFoundError
 *
 */

galleryRouter.post('/:id/comments', galleryController.addComment);

/**
 * @api {patch} /gallery/:id/photos Add, Remove and Reorder photos
 * @apiVersion 1.0.0
 * @apiName EditPhotos
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
 *
 * @apiParam (Request Body) {String} primaryphoto The photo to use as primary photo for the gallery. Must also be included in the photos list
 * @apiParam (Request Body) {Object[]} photos The ordered list of photos to include in the gallery
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 *
 */

galleryRouter.patch('/:id/photos');

/**
 * @api {patch} /gallery/:id/meta Modify the meta-data
 * @apiVersion 1.0.0
 * @apiName EditMeta
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
 *
 * @apiParam (Request Body) {String} title The title of the Gallery
 * @apiParam (Request Body) {String} description The new description for the gallery
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 */

galleryRouter.patch('/:id/meta');

/**
 * @api {patch} /gallery/comments/:id Edit the body of a comment
 * @apiVersion 1.0.0
 * @apiName EditComment
 * @apiGroup Gallery
 *
 * @apiParam {String} id The comment's ID
 *
 * @apiParam (Request Body) {String} body Update the comment to this text
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
 *            "body": "I like it",
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

galleryRouter.patch('/comments/:id', galleryController.editComment);

/**
 * @api {patch} /gallery/:id/primary/:photoid Set gallery's primary photo
 * @apiVersion 1.0.0
 * @apiName SetPrimaryPhoto
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 * @apiParam {String} photoid The ID of the photo to set as primary
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 *
 * @apiUse PhotoNotFoundError
 */

galleryRouter.patch('/:id/primary/:photoid');

/**
 * @api {patch} /gallery/:id/:photoid Edit the comment for a gallery photo
 * @apiName EditPhoto
 * @apiGroup Gallery
 *
 * @apiParam {String} id The Gallery's ID
 * @apiParam {String} photoid The ID of the photo to set as primary
 *
 * @apiParam (Request Body) {String} comment The updated comment
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 *
 * @apiUse PhotoNotFoundError
 */

galleryRouter.patch('/:id/:photoid');

// EXPORT ROUTER
module.exports = galleryRouter;
