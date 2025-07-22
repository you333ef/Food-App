import './resipe.css'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { View, Edit, Delete, MoreHorizontal, Heart } from 'lucide-react'
import Button from 'react-bootstrap/Button'
import deleteImg from '../../assets/Group 48102290.svg'
import image_Ehtyati from '../../assets/Rectangle 3463252.svg'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { AuthContext } from '../ConteXt'
import { IoIosHeartDislike } from "react-icons/io";
import { FaHeartBroken } from "react-icons/fa";

import { toast } from 'react-toastify'

const Resipe = () => {
  const { CurrentUser } = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const [actionId, setActionId] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedFav, setSelectedFav] = useState(null)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const navigate = useNavigate()
  const API_BASE = 'https://upskilling-egypt.com:3006'

  // Fetch paginated data
  const fetchData = async (page = 1) => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/v1/userRecipe?pageNumber=${page}&pageSize=${pageSize}`,
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      )
      const { data, totalNumberOfPages } = res.data
      setRecipes(data)
      setTotalPages(totalNumberOfPages)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData(pageNumber)
  }, [pageNumber])

  // Delete or Add to Favorite
  const confirmAction = async () => {
    try {
      if (CurrentUser === 'SuperAdmin') {
        await axios.delete(
          `${API_BASE}/api/v1/Recipe/${actionId}`,
          { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        )
        toast.success('Item deleted')
      } else {
        await axios.delete(
          `${API_BASE}/api/v1/userRecipe/${selectedFav.id}`,
      
          { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        )
        toast.success('Deleted from Favourite successfully!')
      }
      handleClose()
      fetchData(pageNumber)
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  // Render
  return (
    <div className="container py-4">
      {/* Modal */}
     <Modal
  show={show}
  onHide={handleClose}
  centered
  size="md"
  backdrop="static"
  keyboard={false}
>
  <Modal.Body className="position-relative text-center border-0 py-4">
    {/* زر الإغلاق */}
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
        border: '2px solid rgba(204, 0, 0, 1)',
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

    {/* أيقونة الحذف */}
    <img
      src={deleteImg}
      alt="Delete illustration"
      style={{ maxWidth: '200px', margin: '0 auto', display: 'block' }}
    />

    {/* العنوان */}
    <h5 className="mt-3 mb-2" style={{ fontWeight: 700 }}>
      Remove <span style={{ color: 'rgba(204, 0, 0, 1)' }}>{selectedFav?.recipe?.name}</span> from Favourite?
    </h5>

    {/* نص التوضيح */}
    <p className="text-muted mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.3' }}>
      Are you sure you want to remove this item from your favourites?
    </p>

    {/* زر التأكيد */}
    <Button
      variant="outline-danger"
      className="float-end me-2"
      onClick={confirmAction}
    >
      Remove
    </Button>
  </Modal.Body>
</Modal>

      {/* Table for desktop */}
      <div className="d-none d-md-block bg-white rounded shadow-sm border overflow-hidden">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th className="text-center">Price</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((item) => {
              const r = item.recipe
              return (
                <tr key={item.id}>
                  <td>{r.name}</td>
                  <td>
                    <img
                      src={r.imagePath ? `${API_BASE}/${r.imagePath}` : image_Ehtyati}
                      alt={r.name}
                      className="ImageWesha"
                    />
                  </td>
                  <td className="text-center">{r.price}</td>
                  <td>{r.description}</td>
                  <td>{r.category?.[0]?.name || '—'}</td>
                  <td className="text-end">
        <div className="dropdown">
  <button
    type="button"
    className="btn btn-sm btn-outline-secondary dropdown-toggle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <MoreHorizontal />
  </button>
  <ul className="dropdown-menu dropdown-menu-end">
    <li>
      <button
        className="dropdown-item"
        onClick={() => navigate(`/recipes/${item.id}`)}
      >
        <View /> View
      </button>
    </li>
    {CurrentUser === 'SuperAdmin' ? (
      <li>
        <button
          className="dropdown-item"
          onClick={() => { setActionId(item.id); handleShow() }}
        >
          <Delete /> Delete
        </button>
      </li>
    ) : (
      <li>
        <button
          className="dropdown-item"
          onClick={() => { setSelectedFav(item); handleShow() }}
        >
        <FaHeartBroken style={{fontSize:'20px',color:'red'}} className='ICON_REMOVE'/> remove
        </button>
      </li>
    )}
  </ul>
</div>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
       
      </div>
         <div className="d-md-none ">
              {recipes.map((item, index) => (
                 
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
                          <a className="dropdown-item" onClick={() => handleAction('view', item.id)}>
                            <View className="me-2 icon-16" /> View
                          </a>
                        </li>
         
                        <li>
        <button
          className="dropdown-item"
          onClick={() => { setSelectedFav(item); handleShow() }}
        >
        <FaHeartBroken style={{fontSize:'20px',color:'red'}} className='ICON_REMOVE'/> remove
        </button>
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
      src={item.recipe.imagePath ? `${API_BASE}/${item.recipe.imagePath}` : image_Ehtyati}
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
                      <span className="text-muted small">Category:</span>
                    </div>
                    <div className="col-6 text-end">
                      <span className="small text-dark">{item.recipe.price}$</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default Resipe
