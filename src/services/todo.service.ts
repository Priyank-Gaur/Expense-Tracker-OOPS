import { TodoModel, ToDoInterface } from "../schema/todo.schema";

export class ToDoService{
    async getTask(){
        return await TodoModel.find();
    }

    createTask(){

    }
    updateTask(){

    }
    deleteTask(){
        
    }
}