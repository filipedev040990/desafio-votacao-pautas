import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createMotionControllerFactory } from '../factories/create-motion.factory'

const router = Router()

router.post('/motion', expressRouteAdapter(createMotionControllerFactory()))

export { router }
