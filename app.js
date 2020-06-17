const express = require("express"),
      app = express(),
      NewsAPI = require('newsapi'),
      newsapi = new NewsAPI(process.env.API_KEY),
      port = process.env.PORT || 3000;

var path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function(req, res){
    res.render('list');
});


app.get('/:country', function(req, res){
    newsapi.v2.topHeadlines({
    country: req.params.country
    }).then(response => {
        content = response.articles;
        res.render('main_page', {content : content, country: req.params.country});
    })
});

app.get('/:country/:category', function(req, res){
    newsapi.v2.topHeadlines({
    country: req.params.country,
    category: req.params.category
    }).then(response => {
        content = response.articles;
        res.render('main_page', {content : content, country: req.params.country});
    })
});

app.listen(port, function(){
	console.log('News_app server has been started!')
});




// // To query /v2/top-headlines
// // All options passed to topHeadlines are optional, but you need to include at least one of them
// newsapi.v2.topHeadlines({
//   sources: 'bbc-news,the-verge',
//   q: 'bitcoin',
//   category: 'business',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });
// // To query /v2/everything
// // You must include at least one q, source, or domain
// newsapi.v2.everything({
//   q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });
// // To query sources
// // All options are optional
// newsapi.v2.sources({
//   category: 'technology',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });