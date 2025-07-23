import React, { useEffect, useState } from 'react';
import { View, Edit, Delete, MoreHorizontal } from 'lucide-react';
import './cate.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import deleteImg from '../../assets/Group 48102290.svg';
import { useForm } from 'react-hook-form';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoriseList = () => {
  let [Actionid, setActionid] = useState();
  const handleAction = (productId) => {
    setActionid(productId);
  };

  let [dataHmap, setDataHmap] = useState([]);
  let [pagination, setpagination] = useState([]);

  let Fun_Cate_data = async (pageSize, pageNumber, name = '') => {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}&name=${name}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );
      setDataHmap(res.data.data);
      setpagination(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Fun_Cate_data(5, 1, ''); // جلب الصفحة الأولى بدون بحث
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${Actionid}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      handleClose();
      Fun_Cate_data(5, 1, ''); // جلب الصفحة الأولى بعد الحذف
    } catch (error) {
      console.log('Status:', error.response?.status);
      console.log('Body  :', error.response?.data);
      console.log('Actionid :', Actionid);
    }
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  let { register, handleSubmit, formState: { errors } } = useForm();

  let FunAdd = async (data) => {
    try {
      let res = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("تم الإضافة:", res.data);
      handleCloseAdd();
      Fun_Cate_data(5, 1, ''); // جلب الصفحة الأولى بعد الإضافة
    } catch (error) {
      console.log("error", error);
    }
  };

  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const handleCloseUpdate = () => setShowUpdate(false);

  let FunUpdate = async (data) => {
    try {
      const res = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${Actionid}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("تم التعديل:", res.data);
      handleCloseUpdate();
      Fun_Cate_data(5, 1, ''); // جلب الصفحة الأولى بعد التحديث
    } catch (error) {
      console.log("error", error);
    }
  };

  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    Fun_Cate_data(5, 1, e.target.value); // بحث في الصفحة الأولى
    console.log('Search input:', e.target.value);
  };

  return (
    <div className="CategoriseList_container">
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
            ×
          </button>
          <img
            src={deleteImg}
            alt="Delete illustration"
            style={{ maxWidth: '200px ', margin: '0 auto', display: 'block' }}
          />
          <h5 className="mt-3 mb-2 optiondelete" style={{ fontWeight: '700' }}>Delete This User ?</h5>
          <p
            className="text-muted mb-4"
            style={{ fontSize: '0.9rem', lineHeight: '1.3' }}
          >
            are you sure you want to delete this item? if you are sure just<br />click
            on delete it
          </p>
          <Button
            variant="outline-danger"
            className="float-end me-2 btn-outline-danger"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete this item
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'rgba(73, 73, 73, 1)', fontSize: '20px', fontWeight: 700 }}>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(FunAdd)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Category Name"
                autoFocus
                {...register('name', {
                  required: 'Category name is required',
                })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                style={{
                  color: "#fff",
                  background: "rgba(0, 146, 71, 1)",
                  padding: "6px 20px",
                  outline: "none",
                  border: "none",
                  fontWeight: 600,
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <React.Fragment>
        <Modal show={showUpdate} onHide={handleCloseUpdate} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: 'rgba(73, 73, 73, 1)', fontSize: '20px', fontWeight: 700 }}>
              Update the element
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(FunUpdate)}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Update Name"
                  autoFocus
                  {...register('name', {
                    required: 'Category name is required',
                  })}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "rgba(0, 146, 71, 1)",
                    padding: "6px 20px",
                    outline: "none",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  Save
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>

      <div>
        <div className="container-fluid py-3 OOP">
          <div className="row align-items-center justify-content-between oop3">
            <div className="col-auto">
              <h4 className="mb-1 CategoriesDetails">Categories Table Details</h4>
              <p className="mb-0 text-muted Youcheck">You can check all details</p>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-success bootnYastaCate" onClick={handleShowAdd}>
                Add New Category
              </button>
            </div>
          </div>
        </div>
        <div className="cont-ba7th">
          <div className="wrap-ba7th">
            <input
              type="text"
              className="in-ba7th"
              placeholder="Search by name"
              value={value}
              onChange={handleChange}
            />
            <div className="icon-ba7th">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
        <div className="container py-4">
          <div className="d-none d-md-block">
            <div className="bg-white rounded shadow-sm border overflow-hidden">
              <table className="table table-hover mb-0">
                <thead className="table-light border-bottom">
                  <tr>
                    <th>Name</th>
                    <th>id</th>
                    <th className="text-center date-col">Date</th>
                    <th>Category</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHmap.length > 0 ? (
                    dataHmap.map((item, index) => (
                      <tr key={index} className="custom-table-row bg-white">
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="Namme text-center m-auto d-block">{item.name}</span>
                          </div>
                        </td>
                        <td>{item.id}</td>
                        <td className="text-muted">{item.creationDate}</td>
                        <td>Modern</td>
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
                                <a className="dropdown-item" onClick={() => handleAction('view', item.id)}>
                                  <View className="me-2 icon-16" /> View
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleAction(item.id);
                                    handleShowUpdate();
                                  }}
                                >
                                  <Edit className="me-2 icon-16" /> Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  onClick={() => {
                                    handleAction(item.id);
                                    handleShow();
                                  }}
                                >
                                  <Delete className="me-2 icon-16" /> Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        لا توجد بيانات متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination className="d-block mt-4 mb-0 d-md-flex justify-content-center align-items-center paginatinLap">
            <Pagination.First />
            <Pagination.Prev />
            {pagination.map((pagi) => (
              <Pagination.Item key={pagi} onClick={() => Fun_Cate_data(5, pagi, value)}>
                {pagi}
              </Pagination.Item>
            ))}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>

          <div className="d-md-none">
            {dataHmap.length > 0 ? (
              dataHmap.map((item, index) => (
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
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              handleAction(item.id);
                              handleShowUpdate();
                            }}
                          >
                            <Edit className="me-2 icon-16" /> Edit
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item text-danger"
                            onClick={() => {
                              handleAction(item.id);
                              handleShow();
                            }}
                          >
                            <Delete className="me-2 icon-16" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <span className="text-muted small">Date:</span>
                    </div>
                    <div className="col-6 text-end">
                      <span className="fw-medium small text-dark">{item.creationDate}</span>
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
                      <span className="small text-dark">Modern</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">لا توجد بيانات متاحة</div>
            )}
          </div>
          <Pagination className="d-flex flex-wrap justify-content-center align-items-center mt-4 mb-0 paginatin_Mapile_Tap">
            <Pagination.First />
            <Pagination.Prev />
            {pagination.map((pagi) => (
              <Pagination.Item key={pagi} onClick={() => Fun_Cate_data(5, pagi, value)}>
                {pagi}
              </Pagination.Item>
            ))}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default CategoriseList;