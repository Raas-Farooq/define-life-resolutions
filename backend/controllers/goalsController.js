import { Circle, Trophy } from "react-bootstrap-icons"
import goalsModel from '../Model/goalsModel.js';
import database from "../config/database.js";
import mongoose from "mongoose";

const deleteGoal = async(req,res) => {

    try{
        const myId = req.params.id;
        const found= await goalsModel.findOne({_id:myId});
        console.log("found", found);
        if(!myId){
            return res.status(400).json({message:"id has No value"});
        }

        if(found){
            const updated = await goalsModel.deleteOne({_id:myId});
            if(updated){
                console.log("Successfully deleted")
                res.send(updated)
            }
           else{
            console.log("BE Patient")
            res.send({message:"Al MUTAKABIR"})
           }
        }
        else{
            console.log("ID is Not Found")
            res.json({message:"Are You Deliberate"})
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}
const addGoal = async(req,res) => {

    try{
        console.log("add Gaol has Run");
        const newGoal = req.body;
        console.log("req.body.myGoal ", newGoal);
        const added = await goalsModel.create(newGoal);
        console.log("Added: ", added);
        res.json(added);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}

const updating = async(req,res) => {

    try{
        let stringId=req.params.myId;
        console.log("type of myId", typeof(myId));
        const {id, newItem} = req.body;
        if(!myId || !newItem){
            return res.status(404).json({message:"empty or Null Required 'myId or Goal' "})
        }
        const myId = new mongoose.mongo.ObjectId(stringId);
        const updated = await goalsModel.findOneAndUpdate(myId, {$set:{goal:newItem}}, {new:true});
        console.log("updated response: ", updated);
        res.json({message:
            "successfully Added"
        });
        

    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}

const loadAllData = async(req,res) => {

    try{
        
        goalsModel.deleteMany({goal: {$exists:false}})
        .then(result => {
            console.log(`Deleted ${result.deletedCount} documents`);
          })
          .catch(err => {
            console.error('Error deleting documents:', err);
          });
        
        const goals = await goalsModel.find();
        res.json(goals);

    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}


export default {addGoal, loadAllData, updating, deleteGoal};

