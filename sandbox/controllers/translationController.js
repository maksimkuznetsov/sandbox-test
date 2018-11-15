var api = require('../utils/api');

api.defineAction({
    path: '/api/0/translation/{locale}',
    method: 'GET',
    handler: function(req, res) {
        var locale = req.params.locale
        if (state.translations[locale] === undefined) {
            res.json(404, { error: { message: 'Locale «' + locale + '» not found; Allow only: ' + Object.keys(translations).join(', ') } })
            return;
        }
        return res.json(state.translations[locale])
    }
})
