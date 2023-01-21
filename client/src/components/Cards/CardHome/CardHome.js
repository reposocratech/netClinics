import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import './CardHome.scss'

export const CardHome = ({navigate, icon, cardTitle}) => {
  return (

        <Col xs={12} sm={12} md={6} lg={6} className='d-flex justify-content-center'>
          <div  onClick={() => navigate('/')} className='cardDateHome d-flex flex-row justify-content-between align-items-end'>
            <div className='textHome mb-3'>
              <h2>{cardTitle}</h2>
            </div>
            <div className='icon'>
              <img src={icon}/>
            </div>
          </div>
        </Col>
  )
}
