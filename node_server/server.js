const mongoose = require("mongoose");
const { Schema } = mongoose;
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./account.proto";
const bcrypt = require('bcrypt')
var protoLoader = require("@grpc/proto-loader");
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const accountProto = grpc.loadPackageDefinition(packageDefinition);

mongoose.connect("mongodb://mongo:27017/accounts")

mongoose.connection.on('open', function (){
    console.log('Connected to mongo server.');
})

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
})

const User = mongoose.model('User', userSchema);

const server = new grpc.Server();

function createAccount(username, password, cb){
  bcrypt.hash(password, 10, (err,hash)=>{
    if(err){
      console.log("Failed to hash password");
      return cb(false);
    }
    User.create({
      username: username,
      password: hash
    }, function(err, _){
      if(err) 
      {
        console.log("Failed to create account", username);
        return cb(false);
      }
      console.log("Account created:", username);
      return cb(true);
    })
  })
  
}

function loginAccount(username, password, cb){
  User.find({
    username: username
  })
  .exec()
  .then(user=>{
    if(user.length < 1){
      console.log("Username doesn't exist");
      return cb(false);
    }
    bcrypt.compare(password, user[0].password, (err, compareRes)=>{
      if(err){
        console.log("Error unhashing");
        return cb(false);
      }
      if(!compareRes){
        console.log("Wrong password");
        return cb(false);
      }
      console.log("Login successful for: ", username);
      return cb(true);
    });
  });

}

function PostLogin(call, callback) {
  loginAccount(call.request.username, call.request.password, function(res){
    if(res)
      callback(null, { response: "Success" });
    else
      callback(null, { response: "Failed"});
  });
}

function PostRegister(call, callback){
  createAccount(call.request.username, call.request.password, function(res){
    if(res)
      callback(null, { response: "Success" });
    else
      callback(null, { response: "Failed"});
  });
}


server.addService(accountProto.AccountService.service, {
  PostLogin: PostLogin,
  PostRegister: PostRegister,
});
  
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at 0.0.0.0:50051");
    server.start();
  }
);





















