
import './resipe.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { View, Edit, Delete, MoreHorizontal,Heart  } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import deleteImg from '../../assets/Group 48102290.svg'
import { useForm } from 'react-hook-form';
import image_Ehtyati from '../../assets/Rectangle 3463252.svg'
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { AuthContext } from '../ConteXt';

import { FaHeartCirclePlus } from "react-icons/fa6";
import { toast } from 'react-toastify';

const Resipe = () => {
   let {CurrentUser,funCurrentUser}=useContext(AuthContext)
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
      `https://upskilling-egypt.com:3006/api/v1/Recipe/${Actionid}`,
      {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('token'),
         
        },
      }
    );
     handleClose();
     Fun_Cate_data(4, 1, saveName, saveTag, saveCate)
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
let Fun_Cate_data=async (padgeSize,padgeNumber,name,tagId,categoryId)=>{
  let encodeName=encodeURIComponent(name)
  let encodeTagId=encodeURIComponent(tagId)
  let encodeCategoryId=encodeURIComponent(categoryId)
  try {
 let res = await axios.get(
  `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${padgeSize}&pageNumber=${padgeNumber}&name=${encodeName}&tagId=${encodeTagId}&categoryId=${encodeCategoryId}`,
 
  {
    headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
}
}
);
  setDataHmap(res.data.data)
    setpagination(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1));
     
  } 
  catch (error) {
    console.log('error',error)
  }
    }
let URLConcattunation='https://upskilling-egypt.com:3006/'
let navi=useNavigate()
let NaviAdd_Update=()=>{
navi('/MasterElement/Add_Update_Resipe')
 window.location.reload()
}

let Navi_Update=(id)=>{
 
  // navi(`/MasterElement/Add_Update_Resipe/update/${id}`);
  window.location.reload()

 
}
let [saveFavourite,setsaveFavourite]=useState([])
let get_details=(dataFav)=>{
 setsaveFavourite(dataFav)
}


let HandleFavourite= async()=>{   
        try {
   const res = await axios.post(
    `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,{
        recipeId: saveFavourite.id
      },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       
      }
    }
  );
  console.log(res)
 
handleClose();
toast.success('Added to Favourite successfully!', {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
}catch (error) {
  
  toast.error( 'Failed to add to Favourite!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })


  

}

}
//  Tag Datalet
const [tag, set_tag] = useState([]);

let FunTag = async () => {
  try {
    let res =await axios.get(
      'https://upskilling-egypt.com:3006/api/v1/tag/',
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

  
  console.log('Fetched data:', res.data);
set_tag(res.data);
  } catch (error) {
    console.log('Error:', error);
  }
};
// Data id 
let [dataCate, setDataCate] = useState([]);
const fetchCategoryData = async () => {
  try {
    let res = await axios.get(
      'https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );
    setDataCate(res.data.data)
    console.log(res.data.data)       
  } 
  catch (error) {
    console.log('error',error)
  }
}

useEffect(()=>{
  fetchCategoryData()
FunTag()

        },[])
      let[saveName,setSaveName]=useState('')
    const GetName = e => {
  const v = e.target.value;
  setSaveName(v);
  Fun_Cate_data(4, 1, v,saveTag, saveCate);
};

         let[saveTag,setSaveTag]=useState('')
    const GetTag_value = e => {
  const v = e.target.value;
  setSaveTag(v);
  Fun_Cate_data(4, 1, saveName, v,saveCate);
};

        let[saveCate,setSaveCate]=useState('')
     const GetCate_value = e => {
  const v = e.target.value;
  setSaveCate(v);
  Fun_Cate_data(4, 1, saveName, saveTag, v);
};
  useEffect(() => {
       Fun_Cate_data(4, 1,'','');
  }, []);
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
                    {CurrentUser==='SuperAdmin' ?<h5 className="mt-3 mb-2 optiondelete" style={{fontWeight:'700'}}>Delete This User ?</h5>:<h5 className="mt-3 mb-2 optiondelete" style={{fontWeight:'700'}}>Add <span style={{color:' rgba(0, 146, 71, 1)'}}>{saveFavourite?.name}</span> To Favourite ?</h5>}
                {CurrentUser==='SuperAdmin'?             <p
                      className="text-muted mb-4"
                      style={{ fontSize: '0.9rem', lineHeight: '1.3' }}
                    >
                      are you sure you want to delete this item? if you are sure just<br />click
                      on delete it
                    </p>:             <p
                      className="text-muted mb-4"
                      style={{ fontSize: '0.9rem', lineHeight: '1.3' }}
                    >
                      are you sure you want to Add <span style={{color:' rgba(0, 146, 71, 1)'}}>{saveFavourite?.name}</span> ? if you are sure just<br />click
                      on Add To Favourite
                    </p>}   
       
            {CurrentUser==='SuperAdmin' ? <Button
                       variant="outline-danger"     
                    className='float-end me-2  btn-outline-danger'
                     onClick={()=>{
                      handleDelete()
                     }}
                    >
                      Delete this item
                    </Button>: <Button
                       variant="outline-danger"     
                    className='float-end me-2  btn-outline-danger'
                     onClick={()=>{
                     HandleFavourite()
                     }}
                    >
                      Add to Favourite
                    </Button>}
                   
                  </Modal.Body>
                </Modal>
            <div className="container-fluid py-3 OOP">
    <div className="row  align-items-center justify-content-between  oop3">
    <div className="col-auto">
    <h4 className="mb-1 CategoriesDetails">Recipes  Table Details</h4>
    <p className="mb-0 text-muted Youcheck">You can check all details</p>
    </div>
    <div className="col-auto">
    <button type="button" onClick={NaviAdd_Update} className="btn btn-success bootnYastaCate" >
    Add New Recipes 
        </button>
        </div>
      </div>
            </div>
    <div className="search-inputs-container row mt-4 container   gy-2 Hidden_in_res"> 
            <div className="col-12 col-lg-6">
        <input
          type="text"
          className="form-control custom-input search-input"
          placeholder="Search here ..."
          onChange={GetName}
        
        />
            </div>
            <div className="col-12 col-lg-3 Hidden_in_res">
        <select className="form-select custom-input"onChange={GetTag_value}>
          {tag?.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}     
        </select>
            </div>  
            <div className="col-12 col-lg-3 Hidden_in_res">
        <select className="form-select custom-input" onChange={GetCate_value} >
          <option  disabled selected >Category</option>
            {dataCate?.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}   
        </select>
      </div>
    </div>
    
       <div className="container py-4"> 
      <div className="d-none d-md-block">
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          <table className="table table-hover mb-0">
            <thead className="table-light border-bottom">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th className="text-center date-col">Price</th>
                <th>Description</th>
                    <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            {dataHmap.map((item,index)=>{
              return(
 <tbody  key={index}>
              <tr className="custom-table-row bg-white">
                <td>
                  <div className="d-flex align-items-center gap-2">                
                    <span className='Namme text-center m-auto d-block'>{item.name}</span>               
                  </div>
                </td>
            {item.imagePath !== null && item.imagePath !== '' ? (
  <td>
              <img src={`${URLConcattunation}${item.imagePath}`} alt="Not Found" className='ImageWesha' />
            </td>
            ): <td><img src={image_Ehtyati} alt="Not Found" className='ImageWesha ' /></td> }         
                <td className="text-muted">{item.price}</td>
                <td> {item.description}</td>
                <td>{item.category?.[0]?.name || '—'}</td>
                

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
          {CurrentUser ==='SuperAdmin' ?   
          <li>
          <a className="dropdown-item" onClick={()=>{   
                                             
          navi(`/MasterElement/Add_Update_Resipe/update/${item.id}`,{state:item});
                        }} >
          <Edit className="me-2 icon-16" /> Edit
          </a>
          </li>
                      :
            <li>
          <a className="dropdown-item" onClick={()=>{
              handleShow();
           get_details(item)

          }}  >
          <Heart  className="me-2 icon-16 " />Fav
          </a>
          </li> 
                      
                      }       
            {CurrentUser=='SuperAdmin' ?
                        <li>
                        <a className="dropdown-item text-danger" onClick={() => {
                        handleAction(item.id);  
                        handleShow();
                       }}>
                      <Delete className="me-2 icon-16"  /> Delete
                                      </a>
                        </li> :
                        ''}
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
  {pagination.map(pagi => (
  <Pagination.Item
    key={pagi}
    onClick={() => Fun_Cate_data(4, pagi, saveName, saveTag, saveCate)}
  >
    {pagi}
  </Pagination.Item>
))}
      <Pagination.Next />
      <Pagination.Last />
                  </Pagination>
      </div>
   
      <div className="d-md-none ">
        {dataHmap.map((item, index) => (
          <div key={index} className="bg-white rounded shadow-sm border p-3 custom-card mb-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center gap-2">
                <h3 className="h6 fw-medium text-dark mb-0">{item.name}</h3>
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
          <li>
          <a className="dropdown-item" onClick={()=>{
          handleShow();
          get_details(item)
          }}  >
          <Heart  className="me-2 icon-16 " />Fav
          </a>
          </li> 
          </li>
          <li>
          <a className="dropdown-item" onClick={() => handleAction('edit', item.id)}>
          <Edit className="me-2 icon-16" /> Edit
          </a>
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
    <div className="row mb-2">
      <div className="col-6 d-flex align-items-center">
        <span className="text-muted small">Image:</span>
      </div>
      <div className="col-6 d-flex justify-content-end align-items-center">
        <img
          className="ImageWesha"
          src={item?.recipe?.imagePath ? `${API_BASE}/${item.recipe.imagePath}` : image_Ehtyati}
          alt=""
        />
      </div>
    </div>
            <div className="row mb-2">
              <div className="col-6">
                <span className="text-muted small">ID:</span>
              </div>
              <div className="col-6 text-end">
                <span className="small text-muted">{item.id}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <span className="text-muted small">Description</span>
              </div>
              <div className="col-6 text-end">
                <span className="small text-dark">{item.description}</span>
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
  {pagination.map(pagi => (
    <Pagination.Item
      key={pagi}
      onClick={() => Fun_Cate_data(4, pagi, saveName, saveTag, saveCate)}
    >
      {pagi}
    </Pagination.Item>
  ))}
  <Pagination.Next />
  <Pagination.Last />
</Pagination>
    </div>
    </div>
  )}   
export default Resipe