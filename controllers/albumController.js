/* eslint-disable no-unused-vars */
// INCLUDE MODELS
const albumModel = require('../models/albumModel.js');
const photoModel = require('../models/photoModel.js');
const userModel = require('../models/userModel.js');
const commentModel = require('../models/commentModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// GET INFORMATION
exports.getInfo = async (req, res) => {
  try {
    const album = await albumModel
      .findById(req.params.id)
      .populate('primaryPhotoId', 'sizes')
      .populate('photos', 'sizes');

    if (!album) {
      throw new AppError('No Album Found with This ID', 404);
    }

    const albumJson = JSON.parse(JSON.stringify(album));
    albumJson.photocount = album.photos.length;

    res.status(200).json({
      status: 'success',
      data: albumJson,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET PHOTOS
exports.getPhotos = async (req, res) => {
  try {
    const photos = await albumModel
      .findById(req.params.id)
      .select({ photos: 1, _id: 0 })
      .populate('photos', 'sizes');

    if (!photos) {
      throw new AppError('No Album Found with This ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(photos)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    // check if album id exist or not
    if (!(await albumModel.findById(req.params.id))) {
      throw new AppError('No Album Found with This ID', 404);
    }
    // add comment to comment model
    const comment = await commentModel.create(req.body);
    // add commentID to comments array in album model
    const updatedAlbum = await albumModel.findByIdAndUpdate(
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
    const comments = await albumModel
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
      throw new AppError('No Album Found with This ID', 404);
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
    const album = await albumModel /// get array of comments in album
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });

    if (!album) {
      throw new AppError('No Album Found with This ID', 404);
    }

    // check if the comment exits in album's comments
    const comment = album.comments.find(
      (element) => element.toString() === req.params.commentid.toString()
    );

    if (comment !== undefined) {
      // if the comment exits in album's comments
      await albumModel.findByIdAndUpdate(
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

// CREATE ALBUM
exports.createAlbum = async (req, res) => {
  try {
    const album = await albumModel.create(req.body);

    // add album to current user's array of albums
    await userModel.findByIdAndUpdate(req.headers.userid, {
      $push: { albums: album._id },
    });
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(album)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD A PHOTO
exports.addPhoto = async (req, res) => {
  try {
    // check if album id exist or not

    const album = await albumModel.findById(req.params.id);
    if (!album) {
      throw new AppError('No Album Found with This ID', 404);
    }

    // check if photo id exist or not
    const photoFromModel = await photoModel.findById(req.body.photoID);
    if (!photoFromModel) {
      throw new AppError('No Photo Found with This ID', 404);
    }
    // check if the photo alread exist in the album
    const isExist = album.photos.find(
      (element) => element.toString() === req.body.photoID.toString()
    );
    if (!isExist) {
      // add photo to photos array in album
      const updatedAlbum = await albumModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { photos: req.body.photoID },
          $set: { updatedAt: new Date(Date.now()) },
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
      throw new AppError('This Photo Already Exist !', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// Delete A PHOTO
exports.removePhoto = async (req, res) => {
  try {
    // check if album id exist or not
    const album = await albumModel.findById(req.params.id);
    if (!album) {
      throw new AppError('No Album Found with This ID', 404);
    }

    // check if photo id exist or not
    const photoFromModel = await photoModel.findById(req.params.photoid);
    if (!photoFromModel) {
      throw new AppError('No Photo Found with This ID', 404);
    }

    // check if the photo exists in the album
    const isExist = album.photos.find(
      (element) => element.toString() === req.params.photoid.toString()
    );

    // check if there's no other photos in the album
    if (album.photos.length === 1)
      throw new AppError('Album cannot be Empty!', 404);
    if (isExist) {
      // check if the removed photo is the primary photo
      let primPhoto = album.primaryPhotoId;
      if (album.primaryPhotoId.toString() === req.params.photoid.toString()) {
        const index = album.photos.findIndex(
          (element) => element.toString() === req.params.photoid.toString()
        );
        primPhoto = album.photos[(index + 1) / album.photos.length];
      }

      // update album
      await albumModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { photos: photoFromModel._id },
          $set: { primaryPhotoId: primPhoto, updatedAt: new Date(Date.now()) },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(204).json({
        status: 'success',
        data: 'ok',
      });
    } else {
      throw new AppError('This Photo not in the album!', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
