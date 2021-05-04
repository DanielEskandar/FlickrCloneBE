// INCLUDE MODELS
const userModel = require('../models/userModel.js');
const photoModel = require('../models/photoModel');

// GET REAL NAME
exports.getRealName = async (req, res) => {
  try {
    const realName = await userModel
      .findById(req.headers.userid)
      .select({ firstName: 1, lastName: 1, _id: 0 });

    res.status(200).send({
      status: 'success',
      data: realName.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

// GET DISPLAY NAME
exports.getDispName = async (req, res) => {
  try {
    const dispName = await userModel
      .findById(req.headers.userid)
      .select({ displayName: 1, _id: 0 });

    res.status(200).send({
      status: 'success',
      data: dispName.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
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

    res.status(200).send({
      status: 'success',
      data: userInfo.toJSON(),
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: 'No user is found by that user ID',
    });
  }
};

// GET LIMITS
exports.getLimits = async (req, res) => {
  try {
    const limits = await userModel
      .findById(req.headers.userid)
      .select({ limits: 1, _id: 0 });

    res.status(200).send({
      status: 'success',
      data: limits.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
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

    res.status(200).send({
      status: 'success',
      count: favourites.favourites.length,
      data: JSON.parse(JSON.stringify(favourites)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

// ADD TO FAVES
exports.addFave = async (req, res) => {
  try {
    // Check for existence of Photo
    if ((await photoModel.findById(req.params.id)) === null) {
      res.status(404).send({
        status: 'Error',
        message: 'This PhotoID does not exist',
      });
      return;
    }

    if (
      (await userModel.findOne({
        _id: req.headers.userid,
        favourites: { $elemMatch: { $eq: req.params.id } },
      })) !== null
    ) {
      res.status(409).send({
        status: 'Error',
        message: 'This PhotoID is already in Faves',
      });
      return;
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
        req.headers.userid,
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

    res.status(200).send({
      status: 'success',
      data: Updates,
    });
  } catch (err) {
    res.status(400).send({
      status: 'Error',
      message: 'Bad Request',
    });
  }
};

exports.removeFave = async (req, res) => {
  try {
    const faveList = await userModel
      .findById(req.headers.userid)
      .select({ favourites: 1 });

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
          req.headers.userid,
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

      res.status(200).send({
        status: 'success',
        data: Updates,
      });
    } else {
      res.status(404).send({
        status: 'fail',
        message: "This Photo doesn't exist in Faves",
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',
    });
  }
};
