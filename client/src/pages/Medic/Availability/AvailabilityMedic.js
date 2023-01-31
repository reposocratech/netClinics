import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./availabilityMedic.scss";
import { AvailabilityCell } from "../../../components/Availability/AvailabilityCell";

export const AvailabilityMedic = () => {
  const { token, user } = useContext(NetClinicsContext);
  const [availability, setAvailability] = useState([]);
  const [listDailyHours, setListDailyHours] = useState([]);
  const [listAllDay, setListAllDay] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };

    if (!user.user_id) return;
    axios
      .get(`http://localhost:4000/medic/availabilities`)
      .then((res) => {
        setAvailability(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:4000/time/getAllHours`)
      .then((res) => {
        setListDailyHours(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:4000/time/getAllDays`)
      .then((res) => {
        setListAllDay(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, token]);

  return (
    <div className="bgAvailabilityMedic d-flex align-items-center justify-content-center">
      <div className="w-75 my-5 -mb-5">
        <TableContainer component={Paper}>
          <h3 className="title text-center my-3">Disponibilidad</h3>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bgThTable">
              <TableRow>
                <TableCell
                  className="thContentTable"
                  sx={{ fontWeight: "bold" }}
                  align="center"
                >
                  Horas
                </TableCell>
                {listAllDay.map((el, i) => {
                  return (
                    <TableCell
                      className="thContentTable"
                      key={el.day_id + i + el.day_id}
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      {el.day_name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {listDailyHours?.map((hour, i) => {
                return (
                  <TableRow key={hour.daily_hours_id}>
                    <TableCell
                      sx={{ fontWeight: "bold", width: "10rem" }}
                      align="center"
                    >
                      {hour.daily_hours_time}
                    </TableCell>
                    {listAllDay.map((day, j) => {
                      return (
                        //Monto cada componente celda
                        <AvailabilityCell
                          key={hour.daily_hours_id + day.day_id + i + j}
                          availability={availability}
                          hour={hour}
                          day={day}
                        />
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
