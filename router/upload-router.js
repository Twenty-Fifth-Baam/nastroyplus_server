const Router = require("express").Router;
const router = new Router();
const ApiError = require("../exceptions/api-error");
const fileMiddleware = require("../middlewares/file-middleware");

router.post("/", fileMiddleware.single("img"), (req, res, next) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
    if (!req.file) {
      throw ApiError.BadRequest("Ошибка при загрузке файла")
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
