import { Router } from 'express';
import passport from 'passport';
import { getAllPositions, createPosition, updatePosition, deletePosition, getPosition } from './controller';

const router = new Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', getAllPositions);

router.get('/:terminalId', getPosition);

router.post('/', createPosition);

router.put('/:terminalId', updatePosition);

router.delete('/:terminalId', deletePosition);

export default router;
