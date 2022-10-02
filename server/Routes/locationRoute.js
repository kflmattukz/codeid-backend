import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
const router = Router()

router.get('/', indexCtrl.locationController.findAll)
router.get('/:id', indexCtrl.locationController.findOne)
router.post('/', indexCtrl.locationController.create)
router.put('/:id', indexCtrl.locationController.update)
router.delete('/:id', indexCtrl.locationController.deleted)
router.get('/sql/:id', indexCtrl.locationController.querySQL)
export default router