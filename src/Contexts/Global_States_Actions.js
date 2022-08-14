import { useState } from 'react'
import { toast } from 'react-toastify';

import globalcontext from './globalcontext'

const Global_States_Actions = (props) => {

  const [btn_load, setbtn_load] = useState(false)

  const [load, setload] = useState(false)

  function Toast_success(msg) {
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
  const authenticate = async (credentials) => {
    const res = await fetch('/api/auth_user', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ ...credentials })
    })
    return res
  }


  const Sign_up = async (data) => {

    const res = await fetch('/api/create_user',
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })

    return res;
  }

  const [userdetail, setuserdetail] = useState("")

  const getuser_detail = async () => {
    const res = await fetch(`/api/getuser`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    })

    const json = await res.json()

    setuserdetail(json.user)

    setTimeout(() => {
      setload(false)
    }, 200);

  }

  const update_profile_image = async (image_form) => {

    setload(true)
    const res = await fetch(`/api/updateProfile/${userdetail.avatar.length > 0 ? userdetail.avatar : "new_avatar"}`,
      {
        method: 'PUT',
        headers: {
          'auth-token': localStorage.getItem("token")
        },
        body: image_form
      })

    const json = await res.json()
    if (json.success) {
      getuser_detail()
      setTimeout(() => {
        Toast_success("Profile avatar has been changed")
      }, 100);
    }

  }

  const update_profile_data = async (updated_data) => {

    console.log(updated_data);

    setload(true)
    const res = await fetch(`/api/updateProfile/new_avatar`,
      {
        method: 'PUT',
        headers: {
          'Content-type': "application/json",
          'auth-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ ...updated_data })
      })

    const json = await res.json()
    if (json.success) {
      getuser_detail()
      setTimeout(() => {
        Toast_success(json.message)
      }, 100);
    }

  }
  const delete_profile_image = async (current_avatar) => {
    setload(true)
    const res = await fetch(`/api/removeAvatar/${current_avatar}`,
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      })

    const json = await res.json()

    if (json.success) {
      getuser_detail()
      setTimeout(() => {
        Toast_success(json.message)
      }, 100);
    }
    else console.log(json.error)
  }

  return (
    <globalcontext.Provider value={{ update_profile_data, update_profile_image, delete_profile_image, load, getuser_detail, setuserdetail, userdetail, btn_load, setbtn_load, userdetail, authenticate, Sign_up }}>
      {props.children}
    </globalcontext.Provider>
  )
}

export default Global_States_Actions
