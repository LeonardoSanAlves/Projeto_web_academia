import express from 'express' 
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

const app = express()
app.use(express.json())




app.post('/contracts', async (req,res)=> {

    await prisma.contracts.create({
        data:{
               email: req.body.email, 
               name: req.body.name, 
               age: req.body.age

        }



    })

res.status(201).json(req.body)

}

)

app.get('/contracts',async (req,res)=> {
    let users = []

    if(req.query){
        users = await prisma.contracts.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })

    }
    
    else {
              users = await prisma.contracts.findMany()

        }
    

    res.status(200).json(users)

})



app.put('/contracts/:id', async (req,res)=> {

    await prisma.contracts.update({
        where: {
            id: req.params.id
        },


        
        data:{
               email: req.body.email, 
               name: req.body.name, 
               age: req.body.age

        }



    })

res.status(201).json(req.body)

})


app.delete('/contracts/:id', async (req, res) => {

    await prisma.contracts.delete({
        where: {
            id: req.params.id

        }
    })

    req.status(200).json( {message: 'Contract deletado com sucesso'})
})


app.listen(3000)


