import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import axios from "axios";
  import { NetClinicsContext } from "../../../context/NetClinicsProvider";

import "./styleAllMedics.scss"

export const AllMedics = () => {
  return (
    <div>
     <h1>Vista del administrador de todos los médicos</h1>
    </div>
  )
}


