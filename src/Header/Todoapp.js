import React, { useEffect, useState } from "react";
import './Todoapp.css';

//get local the data 
const getlocalTimes = () => {
    const list=localStorage.getItem('lists');
    console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return []; 
    }
}

function TODOApp(){

    const [task,setTask]= useState("");
    const [tasklist ,setTaskList]=useState(getlocalTimes(),[]);
    const [toogle ,setToggle]=useState(false);
    const [edit,setEdit]=useState({isEdit:false , index:-1})
   

     //add data to localstorage
     useEffect(() =>{
         localStorage.setItem('lists',JSON.stringify(tasklist))

     },[tasklist]
     );

    const handleChnage =(e) =>{
        setTask(e.target.value);
    }

    const ADDTask = () => {
        if(task==""){
            setToggle(true);
        }
        else{
            if(edit.isEdit){
                console.log("editable");
 
                const currentvalue=[...tasklist];
                currentvalue[edit.index]= {
                    ...currentvalue[edit.index],
                    value:task
                };
                console.log("taskkkkkk",task);
                console.log(currentvalue);
                setTaskList(currentvalue);

                setEdit({...edit,isEdit:false,index:-1})
            }
            else{
                const currentvalue=[...tasklist];
                const currentObject = {id:new Date().getTime().toString(),value:task}
                currentvalue.push(currentObject)
                setTaskList(currentvalue)
            }
            setToggle(false)
        
        }
        setTask("")
   
    }

    const DeleteTask =(id) =>{
        // console.log("idd is ",id);
        const updatevalue=tasklist.filter((e,index) => {
            // console.log('index is',index);
           return  index!==id;
        })
        setTaskList(updatevalue);


    }

    const EditData = (id) => {

        setEdit({...edit,isEdit:true,index:id})

        const editvalue=[tasklist[id]];
        console.log("value of edit",edit);
        setTask(tasklist[id].value)
    }
    return(
        <>
            {toogle ? <h2 className="heading">Please add value...</h2>:null}
        <div className="todo">
        <input type='text' name="text"  value={task}  id="text" onChange={(e) => handleChnage(e)} placeholder="Add Task Here.."></input>
        <button className="btn" onClick={ADDTask}>ADD</button>
        </div>
        {
            tasklist!==[] ?
            <div  className=" listtable m-top20px">
                {tasklist.map((t,index) =>
                <div className="list" key={index}>
                    <div className="listitems" >{t.value}</div>
                    <div className="buttons">
                    <button className="editbtn" onClick={()=>EditData(index)}>Edit</button>
                    <button className="deletebtn" onClick={()=>DeleteTask(index)}>Delete</button>
                    </div>
                    </div>
            
                
                    )}
            </div>
            :null
        }
       

        </>

    );
}
export default TODOApp;