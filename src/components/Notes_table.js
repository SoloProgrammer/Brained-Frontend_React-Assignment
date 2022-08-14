import React from 'react'


const Notes_table = ({ notes,popup_up_box,Deletenote }) => {

  return (
    <table className="table table-striped">
      {notes.length === 0 && <h5 className='text-center'>Notes not found to display</h5> }
      {notes.length === 0 && <small className='text-center block'>LETS ADD YOUR FIRST NOTE</small> }
      <thead>
        {notes && notes.length > 0 && <tr>
          <th scope="col">#</th>
          <th scope="col">Note-Title</th>
          <th scope="col">Note-Description</th>
          <th scope="col">Note-Tag</th>
          <th scope="col">Actions</th>
        </tr>}
      </thead>
      <tbody>
        {notes.map((note, index) => {
          return <tr>
            <th scope="row">{index + 1}</th>
            <td>{note.title}</td>
            <td>{note.description}</td>
            <td>{note.tag}</td>
            <td className='action_btns'>
              <button onClick={()=>{popup_up_box(note)}} className='btn btn-primary mx-1'>Edit</button>
              <button onClick={()=>{Deletenote(note._id)}} className='btn btn-danger mx-1'>Delete</button>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default Notes_table
