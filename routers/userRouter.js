// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const userController = require('../controllers/userController.js');

// CREATE ROUTER
const userRouter = express.Router();

// APIDOC DEFINITIONS

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

userRouter.get('/createUser', userController.simple);

userRouter.post('/sign-up');
userRouter.post('confirm');
userRouter.post('/sign-in');
userRouter.post('/sign-out');

/**
 * @api {patch} /user/ Update the User's Information
 * @apiVersion 1.0.0
 * @apiName UpdateUserInfo
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.patch('/');

/**
 * @api {delete} /user/ Delete the User's Account
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.delete('/');

/**
 * @api {get} /user/:id Get the User's Information
 * @apiVersion 1.0.0
 * @apiName GetUserInfo
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {String} username Username of the User
 * @apiSuccess {String} firstname First Name of the User
 * @apiSuccess {String} lastname Last Name of the User
 * @apiSuccess {Boolean} pro The type of user (pro or not)
 * @apiSuccess {String} aboutme Small text about the user set by the user
 * @apiSuccess {Date} joindate Date the user joined flickr
 * @apiSuccess {string} profileurl Url of the user's profile
 * @apiSuccess {string} location The user's current stored location
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "username": "ahmedtarek914",
 *              "firstname": "Ahmed",
 *              "lastname": "Abdulkader",
 *              "pro": false,
 *              "aboutme": "Not a lot to say about me :)",
 *              "joindate": 2012-04-23T18:25:43.511Z,
 *              "profileurl": "http://www.flickr.com/people/ahmed/",
 *              "location": "Cairo, Egypt"
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id');

/**
 * @api {get} /user/:id/stats Get the User's Statistics
 * @apiVersion 1.0.0
 * @apiName GetUserStats
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Number} views The Profile View Count
 * @apiSuccess {Number} tags The count of photos the user was tagged in
 * @apiSuccess {Number} geotags The count of geotags the user has
 * @apiSuccess {Number} faves The count of faves on the user's photos
 * @apiSuccess {Number} groups The count of groups the user is in
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "views": 9200000,
 *              "tags": 159,
 *              "geotags": 0,
 *              "faves": 131,
 *              "groups": 140
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/stats');

/**
 * @api {get} /user/:id/popular Get the User's Most Popular Photos
 * @apiVersion 1.0.0
 * @apiName GetUserPopular
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's most popular photos (Fave Count)
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/popular');

/**
 * @api {get} /user/:id/recent Get the User's Most Recent Photos
 * @apiVersion 1.0.0
 * @apiName GetUserRecent
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's most recent photos
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/recent');

/**
 * @api {get} /user/:id/recent-update Get the User's Most Recently Modified Photos
 * @apiVersion 1.0.0
 * @apiName GetUserRecentModified
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's most recently modified photos
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/:locationId');

/**
 * @api {get} /user/:id/:locationId Get the User's Photos taken in a certain location
 * @apiVersion 1.0.0
 * @apiName GetPhotoLocation
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 * @apiParam (string) loacationId The ID of the location
 *
 * @apiSuccess {Object[]} photos Array of the user's photos taken in the specified location
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/:locationId');

/**
 * @api {get} /user/:id/not-set Return Photos not in any sets (Galleries or Albums)
 * @apiVersion 1.0.0
 * @apiName GetNotInSet
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's photos not in any sets (Galleries or Albums)
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/not-set');

/**
 * @api {get} /user/:id/untagged Return a List of photos with no tags
 * @apiVersion 1.0.0
 * @apiName GetUntagged
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's photos with no tags
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/untagged');
userRouter.get('/:id/geo');
userRouter.get('/:id/no-geo');
userRouter.get('/:id/testimonials');
userRouter.post('/:id/testimonials');
userRouter.get('/:id/stats');
userRouter.get('/:id/popular');
userRouter.get('/:id/recent');
userRouter.get('/:id/recent-update');
userRouter.get('/:id/:locationId');
userRouter.get('/:id/not-set');
userRouter.get('/:id/untagged');
userRouter.get('/:id/geo');
userRouter.get('/:id/no-geo');
userRouter.get('/:id/testimonials');
userRouter.post('/:id/testimonials');
userRouter.get('/:id/faves');
userRouter.get('/:id/gallery');
userRouter.get('/:id/groups');
userRouter.get('/:id/stream');
userRouter.get('/:id/albums');
userRouter.get('/:id/showcase');

userRouter.get('/limits');
userRouter.delete('/testimonials/:id');

userRouter.get('/disp-name');
userRouter.patch('/disp-name');

userRouter.patch('/password');
userRouter.post('/forget-password');
userRouter.post('/confirm-password');

userRouter.get('/perm');
userRouter.patch('/perm');
userRouter.get('/notif');
userRouter.patch('/notif');

userRouter.post('/faves');
userRouter.delete('/faves');
userRouter.get('/fave-context');

userRouter.get('/addable-pool');
userRouter.get('/camera-roll');

userRouter.get('/followed');
userRouter.get('/follower');
userRouter.get('/follower-not-followed');
userRouter.get('/block');

userRouter.post('/follow/:id');
userRouter.patch('/follow/:id');
userRouter.delete('/follow/:id');

userRouter.post('/block/:id');
userRouter.delete('/block/:id');

userRouter.get('/messages/sent');
userRouter.get('/messages/inbox');
userRouter.post('/messages');
userRouter.delete('/messages');

userRouter.get('/notif/contact');
userRouter.get('/notif/follow');
userRouter.get('/notif/interact');

userRouter.get('/recent-activity/comments');
userRouter.get('/recent-activity/photo');

// EXPORT ROUTER
module.exports = userRouter;
