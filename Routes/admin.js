const express = require('express');
const router = express.Router();
const Admin = require('../Models/admin')
const Product = require('../Models/product')
const jwt = require('jsonwebtoken');

router.post('/notAdded', async (req, res) => {
  //find all the products that could not be added and count how many of them
  var minimum = Date.parse(req.body.min);
  var minObject = new Date(minimum);
  var maximum = Date.parse(req.body.max);
  var maxObject = new Date(maximum);
  minObject.setDate(minObject.getDate() + 1);
  minObject.setHours(24, 0, 0, 0)
  maxObject.setHours(0, 0, 0, 0)
  Product.aggregate([
    { $match: { added: false, creationDate: { $gte: maxObject, $lte: minObject } } },
    {
      $group: {
        _id: { barcode: "$barcode", name: "$name" }, totalShufersal: {
          $sum: {
            '$cond': [
              { '$eq': ['$selection', "Shufersal"] },
              1,
              0
            ]
          }
        }, totalRamiLevy: {
          $sum: {
            '$cond': [
              { '$eq': ['$selection', "Shufersal"] },
              0,
              1
            ]
          }
        }
      }
    },
    { $sort: { total: -1 } }
  ]).
    then(data => {
      res.send(data)
    }).catch(error => res.status(500).send(error))

})

router.post('/totalActiveUsers', async (req, res) => {
  //find all the products that could not be added and count how many of them
  var minimum = Date.parse(req.body.min);
  var minObject = new Date(minimum);
  var maximum = Date.parse(req.body.max);
  var maxObject = new Date(maximum);
  minObject.setDate(minObject.getDate() + 1);
  minObject.setHours(24, 0, 0, 0)
  maxObject.setHours(0, 0, 0, 0)
  Product.aggregate([
    { $match: { creationDate: { $gte: maxObject, $lte: minObject } } },
    { $group: { _id: { email: "$email" }, total: { $sum: 1 } } },
    { $sort: { price: -1 } }
  ]
  ).
    then(data => {
      res.send(data)
    }).catch(error => res.status(500).send(error))

})


router.post('/agg', async (req, res) => {
  var dataObj = {};
  //agg amount and price of products filtered by supermarket choice
  const marketPrice = req.body.isShufersal ? "$shufersalPrice" : "$ramiLevyPrice";
  const marketName = req.body.isShufersal ? "Shufersal" : "Rami Levy";
  var minimum = Date.parse(req.body.min);
  var minObject = new Date(minimum);
  var maximum = Date.parse(req.body.max);
  var maxObject = new Date(maximum);
  minObject.setDate(minObject.getDate() + 1);
  minObject.setHours(24, 0, 0, 0)
  maxObject.setHours(0, 0, 0, 0)
  try {
    const data = await Product.aggregate([
      { $match: { added: true, selection: marketName, creationDate: { $gte: maxObject, $lte: minObject } } },
      { $group: { _id: { added: "$added" }, total: { $sum: 1 }, price: { $sum: marketPrice } } },
      { $sort: { price: -1 } }
    ]
    )
    dataObj.price = data;
    console.log(dataObj)
  }
  catch (error) {
    res.status(500).send(error)
  }
  try {
    const data = await Product.aggregate([
      { $match: { selection: marketName, creationDate: { $gte: maxObject, $lte: minObject } } },
      { $group: { _id: { email: "$email" } } },
    ]
    )
    dataObj.activeUsers = data;
  }
  catch (error) {
    res.status(500).send(error)
  }
  res.send(dataObj);
})


router.post('/usersData', async (req, res) => {
  //catalogs the active users per day, and how many products were used by all of them together
  // var today = new Date();
  // today.setDate(today.getDate() - req.body.number);  
  // Product.aggregate([
  //   { $match: {creationDate: {$gte: today}, added:true } },
  //     { $group: { _id: {email: "$email" }, totalPrice: {$sum: "$shufersalPrice"} }},
  //     { $sort: { _id: 1 } }
  //   ]
  //   ).
  //       then(data => {
  //           res.send(data)
  //       }).catch(error => res.status(500).send(error))
  console.log('----')
  var minObject = new Date(req.body.min);
  var maxObject = new Date(req.body.max);
  minObject.setHours(0, 0, 0, 0)
  maxObject.setHours(0, 0, 0, 0)
  console.log(minObject)
  console.log(maxObject)
  console.log('----')
  try {
    const data = await Product.aggregate([
      { $match: { email: req.body.findEmail, added: true, creationDate: { $gte: maxObject, $lte: minObject } } },
      {
        $group: {
          _id: { email: "$email" }, price: {
            $sum: {
              '$cond': [
                { '$eq': ['$selection', "Shufersal"] },
                "$shufersalPrice",
                "$ramiLevyPrice"
              ]
            }
          }
        }
      }
    ]
    )
    console.log(data)
    res.send(data);
  }
  catch (error) {
    res.status(500).send(error)
  }

  //   var minObject = new Date();
  //   var maxObject = new Date();
  //   minObject.setDate(minObject.getDate()+1)
  //  maxObject.setDate(minObject.getDate())
  //  minObject.setHours(24,0,0,0)
  //  maxObject.setHours(0,0,0,0)
  //   console.log(maxObject)
  //   console.log(minObject)
  //   let all = []
  //     try{
  //       for (let i = 0; i<7; i++){
  //         minObject.setDate(minObject.getDate()-1)
  //         maxObject.setDate(maxObject.getDate()-1)
  //         // minObject.setHours(24,0,0,0)
  //         maxObject.setHours(0,0,0,0)      
  //         console.log(maxObject)
  //         console.log(minObject)      
  //         const data = await Product.aggregate([
  //           { $match: { creationDate: {$gte: maxObject, $lte: minObject}, added:true } },
  //           { $group: { _id: {email: "$email"}, totalForUser: {$sum: "$shufersalPrice"}} },
  //         ]
  //         )
  //         all.push(data)
  //       }

  //       console.log(all)
  //       res.send(all);

  //     }
  //     catch(error){
  //       console.log(error)
  //       res.status(500).send(error)
  //     }

})

router.post('/findAll', async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate() - 7);
  Product.aggregate([
    { $match: { creationDate: { $gte: today }, added:true } },
    { $group: { _id: { email: "$email" } } },
    { $sort: { total: -1 } }
  ]
  ).
    then(data => {
      res.send(data)
    }).catch(error => res.status(500).send(error))
})


router.post('/notAdded', async (req, res) => {
  var today = new Date();
  today.setDate(today.getDate() - req.body.number);
  Product.find({ email: req.body.email, added: false, creationDate: { $gte: today } }).
    then(data => {
      res.send(data)
    }).catch(error => res.status(500).send(error))

})

// router.post('/agg', async (req, res) => {
//   var today = new Date();
//   today.setDate(today.getDate() - req.body.number);
//   if (req.body.filter === 'amount') {
//     Product.aggregate([
//       { $match: { email: req.body.email, added: true, creationDate: { $gte: today } } },
//       {
//         $group: {
//           _id: { barcode: "$barcode", image: "$image", name: "$name" }, total: { $sum: 1 }, price: {
//             $sum: {
//               '$cond': [
//                 { '$eq': ['$selection', "Shufersal"] },
//                 '$shufersalPrice',
//                 '$ramiLevyPrice'
//               ]
//             }
//           }
//         }
//       },
//       { $sort: { total: -1 } }
//     ]
//     ).
//       then(data => {
//         res.send(data)
//       }).catch(error => res.status(500).send(error))
//   }
//   else {
//     Product.aggregate([
//       { $match: { email: req.body.email, added: true, creationDate: { $gte: today } } },
//       {
//         $group: {
//           _id: { barcode: "$barcode", image: "$image", name: "$name" }, total: { $sum: 1 },
//           price: {
//             $sum: {
//               '$cond': [
//                 { '$eq': ['$selection', "Shufersal"] },
//                 '$shufersalPrice',
//                 '$ramiLevyPrice'
//               ]
//             }
//           }
//         }
//       },
//       { $sort: { price: -1 } }
//     ]
//     ).
//       then(data => {
//         res.send(data)
//       }).catch(error => res.status(500).send(error))
//   }

// })


router.post('/user', async (req, res) => {
  Product.find({ email: req.body.searchEmail, added: true }).
    then(data => {
      res.send(data)
    }).catch(error => res.status(500).send(error))
});

router.post('/total', async (req, res) => { //main dashboard
  const marketPrice = req.body.isShufersal ? "$shufersalPrice" : "$ramiLevyPrice";
  const marketPrice1 = req.body.isShufersal ? "shufersalPrice" : "ramiLevyPrice";
  console.log(req.body.searchEmail)

  Product.aggregate([
    { $match: { email: req.body.searchEmail, added: true } },
    { $group: { _id: { selection: marketPrice1 }, total: { $sum: 1 }, price: { $sum: marketPrice } } },
    { $sort: { total: -1 } }
  ]
  ).
    then(data => {
      console.log(data)
      console.log('---------')

      res.send(data)
      console.log('---------')

    }).catch(error => res.status(500).send(error))
})


module.exports = router