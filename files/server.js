const express = require('express');
const Database=require('./models/schema')
const mongoose = require('mongoose');

const app = express();
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 5000;

//-----------------------------------------Connecting MongoDB-----------------------------
const uri = "";
mongoose.connect(uri);
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("MongoDB connected")
})
//----------------------------------------------------------------------------------------

//-------------------------------------------Adding Routes-----------------------------------------------------
app.get('/',async (req,res)=>{
  const shortUrls=await Database.find()
  res.render('index',{ shortUrls: shortUrls,res:''})
})

app.get('/list', async (req,res)=>{
  const shortUrls=await Database.find()
  res.render('list',{ shortUrls: shortUrls});
})

app.post('/shortUrls',async (req,res)=>{
  const searchdescription= await Database.findOne({description:req.body.description})
  if(searchdescription!=null){res.render('error')}
  else{
  
  const newDocument = new Database({
    full: req.body.fullUrl,
    description: req.body.description 
  });
  const savedDocument = await newDocument.save();
  res.locals.res = savedDocument.short;
  const shortUrls = await Database.find();
  res.render('index', { shortUrls: shortUrls, res: savedDocument.short });}
})

app.get('/findbyfull',async (req,res)=>{
  res.render('findbyfull',{resfulltoshort:'',resfulltodescription:''})
})

app.post('/findbyfull',async(req,res)=>{
  const foundDB= await Database.findOne({full:req.body.findbyfull})
  if(foundDB==null)return res.sendStatus(404)
  res.locals.resfulltoshort = foundDB.short;
  res.locals.resfulltodescription=foundDB.description;
  res.render('findbyfull',{resfulltoshort:foundDB.short, resfulltodescription:foundDB.description});
})

app.get('/findbyshort',async (req,res)=>{
  res.render('findbyshort',{resshorttofull:'',resshorttodescription:''})
})

app.post('/findbyshort',async(req,res)=>{
  const foundDB= await Database.findOne({short:req.body.findbyshort})
  if(foundDB==null)return res.sendStatus(404)
  res.locals.resshorttofull = foundDB.full;
  res.locals.resshorttodescription=foundDB.description;
  res.render('findbyshort',{resshorttofull:foundDB.full, resshorttodescription:foundDB.description});
})

app.get('/findbydescription',async (req,res)=>{
  res.render('findbydescription',{resdescriptiontofull:'',resdescriptiontoshort:''})
})

app.post('/findbydescription',async(req,res)=>{
  const foundDB= await Database.findOne({description:req.body.findbydescription})
  if(foundDB==null)return res.sendStatus(404)
  res.locals.resdescriptiontofull = foundDB.full;
  res.locals.resdescriptiontoshort=foundDB.short;
  res.render('findbydescription',{resdescriptiontofull :foundDB.full, resdescriptiontoshort:foundDB.short});
})

app.get('/short/:shortUrl', async (req,res)=>{
  const shortUrl=await Database.findOne({short:req.params.shortUrl})
  if(shortUrl==null){return res.sendStatus(404)}
  else{
  shortUrl.clicks++
  shortUrl.save()
  res.redirect(shortUrl.full)}
})
//---------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});