import React from 'react'
import { CardMedicsSearch } from '../Cards/CardMedicsSearch/CardMedicsSearch'

export const SearchAppointment = ({medicsSearched,setMedicsSearched}) => {

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
