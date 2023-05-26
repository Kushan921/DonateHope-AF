const router = require("express").Router();
let Blood = require("../models/BloodModel")

//http://localhost:8020/blood/add
router.route("/add").post((req,res) => {
    const event_name = req.body.event_name;
    const closing_date = req.body.closing_date;
    const closing_time = req.body.closing_time;
    const blood_type = req.body.blood_type;
    const blood_count = Number(req.body.blood_count);
    const doctor_incharge = req.body.doctor_incharge;

    const newBlood = new Blood({
        event_name,
        closing_date,
        closing_time,
        blood_type,
        blood_count,
        doctor_incharge
    })

    newBlood.save().then(() => {
        res.json("Blood Added")
    }).catch((err) => {
        console.log(err);
    })
})

//get all bloods
// router.route("/").get((req,res)=>{
//     Blood.find().then((blood)=>{
//         res.json(blood)
//     }).catch((err)=>{
//         console.log(err);
//     })
// })


// http://localhost:8020/blood/:blood_type
router.route("/:blood_type").get((req, res) => {
    const bloodType = req.params.blood_type;
  
    Blood.find({ blood_type: bloodType }).then((blood) => {
      res.json(blood);
      
      
    }).catch((err) => {
      console.log(err);
      res.status(500).json("Error occurred");
    });
  });




  
// http://localhost:8020/blood/
router.route("/").get((req, res) => {
    Blood.aggregate([
      {
        $group: {
          _id: "$blood_type",
          total_count: { $sum: "$blood_count" }
        }
      },
      {
        $project: {
          _id: 0,
          blood_type: "$_id",
          total_count: 1
        }
      }
    ]).then((result) => {
      res.json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json("Error occurred");
    });
  });
  


module.exports = router;