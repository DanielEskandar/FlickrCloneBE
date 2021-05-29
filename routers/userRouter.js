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
 * @apiDefine ServerError
 * @apiError Failure Internal Server Error
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 500 Server Error
 *      {
 *          "status": "error",
 *          "message": "Internal Server Error"
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
 * @apiName signUp
 * @apiGroup User
 *
 * @apiParam (Request Body) {string} firstName The First Name of the User
 * @apiParam (Request Body) {string} lastName The Last Name of the User
 * @apiParam (Request Body) {string} displayName The Username of the User
 * @apiParam (Request Body) {string} age The Age of the User
 * @apiParam (Request Body) {string} email The Email of the User
 * @apiParam (Request Body) {string} password The Password of the User
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *        "firstName": "First Name Test",
 *        "lastName": "Last Name Test",
 *        "displayName": "firstlast",
 *        "age": 21,
 *        "email": "first.last@email.com",
 *        "password": "Abcdef@1"
 *    }
 *
 *
 * @apiSuccess {string} Token Authentication Token for the User
 * @apiSuccess {string} UserInfo Object Containing Full Details of User
 *
 * @apiSuccessExample {json}  Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWY5YjI5ODhhOGE3MDZiOGVmOTk0NCIsImlhdCI6MTYyMjEyMTI2MCwiZXhwIjoxNjI5ODk3MjYwfQ.daxYPodNUOJqCSPTTZgy8iUUPnte-vhn1mooyBJaBSk",
 *        "data": {
 *          "user": {
 *            "_id": "60af9b2988a8a706b8ef9944",
 *            "firstName": "First Name Test",
 *            "lastName": "Last Name Test",
 *            "displayName": "ffirstlast"
 *          }
 *        }
 *      }
 *
 * @apiUse ServerError
 */

userRouter.post('/sign-up', authController.signUp);

/**
 *
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
 * @apiParamExample {json} Request-Example:
 *    {
 *      "email": "AGtest@mailserver.com",
 *      "password": "AG5AG5TestCases_"
 *    }
 *
 * @apiSuccess {string} Token Authenticaton Token
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWY5YjI5ODhhOGE3MDZiOGVmOTk0NCIsImlhdCI6MTYyMjEyMTI2MCwiZXhwIjoxNjI5ODk3MjYwfQ.daxYPodNUOJqCSPTTZgy8iUUPnte-vhn1mooyBJaBSk",
 *        "data": {
 *          "user": {
 *            "_id": "60af9b2988a8a706b8ef9944",
 *            "firstName": "First Name Test",
 *            "lastName": "Last Name Test",
 *            "displayName": "ffirstlast"
 *          }
 *        }
 *      }
 *
 * @apiUse ServerError
 */

userRouter.post('/sign-in', authController.signIn);

/**
 *
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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} occupation Occupation of the user
 * @apiParam (Request Body) (string) hometown Hometown of the user
 * @apiParam (Request Body) (string) currentCity Current City of Residence
 * @apiParam (Request Body) (string) country Current Country of Residence
 * @apiParam (Request Body) (string) emailVisibility Privacy Setting for the Email
 * @apiParam (Request Body) (string) currentCityVisibility Privacy Setting for the Current City Data
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *        "occupation": "Artist",
 *        "hometown": "Ile de France",
 *        "currentCity": "Berlin",
 *        "country": "Germany",
 *        "emailVisibility": 1,
 *        "currentCityVisibility": 2
 *    }
 *
 * @apiSuccess {string} UserInfo Updated User Information
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "privacySettings": {
 *            "global": {
 *              "infoVisibility": {
 *                "email": 1,
 *                "currentCity": 2
 *              }
 *            }
 *          },
 *          "_id": "608d55c7e512b74ee00791db",
 *          "occupation": "Artist",
 *          "hometown": "Ile de France",
 *          "currentCity": "Berlin",
 *          "country": "Germany"
 *        }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.patch('/', authController.protect, userController.updateUserInfo);

/**
 *
 */

userRouter.delete('/');

/**
 * @api {get} /user/:id/stats [WIP] Get the User's Statistics
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
 *
 */

userRouter.get('/:id/popular');

/**
 *
 */

userRouter.get('/:id/recent');

/**
 *
 */

userRouter.get('/recent-update');

/**
 *
 */

userRouter.get('/:id/:locationId');

/**
 *
 */

userRouter.get('/:id/not-set');

/**
 *
 */

userRouter.get('/:id/untagged');

/**
 *
 */

userRouter.get('/:id/geo');

/**
 *
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
 *        "status": "success",
 *        "data": {
 *        "testimonials": [
 *          {
 *            "_id": "60a78931879c9b4f08aec669",
 *            "by": {
 *              "_id": "608d5450ec00005468607a0c",
 *              "firstName": "Ahmed",
 *              "lastName": "Abdulkader"
 *            },
 *            "content": "Testimonial about tetimonial test user from Ahmed"
 *          },
 *          {
 *            "_id": "60a78931879c9b4f08aec66a",
 *            "by": {
 *              "_id": "608d55c7e512b74ee00791db",
 *              "firstName": "Daniel",
 *              "lastName": "Eskandar"
 *            },
 *            "content": "Testimonial about testimonial test user from Daniel"
 *          }
 *        ],
 *        "_id": "60a787449065c85bac893ab3"
 *      }
 *    }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/testimonials', userController.getTestimonials);

/**
 *
 */

userRouter.post(
  '/:id/testimonials',
  authController.protect,
  userController.addTestimonial
);

/**
 *
 */

userRouter.get('/recent-update');

/**
 *
 */

userRouter.get('/:id/galleries');

/**
 *
 */

userRouter.get('/:id/groups');

/**
 *
 */

userRouter.get(
  '/:id/stream',
  authController.protect,
  userController.getPhotoStream
);

/**
 *
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
 * @apiSuccess {Object[]} showcase array of the user
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *        "showcase": [
 *          {
 *            "sizes": {
 *              "size": {
 *                  "original": {
 *                  "height": 120,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "large": {
 *                  "height": 190,
 *                  "width": 20,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "medium800": {
 *                  "height": 200,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "medium640": {
 *                  "height": 1200,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "medium": {
 *                  "height": 120,
 *                  "width": 600,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "small320": {
 *                  "height": 12,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "small": {
 *                  "height": 1000,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "thumbnail": {
 *                  "height": 50,
 *                  "width": 50,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "largeSquare": {
 *                  "height": 120,
 *                   "width": 120,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "square": {
 *                  "height": 60,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                }
 *              },
 *              "canDownload": false
 *            },
 *            "_id": "608d5450ec00005468607a0f"
 *          },
 *          {
 *            "sizes": {
 *              "size": {
 *                "original": {
 *                  "height": 120,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "large": {
 *                  "height": 190,
 *                  "width": 20,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "medium800": {
 *                  "height": 200,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "medium640": {
 *                  "height": 1200,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "medium": {
 *                  "height": 120,
 *                  "width": 600,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "small320": {
 *                  "height": 12,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "small": {
 *                  "height": 1000,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "thumbnail": {
 *                  "height": 50,
 *                  "width": 50,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "largeSquare": {
 *                  "height": 120,
 *                  "width": 120,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                },
 *                "square": {
 *                  "height": 60,
 *                  "width": 60,
 *                  "source": "https://www.google.com/",
 *                  "url": "https://www.google.com/"
 *                }
 *              },
 *              "canDownload": true
 *            },
 *            "_id": "608d5450ec00005468617a0c"
 *          }
 *        ],
 *        "_id": "608d5450ec00005468607a0c"
 *      }
 *    }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/showcase', userController.getShowcase);

/**
 * @api {put} /user/showcase Update User defined image showcase
 * @apiVersion 1.0.0
 * @apiName UpdateShowcase
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} showcase The New Showcase List
 * @apiParamExample {json} Request-Example:
 *      {
 *          "showcase": [
 *            "608d5450ec00005468607a0f",
 *            "608d5450ec00005468617a0c",
 *            "608d5450ec00005468628a0d"
 *          ]
 *      }
 *
 * @apiSuccess {Object[]} showcase Updated List in Showcase
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "showcase": [
 *            "608d5450ec00005468607a0f",
 *            "608d5450ec00005468617a0c",
 *            "608d5450ec00005468628a0d"
 *          ]
 *        }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.put(
  '/showcase',
  authController.protect,
  userController.updateShowcase
);

/**
 * @api {get} /user/:id/faves Return a List of all user faves
 * @apiVersion 1.0.0
 * @apiName GetFaves
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {Object[]} List of all user faves
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "count": 2,
 *        "data": {
 *          "favourites": [
 *            {
 *              "sizes": {
 *                "size": {
 *                  "small": {
 *                    "height": 1000,
 *                    "width": 60,
 *                    "source": "https://www.google.com/",
 *                    "url": "https://www.google.com/"
 *                  }
 *                }
 *              },
 *              "favourites": 7,
 *              "_id": "608d5450ec00005468607a0f",
 *              "userId": {
 *                "_id": "608d55c7e512b74ee00791db",
 *                "firstName": "Daniel",
 *                "lastName": "Eskandar"
 *              },
 *              "title": "Sunset in Bora Bora"
 *            },
 *            {
 *              "sizes": {
 *                "size": {
 *                  "small": {
 *                    "height": 1000,
 *                    "width": 60,
 *                    "source": "https://www.google.com/",
 *                    "url": "https://www.google.com/"
 *                  }
 *                }
 *              },
 *              "favourites": 51,
 *              "_id": "608d5450ec00005468617a0c",
 *              "userId": {
 *                "_id": "608d55c7e512b74ee00791dc",
 *                "firstName": "Aliaa",
 *                "lastName": "Khalifa"
 *              },
 *              "title": "Sakura Season in Nihon"
 *            }
 *          ],
 *          "_id": "608d5450ec00005468607a0c"
 *        }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/faves', userController.getFaves);

/**
 * @api {get} /user/limits Return a List of User Upload and Size Limits
 * @apiVersion 1.0.0
 * @apiName GetLimits
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccess {string} photos/maxdisplaypx Maximum size in pixels for photos displayed on the site (0 means that no limit is in place).
 * @apiSuccess {string} photos/maxupload Maximum file size in bytes for photo uploads.
 * @apiSuccess {string} videos/maxduration Maximum duration in seconds of a video.
 * @apiSuccess {string} videos/maxupload Maximum file size in bytes for video uploads.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *        {
 *          "status": "success",
 *          "data": {
 *            "limits": {
 *              "photos": {
 *                "maxdisplaypx": 1024,
 *                "maxupload": 15728640
 *               },
 *              "videos": {
 *                "maxduration": 90,
 *                "maxupload": 15728640
 *              }
 *            }
 *          }
 *        }
 *
 * @apiUse UnauthError
 */

userRouter.get('/limits', authController.protect, userController.getLimits);

/**
 *
 */

userRouter.delete(
  '/testimonials/:testimonialId',
  authController.protect,
  userController.removeTestimonial
);

/**
 * @api {get} /:id/user/real-name Return the real name of User
 * @apiVersion 1.0.0
 * @apiName GetRealName
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
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
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/real-name', userController.getRealName);

/**
 * @api {get} /user/:id/disp-name Return the display name of User
 * @apiVersion 1.0.0
 * @apiName GetDispName
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
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
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/disp-name', userController.getDispName);

/**
 * @api {get} /user/:id/about-me Return the about me section of User
 * @apiVersion 1.0.0
 * @apiName GetAboutMe
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiSuccess {string} aboutMe The about me section of the calling User
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *              "aboutMe": "Hello! I take nice photos.. follow me \":)"
 *          }
 *      }
 *
 * @apiUse UserNotFoundError
 */

userRouter.get('/:id/about-me', userController.getAboutMe);

/**
 * @api {patch} /user/disp-name Update the display name of User
 * @apiVersion 1.0.0
 * @apiName UpdateDispName
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} displayname The New Display name of the calling User
 *
 * @apiParamExample {json} Request-Example:
 *        {
 *          "displayName": "DanielEskandar99"
 *        }
 *
 * @apiSuccess {string} displayName New Display Name for the User
 *
 * @apiSuccessExample {json} Success_Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "displayName": "DanielEskandar99"
 *        }
 *    }
 *
 * @apiUse UnauthError
 */

userRouter.patch(
  '/disp-name',
  authController.protect,
  userController.updateDispName
);

/**
 * @api {patch} /user/about-me Update the about me section of User
 * @apiVersion 1.0.0
 * @apiName UpdateAboutMe
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} aboutMe The New about me section of the calling User
 *
 * @apiParamExample {json} Request-Example:
 *        {
 *          "aboutMe": "new about me content"
 *        }
 *
 * @apiSuccess {string} aboutMe Updated About Me Section
 *
 * @apiSuccessExample {json} Success_Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "aboutMe": "new about me content"
 *        }
 *    }
 *
 * @apiUse UnauthError
 */

userRouter.patch(
  '/about-me',
  authController.protect,
  userController.updateAboutMe
);

/**
 * @api {patch} /user/password Update the Password of User
 * @apiVersion 1.0.0
 * @apiName ChangePassword
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} aboutMe The New about me section of the calling User
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *        "passwordCurrent": "Abdcdef!1",
 *        "password": "Abdcdef!2"
 *      }
 *
 * @apiSuccess {string} aboutMe Updated About Me Section
 *
 * @apiSuccessExample {json} Success_Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWViN2M3ODI0ZDA1MzM0YzMwOTc1NCIsImlhdCI6MTYyMjEyMTY0MSwiZXhwIjoxNjI5ODk3NjQxfQ.4OA0gp4a2oY5kNqv7Q20uHsxq5b9hW-k5TpgSDlwL9Q",
 *        "data": {
 *          "user": {
 *            "_id": "60aeea748d222150c8dbaaf1",
 *            "firstName": "updatePasswordFirstName",
 *            "lastName": "updatePasswordLastName",
 *            "displayName": "updatePasswordTestUser"
 *          }
 *        }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.patch(
  '/password',
  authController.protect,
  authController.updatePassword
);

/**
 * @api {post} /user/forget-password Send a Forget Password Request
 * @apiVersion 1.0.0
 * @apiName ForgetPassword
 * @apiGroup User
 *
 * @apiParam (Request Body) {string} email Email of the User with Forgotten Password
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *        "email": "danielbassem@gmail.com"
 *      }
 *
 * @apiSuccess {string} message String Message for the User
 *
 * @apiSuccessExample {json} Success_Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "message": "Token sent to email"
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.post('/forgot-password', authController.forgotPassword);

/**
 * @api {post} /user/reset-password Reset a Password through sent token
 * @apiVersion 1.0.0
 * @apiName resetPassword
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} newpassword The New Password of the calling User
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *        "password": "Abcdef@1"
 *      }
 *
 * @apiSuccess {string} Status Status of API
 *
 * @apiSuccessExample {json} Success_Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWViN2M3ODI0ZDA1MzM0YzMwOTc1NCIsImlhdCI6MTYyMjEyMTY0MSwiZXhwIjoxNjI5ODk3NjQxfQ.4OA0gp4a2oY5kNqv7Q20uHsxq5b9hW-k5TpgSDlwL9Q",
 *        "data": {
 *          "user": {
 *            "_id": "60aeea748d222150c8dbaaf1",
 *            "firstName": "resetPasswordFirstName",
 *            "lastName": "resetPasswordLastName",
 *            "displayName": "resetPasswordTestUser"
 *          }
 *        }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.patch('/reset-password/:token', authController.resetPassword);

/**
 * @api {get} /user/perm Get User Permission Settings
 * @apiVersion 1.0.0
 * @apiName GetPermissions
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccess {string} privacySettings User's Privacy Settings
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "privacySettings": {
 *            "global": {
 *              "infoVisibility": {
 *                "email": 2,
 *                "name": 1,
 *                "currentCity": 1
 *              },
 *              "downloadPerm": 1,
 *              "largestImgSize": 0,
 *              "allowShare": 1,
 *              "allowTag": 1,
 *              "allowGalleryAdd": true,
 *              "hideEXIF": false,
 *              "hidePhotoSearch": false,
 *              "hideProfileSearch": false
 *            },
 *            "defaults": {
 *              "perms": {
 *                "see": 1,
 *                "comment": 1,
 *                "addNotes": 2
 *              },
 *              "license": 0,
 *              "mapVisible": 1,
 *              "importEXIF": true,
 *              "safetyLevel": 1,
 *              "contentType": 1
 *            },
 *            "filters": {
 *              "search": {
 *                "safeSearch": true,
 *                "content": 1
 *              }
 *            }
 *          }
 *        }
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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} privacySettings User's New Privacy Settings
 *
 * @apiParamExample {json} Request-Example:
 *        {
 *          "privacySettings": {
 *            "global": {
 *              "infoVisiblity": {
 *                "email": 2,
 *                "name": 1,
 *                "currentCity": 1
 *              },
 *              "downloadPerm": 1,
 *              "largestImgSize": 0,
 *              "allowShare": 2,
 *              "allowTag": 2,
 *              "allowGalleryAdd": true,
 *              "hideEXIF": false,
 *              "hidePhotoSearch": false,
 *              "hideProfileSearch": false,
 *              "infoVisibility": {
 *                "email": 2,
 *                "name": 1,
 *                "currentCity": 1
 *              }
 *            },
 *            "defaults": {
 *              "perms": {
 *                "see": 1,
 *                "comment": 1,
 *                "addNotes": 2
 *              },
 *              "license": 0,
 *              "mapVisible": 1,
 *              "importEXIF": true,
 *              "safetyLevel": 1,
 *              "contentType": 1
 *            },
 *            "filters": {
 *              "search": {
 *                "safeSearch": true,
 *                "content": 1
 *              }
 *            }
 *          }
 *        }
 *
 * @apiSuccess {string} privacySettings User's Updated Privacy Settings
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "privacySettings": {
 *            "global": {
 *              "infoVisibility": {
 *                "email": 2,
 *                "name": 1,
 *                "currentCity": 1
 *              },
 *              "downloadPerm": 1,
 *              "largestImgSize": 0,
 *              "allowShare": 1,
 *              "allowTag": 1,
 *              "allowGalleryAdd": true,
 *              "hideEXIF": false,
 *              "hidePhotoSearch": false,
 *              "hideProfileSearch": false
 *            },
 *            "defaults": {
 *              "perms": {
 *                "see": 1,
 *                "comment": 1,
 *                "addNotes": 2
 *              },
 *              "license": 0,
 *              "mapVisible": 1,
 *              "importEXIF": true,
 *              "safetyLevel": 1,
 *              "contentType": 1
 *            },
 *            "filters": {
 *              "search": {
 *                "safeSearch": true,
 *                "content": 1
 *              }
 *            }
 *          }
 *        }
 *      }
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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccess {string} notificationSettings The User's Notification Settings
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "notificationSettings": {
 *            "notifMail": {
 *              "invites": false,
 *              "contact": false,
 *              "messages": true,
 *              "reminders": true
 *            },
 *            "activityMail": {
 *              "you": true,
 *              "contacts": true
 *            }
 *          }
 *        }
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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiParam (Request Body) {string} privacySettings User's New Privacy Settings
 *
 * @apiParamExample {json} Request-Example:
 *        {
 *          "notificationSettings": {
 *            "notifMail": {
 *              "invites": false,
 *              "contact": false,
 *              "messages": true,
 *              "reminders": true
 *            },
 *            "activityMail": {
 *              "you": true,
 *              "contacts": true
 *            }
 *          }
 *        }
 *
 * @apiSuccess {string} notificationSettings The User's Updated Notificaation Settings
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "notificationSettings": {
 *            "notifMail": {
 *              "invites": false,
 *              "contact": false,
 *              "messages": true,
 *              "reminders": true
 *            },
 *            "activityMail": {
 *              "you": true,
 *              "contacts": true
 *            }
 *          }
 *        }
 *      }
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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "newPhotoFaveCount": {
 *            "favourites": 6,
 *            "_id": "608d5450ec00005468607a0f"
 *          },
 *          "newUserFaveList": {
 *            "favourites": [
 *              "608d5450ec00005468617a0c"
 *            ],
 *            "_id": "608d5450ec00005468607a0c"
 *          }
 *        }
 *      }
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
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccess {string} notificationSettings The User's Updated Notificaation Settings
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "data": {
 *          "newPhotoFaveCount": {
 *            "favourites": 6,
 *            "_id": "608d5450ec00005468607a0f"
 *          },
 *          "newUserFaveList": {
 *            "favourites": [
 *              "608d5450ec00005468617a0c"
 *            ],
 *            "_id": "608d5450ec00005468607a0c"
 *          }
 *        }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.delete(
  '/faves/:id',
  authController.protect,
  userController.removeFave
);

/**
 *
 */

userRouter.get('/fave-context');

/**
 *
 */

userRouter.get('/addable-pool');

/**
 *
 */

userRouter.get(
  '/camera-roll',
  authController.protect,
  userController.getCameraRoll
);

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
 * @apiSuccessExample  {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "count": 4,
 *        "data": {
 *          "_id": "608d55c7e512b74ee00791de",
 *          "following": [
 *            {
 *              "_id": "60914e1ba87d736f3c382ed6",
 *              "user": {
 *                "_id": "608d55c7e512b74ee00791db",
 *                "displayName": "DanielEskandar",
 *                "firstName": "Daniel",
 *                "lastName": "Eskandar"
 *              },
 *              "relation": "undetermined",
 *              "followDate": "2021-05-04T12:16:24.255Z"
 *            },
 *            {
 *              "_id": "60914e1ba87d736f3c382ed7",
 *              "user": {
 *                "_id": "608d5450ec00005468607a0c",
 *                "displayName": "AhmedAbdulkader99",
 *                "firstName": "Ahmed",
 *                "lastName": "Abdulkader"
 *              },
 *              "relation": "undetermined",
 *              "followDate": "2021-05-04T12:17:24.255Z"
 *            },
 *            {
 *              "_id": "60914e1ba87d736f3c382ed8",
 *              "user": {
 *                "_id": "608d55c7e512b74ee00791dc",
 *                "displayName": "AliaaKhalifa",
 *                "firstName": "Aliaa",
 *                "lastName": "Khalifa"
 *              },
 *              "relation": "undetermined",
 *              "followDate": "2021-05-04T12:18:24.255Z"
 *            },
 *            {
 *              "_id": "60914e1ba87d736f3c382ed9",
 *              "user": {
 *                "_id": "608d55c7e512b74ee00791dd",
 *                "displayName": "MariamKhashab",
 *                "firstName": "Mariam",
 *                "lastName": "Khashab"
 *              },
 *              "relation": "undetermined",
 *              "followDate": "2021-05-04T12:19:24.255Z"
 *            }
 *          ]
 *        }
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
 *
 */

userRouter.get('/follower');

/**
 *
 */

userRouter.get('/follower-not-followed');

/**
 * @api {get} /user/block Gets a list of User's Blocked users
 * @apiVersion 1.0.0
 * @apiName GetBlocked
 * @apiGroup User
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccess {Number} count User's Blocked Count
 * @apiSuccess {Object[]} blocked Array of User ID's of the User's Blocked users
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "success",
 *        "count": 2,
 *        "data": {
 *          "blocked": [
 *            {
 *              "_id": "608d5450ec00005468607a0c",
 *              "displayName": "AhmedAbdulkader99",
 *              "firstName": "Ahmed",
 *              "lastName": "Abdulkader"
 *            },
 *            {
 *              "_id": "608d55c7e512b74ee00791dc",
 *              "displayName": "AliaaKhalifa",
 *              "firstName": "Aliaa",
 *              "lastName": "Khalifa"
 *            }
 *          ],
 *          "_id": "608d55c7e512b74ee00791db"
 *        }
 *      }
 *
 * @apiUse UnauthError
 */

userRouter.get('/block', authController.protect, userController.getBlocked);

/**
 *
 */

userRouter.post('/follow/:id');

/**
 *
 */

userRouter.patch('/follow/:id');

/**
 *
 */

userRouter.delete('/follow/:id');

/**
 *
 */

userRouter.post('/block/:id');

/**
 *
 */

userRouter.delete('/block/:id');

/**
 *
 */

userRouter.get('/messages/sent');

/**
 *
 */

userRouter.get('/messages/inbox');

/**
 *
 */

userRouter.post('/messages');

/**
 *
 */

userRouter.delete('/messages/:id');

/**
 *
 */

userRouter.get('/notif/contact');

/**
 *
 */

userRouter.get('/notif/follow');

/**
 * @api {get} /user/:id Get the User's Information
 * @apiVersion 1.0.0
 * @apiName GetUserInfo
 * @apiGroup User
 *
 * @apiParam {String} id The User's ID
 *
 * @apiHeader {string} Token Authenticaton Token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ1NWM3ZTUxMmI3NGVlMDA3OTFkYiIsImlhdCI6MTYyMTUwOTY5NywiZXhwIjoxNjI5Mjg1Njk3fQ.3WLVIdzDgIGpru3ybIxqWj9A9ROvtLG90dFuzHowuk0',
 *     }
 *
 * @apiSuccess {String} joinDate Date when the user joined flickr
 * @apiSuccess {String} occupation Occupation of the user
 * @apiSuccess {String} hometown Hometown of the User
 * @apiSuccess {String} currentCity Current city of the user
 * @apiSuccess {string} country Country of the user
 * @apiSuccess {string} email Email of the user
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status": "success",
 *          "data":
 *          {
 *            "privacySettings": {
 *              "global": {
 *                "infoVisibility": {
 *                  "email": 2,
 *                  "currentCity": 1
 *                  }
 *                }
 *              },
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
 * @apiSuccessExample {json} Success-Response:
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

// Deprecated Routes
userRouter.get('/notif/interact');

userRouter.get('/recent-activity/comments');

userRouter.get('/recent-activity/photo');

// EXPORT ROUTER
module.exports = userRouter;
