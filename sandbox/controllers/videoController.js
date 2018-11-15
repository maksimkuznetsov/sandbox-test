var api = require('../utils/api');

api.defineAction({
    path: '/api/0/videos',
    method: 'GET',
    handler: function(req, res) {
      var page = parseInt(req.query.page) || 0
      var pageSize = parseInt(req.query.pageSize) || 10
      var startIndex = page * pageSize
      
      var campaignId = parseInt(req.query.campaignId) || null;
      
      var filteredVideos = state.videos.filter(function(x) { return x.campaignId === campaignId });
      var videos = filteredVideos.slice(startIndex, startIndex + pageSize);
      var totalItems = filteredVideos.length;
      var totalPages = Math.ceil(totalItems / pageSize);
      
      var campaign = _.find(state.campaigns, function(x) { return x.id === campaignId }) || null;
      if (campaign !== null && campaign.totalVideos > 0) {
          totalItems = campaign.totalVideos;
          totalPages = Math.ceil(totalItems / pageSize);
      }
      var result = {
          content: videos,
          page: page,
          pageSize: pageSize,
          totalItems: totalItems,
          totalPages: totalPages
      }
      
      return res.json(result)
    }
})
