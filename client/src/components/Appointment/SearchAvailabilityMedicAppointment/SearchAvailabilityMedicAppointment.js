import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { maxDatePicker } from '../../../Utils/maxDatePicker/maxDatePicker';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios';

import './searchavailabilitymedic.scss'

export const SearchAvailabilityMedicAppointment = ({handleShowAvailability, setHandleShowAvailability,setShowToast}) => {

    const {user} = useContext(NetClinicsContext);

    const [pickerDateSelected, setPickerDateSelected] = useState();
    const [listAvailability, setListAvailability] = useState([]);
    const [listHoursDay, setListHoursDay] = useState([]);
    const [idSelectHour, setIdSelectHour] = useState();
    const [appointmentCommentary, setAppointmentCommentary] = useState("");

    const [message, setMessage] = useState("");


    const nameLastNameMedic = {name: handleShowAvailability.medic.name, lastname: handleShowAvailability.medic.lastname};


    //segun la fecha seleccionada guardo el valor en pickerDateSelected
    //Ej. '2023-01-27'
    const datePickerChange = (e) => {
        setPickerDateSelected(e.target.value);   
    }
    
    //useEffect con la dependencia pickerDateSelected 
    //Segun la fecha seleccionada saco el dia (1-7) de la semana que corresponda
    useEffect(() => {
        if(pickerDateSelected){
            setMessage("");
            setListAvailability([]);

            const day_id = new Date(pickerDateSelected).getDay();
            
            axios
            .get(`http://localhost:4000/appointment/${handleShowAvailability.medic.medic}/${day_id}/${pickerDateSelected}`)
            .then((res) =>{
                console.log(res.data);
                if(res.data.length !== 0){
                    setListAvailability(res.data);
                }
                else{
                    setMessage("No hay citas disponible");
                } 
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
        setIdSelectHour(e.target.value);
    }

    //Voy guardando el valor del comentario que introduzca sobre la cita
    const handleChange = (e) => {
        setMessage("");
        setAppointmentCommentary(e.target.value);
    }

    //Reservo cita
    const onSubmit = () => {

        if(listAvailability.length !== 0 && appointmentCommentary.length <= 250){
            //Compruebo si el médico tiene disponibilidad
            const addAppointment = {
                medic_id: handleShowAvailability.medic.medic,
                patient_id: user.user_id,
                date: pickerDateSelected,
                daily_hours_id: parseInt(idSelectHour),
                day_id: parseInt(new Date(pickerDateSelected).getDay()),
                appointment_time: findHour(parseInt(idSelectHour)),
                appointment_commentary: appointmentCommentary
            }

            axios
            .post("http://localhost:4000/appointment", addAppointment)
            .then((res) => {
                //Seteo el estado showToast con la cita cogida, el nombre medico
                //y el apellido medico, para llevarme esa info a la ventana
                //anterior y mostrar un cartel con la cita cogida y nombre medico
                setShowToast({
                        open: true, 
                        appointment: addAppointment, 
                        medicName: nameLastNameMedic.name,
                        medicLastName: nameLastNameMedic.lastname,
                });
                
                
                //Envío email al médico con los datos del paciente y la cita
                const sendEmailData = {
                    appointment: addAppointment,
                    medic: handleShowAvailability.medic,
                    patient: user
                }
                
                sendEmailMedic(sendEmailData);


                //Cierro la modal con el estado open a false y vacío los datos 
                //del médico
                setHandleShowAvailability({open:false, medic: null});

            })
            .catch((err) => {
                console.log(err);
            });
        }
        else{
            setMessage("El comentario debe tener una longitud de 250 caracteres");
        }

    }

    //Envio correo al médico con la cita generada
    const sendEmailMedic = (data) => {
        axios
        .post("http://localhost:4000/appointment/newAppointment", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

  return (
    <Modal show={handleShowAvailability.open} onHide={()=>setHandleShowAvailability({open:false, medic: null})}>
        <Modal.Header closeButton>
          <Modal.Title>Disponibilidad de {handleShowAvailability.medic.name} {handleShowAvailability.medic.lastname}</Modal.Title>
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
            {listAvailability.length !== 0 ?
                <>
                <InputGroup className='mb-3'>
                    <Form.Select onChange={selectHour}>
                        <option>Seleccione Hora</option>
                        {listAvailability?.map((el) => {
                            return <option key={el.daily_hours_id} value={el.daily_hours_id}>{findHour(el.daily_hours_id)}</option>
                        })}
                    </Form.Select>
                </InputGroup>
                <InputGroup className='inputPatient mb-3'>
                    <Form.Control
                    as="textarea"
                    className='commentaryAppointment'
                    name='appointmentCommentary'
                    value={appointmentCommentary}
                    onChange={handleChange}
                    placeholder="Indique breve comentario sobre la cita"
                    style={{ height: '130px' }}
                    />
                </InputGroup>
                </>
                :
                <h4 className='text-center text-danger'>{message}</h4>
            }
            <h4 className='text-center text-danger'>{message}</h4>
        </Modal.Body>
        <Modal.Footer>
          <button className='defineButtonModalAvailabilityMedicCancel' onClick={()=>setHandleShowAvailability({open:false, medic:null})}>
            Cancelar
          </button>
          <button className='defineButtonModalAvailabilityMedicSubmit' onClick={onSubmit}>
            Reservar Cita
          </button>
        </Modal.Footer>
    </Modal>
  )
}
