const Categorie = require("../models/categorie.model");

module.exports.createsCategories = async (req, res) => {
  try {
    // get body content

    let { name, description } = req.body;
    let newCategorie = new Categorie({
      name: name,
      description: description,
    });
    let savedCategorie = await newCategorie.save();
    return res.status(200).json({
      success: true,
      categorie: savedCategorie,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports.getAllCategorie = async (req, res) => {
  try {
    let categorie = await Categorie.find();
    return res.status(200).json({
      success: true,
      categorie,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};
module.exports.updateCategorie = async (req, res) => {
  try {
    let { categorieId } = req.params;
    let { name } = req.body;

    let updateCategorie = await Categorie.findByIdAndUpdate(
      categorieId,
      {
        $set: {
          name: name,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      categorie: updateCategorie,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};
module.exports.deleteCategorie = async (req, res) => {
  try {
    let { categorieId } = req.params;
    await Categorie.findByIdAndDelete(categorieId);
    return res.status(200).json({
      success: true,
      message: "classe deleted successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports.findCategorieById = async (req, res) => {
  try {
    let { categorieId } = req.params;
    let getCategorie = await Classe.findById(categorieId);
    return res.status(200).json({
      success: true,
      classe: getCategorie,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};
