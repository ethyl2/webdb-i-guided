const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

/*
router.get('/', async (req, res, next) => {
    try {
       //res.json(await db.select("*").from("posts")); 
       //res.json(await db("posts"));
       res.json(await db("posts").select());
    } catch (err) {
        next(err);
    }
});
*/

router.get('/', (req, res, next) => {
    db("posts")
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', async (req, res, next) => {
    try {
       //res.json(await db.select("*").from("posts").where("id", req.params.id)); 
       //res.json(await db("posts").where("id", req.params.id).select());  
       //res.json(await db("posts").where("id", req.params.id));
       //res.json(await db("posts").where({ id:req.params.id })); //returns an array
       res.json(await db("posts").where({ id:req.params.id }).first());  //returns an object
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }; 
        const [id] = await db("posts").insert(payload);
        res.json(await db("posts").where({ id: id }).first());
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        };
        const count = await db("posts").where({ id: req.params.id}).update(payload);
        res.json({count: count, post: await db("posts").where({ id: req.params.id }).first()});  
    } catch (err) {
        next(err);
    }

});

router.delete('/:id', async (req, res, next) => {
    try {
         const postToDelete = await db("posts").where({id: req.params.id}).first();
         const numAffectedRows = await db("posts").where({id: req.params.id}).del();
         res.json({numAffectedRows: numAffectedRows, deletedPost : postToDelete});
    } catch (err) {
        next(err);
    }

});

module.exports = router;