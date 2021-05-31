import promiseRouter from 'express-promise-router';
import { logging, handleError } from './middlewares/common';
import { auth } from './middlewares/auth';

const router = promiseRouter();

router.use(logging);
router.use(auth);

// カレンダーを取得する
router.get('/calendar_list', require('../api/calendar').getCalendarList);

router.use(handleError('api', 500, {}))

export const apiRoutes = router;
