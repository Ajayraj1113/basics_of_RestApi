const express = require("express")
const members = require("./Members")
const uuid = require("uuid")
const app = express()

const PORT = 3000

app.use(express.json())

app.get("/showAllUser", (req, res) => {
    res.status(200).json(members)
})

app.get("/showUser/:userId", (req, res) => {
    // console.log(typeof req.params.userId)
    const id = parseInt(req.params.userId);
    let user = members.filter(member => member.id === id);
    // console.log(user)
    (user.length !== 0 ) ? res.status(200).json(user) : res.status(404).json({message : `User not found with id ${id}`})
    // if (user.length !== 0) res.status(200).json(user) 
    //     else res.status(404).json({message : `User not found with id ${id}`})
})


app.post("/adduser", (req, res) => {
    // console.log("User : ", req.body)
    // const name = req.body.name;
    // const email = req.body.email;

    const {name, email} = req.body
    // console.log(name, email)

    members.push({
        id: uuid.v4(),
        name,
        email
    })

    res.status(200).json(members)
})

app.delete("/deleteUser/:uid", (req, res) => {
    const id = parseInt(req.params.uid);
    // console.log(id)
    const found = members.some(member => member.id === id)
    
    if (found){
        const updatedMember = members.filter(member => member.id !== id)
        res.status(200).json(updatedMember)

    } else {
        res.status(400).json({message: `User not found with id ${id}`})
    }
})


app.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`)
})