const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const members = require('../../Members');


//Gets All members
router.get('/', (req,res) => {
    res.json(members);
});

//Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `No member with the id  of ${req.params.id}`});
    }
});

//Create Member
router.post('/', (req, res) => {
    //res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);

});

//Update member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const upMember = req.body;

        members.forEach(member => { 
            if(member.id === parseInt(req.params.id)){
                member.name = upMember.name?upMember.name : member.name;
                member.email = upMember.email?upMember.email: member.email;

                res.json({msg: 'Member Updated', member})
            }
        });

    } else {
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
});

//Delete member
router.delete('/:id',(req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({msg: 'Member deleted',
        members: members.filter(member => member.id !== parseInt(req.params.id))
    });
    } else {
        res.status(400).json({msg: `No member with id ${req.params.id}`});
    }
});

module.exports = router;