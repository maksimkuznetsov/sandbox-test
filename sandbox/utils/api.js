exports.defineAction = function (action) {
    Sandbox.define(action.path, action.method, action.handler);
}

exports.isAuthorised = function (req, res) {
    var authorized = false;
    if (req.headers.authorization !== undefined) {
        var token = req.headers.authorization.replace('Bearer ', '');
        state.activeUsers.forEach(function(item) {
            if (item.token === token) {
                authorized = true;
            }
        })
    }
    
    if (!authorized) {
        res.json(401, { error: { message: "Not authorized" } });
        return false;
    }
    return true;
}