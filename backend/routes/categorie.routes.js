const router = require("express").Router();
const categorieController = require("../controllers/categorie.controllers");

router.post("/create", categorieController.createsCategories);
router.get("/", categorieController.getAllCategorie);
router.put("/edit/:categorieId", categorieController.updateCategorie);
router.delete("/delete/:categorieId", categorieController.deleteCategorie);
router.get("/show/:categorieId", categorieController.findCategorieById);
module.exports = router;
