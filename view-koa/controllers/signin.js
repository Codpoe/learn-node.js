module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        
        if (email === '847234974@qq.com' && password === '123456') {
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: 'Codpoe'
            });
        } else {
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
};