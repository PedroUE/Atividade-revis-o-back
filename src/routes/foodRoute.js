import express from 'express';
import * as controller from '../controllers/foodController.js';

const router = express.Router();

router.post('/foodController', controller.create);
router.get('/foodController', controller.getAll);
router.get('/foodController/:id', controller.getById);
router.put('/foodController/:id', controller.update);
router.delete('/foodController/:id', controller.remove);

export default router;
