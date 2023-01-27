import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { maxDatePicker } from '../../../Utils/maxDatePicker/maxDatePicker';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios';

export const SearchAvailabilityMedicAppointment = ({show, handleClose, medic}) => {

    const {user} = useContext(NetClinicsContext)

    const [pickerDateSelected, setPickerDateSelected] = useState();
    const [listAvailability, setListAvailability] = useState([]);
    const [listHoursDay, setListHoursDay] = useState([]);
    const [listAppointments, setListAppointments] = useState([]);

    // const [message, setMessage] = useState("");

    //segun la fecha seleccionada guardo el valor en pickerDateSelected
    //Ej. '2023-01-27'
    const datePickerChange = (e) => {
        setPickerDateSelected(e.target.value);
    }
    
    //useEffect con la dependencia pickerDateSelected 
    //Segun la fecha seleccionada saco el dia (1-7) de la semana que corresponda
    useEffect(() => {
        if(pickerDateSelected){
            
            const day_id = new Date(pickerDateSelected).getDay();

            axios
            .get(`http://localhost:4000/appointment/${medic.medic}/${day_id}`)
            .then((res) =>{
                setListAvailability(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });

        }
    }, [pickerDateSelected])

    //useEffect para traerme y setear todas las horas de un día
    useEffect(() => {
        axios
        .get("http://localhost:4000/time/getAllHours")
        .then((res) =>{
            setListHoursDay(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, [])
    
    //Función para buscar el nombre de la hora ej.: 11-12, 12-13...
    //Del array lista de horas del día, paso por parámetro un id de hora
    const findHour = (hour) => {
        return listHoursDay?.find((el)=> {
          if(el.daily_hours_id === hour){
              return el.daily_hours_time
          }
      })?.daily_hours_time;
    }
    
    //Compruebo el valor del select de la hora seleccionada
    const selectHour = (e) => {
        const hourId = e.target.value;
        console.log(hourId);
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Disponibilidad de {medic.name} {medic.lastname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className='mb-3'>
                <Form.Control
                name='date'
                min={maxDatePicker()}
                type='date'
                autoComplete='off'
                aria-label='text'
                aria-describedby="basic-addon1"
                onChange={datePickerChange}
                />
            </InputGroup>
            {listAvailability.length !== 0 &&
            <InputGroup className='mb-3'>
                <Form.Select onChange={selectHour}>
                    <option>Seleccione Hora</option>
                    {listAvailability?.map((el) => {
                        return <option value={el.daily_hours_id}>{findHour(el.daily_hours_id)}</option>
                    })}
                </Form.Select>
            </InputGroup>
            }
            {/* <h4 className='text-center text-danger'>{message}</h4> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Reservar Cita
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
