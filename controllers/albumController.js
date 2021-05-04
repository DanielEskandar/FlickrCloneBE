/* eslint-disable no-unused-vars */
// INCLUDE MODELS
const albumModel = require('../models/albumModel.js');
const photoModel = require('../models/photoModel.js');
const userModel = require('../models/userModel.js');
const commentModel = require('../models/commentModel.js');

//const commentModel = require('../models/commentModel.js');

exports.getInfo = async (req, res) => {
  try {
    const album = await albumModel
      .findById(req.params.id)
      .populate('primaryPhotoId', 'sizes')
      .populate('photos', 'sizes');

    const albumJson = album.toJSON();
    albumJson.photocount = album.photos.length;

    res.status(200).send({
      status: 'success',
      data: albumJson,
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
    const photos = await albumModel
      .findById(req.params.id)
      .select({ photos: 1, _id: 0 })
      .populate('photos', 'sizes');

    res.status(200).send({
      status: 'success',
      data: photos.toJSON(),
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
    // check if album id exist or not
    if ((await albumModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: "This ID doesn't exist",
      });
      return;
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
    res.status(200).send({
      status: 'success',
      data: comment.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: "This ID doesn't exist",
    });
  }
};

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

    res.status(200).send({
      status: 'success',
      data: comments.toJSON(),
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
      data: newComment.toJSON(),
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
    const album = await albumModel /// get array of comments in album
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });

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

      res.status(204).send({
        status: 'success',
        data: 'ok',
      });
    } else {
      res.status(404).send({
        status: 'fail',
        message: "This comment doesn't exist in the album",
      });
    }
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: "This album ID doesn't exist",
    });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const album = await albumModel.create(req.body);
    res.status(200).send({
      status: 'success',
      data: album.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
