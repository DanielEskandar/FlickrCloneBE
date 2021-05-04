// INCLUDE MODELS
const galleryModel = require('../models/galleryModel.js');
// eslint-disable-next-line no-unused-vars
const photoModel = require('../models/photoModel.js');

//const commentModel = require('../models/commentModel.js');

exports.getInfo = async (req, res) => {
  try {
    const gallery = await galleryModel
      .findById(req.params.id)
      .populate('primaryPhotoId', 'sizes')
      .populate('photos.photoId', 'sizes');

    const galleryJson = gallery.toJSON();
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
      data: photos.toJSON(),
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: "This ID doesn't exist",
    });
  }
};
