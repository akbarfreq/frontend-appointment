import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import "./../doctor-duty-roster.scss";

import {
    CFLabel,
    CHybridInput,
    CHybridSelect,
    CHybridSelectWithImage,
    CHybridTextArea,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker, ConfirmDelete} from "@frontend-appointment/ui-components";
import DoctorAvailabilityForm from "../common/DoctorAvailabilityForm";
import DoctorAvailabilityOverrides from "../common/DoctorAvailabiltyOverrides";


const EditDoctorDutyRoster = ({
                                  updateDoctorDutyRosterData,
                                  onEnterKeyPress,
                                  onInputChange,
                                  overrideData,
                                  handleDoctorAvailabilityFormChange,
                                  handleOverrideDutyRoster,
                                  showAddOverrideModal,
                                  handleOverrideFormInputChange,
                                  addOverride,
                                  setShowAddOverrideModal,
                                  overrideUpdateErrorMessage,
                                  onModifyOverride,
                                  isModifyOverride,
                                  setShowDeleteOverrideModal,
                                  showDeleteOverrideModal,
                                  remarksHandler,
                                  remarks,
                                  onRemoveOverride,
                                  deleteOverride,
                                  deleteOverrideErrorMessage,
                                  specializationList,
                                  doctorList,
                                  dateErrorMessage,
                                  specializationDropdownError,
                                  overrideFormValid
                              }) => {
    return <>
        <Container className="p-0" fluid>
            <Row className="">
                <Col md={12} lg={5} className="">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title mb-4">Doctor Information</h5>
                        <Form>
                            <div className="d-flex">
                                <CEnglishDatePicker
                                    id="from-date"
                                    name="fromDate"
                                    label="From Date"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={updateDoctorDutyRosterData.fromDate}
                                    peekNextMonth={true}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    invalid={!!dateErrorMessage}
                                    disabled={!updateDoctorDutyRosterData.isCloneAndAdd}
                                    onChange={(date) => onInputChange(date, "fromDate")}
                                />
                                &nbsp;&nbsp;
                                <CEnglishDatePicker
                                    id="to-date"
                                    name="toDate"
                                    label="To Date"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={updateDoctorDutyRosterData.toDate}
                                    peekNextMonth={true}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    invalid={!!dateErrorMessage}
                                    disabled={!updateDoctorDutyRosterData.isCloneAndAdd}
                                    onChange={(date) => onInputChange(date, "toDate")}
                                />
                            </div>
                            <div>
                                {dateErrorMessage ?
                                    <p className="date-error">
                                        {dateErrorMessage}</p> : ''}
                            </div>

                            <CHybridSelect
                                id="specialization"
                                label="Specialization"
                                name="specialization"
                                isDisabled={!updateDoctorDutyRosterData.isCloneAndAdd}
                                options={specializationList}
                                placeholder={!specializationList.length ? "Select Specialization." : "No Specialization(s) available."}
                                noOptionsMessage={() => specializationDropdownError}
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event, '')}
                                value={updateDoctorDutyRosterData.specialization}
                            />
                            <CHybridSelectWithImage
                                id="doctor"
                                label="Doctor"
                                name="doctor"
                                isDisabled={!updateDoctorDutyRosterData.isCloneAndAdd || !updateDoctorDutyRosterData.specialization}
                                placeholder={!updateDoctorDutyRosterData.specialization ? "Select Specialization first." : "Select Doctor."}
                                options={doctorList}
                                noOptionsMessage={() => "No Doctor(s) found."}
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event, '')}
                                value={updateDoctorDutyRosterData.doctor}
                            />
                            <CHybridInput
                                id="duration"
                                label="Duration"
                                type="number"
                                name="rosterGapDuration"
                                placeholder="Duration In Minutes."
                                value={updateDoctorDutyRosterData.rosterGapDuration}
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event)}
                            />
                            <CFLabel labelName="Status" id="status"/>
                            <div>
                                <CRadioButton
                                    checked={updateDoctorDutyRosterData.status === 'Y'}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={event => onInputChange(event)}
                                />
                                <CRadioButton
                                    checked={updateDoctorDutyRosterData.status === 'N'}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={event => onInputChange(event)}
                                />

                            </div>


                            {
                                updateDoctorDutyRosterData.isCloneAndAdd ?
                                    '' :
                                    <CHybridTextArea
                                        className="mt-3"
                                        onChange={onInputChange}
                                        id="remarks"
                                        name="remarks"
                                        placeholder="Remarks"
                                        value={updateDoctorDutyRosterData.remarks}
                                    />
                            }

                        </Form>
                    </div>
                </Col>
                <DoctorAvailabilityForm
                    doctorAvailabilityData={updateDoctorDutyRosterData.weekDaysDutyRosterUpdateRequestDTOS}
                    handleDoctorAvailabilityFormChange={handleDoctorAvailabilityFormChange}
                    type="MANAGE"
                    rosterGapDuration={updateDoctorDutyRosterData.rosterGapDuration}
                />
            </Row>

            <Row>
                <DoctorAvailabilityOverrides
                    hasOverrideDutyRoster={updateDoctorDutyRosterData.hasOverrideDutyRoster}
                    overrideData={overrideData}
                    doctorDutyRosterOverrideRequestDTOS={updateDoctorDutyRosterData.overridesUpdate}
                    onEnterKeyPress={onEnterKeyPress}
                    handleOverrideDutyRoster={handleOverrideDutyRoster}
                    showAddOverrideModal={showAddOverrideModal}
                    handleOverrideFormInputChange={handleOverrideFormInputChange}
                    addOverride={addOverride}
                    setShowAddOverrideModal={setShowAddOverrideModal}
                    overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                    onModify={onModifyOverride}
                    isModifyOverride={isModifyOverride}
                    onRemove={onRemoveOverride}
                    doctorInfoData={updateDoctorDutyRosterData}
                    overrideFormValid={overrideFormValid}
                />
                {showDeleteOverrideModal ? (
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete this Override? If yes please provide remarks."
                        modalHeader="Delete Override"
                        showModal={showDeleteOverrideModal}
                        setShowModal={setShowDeleteOverrideModal}
                        onDeleteRemarksChangeHandler={remarksHandler}
                        remarks={remarks}
                        onSubmitDelete={deleteOverride}
                        deleteErrorMessage={deleteOverrideErrorMessage}
                    />
                ) : (
                    ''
                )}

            </Row>
        </Container>
    </>
};

export default EditDoctorDutyRoster
