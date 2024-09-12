import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createMotionControllerFactory } from '../factories/create-motion.factory'
import { updateMotionControllerFactory } from '../factories/update-motion.factory'
import { deleteMotionControllerFactory } from '../factories/delete-motion.factory'
import { listMotionByIdControllerFactory } from '../factories/list-by-id-motion.factory'
import { listMotionsControllerFactory } from '../factories/list-motions.factory'

const router = Router()

//motions
router.get('/motion/:id', expressRouteAdapter(listMotionByIdControllerFactory()))
router.put('/motion/:id', expressRouteAdapter(updateMotionControllerFactory()))
router.delete('/motion/:id', expressRouteAdapter(deleteMotionControllerFactory()))
router.post('/motion', expressRouteAdapter(createMotionControllerFactory()))
router.get('/motion', expressRouteAdapter(listMotionsControllerFactory()))

export { router }
