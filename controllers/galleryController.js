/* eslint-disable no-unused-vars */
// INCLUDE MODELS
const galleryModel = require('../models/galleryModel.js');
const userModel = require('../models/userModel.js');
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');
const { populate } = require('../models/galleryModel.js');

exports.getInfo = async (req, res) => {
  try {
    const gallery = await galleryModel
      .findById(req.params.id)
      .populate('primaryPhotoId', 'sizes')
      .populate('photos.photoId', 'sizes');

    const galleryJson = JSON.parse(JSON.stringify(gallery));
    galleryJson.photocount = gallery.photos.length;

    res.status(200).send({
      status: 'success',
      data: galleryJson,
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: "ID doesn't  exist",
    });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const photos = await galleryModel
      .findById(req.params.id)
      .select({ photos: 1, _id: 0 })
      .populate('photos.photoId', 'sizes');

    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(photos)),
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: "This ID doesn't exist",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    // check if gallery id exist or not
    if ((await galleryModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: "This ID doesn't exist",
      });
      return;
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
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(comment)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

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

    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(comments)),
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: err,
    });
  }
};

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
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(newComment)),
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: "This Comment ID doesn't exist",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const gallery = await galleryModel /// get array of comments in gallery
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });

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

      res.status(204).send({
        status: 'success',
        data: 'ok',
      });
    } else {
      res.status(404).send({
        status: 'fail',
        message: "This comment doesn't exist in the gallery",
      });
    }
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: "This gallery ID doesn't exist",
    });
  }
};

exports.createGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.create(req.body);
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(gallery)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
