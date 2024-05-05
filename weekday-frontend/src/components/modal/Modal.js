import React from 'react';
import "./modal.css";

const Modal = ({data,setShowModal}) => {
  return (
    <>
    <div className='overlay' onClick={() => setShowModal(false)} />
    <div className='modal'>{data}</div>
    </>
  )
}

export default Modal