const express = require('express');
const router = express.Router();
const Product = require('../Models/product')
const rp = require('request-promise');
const $ = require('cheerio');
const axios = require('axios') 
const request = require('request');


// router.get('/getDataPartial/:barcode', async (req, res) => {
//     let obj =  {}
//     const url = `https://chp.co.il/%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91/0/0/${req.params.barcode}/0`;
//     try{
//       const html2 = await rp(url)
//       const image = $('td > img', html2)[0].attribs['data-uri'] //error
//       obj.image = image;
//     }
//     catch(error){
//       console.log(error)
//     }
   
//     try{
//       const data2 = await axios.get('https://chp.co.il/autocompletion/product_extended?term=' + req.params.barcode)
//       const name =data2.data[0].value //error
//       obj.name = name;
//     } catch(error){
//       console.log(error)
//     }
//     res.send(obj)
// })

router.post('/getDataPartial', async (req, res) => {
  let obj =  {}
  const url = `https://chp.co.il/%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91/0/0/${req.body.barcode}/0`;
  try{
    const html2 = await rp(url)
    const image = $('td > img', html2)[0].attribs['data-uri'] //error
    obj.image = image;
  }
  catch(error){
    console.log(error)
  }
 
  try{
    const data2 = await axios.get('https://chp.co.il/autocompletion/product_extended?term=' + req.body.barcode)
    const name =data2.data[0].value //error
    obj.name = name;
  } catch(error){
    console.log(error)
  }
  res.send(obj)
})

router.post('/', async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate() - req.body.number);
    Product.find({ email: req.body.email, added:true, creationDate: {$gte: today} }).
        then(data => {
            res.send(data)
        }).catch(error => res.status(500).send(error))
})

router.post('/notAdded/:email/:number', async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate() - req.body.number);
    Product.find({ email: req.body.email, added: false, creationDate: {$gte: today}  }).
        then(data => {
            res.send(data)
        }).catch(error => res.status(500).send(error))

})

router.post('/agg', async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate() - req.body.number);
  const marketPrice = req.body.isShufersal ? "$shufersalPrice" : "$ramiLevyPrice";
  if(req.body.filter === 'amount'){
    Product.aggregate([
      { $match: { email: req.body.email, added: true, creationDate: {$gte: today} } },
      { $group: { _id: {barcode: "$barcode",image: "$image", name:"$name"}, total: { $sum: 1 }, price: { $sum: marketPrice }} },
      { $sort: { total: -1 } }
    ]
    ).
        then(data => {
            res.send(data)
        }).catch(error => res.status(500).send(error))
  }
  else{
    Product.aggregate([
      { $match: { email: req.body.email, added: true, creationDate: {$gte: today} } },
      { $group: { _id: {barcode: "$barcode",image: "$image", name:"$name"}, total: { $sum: 1 }, price: { $sum: marketPrice }} },
      { $sort: { price: -1 } }
    ]
    ).
        then(data => {
            res.send(data)
        }).catch(error => res.status(500).send(error))
  }
    
})


module.exports = router