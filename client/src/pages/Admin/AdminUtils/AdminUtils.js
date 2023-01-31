import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const AdminUtils = () => {
  const [specialityName, setSpecialityName] = useState("")
  const [listSpeciality, setListSpeciality] = useState([]);
  const { resetPage, setResetPage } = useContext(NetClinicsContext);

  useEffect(() => {
    //Hago busqueda de todas las especialidades
    axios
    .get("http://localhost:4000/admin/getAllSpeciality")
    .then((res)=>{
      setListSpeciality(res.data);
    })
    .catch((error) =>{
      console.log(error);
    })
  }, [resetPage]);

  //Función para agregar la nueva especialidad
  const onSubmit = () =>{
    axios
    .post("http://localhost:4000/admin/createSpeciality", {specialityName:specialityName})
    .then((res)=>{
      setResetPage(!resetPage)
      setSpecialityName("")

    })
    .catch((error) =>{
      console.log(error);
    })
  };

  const handleChange = (e) =>{
    setSpecialityName(e.target.value);
  };
  
  return (
    <div>
      {/* Muestro todas las especialides actuales */}
      {listSpeciality && (
         <TableContainer component={Paper}>
         <h3 className="title text-center my-3">Especialidades</h3>
         <Table sx={{ minWidth: 390 }}>
           <TableHead>
             <TableRow>
               <TableCell align="center"><strong>Nombre especialidad</strong></TableCell>
             </TableRow>
           </TableHead>

           {/* Datos Tabla Especialidades */}
           <TableBody>
             {listSpeciality?.map((speciality) => (
               <TableRow
                 key={speciality.speciality_id}
               >
                 <TableCell align="center">{speciality.speciality_name}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
      )}
      {/* Campo para añadir una nueva especialidad */}
      <InputGroup className='mb-3'>
                <InputGroup.Text><i className=""></i></InputGroup.Text>
                <Form.Control
                placeholder='Introduzca nueva especialidad'
                name='speciality_name'
                type='text'
                autoComplete='off'
                aria-label='Nombre especialidad'
                aria-describedby="basic-addon1"
                value={specialityName}
                onChange={handleChange}
                required
                />
              </InputGroup>
              <button
                className='defineButton'
                onClick={onSubmit}
              >Guardar</button>
    </div>
  )
}


