// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');

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
