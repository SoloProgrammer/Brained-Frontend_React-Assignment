import { useState } from "react";
import NoteContext from "./noteContext";
import { toast } from 'react-toastify';


const NoteState = (props) => {

  function Toast_success(msg){
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  }
  function Toast_error(msg){
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  }


  const [load,setload] = useState(false)
  
  let Initialnotes = []
  const [notes, setNotes] = useState(Initialnotes)

  const getallnotes = async () => {
    const res = await fetch(`/api/note/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })
    const Json = await res.json();
      
    setNotes(Json.notes)
    setTimeout(() => {
      setload(false)
    }, 100);
    // sfuhuo

  }


  const addnote = async (title, description, tag,setNote) => {
    setload(true)
    const res = await fetch(`/api/note/Addanote`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })

      })

    
    const json = await res.json()
    
    if(json.status){
      setNote({
        title:"",
        description:"",
        tag:""
      })
      getallnotes();
      setTimeout(() => {
        Toast_success(json.msg)
      }, 100);
    }
    else{
      setTimeout(() => {
        Toast_error(json.msg)
        setload(false)
      }, 200);
    }

  }

  const Deletenote = async (id) => {
    // TODO Api call
    // Api Call
    const sure = window.confirm("Are you sure to delete this note?")
    if(!sure) return
    setload(true)
    const res = await fetch(`/api/note/Deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        }

      })
    const json = await res.json();
    if(json.success){
      getallnotes();
      setTimeout(() => {
        Toast_success(json.message)
      }, 100);
    }
  }
  const Updatenote = async (id, title, description, tag,show_Alert) => {
    setload(true)
    const res = await fetch(`/api/note/Updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })

      })

      const json = await res.json()

      if(json.success){
        getallnotes();
        setTimeout(() => {
          Toast_success(json.message)
        }, 100);
      }

   

  }

  return (

    <NoteContext.Provider value={{load,notes, addnote, Deletenote, Updatenote, getallnotes}}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState