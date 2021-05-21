// INCLUDE MODELS
const userModel = require('../models/userModel.js');
const photoModel = require('../models/photoModel');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// GET REAL NAME
exports.getRealName = async (req, res) => {
  try {
    const realName = await userModel
      .findById(req.user.id)
      .select({ firstName: 1, lastName: 1, _id: 0 });

    if (!realName) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(realName)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET DISPLAY NAME
exports.getDispName = async (req, res) => {
  try {
    const dispName = await userModel
      .findById(req.user.id)
      .select({ displayName: 1, _id: 0 });

    if (!dispName) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(dispName)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET USER INFO
exports.getUserInfo = async (req, res) => {
  try {
    const userInfo = await userModel.findById(req.params.id).select({
      joinDate: 1,
      occupation: 1,
      hometown: 1,
      currentCity: 1,
      country: 1,
      email: 1,
      _id: 0,
    });

    if (!userInfo) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(userInfo)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET LIMITS
exports.getLimits = async (req, res) => {
  try {
    const limits = await userModel
      .findById(req.user.id)
      .select({ limits: 1, _id: 0 });

    if (!limits) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(limits)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET FOLLOWING
exports.getFollowing = async (req, res) => {
  try {
    const following = await userModel
      .findById(req.params.id)
      .select({ following: 1 })
      .populate('following.user', 'displayName firstName lastName');

    if (!following) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      count: following.following.length,
      data: JSON.parse(JSON.stringify(following)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET BLOCKED
exports.getBlocked = async (req, res) => {
  try {
    const blocked = await userModel
      .findById(req.user.id)
      .select({ blocked: 1 })
      .populate('blocked', 'displayName firstName lastName');

    if (!blocked) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      count: blocked.blocked.length,
      data: JSON.parse(JSON.stringify(blocked)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET FAVES
exports.getFaves = async (req, res) => {
  try {
    const favourites = await userModel
      .findById(req.params.id)
      .select({ favourites: 1 })
      .populate({
        path: 'favourites',
        model: 'photoModel',
        select: 'title favourites userId sizes.size.small',
        populate: {
          path: 'userId',
          model: 'userModel',
          select: 'firstName lastName',
        },
      });

    if (!favourites) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      count: favourites.favourites.length,
      data: JSON.parse(JSON.stringify(favourites)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD TO FAVES
exports.addFave = async (req, res) => {
  try {
    // Check for existence of Photo
    if ((await photoModel.findById(req.params.id)) === null) {
      throw new AppError('No photo is found by that ID', 404);
    }

    if ((await userModel.findById(req.user.id)) === null) {
      throw new AppError('No user is found by that ID', 404);
    }

    if (
      (await userModel.findOne({
        _id: req.user.id,
        favourites: { $elemMatch: { $eq: req.params.id } },
      })) !== null
    ) {
      throw new AppError('Photo is already in Faves', 409);
    }

    //Increase Fave Count on Photo Model
    const updatedFaveCount = await photoModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $inc: { favourites: 1 },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ favourites: 1 });

    // Add PhotoID to Faves array in User model
    const updatedFaves = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { favourites: req.params.id },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ favourites: 1 });

    const Updates = {
      newPhotoFaveCount: JSON.parse(JSON.stringify(updatedFaveCount)),
      newUserFaveList: JSON.parse(JSON.stringify(updatedFaves)),
    };

    res.status(200).json({
      status: 'success',
      data: Updates,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// REMOVE FROM FAVES
exports.removeFave = async (req, res) => {
  try {
    const faveList = await userModel
      .findById(req.user.id)
      .select({ favourites: 1 });

    if (!faveList) {
      throw new AppError('No user is found by that ID', 404);
    }

    // Check if the Photo exits in User's Faves
    const favePhoto = faveList.favourites.find(
      (el) => el.toString() === req.params.id.toString()
    );

    if (favePhoto !== undefined) {
      //Decrease Fave Count on Photo Model
      const updatedFaveCount = await photoModel
        .findByIdAndUpdate(
          req.params.id,
          {
            $inc: { favourites: -1 },
          },
          {
            new: true,
            runValidators: true,
          }
        )
        .select({ favourites: 1 });

      // Remove PhotoID from Faves array in User model
      const updatedFaves = await userModel
        .findByIdAndUpdate(
          req.user.id,
          {
            $pull: { favourites: req.params.id },
          },
          {
            new: true,
            runValidators: true,
          }
        )
        .select({ favourites: 1 });

      const Updates = {
        newPhotoFaveCount: JSON.parse(JSON.stringify(updatedFaveCount)),
        newUserFaveList: JSON.parse(JSON.stringify(updatedFaves)),
      };

      res.status(200).json({
        status: 'success',
        data: Updates,
      });
    } else {
      throw new AppError('No photo is found by that ID in User faves', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET NOTIFICATION SETTINGS
exports.getNotificationSettings = async (req, res) => {
  try {
    const notificationSettings = await userModel
      .findById(req.user.id)
      .select({ notificationSettings: 1, _id: 0 });

    if (!notificationSettings) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(notificationSettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET PRIVACY SETTINGS
exports.getPrivacySettings = async (req, res) => {
  try {
    const privacySettings = await userModel
      .findById(req.user.id)
      .select({ privacySettings: 1, _id: 0 });

    if (!privacySettings) {
      throw new AppError('No user is found by that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(privacySettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE PRIVACY SETTINGS
exports.updatePrivacySettings = async (req, res) => {
  try {
    const privacySettings = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { privacySettings: req.body.privacySettings },
        { new: true, runValidators: true }
      )
      .select({ privacySettings: 1, _id: 0 });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(privacySettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE NOTIFICATION SETTINGS
exports.updateNotificationSettings = async (req, res) => {
  try {
    const notificationSettings = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { notificationSettings: req.body.notificationSettings },
        { new: true, runValidators: true }
      )
      .select({ notificationSettings: 1, _id: 0 });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(notificationSettings)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
