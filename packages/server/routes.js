import Router from 'koa-router'
import { getDataForKey, setDataForKey } from './saveAPI.js';

const router = new Router()

/**
 * @type {{key: string}}
 */
router.get('/coding/save', ctx => {
    const query = ctx.request.query;
    console.log(query)
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
    const query = ctx.request.body;
    if(!query) {
        ctx.body = {code: 0, message: '参数错误：应为 {username,password,key,data}'};
        return null;
    }
    if(query.username !== 'sparrow' || query.password !== 'sparrow') {
        ctx.body = {code: 0, message: '账号密码错误'};
        return null;
    }
    setDataForKey(query.key, query.data);
    ctx.body = {
        code: 1,
        message: '记录成功'
    }
})



export default router;