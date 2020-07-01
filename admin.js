const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://root:root@cluster0-y7bsw.mongodb.net/users?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const customerSchema = {
    userid: String,
    password: String,
	name:String,
	mobile: Number,
	city:String
}


const adminSchema = {
    userid: String,
    password: String,
	name:String
	
}
const productSchema = {
    id: Number,
    name: String,
	description: String,
	price:Number
}

const Product = mongoose.model("product", productSchema);
const Customer = mongoose.model("customer", customerSchema);
const Admin = mongoose.model("admin", adminSchema);

app.post("/insertnewadmin", (req, res) => {

    const admin = {
        userid: req.body.userid,
        password: req.body.password,
		name:req.body.name,
		
    }

    Admin.create(admin, (err) => {
        if(err){
            res.send("Not Inserted");
        } else {
            res.send({message:"Inserted Successfully"});
        }
    });

});

app.post("/insertnewcustomer", (req, res) => {

    const customer = {
        userid: req.body.userid,
        password: req.body.password,
		name:req.body.name,
		mobile:req.body.mobile,
		city:req.body.city
    }

    Customer.create(customer, (err) => {
        if(err){
            res.send("Not Inserted");
        } else {
            res.send("Inserted Successfully");
        }
    });

});

app.post("/insertnewproduct", (req, res) => {

    const product = {
        id: req.body.id,
        name: req.body.name,
		description: req.body.description,
		price:req.body.price
    }

    Product.create(product, (err) => {
        if(err){
            res.send("Not Inserted");
        } else {
            res.send("Inserted Successfully");
        }
    });

});
app.post("/loginuser", (req,res)=>{
	const admin = {
        userid: req.body.userid,
        password: req.body.password
	}
    Admin.findOne(admin,(err)=>{
        if(err)
        {
        res.send("User not found.");
        }
		//return res.redirect('/head');
        res.send("Logged in succesfully.");
    });
	});
app.post("/removeadmin", (req, res) => {
    let id = req.body.userid;

    Admin.deleteOne({userid: id}, (err) => {
        if(err) {
            res.send("Not deleted");
        } else {
            res.send("deleted Successfully");
        }
    })
});	
	
app.post("/removecustomer", (req, res) => {
    let id = req.body.userid;

    Customer.deleteOne({userid: id}, (err) => {
        if(err) {
            res.send("Not deleted");
        } else {
            res.send("deleted Successfully");
        }
    })
});

app.post("/readadmin", (req, res) => {

    Admin.find({}, ['name','userid','password'], (err, admins) => {
        if(err) {
            res.send(err);
        } else {
            res.send(admins)
        }
})});


app.post("/readcustomer", (req, res) => {
  
    Customer.find({}, ['userid','password','name','mobile','city'], (err, customers) => {
        if(err) {
            res.send(err);
        } else {
            res.send(customers)
        }
})}); 
	
/*Admin.find({}).toArray(function(err, admins) {
        if (!err) {

          // write HTML output
          var output = '<html><header><title>Todo List from DB</title></header><body>';
          output += '<h1>TODO List retrieved from DB</h1>';
          output += '<table border="1"><tr><td><b>' + 'Description' + '</b></td><td><b>' + 'Details' + '</b></td></tr>';

          // process todo list
          admins.forEach(function(admin){
			  
            output += '<tr><td>' + admin.description + '</td><td>' + admin.details + '</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
          res.send(output);

          // log data to the console as well
          console.log(admins);
        }
      });*/	
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server is listening to the port : " + port);
});