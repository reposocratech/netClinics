import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {NetClinicsContext} from '../../../context/NetClinicsProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const AvailabilityMedic = () => {

  const {token, user} = useContext(NetClinicsContext);
  const [availability, setAvailability] = useState([]);
  const [listDailyHours, setListDailyHours] = useState([]);
  const [listAllDay, setListAllDay] = useState([]);

  const cellRef = useRef([]);

  useEffect(() => {
      axios
      .get(`http://localhost:4000/medic/getAvailability/12`)
      .then((res) => {
        console.log(res.data);
        setAvailability(res.data);
      })
      .catch((error) =>{
        console.log(error);
      })

      axios
      .get(`http://localhost:4000/time/getAllHours`)
      .then((res) => {
        console.log(res.data);
        setListDailyHours(res.data);
      })
      .catch((error) =>{
        console.log(error);
      })

      axios
      .get(`http://localhost:4000/time/getAllDays`)
      .then((res) => {
        console.log(res.data);
        setListAllDay(res.data);
      })
      .catch((error) =>{
        console.log(error);
      })

  }, []);

  /*
  const addExercise =(exer, index)=>{

    if ( divExer.current[index].style.backgroundColor === "white"){

      divExer.current[index].style.backgroundColor = "#929cbb"
      botonExer.current[index].textContent = "Deseleccionar"
      
    }else {
      divExer.current[index].style.backgroundColor = "white"
      botonExer.current[index].textContent = "Seleccionar"

     }
  }
  */

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell sx={{fontWeight: 'bold'}} align="center">Horas</TableCell>
              {listAllDay.map((el) => {
                return (
                  <TableCell sx={{fontWeight: 'bold'}} align="center">{el.day_name}</TableCell>
                )
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {listDailyHours?.map((hour, i) => {
            return(
            <TableRow
              key={hour.daily_hours_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  sx={{fontWeight: 'bold'}} align="center">{hour.daily_hours_time}</TableCell>
              {listAllDay.map((day, j) => {
                return (
                  //Cada campo detecta el id de la hora y el id del día
                  <TableCell onClick={()=> {cellRef.current[j] = `${hour.daily_hours_id}${day.day_id}`; console.log(cellRef.current[j]); cellRef.current[j].style.backgroundColor = "blue"}} ref={(e)=>{cellRef.current[j]= e}} sx={{fontWeight: 'bold'}} align="center">
                    {hour.daily_hours_id} {day.day_id} 
                    {/* {i} {j} */}

                  </TableCell>
                )
              })}
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
