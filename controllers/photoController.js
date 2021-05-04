// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');

// GET FAVOURITES FOR A PHOTO
exports.getFavourites = async (req, res) => {
  try {
    const faves = await photoModel
      .findById(req.params.id)
      .select({ favourites: 1, _id: 0 });

    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(faves)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

// GET INFORMATION FOR A PHOTO
exports.getInformation = async (req, res) => {
  try {
    const info = await photoModel.findById(req.params.id).select({
      permissions: 0,
      _id: 0,
      safetyLevel: 0,
      hidden: 0,
      license: 0,
    });
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(info)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

// ADD COMMENT TO PHOTO --
exports.addComment = async (req, res) => {
  try {
    if ((await photoModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: "This photo ID doesn't exist",
      });
      return;
    }
    const newComment = await commentModel.create(req.body);
    newComment._id = req.body.commentid;
    const addToPhoto = await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: newComment._id },
      },
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
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

// EDIT COMMENT ON PHOTO
exports.editComment = async (req, res) => {
  try {
    // Incoming ID in params is of comment this time
    const edittedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(edittedComment)),
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: 'This Comment ID does not exist.',
    });
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const photoWithComment = await photoModel
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });
    const comment = photoWithComment.comments.find(
      (element) => element.toString() === req.params.commentid.toString()
    );

    if (comment) {
      await photoModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { comments: comment },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      await commentModel.findByIdAndDelete(req.params.commentid);
      res.status(204).send({
        status: 'success',
      });
    } else {
      res.status(404).send({
        status: 'fail',
        message: 'This comment does not exist in this photo.',
      });
    }
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: 'This photo ID does not exist.',
    });
  }
};

// GET COMMENTS
exports.getComments = async (req, res) => {
  try {
    const comments = await photoModel
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(comments)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
