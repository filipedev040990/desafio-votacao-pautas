import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createMotionControllerFactory } from '../factories/create-motion.factory'
import { updateMotionControllerFactory } from '../factories/update-motion.factory'

const router = Router()

router.post('/motion', expressRouteAdapter(createMotionControllerFactory()))
router.put('/motion/:id', expressRouteAdapter(updateMotionControllerFactory()))

export { router }
