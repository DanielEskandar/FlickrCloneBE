

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


photoRouter.get('/:id/contexts');
photoRouter.get('/:id/counts');
photoRouter.get('/:id/exif');
photoRouter.get('/:id/faves');
photoRouter.get('/:id/perm');
photoRouter.get('/:id/sizes');
photoRouter.patch('/:id/content');
photoRouter.patch('/:id/date');
photoRouter.patch('/:id/meta-data');
photoRouter.patch('/:id/safety-level');
photoRouter.post('/:id/comments');
photoRouter.delete('/comments/:id');
photoRouter.patch('/comments/:id');
photoRouter.get('/:id/comments');
photoRouter.get('/:id/comments/recent');
photoRouter.get('/:id/location');
photoRouter.patch('/:id/location');
photoRouter.delete('/:id/location');
photoRouter.get('/:id/licenses');
photoRouter.patch('/:id/licenses');
photoRouter.post('/:id/tags/:userId');
photoRouter.delete('/:id/tags/:userId');
photoRouter.get('/:id/tags');
photoRouter.patch('/:id/rotate')


// EXPORT ROUTER
module.exports = photoRouter;
