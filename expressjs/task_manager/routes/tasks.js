const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  save,
  update,
  remove,
} = require("../controllers/tasks");

router.route("/").get(getAll).post(save);
router.route("/:id").get(getById).patch(update).delete(remove);

module.exports = router;
