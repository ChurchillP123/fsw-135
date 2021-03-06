const express = require("express");
const issueRouter = express.Router();
const Issue = require('../models/Issue');

//get-all
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues);
    })
})

//get issues by user
issueRouter.get("/user", (req, res, next) => {
    Issue.find( {user: req.user._id}, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//add new issue
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue);
    })
})

//delete issue
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.user._id}, (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully delete issue: ${deletedIssue.title}`)
        }
    )
})

//update issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOne({ _id: req.params.issueId, user: req.user._id}, function(err, issue) {
        if(err){
            res.status(500)
            return next(err)
        }
        
        issue.upvote = !issue.upvote;
        issue.save(function(err, updatedIssue) {
            if(err){
                res.status(500)
                return next(err)
            }
            console.log(updatedIssue)
            return res.status(201).send(updatedIssue.upvote)
        })
    })
})

issueRouter.get("/:issueId", (req, res, next) => {
    Issue.find({ _id: req.params.issueId, user: req.user._id}, function(err, issue) {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue.upvote)
    })
})





module.exports = issueRouter;