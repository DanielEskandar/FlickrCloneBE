// INCLUDE MODELS
const albumModel = require('../models/albumModel.js');

// GET REAL NAME
exports.getInfo = async (req, res) => {
  try {
    const album = await albumModel.findById(req.params.id);

    res.status(200).send({
      status: 'success',
      data: {
        album,
        photoscount: album.photos.length,
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
    const album = await albumModel.findById(req.params.id);
    res.status(200).send({
      status: 'success',
      data: { photos: album.photos },
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
