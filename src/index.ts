import express from 'express'
import mongoose from "mongoose";
import Users, {IUser} from "./Users";

const app = express()
const port = 3000

const dataBase = {
    users: [
        {id: 1, name: 'Aziz', message: 'Hello world!-an'},
        {id: 2, name: 'Abzal', message: 'yo'},
        {id: 3, name: 'Shoqan', message: 'eye man'},
    ]
}

app.use(express.json())
app.get('/users', async(req, res) => {
    // let queryLetters = dataBase.users
    // if (req.query.nam) {
    //     queryLetters = queryLetters.filter(c => c.name.indexOf(req.query.nam as string) > -1)
    // }
    const user = await Users.find()
    res.json(user)
})

app.get('/users/:id', (req, res) => {
    const foundUser = dataBase.users.find(c => c.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(404)
        return
    }
    res.json(foundUser)
})

app.post('/users',  async(req, res) => {
    const user: IUser = await Users.create({
        name: req.body.name,
        message: req.body.message
    })

    res.json(user)
})

mongoose.connect('mongodb+srv://Aziz:Qw987654321@cluster0.uwstexo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Nya-MongoDB connected successfully");

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
