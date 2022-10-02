import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
const router = Router()

router.get('/', indexCtrl.employeeController.findAll)
router.get('/:id', indexCtrl.employeeController.findOne)
router.get('/:id/history', indexCtrl.employeeController.history)
router.post('/', indexCtrl.employeeController.create)
router.put('/:id', indexCtrl.employeeController.update)
router.delete('/:id', indexCtrl.employeeController.deleted)
router.get('/sql/:id', indexCtrl.employeeController.querySQL)
export default router