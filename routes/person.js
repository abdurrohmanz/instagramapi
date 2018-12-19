const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {Person} = require('../models/person');

router.get('/', (req, res, next)=>{
	Person.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

router.post('/', (req, res, next)=>{
	const person = new Person({
		username: req.body.username,
		followers: req.body.followers,
	})
	person
		.save()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: 'works on route post',
				createdPerson: person
			});
		})
		.catch(err => console.log(err));
});

router.delete('/', (req, res, next)=>{
	Person.remove({})
		.exec()
		.then(result =>{
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error : err
			});
		});
});

router.get('/:personUsername', (req, res, next)=>{
	const username = req.params.personUsername;
	Person.findOne({username:username})
	.exec()
	.then(doc => {
		console.log(doc);
		res.status(200).json();
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error:err})
	});
});

module.exports = router;