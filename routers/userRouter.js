// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');

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
 *          "status": "error",
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

/**
 * @api {post} /user/sign-up Send a Sign-Up Request
 * @apiVersion 1.0.0
 * @apiName SignUp
 * @apiGroup User
 *
 * @apiParam (Request Body) {string} firstName The First Name of the User
 * @apiParam (Request Body) {string} lastName The Last Name of the User
 * @apiParam (Request Body) {string} displayName The Username of the User
 * @apiParam (Request Body) {string} age The Age of the User
 * @apiParam (Request Body) {string} email The Email of the User
 * @apiParam (Request Body) {string} password The Password of the User
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/sign-up', authController.signUp);

/**
 * @api {post} /user/confirm Confirm a Signed Up user account
 * @apiVersion 1.0.0
 * @apiName SignUpConfirm
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/confirm');

/**
 * @api {post} /user/sign-in Sign In a Confirmed User
 * @apiVersion 1.0.0
 * @apiName SignUpConfirm
 * @apiGroup User
 *
 * @apiParam (Request Body) {string} email Email entered by user
 * @apiParam (Request Body) (string) password Password entered by user
 *
 * @apiSuccess {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/sign-in', authController.signIn);

/**
 * @api {post} /user/sign-out Sign In a Confirmed User
 * @apiVersion 1.0.0
 * @apiName SignUpConfirm
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

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
 * @apiHeader {string} Token Authenticaton Token
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

userRouter.get('/recent-update');

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

/**
 * @api {get} /user/:id/geo Return a List of photos with location info
 * @apiVersion 1.0.0
 * @apiName GetGeo
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's photos with location info
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

userRouter.get('/:id/geo');

/**
 * @api {get} /user/:id/no-geo Return a List of photos without location info
 * @apiVersion 1.0.0
 * @apiName GetNoGeo
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photos Array of the user's photos without location info
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

userRouter.get('/:id/no-geo');

/**
 * @api {get} /user/:id/testimonials Return a List of User testimonials
 * @apiVersion 1.0.0
 * @apiName GetTestimonials
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} testimonials Array of the user's account
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "testimonials": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/testimonials', userController.getTestimonials);

/**
 * @api {post} /user/:id/testimonials Add a User testimonial
 * @apiVersion 1.0.0
 * @apiName AddTestimonial
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} testimonials Array of the user's account
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post(
  '/:id/testimonials',
  authController.protect,
  userController.addTestimonial
);

/**
 * @api {get} /user/:id/recent-update Return a List of User testimonials
 * @apiVersion 1.0.0
 * @apiName GetRecentUpdate
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {Object[]} testimonials Array of the user's account
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.get('/recent-update');

/**
 * @api {get} /user/:id/galleries Return a List of User galleries
 * @apiVersion 1.0.0
 * @apiName GetGallery
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} galleries Array of the user's account
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "galleries": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/galleries');

/**
 * @api {get} /user/:id/group Return a List of User groups
 * @apiVersion 1.0.0
 * @apiName GetGroup
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} groups Array of the user's account
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "groups": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/groups');

/**
 * @api {get} /user/:id/gallery Return a user's photo stream of non-private photos from the camera roll
 * @apiVersion 1.0.0
 * @apiName GetStream
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} photo stream Array of non-private photos from the user's camera roll
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

userRouter.get('/:id/stream');

/**
 * @api {get} /user/:id/albums Return a List of User albums
 * @apiVersion 1.0.0
 * @apiName GetAlbum
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} albums Array of the user's account
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "albums": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/albums');

/**
 * @api {get} /user/:id/showcase Return User defined image showcase
 * @apiVersion 1.0.0
 * @apiName GetShowcase
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} Showcase array of the user
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "showcase": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/showcase');

/**
 * @api {get} /user/:id/faves Return a List of all user faves
 * @apiVersion 1.0.0
 * @apiName GetFaves
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {Object[]} List of all user faves
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "faves": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/faves', authController.protect, userController.getFaves);

/**
 * @api {get} /user/limits Return a List of User Upload and Size Limits
 * @apiVersion 1.0.0
 * @apiName GetLimits
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} photos/maxdisplaypx Maximum size in pixels for photos displayed on the site (0 means that no limit is in place).
 * @apiSuccess {string} photos/maxupload Maximum file size in bytes for photo uploads.
 * @apiSuccess {string} videos/maxduration Maximum duration in seconds of a video.
 * @apiSuccess {string} videos/maxupload Maximum file size in bytes for video uploads.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "photos":
 *              {
 *                  "maxdisplaypx": 1024
 *                  "maxupload": 15728640
 *              },
 *              "videos" :
 *              {
 *                  "maxduration": 90
 *                  "maxupload": 157286400
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/limits', authController.protect, userController.getLimits);

/**
 * @api {delete} /user/testimonials/:testimonialId Delete a testimonial
 * @apiVersion 1.0.0
 * @apiName removeTestimonial
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.delete(
  '/testimonials/:testimonialId',
  authController.protect,
  userController.removeTestimonial
);

/**
 * @api {get} /user/real-name Return the real name of User
 * @apiVersion 1.0.0
 * @apiName GetRealName
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} firstName The First Name of the calling User
 * @apiSuccess {string} lastName The Last Name of the calling User
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "firstName": "Ahmed",
 *              "lastName": "Abdulkader"
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get(
  '/real-name',
  authController.protect,
  userController.getRealName
);

/**
 * @api {get} /user/disp-name Return the display name of User
 * @apiVersion 1.0.0
 * @apiName GetDispName
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} displayName The Display name of the calling User
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "displayName": "ahmedabdulkader99"
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get(
  '/disp-name',
  authController.protect,
  userController.getDispName
);

/**
 * @api {patch} /user/disp-name Update the display name of User
 * @apiVersion 1.0.0
 * @apiName UpdateDispName
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {string} displayname The New Display name of the calling User
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.patch('/disp-name');

/**
 * @api {patch} /user/password Update the Password of User
 * @apiVersion 1.0.0
 * @apiName ChamgePassword
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {string} oldpassword The Pervious Password of the calling User
 * @apiParam (Request Body) {string} newpassword The New Password of the calling User
 * @apiParam (Request Body) {string} confirmpassword Confirming the New Password of the calling User
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.patch('/password');

/**
 * @api {post} /user/forget-password Send a Forget Password Request
 * @apiVersion 1.0.0
 * @apiName ForgetPassword
 * @apiGroup User
 *
 * @apiParam (Request Body) {string} username The Username of the User
 * @apiParam (Request Body) {string} email The Email of the User
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/forget-password');

/**
 * @api {post} /user/confirm-password Send a Confirm Forgotten Password Request
 * @apiVersion 1.0.0
 * @apiName ConfirmForgetPassword
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam (Request Body) {string} newpassword The New Password of the calling User
 * @apiParam (Request Body) {string} confirmpassword Confirming the New Password of the calling User
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/confirm-password');

/**
 * @api {get} /user/perm Get User Permission Settings
 * @apiVersion 1.0.0
 * @apiName GetPermissions
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data": {
 *              "global": {
 *                  "whocandownload": "Anyone",
 *                  "largestimgsize": "Best",
 *                  "allowshare": 1,
 *                  "allowtag": "any",
 *                  "allowgallery": 1,
 *                  "hideexif": 0,
 *                  "hidephotopublicsearch": 0,
 *                  "hideprofilepublicsearch": 0,
 *                  "whocansee": {
 *                      "email": "followed",
 *                      "name": "anyone",
 *                      "currentcity": "anyone"
 *                  }
 *              },
 *              "defaults": {
 *                  "perms": {
 *                      "see": "anyone",
 *                      "comment": "anyone",
 *                      "addnotes": "followed"
 *                  },
 *                  "license": "All Rights Reserved (c)",
 *                  "mapvisible": "Anyone",
 *                  "importexif": 1,
 *                  "safetylevel": "safe",
 *                  "contenttype": "photos"
 *              },
 *              "filters": {
 *                  "search": {
 *                      "safesearch": 1,
 *                      "content": "photovideo"
 *                  }
 *              }
 *          }
 *      }
 *
 *
 * @apiUse UnauthError
 */

userRouter.get(
  '/perm',
  authController.protect,
  userController.getPrivacySettings
);

/**
 * @api {patch} /user/perm Update the User Permission Settings
 * @apiVersion 1.0.0
 * @apiName ChamgePerms
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.patch(
  '/perm',
  authController.protect,
  userController.updatePrivacySettings
);

/**
 * @api {get} /user/notif Get User Notification Settings
 * @apiVersion 1.0.0
 * @apiName GetNotifications
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "notifmail":
 *              {
 *                  "invites": 1,
 *                  "contact": 1,
 *                 "messages": 1,
 *                 "reminders": 1
 *              },
 *              "activitymail":
 *              {
 *                  "you": 1,
 *                 "contacts": 1
 *              }
 *          }
 *      }
 *
 *
 * @apiUse UnauthError
 */

userRouter.get(
  '/notif',
  authController.protect,
  userController.getNotificationSettings
);

/**
 * @api {patch} /user/notif Update the User Notification Settings
 * @apiVersion 1.0.0
 * @apiName ChamgeNotif
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.patch(
  '/notif',
  authController.protect,
  userController.updateNotificationSettings
);

/**
 * @api {post} /user/faves/:id Add a Photo to User Faves
 * @apiVersion 1.0.0
 * @apiName AddToFaves
 * @apiGroup User
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/faves/:id', authController.protect, userController.addFave);

/**
 * @api {delete} /user/faves/:id Remove a Photo from User Faves
 * @apiVersion 1.0.0
 * @apiName RemoveFromFaves
 * @apiGroup User
 *
 * @apiParam {String} id The Photo's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.delete(
  '/faves/:id',
  authController.protect,
  userController.removeFave
);

/**
 * @api {get} /user/faves-context Get the context for a photo in Faves
 * @apiVersion 1.0.0
 * @apiName GetFavesContext
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {String} nextphoto Photo ID of the next photo
 * @apiSuccess {String} prevphoto Photo ID of the previous photo
 *
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "nextphoto": "483490175892497",
 *              "prevphoto": "483490175892451"
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/fave-context');

/**
 * @api {get} /user/addable-pool Gets a list of groups the user can add photos to
 * @apiVersion 1.0.0
 * @apiName GetAddablePool
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Object[]} addablegroups ID's of all Groups the Photo can be added to
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "addablegroups": [
 *
 *              ]
 *
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/addable-pool');

/**
 * @api {get} /user/camera-roll Return a user's camera roll
 * @apiVersion 1.0.0
 * @apiName GetCameraRoll
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Object[]} photos Array of photos from the user's camera roll
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
 * @apiUse UnauthError
 */

userRouter.get('/camera-roll');

/**
 * @api {get} /user/followed Gets a list of followed users
 * @apiVersion 1.0.0
 * @apiName GetFollowing
 * @apiGroup User
 *
 * @apiParam {ObjectID} id The of the User whose following list is to be retrieved
 *
 * @apiSuccess {Number} count Following list length
 * @apiSuccess {Object[]} Follwing list Array of User ID's of the Followed Users
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "following": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get(
  '/:id/following',
  authController.protect,
  userController.getFollowing
);

/**
 * @api {get} /user/follower Gets a list of User's followers
 * @apiVersion 1.0.0
 * @apiName GetFollowers
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Follower Count
 * @apiSuccess {Object[]} follwerlist Array of User ID's of the User's Follower
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "follwerlist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/follower');

/**
 * @api {get} /user/follower-not-followed Gets a list of User's followers not followed by the User
 * @apiVersion 1.0.0
 * @apiName GetFollowersNotFollowed
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Followers Not Followed Count
 * @apiSuccess {Object[]} list Array of User ID's of the User's Followers Not Followed
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "list": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/follower-not-followed');

/**
 * @api {get} /user/block Gets a list of User's Blocked users
 * @apiVersion 1.0.0
 * @apiName GetBlocked
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Blocked Count
 * @apiSuccess {Object[]} blocked Array of User ID's of the User's Blocked users
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "blocked": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/block', authController.protect, userController.getBlocked);

/**
 * @api {post} /user/follow/:id Follow a User
 * @apiVersion 1.0.0
 * @apiName Follow
 * @apiGroup User
 *
 * @apiParam {String} id The Followed User's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/follow/:id');

/**
 * @api {post} /user/follow/:id Change the Relation to a Followed User
 * @apiVersion 1.0.0
 * @apiName UpdateFollowState
 * @apiGroup User
 *
 * @apiParam {String} id The Followed User's ID
 *
 * @apiParam (Request Body) {String} relation New Relation Setting (Friend, Family, none)
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.patch('/follow/:id');

/**
 * @api {delete} /user/follow/:id Unfollow a User
 * @apiVersion 1.0.0
 * @apiName Unfollow
 * @apiGroup User
 *
 * @apiParam {String} id The Unfollowed User's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.delete('/follow/:id');

/**
 * @api {post} /user/block/:id Block a User
 * @apiVersion 1.0.0
 * @apiName Block
 * @apiGroup User
 *
 * @apiParam {String} id The Blocked User's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/block/:id');

/**
 * @api {delete} /user/block/:id Unblock a User
 * @apiVersion 1.0.0
 * @apiName Unblock
 * @apiGroup User
 *
 * @apiParam {String} id The Unblocked User's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.delete('/block/:id');

/**
 * @api {get} /user/messages/sent Gets a list of User's Sent Messages
 * @apiVersion 1.0.0
 * @apiName GetSentMsg
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Sent Messages
 * @apiSuccess {Object[]} msglist Array of Message ID's of the User's sent messages
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "msglist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/messages/sent');

/**
 * @api {get} /user/messages/inbox Gets a list of User's Recieved Messages
 * @apiVersion 1.0.0
 * @apiName GetInbox
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Recieved Messages
 * @apiSuccess {Object[]} msglist Array of Message ID's of the User's Recieved Messages
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "msglist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/messages/inbox');

/**
 * @api {post} /user/messages/ Sends a New Message
 * @apiVersion 1.0.0
 * @apiName SendMessage
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam (Request Body) {ObjectID} recieverid User ID of the User recieving the Message
 * @apiParam (Request Body) {String} subject Subject Line of the Message
 * @apiParam (Request Body) {String} body Main Content of the Message
 * @apiParam (Request Body) {ObjectID} replymsg Message being replied to (null if none)
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.post('/messages');

/**
 * @api {delete} /user/messages/:id Delete a Message
 * @apiVersion 1.0.0
 * @apiName DeleteMsg
 * @apiGroup User
 *
 * @apiParam {String} id The Deleted Message's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */

userRouter.delete('/messages/:id');

/**
 * @api {get} /user/notif/contact Gets a list of User's Contact Notifications
 * @apiVersion 1.0.0
 * @apiName ContactNotification
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Recieved Messages
 * @apiSuccess {Object[]} notiflist Array of Notifications
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "notiflist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/notif/contact');

/**
 * @api {get} /user/notif/follow Gets a list of User's Follow Notifications
 * @apiVersion 1.0.0
 * @apiName FollowtNotification
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Recieved Messages
 * @apiSuccess {Object[]} notiflist Array of Notifications
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "notiflist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/notif/follow');

/**
 * @api {get} /user/notif/interact Gets a list of User's Interact Notifications
 * @apiVersion 1.0.0
 * @apiName InteractNotification
 * @apiGroup User
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiSuccess {Number} count User's Recieved Messages
 * @apiSuccess {Object[]} notiflist Array of Notifications
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "count": 30
 *              "notiflist": [
 *
 *              ]
 *          }
 *      }
 *
 * @apiUse UnauthError
 */

/**
 * @api {get} /user/:id Get the User's Information
 * @apiVersion 1.0.0
 * @apiName GetUserInfo
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {String} joinDate Date when the user joined flickr
 * @apiSuccess {String} occupation Occupation of the user
 * @apiSuccess {String} hometown Hometown of the User
 * @apiSuccess {String} currentCity Current city of the user
 * @apiSuccess {string} country Country of the user
 * @apiSuccess {string} email Email of the user
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "joinDate": "2015-10-07T06:09:54+00:00",
 *              "occupation": "Photographer",
 *              "hometown": "Beverly Hills",
 *              "currentCity": "California",
 *              "country": "United States",
 *              "email": "ahmedkader99@mailserver.com",
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id', authController.protect, userController.getUserInfo);

/**
 * @api {get} /user/:id Get the User's Information
 * @apiVersion 1.0.0
 * @apiName GetUserInfo
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {String} joinDate Date when the user joined flickr
 * @apiSuccess {String} occupation Occupation of the user
 * @apiSuccess {String} hometown Hometown of the User
 * @apiSuccess {String} currentCity Current city of the user
 * @apiSuccess {string} country Country of the user
 * @apiSuccess {string} email Email of the user
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "joinDate": "2015-10-07T06:09:54+00:00",
 *              "occupation": "Photographer",
 *              "hometown": "Beverly Hills",
 *              "currentCity": "California",
 *              "country": "United States",
 *              "email": "ahmedkader99@mailserver.com",
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id', userController.getUserInfo);

userRouter.get('/notif/interact');

userRouter.get('/recent-activity/comments');

userRouter.get('/recent-activity/photo');

// EXPORT ROUTER
module.exports = userRouter;
