const router = require("express").Router();

const {createService, getServices, getService, updateService, deleteService} = require("../../controllers/serviceController");

const {protect} = require("../../middlewares/authMiddleware");

const {hasPermission} = require("../../middlewares/permissionMiddleware");

router.post("/", protect, hasPermission("create_service"), createService);
router.get("/",getServices);
router.get("/:id",getService);
router.put("/:id",protect,hasPermission("update_service" ), updateService);
router.delete("/:id",protect,hasPermission("delete_service"),deleteService);

module.exports = router;