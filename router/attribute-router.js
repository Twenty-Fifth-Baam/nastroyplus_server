const Router = require("express").Router;
const router = new Router();
const attributeController= require("../controllers/attributes-controller");

router.post("/", attributeController.createAttribute);
router.delete("/", attributeController.deleteAttribute);
router.put("/", attributeController.updateAttribute);
// router.get("/", attributeController.getAttributes);
module.exports = router;
