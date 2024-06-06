import express from 'express';
import goalsController from '../controllers/goalsController.js';
const router = express.Router();


router.post('/addingGoal', goalsController.addGoal);
router.put('/updateGoal/:myId', goalsController.updating);
router.get('/loadAllData', goalsController.loadAllData);
router.delete('/deletingGoal/:id', goalsController.deleteGoal);
export default router;