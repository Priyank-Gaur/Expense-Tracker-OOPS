import express from 'express';
import mongoose from 'mongoose';
interface App_Interface{
    startServer():void;
    connectDB():void;
    initailizeRoutes():void;
}


export default class App implements App_Interface{
    PORT: number;
    app : express.Application;
    constructor(){
        this.PORT = 4000
        this.app = express()
        this.startServer()
        this.initailizeRoutes()
        this.connectDB()
    }

    startServer(): void {
        this.app.listen(this.PORT,()=>{
            console.log(`Server is running on https://localhost:${this.PORT}`)
        })
    }

    async connectDB(): Promise<void> {  //either remove void or write Promise<Void>
        try{
            await mongoose.connect("")
            console.log("DB connected")
        }
        catch(error){
            console.log(error)
        }
        
    }
    initailizeRoutes(): void {
        this.app.use(express.json())
    }
}

