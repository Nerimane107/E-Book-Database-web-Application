
var express = require('express');
const bodyParser=require('body-parser');
var path = require('path');
var fs = require('fs');
const session=require('express-session');

// const { stringify } = require('querystring');
// const { get } = require('http');
// const { Console } = require('console');
// const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended :true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name:'sid',
    resave:false,
    saveUninitialized:false,
    secret : 'cookie secret',
    cookie: {
        maxAge: 1000*60*60*2,
        sameSite :true,
        
    }
}));

const redirectLogin =(req,res,next)=>{
    if(!req.session.username){
        console.log(req.session.username);
        res.redirect('/')
    } else{
        next()
    }
}
const redirectHome =(req,res,next)=>{
    if(req.session.username){
        res.redirect('/home')
    } else{
        next()
    }
}

//var User;
var LoginFlag=false;
//var User1;

app.get('/',redirectHome, function (req, res) {
    const {username}=req.session;
    res.render('login',{errorMessage :" "});
});

app.post('/',redirectHome, function (req, res) {
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
    var user = req.body.username;
    //console.log(user);
    
    var pass = req.body.password;
   // console.log(pass);
    var flag=false;
    if(user=="" && pass==""){
        res.render('login', {errorMessage: "please enter your username and password"});
    
    }else{
    if(user==""){
        res.render('login', {errorMessage: "please enter your username"});
    }else{
    if(pass==""){
        res.render('login', {errorMessage: "you forgot to enter your password"});
    }else{
   if(z.length==0){
       
    res.render('login', {errorMessage: "you're not registered.if you wish to have an account ,click on I don't have an account"});
    
   }else{
    for(var i=0;i<z.length;i++){
        if(user==z[i].username && pass==z[i].password){
           
            flag=true;
           // User=user;
           req.session.username=user;
           console.log(req.session.username);
           res.render('home');
           // LoginFlag=true;
          //  User1=user;
            break;
        }
        else{
            if(user==z[i].username && pass!=z[i].password){
                res.render('login', {errorMessage: "password incorrect"});
                flag=true;
                break;
            }
            
        }
    }
    
        if(flag==false){
            //console.log("1");
            res.render('login', {errorMessage: "you're not registered.if you wish to have an account ,click on I don't have an account"});
            
        }
}
    }
}
    }

} 
);


app.get('/registration', redirectHome,function (req, res) {
    res.render('registration',{errorRegister:" "});
});



app.post('/register',redirectHome, function (req, res) {
    var x = { username: req.body.username, password: req.body.password,reading :[{name:"",link:""}]};
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
    var flag=false;
    for(var i=0;i<z.length;i++){
        if(x.username==z[i].username){
            res.render('registration',{errorRegister: "this username is already taken.Try something else."});
            flag=true;
            break;
        }
    }
    if(x.username=="" && x.password==""){
        res.render('registration',{errorRegister: "please enter a valid username or password."});
        flag=true;
    }
    else{
    if(x.username==""){
        res.render('registration',{errorRegister: "please enter a valid username."});
        flag=true;
    }else{
    if(x.password==""){
        res.render('registration',{errorRegister: "please enter a valid  password"});
        flag=true;
    }}
}
    if(flag==false){
    z.push(x);
    var y = JSON.stringify(z);
    fs.writeFileSync("users.json", y);
    
    //LoginFlag=true;
    //User1=x.username;
    req.session.username=x.username;
    res.render('home');
}
});

app.get('/home',redirectLogin ,function(req,res){
    //if(LoginFlag==true){
res.render('home');
//else {
    //res.redirect('login',{errorMessage:'you must login to access the home page'});

//}
});

app.get('/novel',redirectLogin,function(req,res){
   // if(LoginFlag==true){
res.render('novel');
//else {
    //res.render('login',{errorMessage:'you must login to access the novel page'});
    
//}

});

app.get('/poetry',redirectLogin,function(req,res){
   // if(LoginFlag==true){
    res.render('poetry');
    //else {
      //  res.render('login',{errorMessage:'you must login to access the poetry page'});
    //}
    });

app.get('/fiction',redirectLogin,function(req,res){
   // if(LoginFlag==true){
        res.render('fiction');
       // else {
           // res.render('login',{errorMessage:'you must login to access the fiction page'});
        //}
        });

app.get('/flies',redirectLogin,function(req,res){
   // if(LoginFlag==true){
            res.render('flies',{errorMessage:''});
          //  else {
               // res.render('login',{errorMessage:'you must login to access the lord of the flies page'});
           // }
            });

app.get('/grapes',redirectLogin,function(req,res){
  //  if(LoginFlag==true){
                res.render('grapes',{errorMessage:''});
               // else {
                   // res.render('login',{errorMessage:'you must login to access the grapes of wrath page'});
               // }
                });

app.get('/leaves',redirectLogin, function (req, res) {
    //if(LoginFlag==true){
    res.render('leaves',{errorMessage:''});
   // else {
        //res.render('login',{errorMessage:'you must login to access the leaves of grass page'});
   // }
});

app.get('/sun',redirectLogin,function(req,res){
    //if(LoginFlag==true){
    res.render('sun',{errorMessage:''});
    //else {
        //res.render('login',{errorMessage:'you must login to access the sun and her flowers page'});
   // }
    });

app.get('/dune',redirectLogin,function(req,res){
   // if(LoginFlag==true){
    res.render('dune',{errorMessage:''});
   // else {
        //res.render('login',{errorMessage:'you must login to access the dune page'});
   // }
        });

app.get('/mockingbird',redirectLogin,function(req,res){
  //  if(LoginFlag==true){
        res.render('mockingbird',{errorMessage:''});
        //else {
           // res.render('login',{errorMessage:'you must login to access the to kill a mockingbird page'});
        //}
            });

app.get('/readlist',redirectLogin,function(req,res){
  //  if(LoginFlag==true){
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);   
    var matches=[];
    for(var j=0;j<z.length;j++){
     if(req.session.username==z[j].username){
      for(var i=0;i<z[j].reading.length;i++){
        matches.push(z[j].reading[i]);
    }
    for(var i=0;i<(6-z[j].reading.length);i++){
        matches.push({name:"",link:""});
    }
    break;
}
    }
    res.render('readlist',{link1:matches[0].link,name1:matches[0].name,link2:matches[1].link,name2:matches[1].name,link3:matches[2].link,name3:matches[2].name,
        link4:matches[3].link,name4:matches[3].name,link5:matches[4].link,name5:matches[4].name,link6:matches[5].link,name6:matches[5].name});
    //}
     //else {
        //res.render('login',{errorMessage:'you must login to access the readlist page'});
    //}
          });
app.get('/searchresults',redirectLogin,function(req,res){
   // if(LoginFlag==true){
res.render('searchresults',{name0:"",link1:"",name1:"",link2:"",name2:"",link3:"",name3:"",
    link4:"",name4:"",link5:"",name5:"",link6:"",name6:""});
    //else {
      //  res.render('login',{errorMessage:'you must login to access the search results page'});
    //}
          });


app.post('/search',function(req,res){
var found=false;
var err=false;
var KeyWord=req.body.Search;
var data = fs.readFileSync("books.json");
var z = JSON.parse(data);
var match=[];
for(var i=0;i<z.length;i++){
    if(KeyWord==""){
       err=true;
       break;
    }
    else{
   if(((z[i].name).toLowerCase()).includes(KeyWord.toLowerCase())){
      match.push(z[i]);
      found=true;
   }
   else{
       match.push({name:"",link:""});
   }
   
   
}}
if(found==true && err==false){
res.render('searchresults',{name0:"YOUR MATCHES ARE",link1:match[0].link,name1:match[0].name,link2:match[1].link,name2:match[1].name,link3:match[2].link,name3:match[2].name,
    link4:match[3].link,name4:match[3].name,link5:match[4].link,name5:match[4].name,link6:match[5].link,name6:match[5].name});
}
else {
    if(found==false && err==false){
    
    res.render('searchresults',{name0:"book not found",link1:match[0].link,name1:match[0].name,link2:match[1].link,name2:match[1].name,link3:match[2].link,name3:match[2].name,
        link4:match[3].link,name4:match[3].name,link5:match[4].link,name5:match[4].name,link6:match[5].link,name6:match[5].name});

}
if(err==true){
    res.render('searchresults',{name0:"Please enter a keyword for the book",link1:"",name1:"",link2:"",name2:"",link3:"",name3:"",
    link4:"",name4:"",link5:"",name5:"",link6:"",name6:""});
}

}}
);

app.post("/flies",function(req,res){
    var flag=false;
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
  for(var i=0;i<z.length;i++){
      if(req.session.username==z[i].username){
          for(var j=0;j<z[i].reading.length;j++){
              if(z[i].reading[j].name=="Lord Of The Flies"){
                  flag=true;
                  res.render('flies',{errorMessage:"this book is already in your want to read list"});
                }}
            if(flag==false){
                if(z[i].reading[0].name==""){
                    z[i].reading[0].name="Lord Of The Flies";
                    z[i].reading[0].link="flies";
                    var y = JSON.stringify(z);
                   fs.writeFileSync("users.json", y);
                   break;
                   
                }
                else{
          z[i].reading.push({name:"Lord Of The Flies",link:"flies"});
          var y = JSON.stringify(z);
          fs.writeFileSync("users.json", y);
          break;
            }
        }
      }
  }
});
app.post("/grapes",function(req,res){
    var flag=false;
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
  for(var i=0;i<z.length;i++){
      if(req.session.username==z[i].username){
          for(var j=0;j<z[i].reading.length;j++){
              if(z[i].reading[j].name=="The Grapes of Wrath"){
                  flag=true;
                  res.render('grapes',{errorMessage:"this book is already in your want to read list"});

                }}
            if(flag==false){
                if(z[i].reading[0].name==""){
                    z[i].reading[0].name="The Grapes of Wrath";
                    z[i].reading[0].link="grapes";
                    var y = JSON.stringify(z);
                   fs.writeFileSync("users.json", y);
                   break;
                   
                }
                else{
          z[i].reading.push({name:"The Grapes of Wrath",link:"grapes"});
          var y = JSON.stringify(z);
          fs.writeFileSync("users.json", y);
          break;
            }
      }
  }
}
});
app.post("/leaves",function(req,res){
    var flag=false;
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
  for(var i=0;i<z.length;i++){
      if(req.session.username==z[i].username){
          for(var j=0;j<z[i].reading.length;j++){
              if(z[i].reading[j].name=="Leaves of Grass"){
                  flag=true;
                  res.render('leaves',{errorMessage:"this book is already in your want to read list"});

                }}
            if(flag==false){
                if(z[i].reading[0].name==""){
                    z[i].reading[0].name="Leaves of Grass";
                    z[i].reading[0].link="leaves";
                    var y = JSON.stringify(z);
                   fs.writeFileSync("users.json", y);
                   break;
                   
                }
                else{
          z[i].reading.push({name:"Leaves of Grass",link:"leaves"});
          var y = JSON.stringify(z);
          fs.writeFileSync("users.json", y);
          break;
            }
      }
  }
}});
app.post("/sun",function(req,res){
    var flag=false;
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
  for(var i=0;i<z.length;i++){
      if(req.session.username==z[i].username){
          for(var j=0;j<z[i].reading.length;j++){
              if(z[i].reading[j].name=="The Sun and Her Flowers"){
                  flag=true;
                  res.render('sun',{errorMessage:"this book is already in your want to read list"});

                }}
            if(flag==false){
                if(z[i].reading[0].name==""){
                    z[i].reading[0].name="The Sun and Her Flowers";
                    z[i].reading[0].link="sun";
                    var y = JSON.stringify(z);
                   fs.writeFileSync("users.json", y);
                   break;
                   
                }
                else{
          z[i].reading.push({name :"The Sun and Her Flowers",link:"sun"});
          var y = JSON.stringify(z);
          fs.writeFileSync("users.json", y);
          break;
            }
      }
  }
}});

app.post("/dune",function(req,res){
    var flag=false;
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
  for(var i=0;i<z.length;i++){
      if(req.session.username==z[i].username){
          for(var j=0;j<z[i].reading.length;j++){
              if(z[i].reading[j].name=="Dune"){
                  flag=true;
                  res.render('dune',{errorMessage:"this book is already in your want to read list"});

                }}
            if(flag==false){
                if(z[i].reading[0].name==""){
                    z[i].reading[0].name="Dune";
                    z[i].reading[0].link="dune";
                    var y = JSON.stringify(z);
                   fs.writeFileSync("users.json", y);
                   break;
                   
                }
                else{
          z[i].reading.push({name:"Dune",link:"dune"});
          var y = JSON.stringify(z);
          fs.writeFileSync("users.json", y);
          break;
            }
      }
  }
}});

app.post("/mockingbird",function(req,res){
    var flag=false;
    var data = fs.readFileSync("users.json");
    var z = JSON.parse(data);
  for(var i=0;i<z.length;i++){
      if(req.session.username==z[i].username){
          for(var j=0;j<z[i].reading.length;j++){
              if(z[i].reading[j].name=="To Kill a Mockingbird"){
                  flag=true;
                  res.render('mockingbird',{errorMessage:"this book is already in your want to read list"});

                }}
            if(flag==false){
                
                    if(z[i].reading[0].name==""){
                        z[i].reading[0].name="To Kill a Mockingbird";
                        z[i].reading[0].link="mockingbird";
                        var y = JSON.stringify(z);
                       fs.writeFileSync("users.json", y);
                       break;
                       
                    }
                    else{
          z[i].reading.push({name:"To Kill a Mockingbird",link:"mockingbird"});
          var y = JSON.stringify(z);
          fs.writeFileSync("users.json", y);
          break;
            }
      
  }
}
}
});




if(process.env.PORT){
    app.listen(process.env.PORT,function(){console.log('Server started')});
}
else{
    app.listen(3000,function(){console.log('Server started on port 3000')});
}

