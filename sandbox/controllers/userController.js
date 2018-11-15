var api = require('../utils/api');

api.defineAction({
    path: '/api/0/users/me',
    method: 'GET',
    handler: function(req, res) {
        
      res.json(state.users[0])
    }
})
