import React, { useEffect, useState } from 'react';
import './recipeManager.css';
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
const Add_Update_Resipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipeName: '',
    tag: '',
    price: '',
    category: '',
    description: ''
  });
  const [dragActive, setDragActive] = useState(false);



  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('File dropped:', e.dataTransfer.files[0]);
    }
  };

  

  const handleCancel = () => {
    setFormData({
      recipeName: '',
      tag: '',
      price: '',
      category: '',
      description: ''
    });
    setShowForm(false);
  };
  
const location = useLocation();
  const { id } = useParams();
  const isEdit = location.pathname.startsWith('/MasterElement/Add_Update_Resipe/update/');
  const numericId = Number(id);
  if (isEdit) {
    console.log(numericId);
  }
let loction=useLocation()

let [tag,set_tag]=useState([]);
let FunTag = async () => {
  try {
    let res = await axios.get(
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

// End Tag
// start category 
  let[dataHmap, setDataHmap]=useState([])
let Fun_Cate_data=async ()=>{
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
    setDataHmap(res.data.data)
            console.log(res.data.data)       
    } 
    catch (error) {
        console.log('error',error)
    }
    }

// Effect
useEffect(()=>{
FunTag()
Fun_Cate_data()
},[])

// End category
//  start Append 
let Append=(data)=>{
  let form_data= new FormData();
  form_data.append('name', data?.name);
    form_data.append('price', data.price);
  form_data.append('description', data.description);
 form_data.append('tagId', data.tagId);
  form_data.append('categoriesIds', data.categoriesIds);
  form_data.append('recipeImage', data.recipeImage[0]); 
  return form_data;
}
let nav=useNavigate()
// End Append Yasta 
// start Add Resipe Yasta 
let { register, handleSubmit, formState: { errors } } = useForm();
 let SUpAddForm= async(data)=>{
let formData = Append(data);
try {
 let res = await axios.post(
  'https://upskilling-egypt.com:3006/api/v1/Recipe/',
  formData,
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    
    }
  }
  
);
  console.log(res);
  
  nav('/MasterElement/Resipe')
  toast.success('Recipe added successfully!');

} catch (error) {
 
  console.log(error)
}

 }
//End Add Resipe Yasta 
// Start Update Resipe Yasta
let SUpUpdateForm= async(data)=>{
let formData = Append(data);
try {
 let res = await axios.put(
  `https://upskilling-egypt.com:3006/api/v1/Recipe/${numericId}`,
  formData,
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  }
);
  console.log(res);
  
  nav('/MasterElement/Resipe')
  toast.success('Recipe added successfully!');

} catch (error) {
 
  console.log(error)
}

 }
 let item=location.state
 // End Update Resipe Yasta

  return (
    <div className="recipe-manager bg-success">
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="header-section">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="fill-recipes-title">
                    Fill the <span className="text-success">Recipes</span> !
                  </h2>
                  <p className="subtitle">
                    you can now fill the meals easily using the table and form ,<br />
                    click here and fill it with the table !
                  </p>
                </div>
                <div className="col-md-4 text-end">
                  <button className="btn  all-recipes-btn">
                    All Recipes <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Add New Item Section */}
            <div className="add-item-section">
              <div className="row">
                <div className="col-12">
                  <div className="add-item-header">
            {location.pathname === '/MasterElement/Add_Update_Resipe'
             ? <h4>Add New Item </h4>
           : <h4>Update Item {item.name}</h4>
}      {!showForm && (
                      <button 
                        className="btn  add-btn"
                        onClick={() => setShowForm(true)}
                      >
                       <FaPlus />{loction.pathname ==='/MasterElement/Add_Update_Resipe'? 'Add Recipe': 'Update Recipe'}  
                      </button>
                    )}
                  </div>
{/* FOOORm */}
                  {showForm && (
                    <div className="recipe-form-container">
                      <form onSubmit={handleSubmit(location.pathname==='/MasterElement/Add_Update_Resipe'?SUpAddForm:SUpUpdateForm)} className="recipe-form">
                        <div className="row g-2">
                          {/* Recipe Name */}
                          <div className="col-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="recipeName"
                                placeholder="Recipe Name"
                                // value={formData.recipeName}
                           {...register('name', { required: 'resipe name is required' })}

        />
              {errors.name && <p className="error-message d-flex  ">{errors.name.message}</p>}
                            </div>
                           
                          </div>

                          {/* Tag and Price Row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                className="form-select"
                                name="tag"
                                // value={formData.tag}
                                {...register('tagId', { required: 'resipe Tag is required' })}                       
                              >
                               
                      {tag?.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}                    
                              </select>
                              {errors.tagId && <p className="error-message d-flex  ">{errors.tagId.message}</p>}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="price-input-group">
                              <input
                                type="number"
                                className="form-control"
                                name="price"
                                placeholder="350.00"
                                step="0.01"
                                // value={formData.price}
                              {...register('price', { required: 'Price is required' })}
                              />
                              
                              <span className="price-currency">EGP</span>
                            </div>
                            {errors.price && <p className="error-message d-flex ">{errors.price.message}</p>}
                          </div>

                          {/* Category */}
                          <div className="col-12">
                            <div className="form-group">
                              <select
                                className="form-select"
                                name="category"
                                // value={formData.category}
                               {...register('categoriesIds', { required: 'Category id is required' })}
                              
                              >
                                
                            
                                    {dataHmap?.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}            
                              
                              </select>
                              {errors.categoriesIds && <p className="error-message d-flex  ">{errors.categoriesIds.message}</p>}
                            </div>
                          </div>

                          {/* Description */}
                          <div className="col-12">
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                name="description"
                                placeholder="Description *"
                                rows="4"
                                // value={formData.description}  
                                {...register('description', { required: 'description  name is required' })}
                              ></textarea>
                            </div>
                            {errors.description && <p className="error-message d-flex  ">{errors.description.message}</p>}
                          </div>

                          {/* File Upload Area */}
      <div className="col-12">
  <div 
    className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <div className="upload-content">
      <i className="fas fa-cloud-upload-alt upload-icon"></i>
      <p className="upload-text">
        Drag & Drop or <span className="text-success">Choose a file</span> image to Upload
      </p>
    </div>
    <input 
      type="file" 
      className="file-input" 
      accept="image/*"
      {...register('recipeImage', { required: 'recipeImage is required' })}
      onChange={(e) => {
        console.log('File selected:', e.target.files[0]);
      
      }}
    />
  </div>
  {errors.recipeImage && (
    <p className="error-message d-flex">
      {errors.recipeImage.message}
    </p>
  )}
</div>


                          {/* Action Buttons */}
                          <div className="col-12">
                            <div className="form-actions">
                              <button 
                                type="button" 
                                className="btn btn-outline-secondary cancel-btn"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit" 
                                className="btn btn-success save-btn"
                              >
                             {loction.pathname=== '/MasterElement/Add_Update_Resipe'? 'Save': 'Update '}   
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Update_Resipe;
