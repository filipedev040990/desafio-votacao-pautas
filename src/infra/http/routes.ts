import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createMotionControllerFactory } from '../factories/create-motion.factory'
import { updateMotionControllerFactory } from '../factories/update-motion.factory'
import { deleteMotionControllerFactory } from '../factories/delete-motion.factory'

const router = Router()

router.post('/motion', expressRouteAdapter(createMotionControllerFactory()))
router.put('/motion/:id', expressRouteAdapter(updateMotionControllerFactory()))
router.delete('/motion/:id', expressRouteAdapter(deleteMotionControllerFactory()))

export { router }
