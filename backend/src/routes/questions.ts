import { Router } from 'express'
import { getAllQuestions, getQuestionById } from '../controllers/questionController'

const router = Router()
router.get('/', getAllQuestions)
router.get('/:id', getQuestionById)
export default router