import React, { useContext, useEffect, useState } from 'react'
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import { NetClinicsContext } from '../../context/NetClinicsProvider';

export const AvailabilityCell = ({availability, hour, day}) => {

    const [isAvailable, setIsAvailable] = useState(false);
    const {user} = useContext(NetClinicsContext);
    
    
    const onClickCell = (hourId, dayId) => {
        
        //guardo en un objeto el id de la hora y del dia que recibo en el onClick
        const body = {
            daily_hours_id:hourId,
            day_id:dayId
        }

        //realizo petición axios
        axios
        .post(`http://localhost:4000/medic/availabilities`, body)
        .then((res) =>{
            setIsAvailable(res.data.availability);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    useEffect(() => {

        //creo una función para comprobar si ya existe el id de la
        //hora y dia en la lista de disponibilidad de un médico
        const availabilityCell = (hoursId, dayId) => {
            return availability?.find((el) => {
              return el.daily_hours_id === hoursId && el.day_id === dayId;
            });
        };

        //con doble !! lo convierto a booleano
        setIsAvailable(!!availabilityCell(hour.daily_hours_id, day.day_id));

    }, [hour, day]);
    
  return (
    //Pinto el <td></td>
    <TableCell
        onClick={()=> onClickCell(hour.daily_hours_id, day.day_id)} 
        sx={{fontWeight: 'bold', 
        backgroundColor: isAvailable ? "green" : "#D1CAC8", cursor: 'pointer', border: "1px solid white",
        width: "10rem"
        }} 
        align="center">
    </TableCell>
  )
}
