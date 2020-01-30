import React from 'react';
import DetailsModal from "../commons/DetailsModal";
import {CButton, CModal} from "@frontend-appointment/ui-elements";

const DepartmentConfirmationModal = ({showModal, setShowModal, departmentData, onConfirmClick}) => {

    return <>
        <CModal show={showModal}
                modalHeading="Department Details"
                size="lg"
                bodyChildren={<DetailsModal departmentData={departmentData}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <>
                    <CButton
                    id=""
                    name="Cancel"
                    variant="outline-secondary"
                    size="lg"
                    className="float-right btn-action"
                    onClickHandler={showModal}/>
                    <CButton
                    id="departmentConfirm"
                    variant="primary"
                    size="lg"
                    className="float-right btn-action"
                    onClickHandler={onConfirmClick}/>
                    </>
                }
                closeButton={true}/>
    </>
};

export default DepartmentConfirmationModal;
