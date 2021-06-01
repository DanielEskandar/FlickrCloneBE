// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const groupController = require('../controllers/groupController.js');
const authController = require('../controllers/authController.js');

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
 * @apiName createGroup
 * @apiGroup Group
 *
 *  @apiHeader {String} Token Authenticaton Token
 *
 * @apiParam (Request Body) {string} name Group Name
 * @apiParam (Request Body) {string} description About the group
 * @apiParam (Request Body) {date} startDate Creation date
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 * @apiSuccessExample Success-Response:status:
 *  HTTP/1.1 200 OK
 * {
 * 'success',
 *  data: {
 *   public: false,
 *  invitation: false,
 *   startDate: '2021-01-02T00:00:00.000Z',
 *  photos: [],
 *   discussionTopics: [],
 *   ageRestriction: false,
 *   _id: '609eed338a55978b34e2f061',
 *   name: 'backend unit test',
 *   users: [
 *     {
 *       joinDate: '2021-01-01T00:00:00.000Z',
 *       userId: '608d55c7e512b74ee00791de',
 *       admin: true,
 *     },
 *   ],
 *   __v: 0,
 * }
 *}
 * @apiUse UnauthError
 */
groupRouter.post('/', authController.protect, groupController.createGroup);

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
groupRouter.delete('/:id');

/**
 * @api {get} /group/:id Get group's info
 * @apiVersion 1.0.0
 * @apiName getInfo
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
groupRouter.get('/:id');

/**
 * @api {get} /group/ Get All group's info
 * @apiVersion 1.0.0
 * @apiName getInfo
 * @apiGroup Group
 *
 * @apiSuccess {Object[]} group All groups
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              groups
 *
 *          }
 *      }
 *
 * @apiUse UnauthError
 */
groupRouter.get('/', groupController.getInfo);
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
groupRouter.post('/:id/user/:userid');

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
groupRouter.post('/:id/request/:userid');

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
groupRouter.post('/:id/invite/:userid');

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
groupRouter.delete('/:id/user/:userid');

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
groupRouter.get('/search');

/**
 * @api {post} /group/:id/discussion Post a new discussion topic to the group
 * @apiVersion 1.0.0
 * @apiName createDiscussion
 * @apiGroup Group
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiParam {String} id The Group's ID
 *
 * @apiParam (Request Body) {Object} user Author
 * @apiParam (Request Body) {Date} date Date of publish
 * @apiParam (Request Body) {String} content Discussion content
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        status: 'success',
 *      data: {
 *       replies: ['609fe93c38075024f8d3e6f6'],
 *      _id: '608f6e7519953b27004f6dac',
 *       user: '608f3e678209d433946b946d',
 *       content: 'edit 1',
 *       date: '2021-01-01T00:00:00.000Z',
 *       __v: 0,
 *          },
 *      }
 * @apiUse UnauthError
 * @apiUse ForbiddenAccss
 * @apiUse GroupNotFoundError
 */
groupRouter.post(
  '/:id/discussion',
  authController.protect,
  groupController.createDiscussion
);

/**
 * @api {patch} /group/discussion/:id  Editting a discussion topic
 * @apiVersion 1.0.0
 * @apiName editDiscussion
 * @apiGroup Group
 *
 * @apiHeader {string} user Authenticaton Token
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiParam (Request Body) {Object} discussion The old discussion
 * @apiParam (Request Body) {Object} discussion The updated discussion
 *
 * @apiSuccess {string} Status Status of API
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         status: 'success',
 *         data: {
 *           replies: ['609fe93c38075024f8d3e6f6'],
 *           _id: '608f6e7519953b27004f6dac',
 *           user: '608f3e678209d433946b946d',
 *           content: 'edit 1',
 *           date: '2021-01-01T00:00:00.000Z',
 *           __v: 0,
 *       },
 *      }
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
groupRouter.patch(
  '/discussion/:id',
  authController.protect,
  groupController.editDiscussion
);

/**
 * @api {get} /group/discussion/:id Get information about a group discussion topic.
 * @apiVersion 1.0.0
 * @apiName getDiscussion
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiSuccess {Object} discussionTopics The required discussion topic
 *
 * @apiUse SuccessRes
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          status: 'success',
 *           data: {
 *               replies: ['609fe93c38075024f8d3e6f6'],
 *               user: '608f3e678209d433946b946d',
 *               content: 'La casa de papel is overrated',
 *               date: '2021-01-01T00:00:00.000Z',
 *               __v: 0,
 *           },
 *       }
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion "
 *      }
 * @apiUse UnauthError
 */
groupRouter.get('/discussion/:id', groupController.getDiscussion);

/**
 * @api {get} /group/:id/discussion Get a list of discussion topics in a group.
 * @apiVersion 1.0.0
 * @apiName getAllDiscussions
 * @apiGroup Group
 *
 * @apiParam {String} id The group's ID
 *
 * @apiSuccess {Object[]} discussionTopics List of discussion topics in the group.
 *
 * @apiUse SuccessRes
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *     status: 'success',
 *     data: {
 *        discussionTopics: ['608f6e7519953b27004f6dab'],
 *           },
 *      }
 * @apiErrorExample Error-Response:
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

groupRouter.get('/:id/discussion', groupController.getAllDiscussions);

/**
 * @api {delete} /group/discussion/:id Deleting a discussion post from the group
 * @apiVersion 1.0.0
 * @apiName deleteDiscussion
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *
 *  @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           status: 'success',
 *           data: null,
 *      }
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
groupRouter.delete(
  '/discussion/:id',
  authController.protect,
  groupController.deleteDiscussion
);

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
 * @apiParam (Request Body) {Object} pinnedThread Old pinned thread or null
 * @apiParam (Request Body) {Object} pinnedThread new pinned thread
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
groupRouter.patch('/:id/pinned/:topicId');

/**
 * @api {post} /group/discussion/:id/replies Add a reply to a discussion topic
 * @apiVersion 1.0.0
 * @apiName addReply
 * @apiGroup Group
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiParam (Request Body) {Object} user Author
 * @apiParam (Request Body) {Date} date Date of comment
 * @apiParam (Request Body) {String} content Reply content
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           status: 'success',
 *           data: {
 *              _id: '610fe93c38075024f8d3e6f3',
 *               content: 'mori sushi is the best',
 *               date: '2021-01-01T00:00:00.000Z',
 *              __v: 0,
 *              user: '608d55c7e512b74ee00791de',
 *                  },
 *      }
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

groupRouter.post(
  '/discussion/:id/replies',
  authController.protect,
  groupController.addReply
);

/**
 * @api {delete} /group/discussion/replies/:id Deleting a reply on a discussion topic
 * @apiVersion 1.0.0
 * @apiName deleteReply
 * @apiGroup Group
 *
 * @apiParam {String} id The reply's ID
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *@apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           status: 'success',
 *           data: null,
 *      }
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

groupRouter.delete(
  '/discussion/replies/:id',
  authController.protect,
  groupController.deleteReply
);

/**
 * @api {patch} /group/discussion/replies/:id Edit a post reply
 * @apiVersion 1.0.0
 * @apiName editReply
 * @apiGroup Group
 *
 * @apiParam {String} id The new reply's ID
 *
 * @apiHeader {string} user Authenticaton Token
 *
 * @apiParam (Request Body) {Object} reply old reply
 * @apiParam (Request Body) {Object} reply new reply
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiUse SuccessRes
 *@apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           status: 'success',
 *            data: {
 *               _id: '609fe93c38075024f8d3e6f5',
 *               user: '608d5450ec00005468607a0c',
 *               content: 'try seoudi',
 *               date: '2021-01-01T00:00:00.000Z',
 *               __v: 0,
 *                  },
 *      }
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

groupRouter.patch(
  '/discussion/replies/:id',
  authController.protect,
  groupController.editReply
);

/**
 * @api {get} /group/discussion/replies/:id Get info about a discussion topic reply
 * @apiVersion 1.0.0
 * @apiName getReply
 * @apiGroup Group
 *
 * @apiParam {String} id The reply's ID
 *
 * @apiSuccess {Object} reply Requested reply
 *
 * @apiUse SuccessRes
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          status: 'success',
 *           data: {
 *               user: '608d5450ec00005468607a0c',
 *               content: 'pet shops',
 *               date: '2021-01-01T00:00:00.000Z',
 *               __v: 0,
 *           },
 *      }
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching reply "
 *      }
 * @apiUse UnauthError
 */

groupRouter.get('/discussion/replies/:id', groupController.getReply);

/**
 * @api {get} /group/discussion/:id/replies Get a list of replies from a group discussion topic.
 * @apiVersion 1.0.0
 * @apiName getAllReplies
 * @apiGroup Group
 *
 * @apiParam {String} id The discussion's ID
 *
 * @apiSuccess {Object[]} reply List of replies from a group discussion topic.
 *
 * @apiUse SuccessRes
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          status: 'success',
 *           data: {
 *               replies: ['609fe93c38075024f8d3e6f5'],
 *           },
 *      }
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 FAILED
 *      {
 *          "status": "failed",
 *          "messege": " Error in fetching discussion's replies "
 *      }
 * @apiUse UnauthError
 */

groupRouter.get('/discussion/:id/replies', groupController.getAllReplies);

/**
 * @api {get} /group/:id/members Get a list of the members of a group.
 * @apiVersion 1.0.0
 * @apiName getMembers
 * @apiGroup Group
 *
 * @apiParam {String} id The group's ID
 *
 * @apiSuccess {string} Token Authenticaton Token
 * @apiSuccess {Object[]} users List of the members in the group.
 *
 * @apiUse SuccessRes
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           status: 'success',
 *           data: {
 *               users: [
 *               {
 *                   joinDate: '2021-01-01T00:00:00.000Z',
 *                   _id: '608d5450ec00005468607a0c',
 *                   admin: true,
 *               },
 *               {
 *                   joinDate: '2021-01-01T00:00:00.000Z',
 *                   _id: '608d55c7e512b74ee00791dd',
 *                    admin: false,
 *               },
 *               ],
 *           },
 *      }
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */

groupRouter.get('/:id/members', groupController.getMembers);

/**
 * @api {post} /group/:id/pool/:photoid Add a Photo to a Group Photo Pool
 * @apiVersion 1.0.0
 * @apiName addToPhotoPool
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} photoid The photo's ID
 *
 * @apiParam (Request Body) {Object} photo Author
 *
 * @apiSuccess {Object} user Authenticaton Token
 *
 * @apiUse SuccessRes
 *@apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           status: 'success',
 *           data:
 *                 {
 *               photos: ['608d5450ec00005468607a0f', '604d5450ec00005468617a0c'],
 *                 }
 *      }
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
groupRouter.post('/:id/pool/:photoid', groupController.addToPhotoPool);

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
groupRouter.get('/:id/photo/:photoid/context');

/**
 * @api {get} /group/:id/pool Returns a list of pool photos for a given group
 * @apiVersion 1.0.0
 * @apiName getPhotoPool
 * @apiGroup Group
 *
 * @apiParam {String} id The group's ID
 *
 * @apiSuccess {Object[]} photos Pool photos in the group.
 *
 * @apiUse SuccessRes
 *
 *  @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *      status: 'success',
 *       data: {
 *           photos: ['608d5450ec00005468607a0f'],
 *       },
 *      }
 * @apiUse UnauthError
 * @apiUse GroupNotFoundError
 */

groupRouter.get('/:id/pool', groupController.getPhotoPool);

/**
 * @api {delete} /group/:id/pool/:photoId Remove a Photo from a Group Photo Pool
 * @apiVersion 1.0.0
 * @apiName removePhotofromPool
 * @apiGroup Group
 *
 * @apiParam {String} id The Group's ID
 * @apiParam {String} photoId The photo's ID
 *
 * @apiHeader {String} user Authenticaton Token
 *
 * @apiUse SuccessRes
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         status: 'success',
 *           data: {
 *               photos: ['608d5450ec00005468607a0f'],
 *                  },
 *       }
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
groupRouter.delete(
  '/:id/pool/:photoid',
  authController.protect,
  groupController.removePhotofromPool
);

// EXPORT ROUTER
module.exports = groupRouter;
