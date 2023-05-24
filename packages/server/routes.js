import Router from 'koa-router'
import { getDataForKey, setDataForKey } from './saveAPI.js';

const router = new Router()

/**
 * @type {{key: string}}
 */
router.get('/coding/save', ctx => {
    const query = ctx.query;
    if(!query.key) {
        ctx.body = {}
        return
    }
    ctx.body = getDataForKey(query.key);
})


/**
 * @type {{key: string}}
 */
router.post('/coding/save', ctx => {
    const query = ctx.query;
    setDataForKey(query.key, query.data);
    ctx.body = {
        code: 1
    }
})



export default router;