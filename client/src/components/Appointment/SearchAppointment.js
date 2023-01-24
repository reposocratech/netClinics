import React from 'react'
import { CardMedicsSearch } from '../Cards/CardMedicsSearch/CardMedicsSearch'

export const SearchAppointment = ({medicsSearched,setMedicsSearched}) => {
    console.log(medicsSearched);
  return (
    <div>
        {/* {medicsSearched?.map((medic,i) => {
            return( */}
                <CardMedicsSearch
                    medicsSearched = {medicsSearched}
                    setMedicsSearched={setMedicsSearched}
                />
            {/* ) */}
        {/* })} */}
    </div>
  )
}
