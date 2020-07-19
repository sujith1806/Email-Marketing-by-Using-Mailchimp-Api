const express = require("express");
const bodyparser =require("body-parser");
const app = express();
const https=require("https");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstname=req.body.fname;
    var secondname=req.body.lname;
    var email=req.body.email;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: secondname
                }

            }
        ]
    };
    const jsondata = JSON.stringify(data);

    const url="https://us10.api.mailchimp.com/3.0/lists/df03f2112b";

    const options={
        method:"POST",
        auth:"sujith1:b7134fa10fbf67a4ef8cdb0671d9399c-us10"
        
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.send("<h1>Sorry It DIdnt Workout,Please Try Again</h1>")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsondata);
    request.end();


});


app.listen(process.env.PORT||3000,function(){
    console.log("Server is up!!");
});



//b7134fa10fbf67a4ef8cdb0671d9399c-us10

//list id df03f2112b