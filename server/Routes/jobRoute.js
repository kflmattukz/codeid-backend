import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
const router = Router()

router.get('/', indexCtrl.jobController.findAll)
router.get('/:id', indexCtrl.jobController.findOne)
router.post('/', indexCtrl.jobController.create)
router.put('/:id', indexCtrl.jobController.update)
router.delete('/:id', indexCtrl.jobController.deleted)
router.get('/sql/:id', indexCtrl.jobController.querySQL)
export default router