import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.status(200).send('API REDIS TESTING');
});

export default router;