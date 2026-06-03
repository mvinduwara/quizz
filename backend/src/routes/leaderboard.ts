import { Router } from 'express'
import { getLeaderboard, submitScore } from '../controllers/leaderboardController'
import { authMiddleware } from '../middleware/auth'

const router = Router()
router.get('/', getLeaderboard)
router.post('/', (req, res, next) => {
  submitScore(req, res)
  void next
})
export default router