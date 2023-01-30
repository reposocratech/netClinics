import React from 'react'
import { CardMedicsSearch } from '../Cards/CardMedicsSearch/CardMedicsSearch'

export const SearchAppointment = ({medicsSearched,setMedicsSearched, setSearch}) => {

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
