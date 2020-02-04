import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const HospitalConfirmationModal = props => {
  const {showModal, setShowModal, doctorData, onConfirmClick,type} = props
  return (
    <>
      <CModal
        show={showModal}
        modalHeading="Hospital Details"
        size="lg"
        bodyChildren={
          <DetailsModal
            doctorData={doctorData}
            type={type}
          />
        }
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-modal"
        footerChildren={
          <CButton
            id="hospitalConfirm"
            variant="primary"
            size="lg"
            className="float-right btn-action"
            onClickHandler={onConfirmClick}
          />
        }
        closeButton={true}
      />
    </>
  )
}

export default HospitalConfirmationModal
