import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createMotionControllerFactory } from '../factories/create-motion.factory'
import { updateMotionControllerFactory } from '../factories/update-motion.factory'
import { deleteMotionControllerFactory } from '../factories/delete-motion.factory'
import { listMotionByIdControllerFactory } from '../factories/list-by-id-motion.factory'
import { listMotionsControllerFactory } from '../factories/list-motions.factory'
import { createVotingSessionControllerFactory } from '../factories/create-voting-session.factory'
import { createMemberControllerFactory } from '../factories/create-member.factory'
import { updateMemberControllerFactory } from '../factories/update-member.factory'
import { createVotingControllerFactory } from '../factories/create-voting.factory'
import { voteCountControllerFactory } from '../factories/vote-count.factory'

const router = Router()

//motions
router.get('/motion/:id', expressRouteAdapter(listMotionByIdControllerFactory()))
router.put('/motion/:id', expressRouteAdapter(updateMotionControllerFactory()))
router.delete('/motion/:id', expressRouteAdapter(deleteMotionControllerFactory()))
router.post('/motion', expressRouteAdapter(createMotionControllerFactory()))
router.get('/motion', expressRouteAdapter(listMotionsControllerFactory()))

//voting session
router.post('/voting-session', expressRouteAdapter(createVotingSessionControllerFactory()))

//members
router.post('/member', expressRouteAdapter(createMemberControllerFactory()))
router.put('/member', expressRouteAdapter(updateMemberControllerFactory()))

//voting
router.post('/voting', expressRouteAdapter(createVotingControllerFactory()))

//vote count
router.get('/vote/count/:id', expressRouteAdapter(voteCountControllerFactory()))

export { router }
