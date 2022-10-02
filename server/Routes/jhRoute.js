import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
const router = Router()

router.get('/', indexCtrl.jhController.findAll)
router.get('/:id', indexCtrl.jhController.findOne)
router.post('/', indexCtrl.jhController.create)
router.put('/:id', indexCtrl.jhController.update)
router.delete('/:id', indexCtrl.jhController.deleted)
router.get('/sql/:id', indexCtrl.jhController.querySQL)
export default router