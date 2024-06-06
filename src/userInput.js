import React,{useState,useEffect} from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';
import styles from './index.module.css';


function Input({present,editResponse, addGoal})
{
    let [message, setMessage] = useState('');
    let [userText, setUserText] = useState('');
    const [editMode, setEditMode] = useState(false);
    let [sub, setSubmit] = useState('Add Goal');
    // console.log(`present: ${present} and editResponse : ${editResponse} and Add Goal: ${addGoal}`)
    const handleUserInput = (e) => {
    e.preventDefault();
    console.log("Your Goal ", e.target.value);
    setUserText(e.target.value);

  }

  useEffect(() => {

    console.log("present: ", present)
    if (present.id) {
        
        console.log("present.goal ", present.text);
        setUserText(present.text);
        setSubmit('Edit Goal'); // Update button text to reflect editing
        setEditMode(true);
        
    } else {
        setUserText(''); // Clear input if no goal/id is provided
        setSubmit('Add Goal'); // Reset button text
    }
}, [present]);
   

 useEffect(() => {
    setTimeout(() => {
        setMessage('')
    }, 3000)
    // return () => clearTimeout(myTimer)
 },[message])

    return (
        <>
            <div className="SearchHeader" style={{textAlign:"center"}}>
                <h2>Al RAZAAAQ Al Hakeem</h2>
                <p> {message? message: null} </p>
                <form>
                    <input type='text' value={userText} onChange={(e) => handleUserInput(e)} placeholder="Enter MAGIC GOAL" ></input>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(!userText){
                            alert("plz Enter Your Life Goal");
                            setMessage("Yaar Kuch Insert Tou Karo")
                        }
                        else if(editMode){
                            editResponse(userText, present.id);
                            setEditMode(false);
                            setMessage("Edited Successfully")
                        }
                        else{
                            addGoal(userText);
                            setUserText('');
                            setMessage("Aap Ka Goal Add Ho Gia!!!")
                        }
                        
                    }}>{sub}</button>
                </form> 
            </div>
            
        </>
    )
}



export default Input;
