const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('user', UserSchema);
