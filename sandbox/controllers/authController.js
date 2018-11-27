var api = require('../utils/api');

api.defineAction({
    path: '/api/0/auth/login',
    method: 'POST',
    handler: function(req, res) {
      if (!(req.body && req.body.email === 'demo@initflow.com' && req.body.password === 'demo')) {
        res.json(401, { error: { message: "User not found" } })
        return;
      }
      var token = null;
      if (state.activeUsers.length > 0) {
          token = state.activeUsers[0].token;
      } else {
          token = 'a751a4a1-8710-439f-8165-f0f5d6d17e5d';
          state.activeUsers.push({ token: token });
      }
      
      res.json({ token: token })
    }
})

//create a user, body should be {email:"", password:""}
api.defineAction({
    path: '/api/0/auth/signup',
    method: 'POST',
    handler: function(req, res) {
      var token = null;
      
      
      if (state.activeUsers.length > 0) {
          token = state.activeUsers[0].token;
      } else {
          token = 'a751a4a1-8710-439f-8165-f0f5d6d17e5d';
          state.activeUsers.push({ token: token });
      }
      
      res.json({ token: token })
    }
})
