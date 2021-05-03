// INCLUDE MODELS
const galleryModel = require('../models/galleryModel.js');

// GET REAL NAME
exports.getInfo = async (req, res) => {
  try {
    const gallery = await galleryModel.findById(req.params.id);

    res.status(200).send({
      status: 'success',
      data: {
        gallery,
        photoscount: gallery.photos.length,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const gallery = await galleryModel.findById(req.params.id);
    res.status(200).send({
      status: 'success',
      data: { photos: gallery.photos },
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
