import bcrypt from 'bcryptjs';
import { addAdmin, addUser } from '../models/user-model.mjs';
import { validationResult } from 'express-validator';

// controller of api/auth/register
const postUser = async (req, res, next) => {
  // validation errors can be retrieved from the request object
	//(added by express-validator middleware)
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		console.log(errors.array());
		// pass the error to the error handler middleware
		const error = new Error('invalid input fields');
		error.status = 400;
		return next(error);
	}
  const newUser = req.body;
  console.log('postUser', newUser);

  const salt = await bcrypt.genSalt(10);
  // replace plain text password with hash
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const newUserId = await addUser(newUser);
  // jos tietokannasta tulee errori
  if (newUserId.error) {
    return next(new Error(newUserId.error));
  }
  res.json({message: 'user added', user_id: newUserId});
};

// controller of api/auth/register-admin
const postAdmin = async (req, res, next) => {
  // validation errors can be retrieved from the request object
	//(added by express-validator middleware)
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		console.log(errors.array());
		// pass the error to the error handler middleware
		const error = new Error('invalid input fields');
		error.status = 400;
		return next(error);
	}
  const newAdmin = req.body;
  console.log('postAdmin', newAdmin);

  const salt = await bcrypt.genSalt(10);
  // replace plain text password with hash
  newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
  const newAdminId = await addAdmin(newAdmin);
  // jos tietokannasta tulee errori
  if (newAdminId.error) {
    return next(new Error(newAdminId.error));
  }
  res.json({message: 'admin added', user_id: newAdminId});
};
export {postUser, postAdmin};
