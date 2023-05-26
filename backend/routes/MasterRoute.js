const router = require("express").Router();
let Master = require('../models/MasterModel')

//http://localhost:8020/master/add
router.route("/add").post((req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = Number(req.body.age);
    const email = req.body.email;
    const address = req.body.address;
    const contact = req.body.contact;
    const password = req.body.password;


    const newMaster = new Master({
        id,
        name,
        age,
        email,
        address,
        contact,
        password
    })

    newMaster.save().then(() => {
        res.json("Master Created")
    }).catch((err) => {
        console.log(err);
    })
})

//get all masters
router.route("/").get((req,res)=>{
    Master.find().then((master)=>{
        res.json(master)
    }).catch((err)=>{
        console.log(err);
    })
})

//delete master
router.route("/delete/:id").delete((req,res) => {
    const masterId = req.params.id;

    Master.findByIdAndDelete(masterId).then(() => {
        res.status(200).send({status:"Master Deleted"})
    }).catch((err)=>{
        console.log(err);
    })

})

//update master
//http://localhost:8020/master/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let masterId = req.params.id;
    const {id,name,email,age,address,contact,password} = req.body;

    const updateMaster = {
        id,
        name,
        email,
        age,
        address,
        contact,
        password

    }

    const update = await Master.findByIdAndUpdate(masterId,updateMaster).then(()=>{
        res.status(200).send({status: "Master Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let master = await Master.findById(req.params.id);
    const data = {
        id: req.body.id || Master.id,
        name: req.body.name || Master.name,
        age: req.body.age || Master.age,
        email: req.body.email || Master.email,
        address: req.body.address || Master.address,
        contact: req.body.contact || Master.contact,
        password: req.body.password || Master.password

    };
    master = await Master.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(master);
});


//get one of the master
//http://localhost:8020/master/get/:id
router.route("/get/:id").get((req,res)=>{
    let masterId = req.params.id;
    Master.findById(masterId).then((master)=>{
        res.json(master)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;