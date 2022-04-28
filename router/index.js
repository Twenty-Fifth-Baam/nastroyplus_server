const userRouter = require("./user-router");

const Router = require("express").Router;
const router = new Router();

router.use('/user', userRouter)

module.exports = router;
