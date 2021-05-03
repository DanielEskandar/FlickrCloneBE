// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const groupController = require('../controllers/groupController.js');

// CREATE ROUTER
const groupRouter = express.Router();

// APIDOC DEFINITIONS

/**
 * @apiDefine ForbiddenAccss
 * @apiError UserForbidden User is not authaurized
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden
 *      {
 *          "status": "Error",
 *          "message": "User doesnt have permission to access"
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
 * @apiDefine GroupNotFoundError
 * @apiError GroupNotFound No group is found by that group ID
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "status": "Error",
 *          "message": "No group is found by that group ID"
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

//route urls
/**
 * @api {post} /group Create a new group
 * @apiVersion 1.0.0
 * @apiName CreateGroup
 * @apiGroup Group
 *
 * @apiBody {string} name Group Name
 * @apiBody {string} description About the group
 * @apiBody {date} startDate Creation date
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 */
groupRouter.POST('/');

/**
 * @api {delete} /group/:id Admin deletes a group
 * @apiVersion 1.0.0
 * @apiName DeleteGroup
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 * @apiUse GroupNotFoundError
 */
groupRouter.DELETE('/:id');

/**
 * @api {get} /group/:id Get group's info
 * @apiVersion 1.0.0
 * @apiName GetInfo
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 *
 * @apiSuccess {String} name The group's name
 * @apiSuccess {String} description About the group
 * @apiSuccess {Boolean} invitation If a member needs an invitation to join
 * @apiSuccess {Boolean} public Public or Private
 * @apiSuccess {Date} startDate Date of creation
 * @apiSuccess {Object} pinnedThread
 * @apiSuccess {Number} members Number of members
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "name": "What to eat!",
 *              "description": "Sharing food photos!",
 *              "invitation": true,
 *              "public": true,
 *              "Date": "1/1/2020",
 *              "pinnedThread": "Group Rules:......",
 *              "members": 15000,
 *
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 * @apiUse GroupNotFoundError
 */
groupRouter.GET('/:id');

/**
 * @api {post} /group/:id/user/:userid Join a public non-invitation group as a member
 * @apiVersion 1.0.0
 * @apiName Join
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} userid The User's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.POST('/:id/user/:userid');

/**
 * @api {post} /group/:id/request/:userid Request to join an invitation only group
 * @apiVersion 1.0.0
 * @apiName JoinRequest
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} userid The User's ID
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.POST('/:id/request/:userid');

/**
 * @api {post} /group/:id/invite/:userId A group member sends an invitation to join the group
 * @apiVersion 1.0.0
 * @apiName Invite
 * @apiGroup Group
 
 * @apiParam {String} id The Group's ID
 * @apiParam {String} userId The User's ID
 * 
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.POST('/:id/invite/:userid');

/**
 * @api {delete} /group/:id/user/:userId Leaving group If the user is the last person in the group, the group will be deleted.
 * @apiVersion 1.0.0
 * @apiName LeaveGroup
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} userid The user's ID (leaving the group)
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.DELETE('/:id/user/:userid');

/**
 * @api {get} /group/search Search for groups
 * @apiVersion 1.0.0
 * @apiName Search
 * @apiGroup Group
 *
 *
 * @apiSuccess {Object} group Search result
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *             "groups": [
 *
 *              ]
 *
 *          }
 *      }
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.GET('/search');

/**
 * @api {post} /group/:id/discussions Post a new discussion topic to the group
 * @apiVersion 1.0.0
 * @apiName CreateDiscussionTopic
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 *
 * @apiBody {Object} user Author
 * @apiBody {Date} date Date of publish
 * @apiBody {String} content Discussion content
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 * @apiUse GroupNotFoundError
 */
groupRouter.POST('/:id/discussion');

/**
 * @api {patch} /group/discussion/:id Update Editting a discussion topic
 * @apiVersion 1.0.0
 * @apiName EditDiscussion
 * @apiGroup Group
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiBody {Object} discussion The old discussion
 * @apiBody {Object} discussion The updated discussion
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 */
groupRouter.PATCH('/discussion/:id');

/**
 * @api {get} /group/discussion/:id Get information about a group discussion topic.
 * @apiVersion 1.0.0
 * @apiName GetDiscussionTopic
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiSuccess {Object} discussionTopics The required discussion topic //?? returns 1 object
 *
 * @apiUse SuccessRes
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 * @apiUse UnauthError
 */
groupRouter.GET('/discussion/:id');

/** 
* @api {get} /group/:id/discussion Get a list of discussion topics in a group.
* @apiVersion 1.0.0
* @apiName GetAllDiscussionTopics
* @apiGroup Group
*
* @apiParam {String} id The group's ID
*
* @apiSuccess {Object[]} discussionTopics List of discussion topics in the group. 
*
* @apiUse SuccessRes
*
 @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 * 
* @apiUse UnauthError
* @apiUse ForbiddenAccss
* @apiUse GroupNotFoundError
*/
groupRouter.GET('/:id/discussion');

/**
 * @api {delete} /group/discussion/:id Deleting a discussion post from the group
 * @apiVersion 1.0.0
 * @apiName DeleteDiscussionTopic
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 */
groupRouter.DELETE('/discussion/:id');

/**
 * @api {patch} /group/:id/pinned/:topicId Setting a new pinned thread
 * @apiVersion 1.0.0
 * @apiName Set Pinned Thread
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} topicId The discussion's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {Object} pinnedThread Old pinned thread or null
 * @apiBody {Object} pinnedThread new pinned thread
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 * @apiUse GroupNotFoundError
 */
groupRouter.PATCH('/:id/pinned/:topicId');

/**
 * @api {post} /group/discussion/:id/replies Add a reply to a discussion topic
 * @apiVersion 1.0.0
 * @apiName AddReply
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiBody {Object} user Author
 * @apiBody {Date} date Date of comment
 * @apiBody {String} content Reply content
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 */
groupRouter.POST('/discussions/:id/replies');

/**
 * @api {delete} /group/discussion/replies/:id Deleting a reply on a discussion topic
 * @apiVersion 1.0.0
 * @apiName DeleteReply
 * @apiGroup Group
 *
 * @apiParam {String} id The reply's ID
 *
 * @apiHeader {String} Token Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching reply "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 */
groupRouter.DELETE('/discussions/replies/:id');

/**
 * @api {patch} /group/discussion/replies/:id Edit a post reply
 * @apiVersion 1.0.0
 * @apiName Edit reply
 * @apiGroup Group
 *
 * @apiParam {String} id The new reply's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiBody {Object} reply old reply
 * @apiBody {Object} reply new reply
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching reply "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 */
groupRouter.PATCH('/discussions/replies/:id');

/**
 * @api {get} /group/discussion/replies/:id Get info about a discussion topic reply
 * @apiVersion 1.0.0
 * @apiName GetReply
 * @apiGroup Group
 *
 * @apiParam {String} id The reply's ID
 *
 * @apiSuccess {Object} reply Requested reply
 *
 * @apiUse SuccessRes
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching reply "
 *      }
 * @apiUse UnauthError
 */
groupRouter.GET('/discussions/replies/:id');

/**
 * @api {get} /group/discussion/:id/replies Get a list of replies from a group discussion topic.
 * @apiVersion 1.0.0
 * @apiName GetAllReplies
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiSuccess {Object[]} reply List of replies from a group discussion topic.
 *
 * @apiUse SuccessRes
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion's replies "
 *      }
 * @apiUse UnauthError
 */
groupRouter.GET('/discussions/:id/replies');

/**
 * @api {get} /group/:id/members Get a list of the members of a group.
 * @apiVersion 1.0.0
 * @apiName GetAllReplies
 * @apiGroup Group
 *
 * @apiParam {String} id The group's ID
 *
 * @apiSuccess {string} Token Authenticaton Token // lazem ybaa user AND member
 * @apiSuccess {Object[]} users List of the members in the group.
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.GET('/:id/members');

/**
 * @api {post} /group/:id/pool/:photoid Add a Photo to a Group Photo Pool
 * @apiVersion 1.0.0
 * @apiName AddPhototoPool
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} photoid The photo's ID
 *
 * @apiBody {Object} photo Author
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching photo "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 */
groupRouter.POST('/:id/pool/:id');

/**
 * @api {get} /group/:id/photo/:photoid/context Get Next and Previous Photos in Group Pool
 * @apiVersion 1.0.0
 * @apiName GetContext
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} photoid The photo's ID
 *
 * @apiSuccess {Object} photo Next photo for a photo in a group pool
 * @apiSuccess {object} photo Previous photo for a photo in a group pool
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *             "photos": [
 *
 *              ]
 *
 *          }
 *      }
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching photos "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.GET('/:id/photo/:photoid/context');

/**
 * @api {get} /group/:id/pool Returns a list of pool photos for a given group
 * @apiVersion 1.0.0
 * @apiName GetPhotoPool
 * @apiGroup Group
 *
 * @apiParam {String} id The group's ID
 *
 * @apiSuccess {Object[]} photos Pool photos in the group.
 *
 * @apiUse SuccessRes
 *
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */
groupRouter.GET('/:id/pool');

/**
 * @api {delete} /group/:id/pool/:photoId Remove a Photo from a Group Photo Pool
 * @apiVersion 1.0.0
 * @apiName RemovePhotofromPool
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} photoId The photo's ID
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching photo "
 *      }
 *
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 * @apiUse GroupNotFoundError
 */
groupRouter.DELETE('/:id/pool');