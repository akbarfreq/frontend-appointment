import React, {memo} from 'react'
import {ButtonGroup,Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'

const DateButtonPills = props => {
  const {onPillsClickHandler} = props

  return (
    <Col>
    <ButtonGroup aria-label="Basic example" size="sm" className="mb-3">
      <CButton className="outline-secondary" onClickHandler={()=>onPillsClickHandler('D')} name="Daily"/>
      <CButton className="outline-secondary" onClickHandler={()=>onPillsClickHandler('W')} name="Weekly"/>
      <CButton className="outline-secondary" onClickHandler={()=>onPillsClickHandler('M')} name="Monthly"/>
      <CButton className="outline-secondary" onClickHandler={()=>onPillsClickHandler('Y')} name="Yearly"/>
    </ButtonGroup>
    </Col>
  )
}
export default memo(DateButtonPills);
