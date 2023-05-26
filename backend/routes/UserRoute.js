const router = require("express").Router();
let User = require('../models/UserModel')

//http://localhost:8020/user/add
router.route("/add").post((req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = Number(req.body.age);
    const type = req.body.type;
    const address = req.body.address;
    const contact = req.body.contact;

    const newUser = new User({
        id,
        name,
        age,
        type,
        address,
        contact
    })

    newUser.save().then(() => {
        res.json("User Created")
    }).catch((err) => {
        console.log(err);
    })
})

//get all users
router.route("/").get((req,res)=>{
    User.find().then((user)=>{
        res.json(user)
    }).catch((err)=>{
        console.log(err);
    })
})

//delete user
router.route("/delete/:id").delete((req,res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status:"User Deleted"})
    }).catch((err)=>{
        console.log(err);
    })

})

//update User
//http://localhost:8020/user/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {id,name,type,age,address,contact} = req.body;

    const updateUser = {
        id,
        name,
        type,
        age,
        address,
        contact

    }

    const update = await User.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({status: "User Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
    let user = await User.findById(req.params.id);
    const data = {
        id: req.body.id || User.id,
        name: req.body.name || User.name,
        age: req.body.age || User.age,
        type: req.body.type || User.type,
        address: req.body.address || User.address,
        contact: req.body.contact || User.contact,
        

    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(User);
});

//get one User 
router.route("/get/:id").get((req,res)=>{
    let userId =  req.params.id;
    User.findById(userId).then((user)=>{
        res.json(user);
    }).catch((err)=>{
        console.log(err);
    })
})

//get one of the User
//http://localhost:8020/user/get/:id
router.route("/get/:id").get((req,res)=>{
    let userId = req.params.id;
    User.findById(userId).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;