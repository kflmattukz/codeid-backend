import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
const router = Router()

router.get('/', indexCtrl.departmentController.findAll)
router.get('/:id', indexCtrl.departmentController.findOne)
router.post('/', indexCtrl.departmentController.create)
router.put('/:id', indexCtrl.departmentController.update)
router.delete('/:id', indexCtrl.departmentController.deleted)
router.get('/sql/:id', indexCtrl.departmentController.querySQL)
export default router