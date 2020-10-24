var createPath = function(path, version) {
    return '/api/' + version || 0 + '/company' + (path ? '/' + path : '');
};

api.defineAction({
    path: createPath(),
    method: 'GET',
    handler: function(req, res) {
      if (!api.isAuthorised(req, res)) {
          return;
      }
      
      
      var allItems = state.assets;
      if (req.query.in === 'portfolio') {
          allItems = state.assets.filter(function(item, index) {
              return item.key.slice(0,2) === 'AB';
          });
      } else if (req.query.in === 'top') {
          allItems = state.assets.filter(function(item) {
              return item.key.slice(0,1) === 'Z';
          });
      }
      
      var page = parseInt(req.query.page) || 0
      var pageSize = parseInt(req.query.pageSize) || 10
      var startIndex = page * pageSize
     
      var resultAssets = allItems.slice(startIndex, startIndex + pageSize);
      var totalItems = allItems.length;
      var totalPages = Math.ceil(totalItems / pageSize);
      
      var result = {
          content: resultAssets,
          page: page,
          pageSize: pageSize,
          totalItems: totalItems,
          totalPages: totalPages
      }
      
      return res.json(result)
    }
})