/* eslint-disable no-unused-vars */
// INCLUDE MODELS
const galleryModel = require('../models/galleryModel.js');
const userModel = require('../models/userModel.js');
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// GET GALLERY INFORMATION
exports.getInfo = async (req, res) => {
  try {
    const gallery = await galleryModel
      .findById(req.params.id)
      .populate('primaryPhotoId', 'sizes')
      .populate('photos.photoId', 'sizes');

    if (!gallery) {
      throw new AppError('No Gallery Found with This ID', 404);
    }

    const galleryJson = JSON.parse(JSON.stringify(gallery));
    galleryJson.photocount = gallery.photos.length;

    res.status(200).json({
      status: 'success',
      data: galleryJson,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET PHOTOS
exports.getPhotos = async (req, res) => {
  try {
    const photos = await galleryModel
      .findById(req.params.id)
      .select({ photos: 1, _id: 0 })
      .populate('photos.photoId', 'sizes');

    if (!photos) {
      throw new AppError('No Gallery Found with This ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(photos)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD A COMMENT
exports.addComment = async (req, res) => {
  try {
    // check if gallery id exist or not
    if (!(await galleryModel.findById(req.params.id))) {
      throw new AppError('No Gallery Found with This ID', 404);
    }
    // add comment to comment model
    const comment = await commentModel.create(req.body);
    // add commentID to comments array in gallery model
    const updatedGallery = await galleryModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment._id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(comment)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET ALL COMMENTS
exports.getComments = async (req, res) => {
  try {
    const comments = await galleryModel
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 })
      .populate([
        {
          path: 'comments',
          model: 'commentModel',
          populate: {
            path: 'userId',
            model: 'userModel',
            select: 'displayName',
          },
        },
      ]);

    if (!comments) {
      throw new AppError('No Gallery Found with This ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(comments)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// EDIT COMMENT
exports.editComment = async (req, res) => {
  try {
    const newComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newComment) {
      throw new AppError('No Comment Found with This ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newComment)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const gallery = await galleryModel /// get array of comments in gallery
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });

    if (!gallery) {
      throw new AppError('No Gallery Found with This ID', 404);
    }

    // check if the comment exits in gallery's comments
    const comment = gallery.comments.find(
      (element) => element.toString() === req.params.commentid.toString()
    );

    if (comment !== undefined) {
      // if the comment exits in gallery's comments
      await galleryModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { comments: comment },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // delete comment from comment model
      await commentModel.findByIdAndDelete(req.params.commentid);

      res.status(204).json({
        status: 'success',
        data: 'ok',
      });
    } else {
      throw new AppError('No Comment Found with This ID', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// CREATE GALLERY
exports.createGallery = async (req, res) => {
  try {
    // create new gallery
    const gallery = await galleryModel.create(req.body);

    // add gallery to current user's array of galleries
    await userModel.findByIdAndUpdate(req.headers.userid, {
      $push: { gallery: gallery._id },
    });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(gallery)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD A PHOTO
exports.addPhoto = async (req, res) => {
  try {
    // check if gallery id exist or not

    const gallery = await galleryModel.findById(req.params.id);
    if (!gallery) {
      throw new AppError('No Gallery Found with This ID', 404);
    }

    // check if photo id exist or not
    const photoFromModel = await photoModel.findById(req.body.photoID);
    if (!photoFromModel) {
      throw new AppError('No Photo Found with This ID', 404);
    }
    // check if the photo exist in user faves
    const currentUser = await userModel.findById(req.headers.userid);
    const existInFaves = currentUser.favourites.find(
      (element) => element.toString() === req.body.photoID.toString()
    );
    if (!existInFaves) {
      throw new AppError('This Photo not in User Faves', 404);
    }
    // check if the photo alread exist in the gallery
    const isExist = gallery.photos.find(
      (element) => element.photoId.toString() === req.body.photoID.toString()
    );
    if (!isExist) {
      // check photos count in a gallery photos count <=500
      if (gallery.photos.length <= 500) {
        // add photo to photos array in gallery
        const updatedGallery = await galleryModel.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              photos: {
                photoId: req.body.photoID,
                remark: '',
              },
            },
          },
          {
            new: true,
            runValidators: false,
          }
        );

        res.status(200).json({
          status: 'success',
          data: 'ok',
        });
      } else {
        throw new AppError('Gallery is Full ! Cannot add a new photo', 404);
      }
    } else {
      throw new AppError('This Photo Already Exist !', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
