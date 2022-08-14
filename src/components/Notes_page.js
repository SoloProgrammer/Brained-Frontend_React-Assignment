import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import globalcontext from '../Contexts/globalcontext'
import noteContext from '../Contexts/notes/noteContext'
import Loading from '../Utils/Loading'
import {Link} from 'react-router-dom'

import Form from './Form'
import Notes_table from './Notes_table'

const Todo_page = () => {

  const Ncontext = useContext(noteContext)
  const Gcontext = useContext(globalcontext)
  
  const {load,notes, Deletenote, getallnotes} = Ncontext
  const {getuser_detail,userdetail} = Gcontext

  useEffect(()=>{
    getallnotes()
    getuser_detail()
  },[])
  
  const Handle_logout = () => {
    localStorage.clear()
    window.location.reload(0)
  }

  let popup = useRef();
  let popup_box = useRef();

  const [id, setId] = useState(null)

  const [notedetail, setNotedetail] = useState({
    title: "",
    description: "",
    tag: ""
  })
  const popup_up_box = (note) => {

    popup.current.classList.add('show')
    setTimeout(() => {
      popup_box.current.classList.add('come')
    }, 200);

    const {title,description,tag} = note

    setNotedetail({title,description,tag})
    setId(note._id)
  }

  const close = () => {
    popup_box.current.classList.remove('come')
    popup.current.classList.remove('show')
  }

  const Handle_close = (e) => {
    if (e.target.classList.contains('popup')) {
      close()
    }
  }

  return (
    <>
      {load && <Loading/>}
      <div onClick={Handle_close} ref={popup} className="popup comm_font">
        <div ref={popup_box} className="popup_box">
          <h3><span></span>Update Note Here<span><i onClick={() => { close() }} id="close_btn" className="fa-solid fa-xmark"></i></span></h3>
          <Form id={id} notedetail={notedetail} curdFunc={"updatenote"} submit_txt={"Update note"} />
        </div>
      </div>
      <header className='task_head'>
        <div className="right">
          <div className="user_icon">
            <Link to='/Profile'>
              <div className="image">
                <img className='user_icon' src={` ${userdetail && userdetail.avatar.length > 0 ? `/Upload_avatar/${userdetail.avatar}`:"https://cdn.picpng.com/computer/computer-user-icon-peolpe-58180.png" }`}alt="user_icon" />
              </div>
            </Link>
            <span className='Uname'>{userdetail && userdetail.fname}</span> 
          </div>
          <button onClick={Handle_logout} className='btn btn-primary'> <i className="fa-solid fa-power-off mx-1 "></i> Logout</button>
        </div>
      </header>

      <section className='container m_t_3'>
        <h2> <i className="fa-solid fa-note-sticky"></i> Add a new Note</h2>
        <Form notedetail={notedetail} curdFunc={"addnote"} submit_txt={"Add note"} />
      </section>

      <section className='container notes_data_table'>
        <Notes_table Deletenote={Deletenote} popup_up_box = { popup_up_box} notes = {notes}/>  
      </section>

    </>
  )
}

export default Todo_page
