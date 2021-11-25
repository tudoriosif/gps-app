import { Router } from 'express';
import { getAllPositions, createPosition, updatePosition, deletePosition, getPosition } from './controller';

const router = new Router();

router.get('/', getAllPositions);

router.get('/:terminalId', getPosition);

router.post('/', createPosition);

router.put('/:terminalId', updatePosition);

router.delete('/:terminalId', deletePosition);

export default router;
