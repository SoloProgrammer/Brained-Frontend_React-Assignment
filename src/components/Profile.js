import React, { useDebugValue } from 'react'
import { useEffect, useState, useContext, useRef } from 'react'
import globalcontext from '../Contexts/globalcontext'
import Loading from '../Utils/Loading'
import Profile_Image from '../components/Profile_Image'
import { toast } from 'react-toastify';


const Profile = () => {

  const viewref = useRef()
  const dark = useRef()
  const h3 = useRef()
  const image_btn = useRef()
  const file_inpt = useRef()

  const Gstate = useContext(globalcontext)

  const { update_profile_image, update_profile_data, setuserdetail, delete_profile_image, getuser_detail, userdetail, load } = Gstate

  function Toast_Error(msg){
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

  useEffect(() => {
    getuser_detail()
  }, [])

  const HandleImageview = () => {

  }


  const handlecamera_click = () => {
    console.log("iyg")
    if (userdetail.avatar === "") {
      dark.current.classList.toggle('none')
      image_btn.current.innerText = "Upload now"
    }
    else {
      viewref.current.classList.toggle('scale_1')
    }

  }

  const Handle_change_image = () => {
    dark.current.classList.toggle('none')
    viewref.current.classList.toggle('scale_1')
    h3.current.innerText = "Change"
    image_btn.current.innerText = "save +"
  }

  const [imagefile, setimage_file] = useState({
    file: ""
  })
  const [file, setFile] = useState("");
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setimage_file({
      file: e.target.files[0]
    })
  }

  const upload_image = () => {

    if (file.length > 0) {
      const Form = new FormData();

      dark.current.classList.add('none')

      Form.append('avatar', imagefile.file)

      update_profile_image(Form);

      setFile("")
      file_inpt.current.value = ""

      return
    }

    console.log("plz choose one image file")
    Toast_Error("plz choose atleast one image file")
    Handle_cancel()
  }

  const Confirm = (avatar) => {
    const sure = window.confirm("Are you sure you want to permanently remove your profile image");
    console.log(sure)
    if (!sure) return

    viewref.current.classList.toggle('scale_1')
    h3.current.innerText = "Upload new"
    setFile("")
    file_inpt.current.value = ""
    delete_profile_image(avatar)
  }

  function Handle_cancel() {
    dark.current.classList.toggle('none')
    setFile("")
    file_inpt.current.value = ""
  }

  const Get_date = (isodate) => {
    const newdate = new Date(isodate)
    return String(newdate).slice(0, 11)
  }


  const Handle_change_inpt = (e) => {
    setuserdetail({ ...userdetail, [e.target.name]: e.target.value })
  }
  const [isEdit, setisEdit] = useState(false)

  const Handle_Edit_access = () => {
    setisEdit(true)
    setTimeout(() => document.getElementById('fname').focus(), 0);
  }

  const Handle_save = () => {

    const { avatar, _id, updatedAt, createdAt, ...rest } = userdetail

    if (userdetail.fname.length < 1) {
      return Toast_Error("Name should not blank")
    }
    if (userdetail.email.length < 1) {
      return Toast_Error("Email is manditory")
    }

    update_profile_data(rest)
    setisEdit(false)

  }
  return (
    <>
      {load && <Loading />}
      <div ref={dark} className="dark_wall none">
        <div className="image_uploadbox">
          <h3 className='text-center'> <span ref={h3}>Upload new</span>  profile <span><img className='mini' src="https://cdn.picpng.com/computer/computer-user-icon-peolpe-58180.png" alt="upload avatar here" /></span> image </h3>
          {file.length > 0 && <div className="preview_box">
            <img className='preview_image' src={file} alt="" />
          </div>}
          {
            userdetail.avatar && !file.length > 0 && <div className="preview_box">
              <img className='preview_image' src={`/Upload_avatar/${userdetail.avatar}`} alt="" />
            </div>
          }
          <div className="bottom">
            <input ref={file_inpt} type="file" onChange={handleChange} />
          </div>
          <div className="upds_btns">
            <button ref={image_btn} onClick={upload_image} className='common_btn width_full'>Upload now</button>
            <button onClick={() => { Handle_cancel() }} className='my-2 common_btn width_full can_btn'>cancel</button>
          </div>
        </div>
      </div>

      <div className="dark_wall none ">
        <img className='preview_image' src={`/Upload_avatar/${userdetail.avatar}`} alt="" />
      </div>

      <Profile_Image HandleImageview={HandleImageview} userdetail={userdetail} handlecamera_click={handlecamera_click} viewref={viewref} Handle_change_image={Handle_change_image} Confirm={Confirm} />

      <div className="User_detailed_info m_t_7">
        {!isEdit && <button onClick={Handle_Edit_access} className='common_btn action_btn'> <span><i className='fa-solid fa-pen mx-1'></i></span> Edit Access</button>}
        {isEdit && <div className="save_cancel_btn action_btn">
          <button onClick={Handle_save} className='common_btn '> <span><i className="fa-solid fa-cloud-arrow-up mx-1 "></i></span> Save</button>

          <button onClick={() => { setisEdit(false) }} className='common_btn can_btn '> <span><i className="fa-solid fa-xmark  mx-1 "></i></span> Cancel</button>
        </div>}

        <div className="info_box flex-center">
          <div className="left_info">

            <div className="inputbox">
              <label htmlFor="fname">Fullname</label>
              <input disabled={!isEdit} className='user_info' onChange={Handle_change_inpt} value={userdetail.fname} type="text" id='fname' name='fname' />
            </div>
            <div className="inputbox ">
              <label htmlFor="Email">Provided Email</label>
              <input disabled={!isEdit} value={userdetail.email} onChange={Handle_change_inpt} className='user_info' type="text" id='Email' name='email' />
            </div>
            <div className="inputbox ">
              <label htmlFor="fname">Joined</label>
              <span style={{ background: "#baffba" }} className='user_info'>{Get_date(userdetail.createdAt)}</span>
            </div>
            <div className="inputbox">
              <label htmlFor="fname">Profession</label>
              <input disabled={!isEdit} value={userdetail.profession} onChange={Handle_change_inpt} className='user_info' type="text" id='profession' name='profession' />
            </div>
          </div>
          <div className="right_info">
            {userdetail && userdetail.about.length < 1 ? <label htmlFor="about">Lets tell us About Something</label>
              : <label htmlFor="about">About</label>}
            <textarea disabled={!isEdit} value={userdetail.about} onChange={Handle_change_inpt} name="about" id="about" cols="40" rows="7"></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
