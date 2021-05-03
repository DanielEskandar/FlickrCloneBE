// INCLUDE MODELS
const albumModel = require('../models/albumModel.js');
//const commentModel = require('../models/commentModel.js');

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
    res.status(404).send({
      status: 'error',
      message: err,
    });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const photos = await albumModel
      .findById(req.params.id)
      .select({ photos: 1, _id: 0 });
    res.status(200).send({
      status: 'success',
      data: { photos },
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: err,
    });
  }
};
