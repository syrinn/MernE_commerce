const Produit = require("../models/produit.model");

module.exports.createProduit = async (req, res) => {
  try {
    // get body content
    let { name, price, categorie } = req.body;
    let newProduit = new Produit({
      name: name,
      price: price,
      categorie: categorie,
    });
    let savedProduit = await newProduit.save();
    return res.status(200).json({
      success: true,
      savedProduit,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports.getAllProduits = async (req, res) => {
  try {
    let produits = await Produit.find().populate("categorie");
    return res.status(200).json({
      success: true,
      produits,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};
module.exports.favories = async (req, res) => {
  try {
    let { id } = req.params;

    let updateProduit = await Produit.findByIdAndUpdate(
      id,
      {
        $set: {
          favorie: true,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      Produit: updateProduit,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports.getProduitsByCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let produit = await Produit.find({ categorie: categoryId });
    return res.status(200).json({
      success: true,
      produit,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};
