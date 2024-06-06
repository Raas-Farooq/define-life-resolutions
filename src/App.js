import React,{useState,useEffect,useRef} from 'react';
// import {v4 as uuidv4} from 'uuid'; 

// import 'bootstrap/dist/css/bootstrap.min.css';
// import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Input from './userInput.js';
import RevealGoals from './displayGoals.js';
import styles from './index.module.css';


// import MapReviews from './MappingReviews.js'

function App(){

    const [presentGoal, setPresentGoal] = useState({id:'', goal:""});
    const [goalsList, setGoalsList] = useState([]);
    const [received, setReceived] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3005/goals/api/loadAllData')
    .then(response => response.json()).
    then(data => {
      
      console.log("backend Msg inside App Component", data);
      if(data.length){
        // addStoredGoals(data);
        setGoalsList(data);
      }
     
    }).catch(err => console.log("it is the err Message from backend: ", err))
  },[])
  
  function editClickResponse(id, text) {
      console.log("id in Edid Response ", id);
      setPresentGoal({id, text});
  }

    function editResponse(newItem,_id) {
      console.log("newItem in App", newItem);
      console.log("id in Edid Response ", _id);
      
      const mapList = goalsList.map(goal => {
        if(goal._id === _id){
          console.log("goal in App Edit: ", goal._id + "only Id " + goal.id);
          return({_id, goal:newItem})
        }
        else{
          return goal
        }
      })
      fetch(`http://localhost:3005/goals/api/updateGoal/${_id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({_id, newItem})
      }).then(response => response.json())
      .then(data => console.log("Backend Response at Put: ", data))
      .catch(er =>console.log("Err from Put: ",er))

      console.log("mapList; ", mapList)
      setGoalsList(mapList);
      setPresentGoal({id:'', goal:''})
    }


    function addNewGoal(goal) {
      console.log("Add Goal Ran");
      let newGoal;
      fetch('http://localhost:3005/goals/api/addingGoal',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(goal)
      }).then(response => response.json())
      .then(data => {
        console.log("Backend Res at Post: ", data);
        newGoal=data.goal;
        console.log(`newGoal ${newGoal} , goal: ${goal}`);
       }) // TOMORROW assign the added goal here and why start:frontEnd work 
      .catch(er =>console.log("Err from Post: ",er))
      setGoalsList(prevGoals => [...prevGoals, {goal}]);
    }
      
      
    
  

 return(

        <>
          {console.log("goalsList: ",goalsList)}
          <Input addGoal={addNewGoal} editResponse={editResponse} present={presentGoal} /> 
          <RevealGoals goalsList={goalsList} setGoals={setGoalsList} getClickValues={editClickResponse} />
        </>   
  )

}
export default App;

