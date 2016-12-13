var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Post = require('../models/Post');

function needAuth(req, res, next){
  if(req.isAuthenticated()){
    next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/login');
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  Post.find({}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts : post});
  });
});

 router.get('/new', function(req, res, next){
   res.render('posts/edit', {post: {}});
 }); // 게시물 쓰기 페이지

 router.get('/:id', function(req, res, next){
   console.log("tget /:id");
   Post.findById({_id: req.params.id}, function(err,post){
     if(err){
       return next(err);
     }
     post.read = post.read+1;
     post.save(function(err){
       if(err){
         return next(err);
       }
       res.render('posts/show',{post: post});
     });
   });
 }); // 게시물 보기

 router.post('/', function(req,res,next){
   var newPost = new Post({
     title: req.body.title,
     password: req.body.password,
     address: req.body.address,
     content: req.body.content,
     city: req.body.city,
     pay: req.body.pay,
     convenience: req.body.convenience,
     read: 0
   });
   newPost.save(function(err){
     if(err){
       return next(err);
     }
     res.redirect('/posts');
   });
 }); //게시물 쓰기

router.get('/:id/edit', function(req,res,next){
  console.log("tget /:id/edit");
  Post.findById({_id: req.params.id}, function(err, post){
    if(err){
      return next(err);
    }
      res.render('posts/edit', {post: post});
    });
  });
 // 게시물 수정 페이지

router.put('/:id', function(req,res,next){
  Post.findById({_id: req.params.id}, function(err, post){
    if(err){
      return next(err);
    }

      post.title = req.body.title;
      post.content = req.body.content;
      post.address = req.body.address;
      post.city = req.body.city;
      post.pay = req.body.pay;
      post.convenience = req.body.convenience;
      post.save(function(err){
        if(err){
          return next(err);
        }
     res.redirect('/posts');
      });
    });
  });
 //게시물 수정

router.delete('/:id', function(req,res,next){
    Post.findOneAndRemove({_id: req.params.id}, function(err) { 
   if (err) { 
    return next(err); 
 } 
   res.redirect('/posts'); 
   }); 

}); //게시물 삭제

module.exports = router;
