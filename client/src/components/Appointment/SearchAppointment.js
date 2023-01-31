import React from 'react'
import { CardMedicsSearch } from '../Cards/CardMedicsSearch/CardMedicsSearch'

export const SearchAppointment = ({medicsSearched,setMedicsSearched, setSearch}) => {
  //Componente para cada tarjeta de medico localizada en la búsqueda de citas
  return (
    <div>
      <CardMedicsSearch
          medicsSearched = {medicsSearched}
          setMedicsSearched={setMedicsSearched}
          setSearch={setSearch}
      />
    </div>
  )
}
