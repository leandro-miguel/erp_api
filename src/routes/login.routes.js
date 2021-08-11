const {Router} = require("express")
const LoginController = require("../controllers/LoginController")
const bcrypt = require('bcryptjs')

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.get("/",async (req,res)=>{
    const items = await loginController.index()
    return res.json(items)
})

loginRouter.post("/",async(req,res)=>{
    bcrypt.hash(req.body.senha,10,(errBcrypt,hash)=>{
        if(errBcrypt){
            return res.status(500).send({error:errBcrypt})
        }
        const items = await loginController.create(req.body.email,hash),
        return res.json(items)
    })

   
})

loginRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    var idNumber = parseInt(id)
    const items = await loginController.delete(idNumber)
    return res.json(items)
})
 
loginRouter.get("/:id",async(req,res)=>{
    const {id}= req.params
    var idNumber = parseInt(id)
    const items = await loginController.getId(idNumber)
    return res.json(items)
})

loginRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const {email,senha} = req.body
    const items = await loginController.update(email,senha,id)
    return res.json(items)
})

module.exports=loginRouter

