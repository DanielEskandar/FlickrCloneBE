// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
//const galleryController = require('../controllers/galleryController.js');

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
 * @apiSuccess {String} title Gallery's Name
 * @apiSuccess {String} description Gallery's Description
 * @apiSuccess {Object[]} photos Array of gallery's photos
 * @apiSuccess {Number} photoscount The count of gallery's photos
 * @apiSuccess {Number} videoscount The count of gallery's videos
 * @apiSuccess {Number} viewscount The count of views
 * @apiSuccess {ObjectID} primaryphoto The primary photo's id
 * @apiSuccess {Object[]} comments  Array of gallery's comments
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
 *              "views count": 20,
 *              "primary photo id": 292882708,
 *              "photos": [
 *
 *               ]
 *              "comments" : [
 *
 *               ]
 *          }
 *      }
 *
 * @apiUse GalleryNotFoundError
 */

galleryRouter.get('/:id');

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

galleryRouter.get('/:id/photos');

/**
 * @api {get} /gallery/:id/comments Get Gallery's Comments
 * @apiVersion 1.0.0
 * @apiName GetGalleryComments
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

galleryRouter.get('/:id/comments');

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
 * @apiError CommentNotFoundError No comment is found by that comment ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No comment is found by that comment ID"
 *      }
 */

galleryRouter.delete('/comments/:id');

/**
 * @api {post} /gallery/ Create a new gallery
 * @apiVersion 1.0.0
 * @apiName CreateGallery
 * @apiGroup Gallery
 *
 * @apiBody {String} title Gallery's Name
 * @apiBody {String} description Gallery's Description
 * @apiBody {String} primaryphoto The first photo to add to your gallery
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

galleryRouter.post('/');

/**
 * @api {post} /gallery/:id/photos Add a photo
 * @apiVersion 1.0.0
 * @apiName AddPhoto
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
 *
 * @apiBody {String} photo The Photo to add to the gallery
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
 * @apiBody {String} body The body of the comment
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 *
 */

galleryRouter.post('/:id/comments');

/**
 * @api {put} /gallery/:id/photos Add, Remove and Reorder photos
 * @apiVersion 1.0.0
 * @apiName EditPhotos
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
 *
 * @apiBody {String} primaryphoto The photo to use as primary photo for the gallery. Must also be included in the photos list
 * @apiBody {Object[]} photos The ordered list of photos to include in the gallery
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 *
 * @apiUse GalleryNotFoundError
 *
 */

galleryRouter.put('/:id/photos');

/**
 * @api {patch} /gallery/:id/meta Modify the meta-data
 * @apiVersion 1.0.0
 * @apiName EditMeta
 * @apiGroup Gallery
 *
 * @apiParam {String} id The gallery's ID
 *
 * @apiBody {String} title The title of the Gallery
 * @apiBody {String} description The new description for the gallery
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
 * @apiBody {String} body Update the comment to this text
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

galleryRouter.patch('/comments/:id');

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
 * @apiBody {String} comment The updated comment
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
