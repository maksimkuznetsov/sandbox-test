var api = require('../utils/api');

api.defineAction({
    path: '/api/0/assets',
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

api.defineAction({
    path: '/api/0/assets/tickers',
    method: 'POST',
    handler: function(req, res) {
      if (!api.isAuthorised(req, res)) {
          return;
      }
      
      var items = [];
      var pairs = [];
      
      if (req.body && req.body.pairs) {
          req.body.pairs.forEach(function(pair){
              var codesVariants = [
            	[pair.slice(0,2), pair.slice(2,10)],
            	[pair.slice(0,3), pair.slice(3,10)],
            	[pair.slice(0,4), pair.slice(4,10)],
            	[pair.slice(0,5), pair.slice(5,10)],
            	[pair.slice(0,6), pair.slice(6,10)]    
              ];
              
              var fromAssetKey = null;
              var toAssetKey = null;
              
              var availableAssets = state.assets.filter(function(asset){
                  return pair.indexOf(asset.key) !== -1;
              });
              codesVariants.forEach(function(variant) {
                  var first = null;
                  var second = null;
                  availableAssets.forEach(function(asset) {
                      if (asset.key === variant[0]) {
                          first = asset;
                      } else if (asset.key === variant[1]) {
                         second = asset; 
                      }
                  });
                  if (first !== null && second !== null) {
                      fromAssetKey = first.key;
                      toAssetKey = second.key;
                  }
              });
              
              if (fromAssetKey !== null && toAssetKey !== null) {
                  pairs.push(pair);
                  items.push({
                      pair: pair,
                      price: faker.random.number({ max: 1000, min: 50 }),
                      lastChange: faker.random.number({ max: 10, min: -10 }),
                      fromAssetKey: fromAssetKey,
                      toAssetKey: toAssetKey,
                  });
                  
              }
              
          })
      }
      
      var result = {
          content: items,
          pairs: pairs
      }
      
      return res.json(result)
    }
})