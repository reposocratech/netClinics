import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FormEditUser } from '../../../components/Forms/FormEditUser/FormEditUser'
import { NetClinicsContext } from '../../../context/NetClinicsProvider'
import { useNavigate } from 'react-router-dom'

export const EditUser = () => {

  const {user, setUser, setResetPage, resetPage} = useContext(NetClinicsContext);
  const [editUser, setEditUser] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setEditUser(user);
}, [user]);

const handleChange = (e) =>{
  const {name, value} =e.target;
  setEditUser({...editUser, [name]:value})
};

const handleFile = (e) =>{
  console.log(e.target.files);
  setFile(e.target.files[0])
}

const onSubmit = (e) =>{
  e.preventDefault();
  const newFormData = new FormData();

  newFormData.append("file", file);
  newFormData.append("register", JSON.stringify(editUser));

  axios
      .put(`http://localhost:4000/patient/editPatient/${user.user_id}`, newFormData)
      .then((res)=>{
          setUser(editUser);
          setResetPage(!resetPage);
          navigate("/myProfile");
      })
      .catch((err)=>console.log(err))
}
  return (
    <div>
      <FormEditUser
      editUser={editUser}
      handleChange={handleChange}
      handleFile={handleFile}
      onSubmit={onSubmit}
      navigate={navigate}
      />
    </div>
  )
}


