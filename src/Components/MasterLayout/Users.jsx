
import './resipe.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { View, Edit, Delete, MoreHorizontal } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import deleteImg from '../../assets/Group 48102290.svg'
import { useForm } from 'react-hook-form';
import Pagination from 'react-bootstrap/Pagination';

import image_Ehtyati from '../../assets/image (2).jpg'
const Users = () => {
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
// Delete Things
  let [Actionid, setActionid] = useState();
  const handleAction = (productId) => {
 setActionid(productId)
  };
   let  handleDelete= async()=>{
  try {
     const res = await axios.delete(
      `https://upskilling-egypt.com:3006/api/v1/Users/${Actionid}`,
      {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('token'),
         
        },
      }
    );
     handleClose();
     Fun_Cate_data()
  } catch (error) {
   
      console.log('Status:', error.response?.status);
    console.log('Body  :', error.response?.data);
     console.log('Actionid :', Actionid)
  }
    }
// End Delete 
// Start Create Data
let [pagination,setpagination]=useState([])
let[dataHmap, setDataHmap]=useState([])
let Fun_Cate_data=async (padgeSize,padgeNumber)=>{
  try {
 let res = await axios.get(
  `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${padgeSize}&pageNumber=${padgeNumber}`,
  {
    headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
}
}
);
  setDataHmap(res.data.data)
  setpagination(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1));
  console.log(res.data.data)       
  } 
  catch (error) {
    console.log('error',error)
  }
    }
useEffect(()=>{
Fun_Cate_data()
},[])
let URLConcattunation='https://upskilling-egypt.com:3006/'




  return (
    <div>
                <Modal
                  show={show}
                  onHide={handleClose}
                  centered
                  size="md"
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Body className="position-relative text-center border-0 py-4">
                  <button
                  type="button"
                  onClick={handleClose}
                  style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid rgba(204, 0, 0, 1) ',
                        background: 'white',
                        color: 'rgba(204, 0, 0, 1)',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        lineHeight: '1',
                        cursor: 'pointer',
                      }}
                    >
                      &times;
                    </button>
            
                  
                    <img
                      src={deleteImg}
                      alt="Delete illustration"
                      style={{maxWidth: '200px ', margin: '0 auto', display: 'block' }}
                    />
                    <h5 className="mt-3 mb-2 optiondelete" style={{fontWeight:'700'}}>Delete This User ?</h5>
                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: '0.9rem', lineHeight: '1.3' }}
                    >
                      are you sure you want to delete this item? if you are sure just<br />click
                      on delete it
                    </p>
            
                    <Button
                       variant="outline-danger"     
                    className='float-end me-2  btn-outline-danger'
                     onClick={()=>{
                      handleDelete()
                     }}
                    >
                      Delete this item
                    </Button>
                  </Modal.Body>
                </Modal>
            {/* Top Corner under header */}
              <div className="container-fluid  py-3 OOP">
          <div className="row  align-items-center justify-content-between  oop3">
          <div className="col-auto">
          <h4 className="mb-1 CategoriesDetails">Users Table Details</h4>
          <p className="mb-0 text-muted Youcheck">You can check all details</p>
          </div>
          <div className="col-auto">

         
              </div>
            </div>
          </div>
          {/* End Top Corner under header */}
          {/* Start Taple */}
   <div className="container py-4"> 
      <div className="d-none d-md-block">
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          <table className="table table-hover mb-0">
            <thead className="table-light border-bottom">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th className="text-center date-col">Phone Number</th>
              
                <th>Email</th>
                 
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            {dataHmap.map((item,index)=>{
              return(
 <tbody  key={index}>
              <tr className="custom-table-row bg-white">
                <td>
                  <div className="d-flex align-items-center gap-2">
                   
                  
                    <span className='Namme text-center m-auto d-block'>{item.userName}</span>
                    
                  </div>
                </td>
                 {item.imagePath !== null && item.imagePath !== '' ? (
                    <td>
              <img src={`${URLConcattunation}${item.imagePath}`} alt="Not Found" className='ImageWesha' />
            </td>
            ): <td><img src={image_Ehtyati} alt="Not Found" className='ImageWesha ' /></td> }         
           

                <td className="text-muted">{item.phoneNumber}</td>
                <td> {item.email}</td>
               
              
                <td>
                 
                  <div className="dropdown text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="actionMenu"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <MoreHorizontal className="icon-16" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="actionMenu">
                      <li>
                        <a className="dropdown-item" onClick={() => handleAction('view', 1)}>
                          <View className="me-2 icon-16" /> View
                        </a>
                      </li>
                      <li>
                      
                      </li>
                      <li>
                        <a className="dropdown-item text-danger"onClick={() => {
                        handleAction(item.id);  
                        handleShow();
                       }}>
                        <Delete className="me-2 icon-16"/> Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
              )
 
            })}
          
          </table>
        </div>
                   <Pagination  className='d-block  mt-4 mb-0 d-md-flex justify-content-center align-items-center paginatinLap'>
      <Pagination.First />
      <Pagination.Prev />
  {pagination.slice(0,5).map(pagi => (
  <Pagination.Item
    key={pagi}
    onClick={() => Fun_Cate_data(5, pagi)}
  >
    {pagi}
  </Pagination.Item>
))}
      <Pagination.Next />
      <Pagination.Last />
                  </Pagination>
      </div>
   
   {/* Mopile */}
      <div className="d-md-none ">
        {dataHmap.map((item, index) => (
          <div key={index} className="bg-white rounded shadow-sm border p-3 custom-card mb-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center gap-2">
                <h3 className="h6 fw-medium text-dark mb-0">{item.userName}</h3>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                  type="button"
                  id={`mobileActionMenu${index}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreHorizontal className="icon-16" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`mobileActionMenu${index}`}>
                  <li>
                    <a className="dropdown-item" onClick={() => handleAction('view', item.id)}>
                      <View className="me-2 icon-16" /> View
                    </a>
                  </li>
                  <li>
                   
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" onClick={() => {
    handleAction(item.id);  
    handleShow();
  }}  >
                      <Delete className="me-2 icon-16" /> Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mb-2 d-flex align-items-center">
              <div className="col-6">
                <span className="text-muted small">Image:</span>
              </div>
              <div className="col-6 text-end">
                    {item.imagePath !== null && item.imagePath !== '' ? (
  <span>
              <img src={`${URLConcattunation}${item.imagePath}`} alt="Not Found" className='ImageWesha' />
            </span>
            ): <span><img src={image_Ehtyati} alt="Not Found" className='ImageWesha ' /></span> }         
           

              </div>
            </div>
            <div className="row mb-2 ">
              <div className="col-6">
                <span className="text-muted small">Email</span>
              </div>
              <div className="col-6 text-end text-break">
                <span className="small text-muted  ">    {item.email.length > 0
      ? item.email.slice(0, -7) + '@'
      : '@'}
</span>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <span className="text-muted small text-break">Phone:</span>
              </div>
              <div className="col-6 text-end">
                
                <span className="small text-dark">{item.phoneNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
 <Pagination
  className="d-flex flex-wrap justify-content-center align-items-center mt-4 mb-0 paginatin_Mapile_Tap "
>
  <Pagination.First />
  <Pagination.Prev />
  {pagination.slice(0,5).map(pagi => (
    <Pagination.Item
      key={pagi}
      onClick={() => Fun_Cate_data(5, pagi)}
    >
      {pagi}
    </Pagination.Item>
  ))}
  <Pagination.Next />
  <Pagination.Last />
</Pagination>
    </div>
          {/* End Taple Mopile */}
    </div>
  )
}

export default Users