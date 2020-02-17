import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const DoctorWithSpecialization = (props) => {
  return (
    <>
      <ul>
        <li>
        Dr. {props.node.data.doctorName.toUpperCase()}
        </li>
        <li>
        ({props.node.data.specializationName.toUpperCase()})
        </li>
        </ul>
    </>
  )
};

export default memo(DoctorWithSpecialization)
