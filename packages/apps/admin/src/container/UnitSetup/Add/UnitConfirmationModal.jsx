import React from 'react';
import DetailsModal from "../commons/DetailsModal";
import {CButton, CModal} from "@frontend-appointment/ui-elements";

const UnitConfirmationModal = ({showModal, setShowModal, departmentData, onConfirmClick, isCreateDepartmentLoading}) => {

    return <>
        <CModal show={showModal}
                modalHeading="Unit Details"
                size="lg"
                bodyChildren={<DetailsModal departmentData={{...departmentData, type: "ADD"}}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <>
                        <CButton
                            id=""
                            name="Cancel"
                            variant="light"
                            size="lg"
                            disabled={isCreateDepartmentLoading}
                            className="float-right btn-action"
                            onClickHandler={showModal}/>
                        <CButton
                            id="departmentConfirm"
                            variant="primary"
                            size="lg"
                            isLoading={isCreateDepartmentLoading}
                            disabled={isCreateDepartmentLoading}
                            className="float-right btn-action"
                            onClickHandler={onConfirmClick}/>
                    </>
                }
                closeButton={true}/>
    </>
};

export default UnitConfirmationModal;
