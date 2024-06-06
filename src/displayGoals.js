import React,{useState,useRef,useEffect} from 'react';
// import { Link } from 'react-router-dom';
import myCss from './index.module.css';

function ShowGoals(props){



    const handleEdit = (objectId, goal) => {
        console.log("you have cliecked Edit btn")
        console.log("edit clicked", `value : ${objectId} + goal: ${goal}`);
        props.getClickValues(objectId, goal);
    }

    const handleDelete = (id) => {
        console.log("id: inside handleDel ", id);
        for (const goal of props.goalsList){
            console.log("new check goal id: ", goal.id)
        }
        const filteredList = props.goalsList.filter(goal => goal._id != id);
        props.setGoals(filteredList);
        fetch(`http://localhost:3005/goals/api/deletingGoal/${id}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        }).then(response => response.json())
        .then(data => console.log("response during Delete fun: ", data))
        .catch(err => console.log("err while deleting data: ", err));


        console.log("my Filtered List :", filteredList);
    }

    return (
        <div id={myCss.listBox}>
            <ul className={myCss.myList}>
            {props.goalsList.map(goal => {
            return(
       
                <div id={goal.id} key={goal.id} className={myCss.goal}>
                        <li> {goal.goal} </li>
                        <div>
                            <button onClick={(e) => {
                            e.preventDefault();
                            handleEdit(goal._id, goal.goal)
                            }
                            }> Edit </button>

                            <button onClick={(e) => {
                            e.preventDefault();
                            handleDelete(goal._id)
                            }
                            }> Delete </button>
                        </div>
                        
                </div>
            )
            })}
            </ul>
        
        </div>
    )
}
export default ShowGoals
