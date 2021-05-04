// INCLUDE MODELS
const albumModel = require('../models/albumModel.js');
// eslint-disable-next-line no-unused-vars
const photoModel = require('../models/photoModel.js');

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
