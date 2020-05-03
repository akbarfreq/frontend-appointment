import React from 'react'
import {CHybridInput} from '@frontend-appointment/ui-elements'
import {ColWrapperComponent} from './ColWrapperComponent'
const AuditableEntityHoc = (auditableEntityObj, isNotAddCol, colSize) => {
  const {
    createdBy,
    createdDate,
    lastModifiedBy,
    lastModifiedDate,
    modifiedBy,
    modifiedDate
  } = auditableEntityObj
  const CreatedByComponent = 
    <CHybridInput placeholder="Created By" value={createdBy} disabled={true} />
  
  const CreatedDateComponent = 
    <CHybridInput
      placeholder="Created Date"
      value={createdDate}
      disabled={true}
    />
  
  const ModifiedByComponent = (
    <CHybridInput
      placeholder="Last Modified By"
      value={lastModifiedBy||modifiedBy}
      disabled={true}
    />
  )
  const ModifiedDateComponent = 
    <CHybridInput
      placeholder="Last Modified Date"
      value={lastModifiedDate||modifiedDate}
      disabled={true}
    />
  
  return (
    <>
      {createdBy ? (
        isNotAddCol ? (
          CreatedByComponent
        ) : (
          <ColWrapperComponent colSize={colSize}  Component={CreatedByComponent}/>
        )
      ) : ''}
      {createdDate ? (
        isNotAddCol ? (
          CreatedDateComponent 
        ) : (
          <ColWrapperComponent colSize={colSize} Component={CreatedDateComponent}/>
        )
      ) :''}
      {lastModifiedBy||modifiedBy ? (
        isNotAddCol ? (
          ModifiedByComponent
        ) : (
          <ColWrapperComponent colSize={colSize} Component={ModifiedByComponent} />
        )
      ) :''}
      {lastModifiedDate||modifiedDate ? (
        isNotAddCol ? (
          ModifiedDateComponent
        ) : (
          <ColWrapperComponent colSize={colSize} Component={ModifiedDateComponent}/>
        )
      ) : null}
    </>
  )
}

export default AuditableEntityHoc