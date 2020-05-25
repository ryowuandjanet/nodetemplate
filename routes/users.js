const express = require('express');
const router = express.Router();
const userModel = require('../models/User');

router.get('/users', async (req, res) => {
    const users = await userModel.find();
    try {
        res.render('users.html', { users: users });
    } catch (err) {
        res.json(err);
    }
});


router.post('/users', async (req, res) => {
	const user = new userModel({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	});
	try {
		const newUser = await user.save();
		res.redirect('/users');
	} catch (err) {
		res.json(err);
	}
});

router.delete('/users/delete/:id', async(req,res)=>{
	const user=await userModel.findByIdAndDelete({ _id: req.params.id});
	try{
		res.status(200).json(user);
	} catch (err){
		res.json(err);
	}
})

router.get('/user/:id', async(req,res)=>{
	const user=await userModel.findOne({ _id: req.params.id});
	try{
		res.json(user);
	} catch (err){
		res.json(err);
	}
})

router.put('/user/update', async(req, res) => {
	const user = await userModel.findOneAndUpdate({ _id: req.body._id },{
		firstname: req.body.firstname,
		lastname: req.body.lastname
	});
	try {
		res.status(200).json(user);
	} catch (err) {
		res.json(err);
	}
});



module.exports = router;
