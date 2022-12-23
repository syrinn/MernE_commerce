const router = require("express").Router();
const produitController = require("../controllers/produit.controller");
const protect = require("../protect");
router.post("/create", protect.protect, produitController.createProduit);
router.get("/", protect.protect, produitController.getAllProduits);
// router.put("/favorie/:id", protect.protect, produitController.favories);
router.put("/favorie/:id", produitController.favories);
router.get(
  "/:categoryId",
  protect.protect,
  produitController.getProduitsByCategory
);
module.exports = router;
