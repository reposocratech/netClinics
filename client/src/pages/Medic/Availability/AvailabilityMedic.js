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
import { useParams } from 'react-router-dom';

import './availabilityMedic.scss'

export const AvailabilityMedic = () => {

  const {user_id} = useParams()

  const {token, user} = useContext(NetClinicsContext);
  const [availability, setAvailability] = useState([]);
  const [listDailyHours, setListDailyHours] = useState([]);
  const [listAllDay, setListAllDay] = useState([]);

  useEffect(() => {
      axios
      .get(`http://localhost:4000/medic/getAvailability/${user_id}`)
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

  const onClickCell = (i, j) => {
    console.log("esta es la hora", i, "del día", j);
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='w-75 my-5 -mb-5'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='bgThTable'>
              <TableRow>
                  <TableCell className='thContentTable' sx={{fontWeight: 'bold'}} align="center">Horas</TableCell>
                  {listAllDay.map((el, i) => {
                    return (
                      <TableCell className='thContentTable' key={el.day_id + i + el.day_id} sx={{fontWeight: 'bold'}} align="center">{el.day_name}</TableCell>
                    )
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {listDailyHours?.map((hour, i) => {
                return(
                <TableRow
                  key={hour.daily_hours_id + i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell  sx={{fontWeight: 'bold'}} align="center">{hour.daily_hours_time}</TableCell>
                  {listAllDay.map((day, j) => {
                    return (
                      //Cada campo detecta el id de la hora y el id del día
                      <TableCell
                        key={day.day_id + j}
                        onClick={()=> onClickCell(hour.daily_hours_id, day.day_id)} 
                        sx={{fontWeight: 'bold'}} 
                        align="center">
                          <span>
                            {availability?.map((el) => {
                                return (el.daily_hours_id === hour.daily_hours_id && el.day_id === day.day_id) && "Disponible";
                            })}
                            
                          </span>
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
    </div>
  )
}
