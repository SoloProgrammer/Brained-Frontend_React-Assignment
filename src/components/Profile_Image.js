function Profile_image({HandleImageview,userdetail,handlecamera_click,viewref,Handle_change_image,Confirm}){

    function capitalize(name){
        return name.toUpperCase()
      }
    return (
        <div className="userprofile_box">
        <div className="left">
          <div className="background">
            <h1 className="user_name" style={{
              position: "absolute",
              right: "18px",
              top: "5px",
              color: "white"
              }}><i className="fa-solid fa-user-tie"></i> {userdetail && capitalize(userdetail.fname)}</h1>
          <div className="cover">
            <div className="image_box ">
              {userdetail.avatar !== "" && <img onClick={HandleImageview} src={`/Upload_avatar/${userdetail.avatar}`} alt="" />}
              {userdetail.avatar === "" && <img onClick={HandleImageview} src="https://cdn.picpng.com/computer/computer-user-icon-peolpe-58180.png" alt="" />}

            </div>
            <div onClick={handlecamera_click} className="camericon">
              <i className="fa-solid fa-camera"></i>
            </div>
            <div ref={viewref} className="update_view_image">
              <span className='icons'><i className="fa-solid fa-eye mx-2"></i>View image</span>
              <span onClick={Handle_change_image} className='icons'><i className="fa-solid fa-arrow-rotate-right mx-2"></i>change image</span>
              <span onClick={() => { Confirm(userdetail.avatar) }} className='icons'><i className="fa-solid fa-trash mx-2"></i>remove image</span>
              
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default Profile_image