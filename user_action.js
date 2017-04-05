var express = require('express'),
	app = express(),
	bodyParser =  require('body-parser'),
	UserSchema = require('./models/userSchema'),
	config = require('./config'),
	jwt = require('jsonwebtoken')
	
	//---------OTP MODIFY
	var nodemailer = require('nodemailer');
	
	
	var cloudinary = require('cloudinary');
    var fs = require('fs');
    var config = require('./config')

   

 
	
   

// exports.getUserFromToken = function(headers, res){
// 	var token = headers.authorization;
// 	if(!headers || !headers.authorization){
// 		return res.json({code:400, message:"Unauthorized action."})
// 	}
// 	var decoded = jwt.decode(token, config.secret);
// 	return decoded._doc;
// }

exports.login = function(req, res){
	 console.log("login"+req.body.Email+"pass"+ req.body.Password);

	 //validations ----start------

	 //a) Email field not empty

	 if(req.body.Email=='')
	 	return res.json({ResponseCode:400, ResponseMessage:"Email field is empty"})

	  //b) Password field not empty

	 if(req.body.Password=='')
	 	return res.json({ResponseCode:400, ResponseMessage:"Password field is empty"})

	 //c) check Valid Email

	var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(!emailPattern.test(req.body.Email))
		return res.json({ResponseCode:400, ResponseMessage:"Not a valid Email"})

	
 	 //validations ----end------


		UserSchema.findOne({Email:req.body.Email}, function(err, user_login_info){
			if(err){
				return res.json({ResponseCode:400, ResponseMessage:"Server error"})
			}else if(!user_login_info){
				return res.json({ResponseCode:400, ResponseMessage: "Incorrect Email"})
			}else{
			//email database me mil gaya ..now match password
			UserSchema.findOne({Email:req.body.Email,Password:req.body.Password} ,function(err, user_login_password_info){

				if(err){
					return res.json({ResponseCode:400, ResponseMessage:"Server error"})
				}else if(!user_login_password_info){
					return res.json({ResponseCode:400, ResponseMessage: "Incorrect Password"})
				}else{

					res.send({ResponseCode: 200, ResponseMessage:"Success",UserId: user_login_password_info._id });
				}
			})
		}

	})


	}


exports.userSignUp = function(req, res){
	console.log("req body of userSignUp--", JSON.stringify(req.body));


	//validations 

	 //a) Email field not empty

	 if(req.body.Email=='')
	 	return res.json({ResponseCode:400, ResponseMessage:"Email field is empty"})

	 //b) Password field not empty

	 if(req.body.Password=='')
	 	return res.json({ResponseCode:400, ResponseMessage:"Password field is empty"})

	//c) check Valid Email

	var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(!emailPattern.test(req.body.Email))
		return res.json({ResponseCode:400, ResponseMessage:"Not a valid Email"})

	//d) check strong Password

	   var passwordPattern=(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

		//^		     				Start anchor
		//(?=.*\d)                  should contain at least one digit
		//(?=.*[a-z])               should contain at least one lower case
		//(?=.*[A-Z])               should contain at least one upper case
		//[a-zA-Z0-9]{8,}           should contain at least 8 from the mentioned characters
		//$							End anchor

	if(!passwordPattern.test(req.body.Password))	
		return res.json({ResponseCode:400, ResponseMessage:"Not a strong password (atleast one lowercase ,atleast one upper case,atleast one digit and length should be 8 characters)"})
		


	var userSchema = new UserSchema(req.body);
	userSchema.save(function(err, resultUser){
		if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error"});
			console.log(err);
		}
		else{
			
			res.send({ResponseCode: 200, ResponseMessage:"Success",UserId:resultUser._id});
		}
	});
}


exports.createProfile = function(req, res){
 	console.log("req body of createProfile" + JSON.stringify(req.body));


 	//validations on every input

 	// Images
	// Salutation
	// FirstName 
	// LastName
	// Email  --> not empty +valid
	// Password --> not empty+strong
	// DOB -->Date
	// Gender
	// ProfileStartDate -->Date
	// Address
	// Country
	// State
	// City
	// Zipcode -->Number
	// Location1
	// Location2



      //CONCEPT OF ARRAY IN SCHEMA AND REQUEST JSON

// 1.Image Array Declaration in Schema is like this —> Image:[{Image:{type:String}}]
// 2.JSON Request of Array is like this—> “Image":[{"Image":"sdasdsq"},{"Image":"wedsads"}]

	 //a) Email field not empty

	 if(req.body.Email=='')
	 	return res.json({ResponseCode:400, ResponseMessage:"Email field is empty"})

	 //b) Password field not empty

	 if(req.body.Password=='')
	 	return res.json({ResponseCode:400, ResponseMessage:"Password field is empty"})

	//c) check Valid Email

	var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(!emailPattern.test(req.body.Email))
		return res.json({ResponseCode:400, ResponseMessage:"Not a valid Email"})

	//d) check strong Password

	   var passwordPattern=(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

		//^		     				Start anchor
		//(?=.*\d)                  should contain at least one digit
		//(?=.*[a-z])               should contain at least one lower case
		//(?=.*[A-Z])               should contain at least one upper case
		//[a-zA-Z0-9]{8,}           should contain at least 8 from the mentioned characters
		//$							End anchor

	 if(!passwordPattern.test(req.body.Password))	
		return res.json({ResponseCode:400, ResponseMessage:"Not a strong password (atleast one lowercase ,atleast one uppercase,atleast one digit and length should be 8 characters)"})
		
 		
 			console.log(req.body.UserId);
 	
 	 	UserSchema.findOneAndUpdate({_id:req.body.UserId},req.body,{new:true}, function(err, updateResult){
 		if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error"});
			console.log(err);
		}else{
			console.log("success-3");	
		   // res.send({ResponseCode:200, ResponseMessage: "Success",result:updateResult,image:image_result.url});
		res.send({ResponseCode:200, ResponseMessage: "Success",FeedList:updateResult});

		}
 	})


 }


exports.storeImages=function(req,res){

 	//Image uploading

 		//Step-1

 		//image send from client in string of Base64

 		//Schema has Images Array --> Images:[{Image:{type:String}}] -->
 		// JSON Request of Array will be like this—> “Image":[{"Image":"sdasdsq"},{"Image":"wedsads"}]
 		//so client should send the 4 Images in request body like this so that it can be stored in Schema
 		//and then we can read it here

 			console.log(req.body.UserId);
 	

 		//store images in Images Array of Schema

 	 	UserSchema.findOneAndUpdate({_id:req.body.UserId},req.body,{new:true}, function(err, updateResult){
 		if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error"});
			console.log(err);
		}else{
			console.log("success-3");	
		   // res.send({ResponseCode:200, ResponseMessage: "Success",result:updateResult,image:image_result.url});
		res.send({ResponseCode:200, ResponseMessage: "Success",result:updateResult});

		}
 	})


}

exports.getLastImage=function(req,res){


	if(!req.body.UserId){
		return res.json({ResponseCode:400, ResponseMessage: "UserId is missing."})
	}

	UserSchema.findOne({_id:req.body.UserId}).exec(function(err, result){

		if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error"});
			console.log(err);
		}
		else	
		{
			console.log(result);

			//result.Image is an array containing Images
			//Objective : send last Image 
			//Solution : find length of array and send Image(length-1) in response
			var length=result.Images.length;

			console.log("length="+length);

			res.send({ResponseCode:200, ResponseMessage: "Success",LastImage:result.Images[length-1]});
			//res.send({ResponseCode:200, ResponseMessage: "Success"});
		}

	})

}

exports.storeImagesCloundinary=function(req,res){

   // SINGLE IMAGE ----start---------------

 		//Step-1 : Converting Client image in base64 to binary and storing it
                // on server as test.jpeg

 		//a) image send from client in string of Base64

 		var img_base64 = req.body.Images;

 		//b) we are creating binary image here from given base64 image

 		binaryData = new Buffer(img_base64, 'base64');
   		
   		// c) making image at server here and naming it as test.jpeg

   		fs.writeFile("test.jpeg", binaryData, "binary", function (err) {
                if(err){
                console.log("error in writing file "+err+" and binarydata="+binaryData);
    	        }
   		});

   		//Step-2 :Setting Cloudinary configuration

   	      cloudinary.config({ 
	      'cloud_name': config.cloudinary_cloud_name, 
	      'api_key': config.cloudinary_api_key, 
	      'api_secret': config.cloudinary_api_secret
	    });

   		//Step-3 :uploading created image test.jpeg in Step-1 on cloudinary

   		 cloudinary.uploader.upload("test.jpeg",function(result) {
                 
                 //checking the url of uploaded image sent to us by Cloudinary

   		 console.log("image url ="+result.url);

   		 res.send({ResponseCode:200, ResponseMessage: "Success",ImageURL:"http://res.cloudinary.com/hinikhil/image/upload/v1491350786/wifuy0spap2jw4djd752.jpg"});	

   		});


 // SINGLE IMAGE ----end---------------


   // MULTIPLE IMAGE ----start----NOT TESTED---TO DO-----

  //       var img_base64=new Array();
 	// 	var binaryData=new Array();

 	// 	var imageurl=new Array();

  //      console.log(req.body.Images);

 	// 	//parsing Image array send by client
 	// 	var jsonData = req.body.Images;


 	// 	for (var i = 0; i < jsonData.length; i++) {

 	// 		img_base64[i] = jsonData[i].Image;

 	// 	//making binary image
 	// 	binaryData[i] = new Buffer(img_base64[i], 'base64');

		// // making file of binaryData on server and giving it name test.jpeg
  //  		fs.writeFile("image"+i+".jpeg", binaryData[i], "binary", function (err) {
        
  //       if(err){
  //       console.log("error in writing file "+err+" and binarydata="+binaryData[i]);
  //   	}

  //  		});
 		


  //  		//Step-2 :set cloudinary config

  //  		cloudinary.config({ 
	 //      'cloud_name': config.cloudinary_cloud_name, 
	 //      'api_key': config.cloudinary_api_key, 
	 //      'api_secret': config.cloudinary_api_secret
	 //    });

  //  		// //Step-3 upload files created on server to cloudinary

  //  		 cloudinary.uploader.upload("image"+i+".jpeg",function(image_result) {

  //  		 	//convert result.url `

  //  		 	 res.send({ResponseCode:200, ResponseMessage: "Success",ImageURL:result.url});	

  //  		 	})
  //  		 	}

    // MULTIPLE IMAGE ----end-------------
 		

}

 exports.showUserDetails = function(req, res){
 	console.log("req.body"+req.body);
	var _id = req.body.UserId;
	if(!_id){
		return res.json({ResponseCode:400, ResponseMessage: "UserId is missing."})
	}
	
	UserSchema.findOne({_id:_id}).exec(function(err, user_info){
		if(err){
					res.send({ResponseCode:400, ResponseMessage: "Error"});
					console.log(err);
				}else{
					return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
				}
	})
}

 exports.deleteUserDetails = function(req, res){
 	console.log("req.body"+req.body);
	var _id = req.body.UserId;
	if(!_id){
		return res.json({ResponseCode:400, ResponseMessage: "UserId is missing."})
	}
	
	UserSchema.remove({_id:_id}).exec(function(err, user_info){
		if(err){
					res.send({ResponseCode:400, ResponseMessage: "Error"});
					console.log(err);
				}else{
					return res.json({ResponseCode:200,ResponseMessage: "Success"});
				}
	})
}




exports.showRoleData = function(req, res){

	UserSchema.findOne({_id:req.body.UserId}).exec(function(err, result){
		if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error"});
			console.log(err);
		}
		else{

					//return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
					if(result.UserRole=='King')
					{
						console.log("user is King")
						UserSchema.find().where('UserRole').in(['Queen','Boy','Girl']).exec(function(err, user_info){
							if(err){
								res.send({ResponseCode:400, ResponseCode: "Error"});
								console.log(err);
							}
							else{
								return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
							}
						})
					}
					else if (result.UserRole=='Queen')
					{
						console.log("user is Queen")
						UserSchema.find().where('UserRole').equals('Girl').exec(function(err, user_info){
							if(err){
								res.send({ResponseCode:400, ResponseMessage: "Error"});
								console.log(err);
							}else{
								return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
							}
						})
					}
					else if (result.UserRole=='Boy')
					{
						console.log("user is Boy")
						UserSchema.find().where('UserRole').equals('King').exec(function(err, user_info){
							if(err){
								res.send({ResponseCode:400, ResponseMessage: "Error"});
								console.log(err);
							}else{
								return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
							}
						})
					}
					else if (result.UserRole=='Girl')
					{

						console.log("user is Girl")
						UserSchema.find().where('UserRole').equals('Boy').exec(function(err, user_info){
							if(err){
								res.send({ResponseCode:400, ResponseMessage: "Error"});
								console.log(err);
							}else{
								return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
							}
						})
					}
					else if (result.UserRole=='Admin')
					{
						UserSchema.find().exec(function(err, user_info){
							if(err){
								return res.json({ResponseCode:400, ResponseMessage: "User not found."})
							}else{
								res.send({ResponseCode: 200, FeedList: user_info,ResponseMessage: "Success"});
							}
						})
					}



				}
		})


}

//King
exports.getAllMinusKing = function(req, res){
	
	UserSchema.find().where('UserRole').in(['Queen','Boy','Girl']).exec(function(err, user_info){
		if(err){
					res.send({ResponseCode:400, ResponseCode: "Error"});
					console.log(err);
				}else{
					return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
				}
	})
}

//Queen
exports.getGirls = function(req, res){


UserSchema.find().where('UserRole').equals('Girl').exec(function(err, user_info){
		if(err){
					res.send({ResponseCode:400, ResponseMessage: "Error"});
					console.log(err);
				}else{
					return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
				}
	})
}

//Girls
exports.getBoys = function(req, res){
	
	UserSchema.find().where('UserRole').equals('Boy').exec(function(err, user_info){
	    if(err){
					res.send({ResponseCode:400, ResponseMessage: "Error"});
					console.log(err);
				}else{
					return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
				}
	})
}

//Boys
exports.getKings = function(req, res){

	UserSchema.find().where('UserRole').equals('King').exec(function(err, user_info){
		if(err){
					res.send({ResponseCode:400, ResponseMessage: "Error"});
					console.log(err);
				}else{
					return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
				}
	})
}


//Admin
exports.getAll = function(req,res){
	console.log("req");
	UserSchema.find().where('UserRole').nin(['Admin']).exec(function(err, user_info){
		if(err){
			return res.json({ResponseCode:400, ResponseMessage: "User not found."})
		}else{
			res.send({ResponseCode: 200, FeedList: user_info,ResponseMessage: "Success"});
		}
})
}

//----- Mailer (otp) start

 exports.forgetPassword = function(req,res){
 	if(!req.body.email){
 		res.json({code:400,message:"Please enter valid email"})
 	}
 	else
 	{
 		console.log("jjj="+JSON.stringify(req.body.email));
 		UserSchema.findOne({email:req.body.email},function(err,data){
 			if(err){
 				throw err;
 			}
 			else if(!data){
 				res.json({code:401, message:"email id does not exist."})
 			}else{
 				var smtpTransport = nodemailer.createTransport({
					   service: "Gmail",  // sets automatically host, port and connection security settings
					   auth: {
					   	user: "nj7870@gmail.com",
					   	pass: "Nikhil.1"
					   }
					});
 				var text="";
 				var otppossible ="abcdefghijkl123456780";
 				for(var i=0;i<5;i++)
 				{
 					text += otppossible.charAt(Math.floor(Math.random() * otppossible.length));

 				}

 				console.log("otp---",text);
					smtpTransport.sendMail({  //email options
						from: "XYZ@info.com", // sender address.  Must be the same as authenticated user if using Gmail.
						to: req.body.email, // receiver
						subject: "Forget password otp", // subject
						text: "Your otp is "+ text // body
						}, function(error, response){  //callback
							if(error){
								console.log(error);
								res.send({code:400, message:error})
							}else{
							//res.send({code:200, message:"mail sent."})


							data.otp = text;
							data.otpStatus = "otpSend";
							data.save(function(err,data){
								if(err){
									return res.json({code:400,message:"not found"})
								}else{
									return res.json({code:200,data:data})
								}
							})
						}

					});
				}

			})
 	}
 }

 exports.verifyOtp= function(req,res){
 	console.log(req.body.otp);
 	if(!req.body.otp){
 		return res.json({code:400,message:"please enter otp first"})
 	}
 	else
 	{

 		UserSchema.findOne({email:req.body.email},{password:0},function(err,result)
 		{
 			if(err)
 			{
 				res.json({code:400,message:"error in finding data"});
 			}
 			else
 			{
 				if(result.otp==req.body.otp)
 				{
 					result.otpStatus="verfied";
 					result.save(function(err,result)
 					{
 						if(err)
 						{
 							res.json({code:400,message:"error in finding data"});
 						}
 						else
 						{
 							res.json({code:200,message:"successfully"});
 						}

 					});
 				}
 				else
 				{
 					res.json({code:401,message:"you entered wrong otp"})
 				}
 			}
 		})
 	}
 }

 exports.updatePwd = function(req,res){

 	UserSchema.findOneAndUpdate({email:req.body.email},{$set:{password:req.body.password}},{new:true}, function(err, updateResult){
 		if(err){
 			res.send({code:400, message: "Error"});
 			console.log(err);
 		}else{
 			return res.json({code:200, message:"Password Updated"});
 		}
 	})

 }

//----- Mailer (otp) end 

