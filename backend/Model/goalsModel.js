import mongoose from 'mongoose';


const goalsSchema = new mongoose.Schema({
    goal:{type:String, required:true}
})

const goalsModel = mongoose.model('goalsModel',goalsSchema);

export default goalsModel;
