const myExpress = require('express')

const router = myExpress.Router()
const Info = require('./db.js')


//Create/Insert

router.post(`/`, (req, res) => {
    const usersInfo = req.body

    Info.insert(usersInfo)
    .then(info => {
        res.status(201).json({success: true, info})
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
})




//Read/Get

router.get(`/`, (req, res) => {
    Info.find().then(info => {
        if(info) {
            res.status(200).json({success: true, info})
        } else {
            res.status(500).json({success: false, message:'user info not found'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({success: false, error})
    })

})


//Read/Get by ID


router.get(`/:id`, (req, res) => {
    const {id} = req.params;

    Info.findById(id)
    .then(info => {
        if (info) {
            res.status(200).json({success: true, info})
        } else {
            res.status(500).json({success: false, message: "id not found"})
        }
    })
})

//Put/Edit/Update

router.put(`/:id`, (req, res) => {
    const info = req.body;
    const {id} = req.params;

    Info.update(id, info)
    .then(edited => {
        if (edited) {
            res.status(201).json({success: true, edited})
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
})


//Delete/Remove

router.delete(`/:id`, (req, res) => {
    console.log(res)
    const {id} = req.params;

    Info.remove(id)
    .then(deleted => {
        if (deleted) {
        res.status(204).json();
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        console.log(error, 'Delete Error')
        res.status(500).json({success: false,  error})
    })
})

// Check all comments

router.get(`/:id/comment`, (req, res) => {
    const {id} = req.params
    Info.findPostComments(id).then(comments => {
        if(comments) {
            res.status(200).json({success: true, comments})
        } else {
            res.status(500).json({success: false, message: 'no comments found'})
        }
    })
})

// Put/Edit/Update Comments

router.post(`/:id/comment`, (req, res) => {
    const comment = req.body;
    const {id} = req.params;


    Info.insertComment(id, comment).then(comments => {
        if (comments) {
            res.status(201).json({success: true, comments})
        } else {
            res.status(404).json({success: false, message: 'Comment ID not created'})
        }
    })
})

router.get(`/:id/comment`, (req, res) => {
    const {id} = req.params;

    Info.findCommentById(id).then(comment => {
        if(comment) {
            res.status(200).json({success: true, comment})
        } else {
            res.status(500).json({success: false, message: 'Comment not found'})
        }
    })
    .catch(err => res.status(500).json({success: false, err}))
})

module.exports = router