require("dotenv").config()
const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")
//load user model
const User = require("../../Models/User")
//load category model
const Category = require("../../Models/Category")
//TODO: organize routes using 'controllers'
//FIXME: change test routes to actual routes
// test users
router.get("/", function (req, res) {
    User.find(
        {},
    ).then(results => {
        res.json(results)
    }).catch(err => console.log(err))
})
// GET friends test route
// router.get("/friends", function (req, res) {
//     User.getAcceptedFriends(req.body.user, function (err, friendships) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(friendships)
//         }
//     })
// } )

// router.get("/test/removefriend", function (req, res) {
//     User.removeFriend(req.body.userA, req.body.userB, function(err) {
//         if (err) { 
//             console.log(err);
//         } else {
//             res.json(req.body.userA)
//         }
//     })
// })
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("inside profile route", req.user) 
    User.findOne({'_id': req.user.id})
    .then( results => {
        res.json(results)
        console.log('It worked!')
    }).catch( err => {
        console.log(err)
    }) 
  });
router.put('/profile/edit', function (req, res) {
    console.log("inside edit body route", req.body)
    const update = {
        "$set": {
            "age": req.body.age,
            "location": req.body.location,
            "languages": req.body.languages,
            "drink": req.body.drink,
            "smoke": req.body.smoke,
            "about": req.body.about,
            "category": req.body.category
        }
      }; 
    User.findByIdAndUpdate({'_id': req.body.id}, update, function (err, result) {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})
router.post("/register", function (req, res) {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "email exits" })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm",
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    }
                    newUser.password = hash
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err))
                })
            })
        }
    })
})
router.post("/login", function (req, res) {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ email: "user not found" })
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name, avatar: user.avatar }
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: token })
                })
            } else {
                return res.status(400).json({ password: "password is incorrect" })
            }
        })
    })
})
//test friend request
//add a friend
router.post('/friendrequest', function (req, res) {
    User.requestFriend(req.body.requestingUserId, req.body.requestedUserId, function(err) { 
        if(err){
            console.log(err)
        } else {
            res.redirect('/api/users/')
        }
    })
})
//show friend
// router.get('/friendrequest/:userId', function (req, res) {
//     User.find(
//         {}, function(err, allUsers) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 User.findById(req.params.userId, function(err, foundUser) {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         User.getFriends(foundUser, function (err, friendships) {
//                             if (err) {
//                                 console.log(err)
//                             } else {
//                                 res.json(friendships)
//                             }
//                         })
//                     }
//                 })
//             }
//         }
//     )
// })
//test categories
router.get("/test/categories", function (req, res) {
    res.json({ msg: "categories is working" })
})
router.post("/test/categories", function (req, res) {
    const newCategory = new Category({
        name: req.body.name
    })
    newCategory.save()
        .then(category => res.json(category))
        .catch(err => console.log(err))
})
router.get("/friendRequests", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("inside profile route", req.user) 
    User.findOne({'_id': req.user.id}, function(err, foundUser) {
        if (err) {
            console.log("We've got an error finding this user", err)
        } else {
            User.getPendingFriends(foundUser, function(err, friendships) {
                console.log(friendships)
                res.json(friendships)
            })
        }
    })

router.get('/friends', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("inside the friends route", req.user)
    User.findOne({'_id': req.user.id}, function(err, foundUser) {
        if (err) {
            console.log("We've got an error finding this user", err)
        } else {
            User.getAcceptedFriends(foundUser, function(err, friendships) {
                console.log(friendships)
                res.json(friendships)
            })
        }
    })
    })
});
// test route for specific user 
router.get("/test/profile", function (req, res) {
    User.findOne({'_id': req.user._id})
    .then( results => {
        res.json(results)
        console.log('It worked!')
    }).catch( err => {
        console.log(err)
    })
})
var mongo = require('mongodb');


router.get("/friendRequests", passport.authenticate("jwt", { session: false }), (req, res) => {

    console.log("inside profile route", req.user) 

    User.findOne({'_id': req.user.id}, function(err, foundUser) {
        if (err) {
            console.log("We've got an error finding this user", err)
        } else {
            User.getPendingFriends(foundUser, function(err, friendships) {
                console.log(friendships)
                res.json(friendships)
                
            })
            // User.getFriends(foundUser, function(err, friendships) {
            //     console.log(friendships)
            //     res.json(friendships)
            // })
        }
    })
    // .then( results => {
    //     console.log("These are the RESULTS!!!", results)
    //     res.json(results)

    //     // User.findById(req.params.userId, function(err, foundUser) {
    //     //     if (err) {
    //     //         console.log(err)
    //     //     } else {
    //     //         User.getFriends(foundUser, function (err, friendships) {
    //     //             if (err) {
    //     //                 console.log(err)
    //     //             } else {
    //     //                 res.json(friendships)
    //     //             }
    //     //         })
    //     //     }
        

    // }).catch( err => {
    //     console.log(err)
    // }) 
    
});

router.get("/acceptedRequests", passport.authenticate("jwt", { session: false }), (req, res) => {

    console.log("inside acceptedRequests route", req.user) 

    User.findOne({'_id': req.user.id}, function(err, foundUser) {
        if (err) {
            console.log("We've got an error finding this user", err)
        } else {
            User.getAcceptedFriends(foundUser, function(err, friendships) {
                console.log(friendships)
                res.json(friendships)
            })
        }
    })
});

// test route for specific user 
router.get("/test/profile", function (req, res) {
    User.findOne({'_id': req.user._id})
    .then( results => {
        res.json(results)
        console.log('It worked!')
    }).catch( err => {
        console.log(err)
    })
})
var mongo = require('mongodb');
var o_id = new mongo.ObjectId("5f1f5928ee86e14d2a83d3cc");



module.exports = router 