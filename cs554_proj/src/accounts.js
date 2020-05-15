const mongoCollections = require("./collection");
const accounts = mongoCollections.accounts;
const bcrypt = require("bcryptjs");

const create = async function create(username, password){
	if(username == undefined){
		throw new Error("username is not defined");
	}
	if(password == undefined){
		throw new Error("password is not defined");
	}
	if(typeof(username) !== "string"){
		throw new Error("username is not of type string");
	}
	if(typeof(password) !== "string"){
		throw new Error("password is not of type string");
	}

	let hashPassword = await bcrypt.hash(password, 16);

	var accountsCollection = await accounts();
	let usernameExists = await accountsCollection.findOne({username: username});
	if(usernameExists !== null){
		throw new Error("username has been taken");
		return;
	}

	var newAccount = {
		"username": username,
		"password": hashPassword,
		"score": 0,
		"itemsInventory": [0,0,0],
		"friends": []
	}

	var insert = await accountsCollection.insertOne(newAccount);
	if(insert.insertedCount == 0)
		throw new Error("account cannot be created")
	var insertId = insert.insertedId;
	var account = await accountCollection.findOne({_id: insertId});
	return account;
}

const get = async function get(username){
	if(username == undefined){
		throw new Error("username is not defined");
	}
	if(typeof(username) !== "string"){
		throw new Error("username is not of type string");
	}
	var accountsCollection = await accounts();
	let usernameExists = await accountsCollection.findOne({username: username});
	if(usernameExists == null){
		throw new Error("no account with that username");
	}
	return usernameExists;
}

const changeUsername = async function changeUsername(old, newuser, password){
	if(old == undefined){
		throw new Error("old username is not defined");
	}
	if(password == undefined){
		throw new Error("password is not defined");
	}
	if(newuser == undefined){
		throw new Error("new username is not defined");
	}
	if(typeof(old) !== "string"){
		throw new Error("old username is not of type string");
	}
	if(typeof(newuser) !== "string"){
		throw new Error("new username is not of type string");
	}
	if(typeof(password) !== "string"){
		throw new Error("password is not of type string");
	}
	var accountsCollection = await accounts();
	let usernameExists = await accountsCollection.findOne({username: old});
	if(usernameExists == null){
		throw new Error("no account with that username");
	}
	if(await bcrypt.compare(password, usernameExists.password) == false){
		throw new Error("password is incorrect");
	}
	let updated = await accountsCollection.updateOne({_id: usernameExists._id}, {$set:{username: newuser, password: usernameExists.password, score: usernameExists.score, itemsInventory: usernameExists.itemsInventory, friends: usernameExists.friends}});
	if(updated.modifiedCount == 0){
		throw new Error("could not update username");
	}
	return await get(newuser);
}

const changePassword = async function changePassword(old, newpass, username){
	if(old == undefined){
		throw new Error("old password is not defined");
	}
	if(newpass == undefined){
		throw new Error("new password is not defined");
	}
	if(username == undefined){
		throw new Error("username is not defined");
	}
	if(typeof(old) !== "string"){
		throw new Error("old password is not of type string");
	}
	if(typeof(newpass) !== "string"){
		throw new Error("new password is not of type string");
	}
	if(typeof(username) !== "string"){
		throw new Error("username is not of type string");
	}
	var accountsCollection = await accounts();
	let usernameExists = await accountsCollection.findOne({username: username});
	if(usernameExists == null){
		throw new Error("no account with that username");
	}
	if(await bcrypt.compare(old, usernameExists.password) == false){
		throw new Error("password is incorrect");
	}
	let hashPassword = await bcrypt.hash(newpass, 16);
	let updated = await accountsCollection.updateOne({_id: usernameExists._id}, {$set:{username: usernameExists.username, password: hashPassword, score: usernameExists.score, itemsInventory: usernameExists.itemsInventory, friends: usernameExists.friends}});
	if(updated.modifiedCount == 0){
		throw new Error("could not update password");
	}
	return await get(username);
}

const addFriend = async function addFriend(username, friend){
	if(username == undefined){
		throw new Error("username is not defined");
	}
	if(friend == undefined){
		throw new Error("password is not defined");
	}
	if(typeof(username) !== "string"){
		throw new Error("username is not of type string");
	}
	if(typeof(friend) !== "string"){
		throw new Error("friend is not of type string");
	}
	var accountsCollection = await accounts();
	let usernameExists = await accountsCollection.findOne({username: username});
	if(usernameExists == null){
		throw new Error("no account with that username");
	}
	let friendExists = await accountsCollection.findOne({username: friend});
	if(friendExists == null){
		throw new Error("cannot add friend: no account with that username");
	}
	let addedFriend = usernameExists.friends;
	addedFriend.push(friend);
	let updated = await accountsCollection.updateOne({_id: usernameExists._id}, {$set:{username: usernameExists.username, password: usernameExists.password, score: usernameExists.score, itemsInventory: usernameExists.itemsInventory, friends: addedFriend}});
	if(updated.modifiedCount == 0){
		throw new Error("could not update password");
	}
	return await get(username);
}

module.exports = {create, get, changeUsername, changePassword, addFriend};