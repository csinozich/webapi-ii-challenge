const Posts = require('./data/db.js');

const express = require('express');

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retreived"
    })
  }
});

router.get('/:id', async(req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if(post) {
      res.status(200).json(post);
    }
    else {
      res.status(404).json({
        message: "The post with the specifed ID does not exist."
      })
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      message: "The post informationc could not be retreived."
    })
  }
})

router.post('/', async(req, res) => {
  try {
    const { title, contents, created_at, updated_at } = await Posts.insert(req.body);
    if(!title || !contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    } else {
      db.insert({ title, contents, created_at, updated_at })
        .then(addedPost => {
          res.status(201).json(addedPost)
        })
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retreived."
    })
  }
})

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Posts.remove(req.params.id);
    if (deleted > 0) {
      res.status(200).json({
        message: "The post has been deleted"
      })
    }
    else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      message: "The post could not be removed."
    })
  }
})

router.put('/:id', async(req, res) => {
  try {
    const { title, contents, created_at, updated_at } = post;
    const post = await Posts.update(req.params.id, req.body);
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post"
      })
    }
    else {
      db.update(id, post)
        .then(updatedPost => {
          if(updatedPost) {
            res.status(200).json(updatedPost);
          }
          else {
            res.status(404).json({
              error: "The post with the specified ID does not exist."
            })
          }
        })
      }
    }
    catch(error) {
      console.log(error);
      res.status(500).json({
        message: "The post informationc could not be retreived."
      })
    }
});

module.exports = router;
