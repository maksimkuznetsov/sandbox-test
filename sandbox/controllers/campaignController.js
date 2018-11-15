var api = require('../utils/api');

api.defineAction({
    path: '/api/0/campaigns/{id}',
    method: 'GET',
    handler: function(req, res) {
        var campaign = _.find(state.campaigns, { 'id': parseInt(req.params.id) })
    
        if (campaign === undefined) {
            res.json(404, { error: { message: "Campaign not found" } })
            return;
        }
        return res.json(campaign)
    }
})