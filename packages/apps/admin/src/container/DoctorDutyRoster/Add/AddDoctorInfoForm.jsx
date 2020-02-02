import React from 'react';
import {Col, Form} from "react-bootstrap";
import {CButton, CHybridInput, CHybridSelect} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";

const AddDoctorInfoForm = ({
                               handleShowExistingRoster,
                               hospitalList,
                               specializationList,
                               doctorList,
                               doctorInfoData,
                               onInputChange,
                               onDateChange,
                               onEnterKeyPress,
                               specializationDropdownError,
                               doctorDropdownErrorMessage
                           }) => {
    return <>
        <Col md={12} lg={5} className="info-container">
            <div className="doctor-info bg-white p-4">
                <h5 className="title">Doctor Info</h5>
                <Form>
                    {/*<Form.Label>Date</Form.Label>*/}
                    <div className="d-flex">
                        <CEnglishDatePicker
                            id="from-date"
                            name="fromDate"
                            label="From Date"
                            dateFormat="yyyy-MM-dd"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={doctorInfoData.fromDate}
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date)=>onDateChange(date,"fromDate")}
                        />
                        &nbsp;&nbsp;
                        <CEnglishDatePicker
                            id="to-date"
                            name="toDate"
                            label="To Date"
                            dateFormat="yyyy-MM-dd"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={doctorInfoData.toDate}
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date)=>onDateChange(date,"toDate")}
                        />
                    </div>

                    <CHybridSelect
                        id="hospital"
                        label="Hospital"
                        name="hospital"
                        options={hospitalList}
                        placeholder="Select hospital."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        value={doctorInfoData.hospital}
                    />

                    <CHybridSelect
                        id="specialization"
                        label="Specialization"
                        name="specialization"
                        options={specializationList}
                        placeholder={"Select specialization."}
                        noOptionsMessage={specializationDropdownError}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        value={doctorInfoData.specialization}
                    />
                    {console.log("No drop ms", doctorDropdownErrorMessage)}
                    <CHybridSelect
                        id="doctor"
                        label="Doctor"
                        name="doctor"
                        isDisabled={!doctorInfoData.specialization}
                        placeholder={!doctorInfoData.specialization ? "Select Specialization first" : "Select doctor."}
                        options={doctorList}
                        noOptionsMessage={() => doctorDropdownErrorMessage}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        value={doctorInfoData.doctor}
                    />

                    <CHybridInput
                        id="duration"
                        label="Duration"
                        type="number"
                        name="rosterGapDuration"
                        placeholder="Enter Duration In Minutes."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        value={doctorInfoData.rosterGapDuration}
                    />
                </Form>

                <CButton
                    id="show-existing"
                    variant="link"
                    size="lg"
                    onClickHandler={handleShowExistingRoster}
                    name="*Existing Availability"/>
            </div>
        </Col>
    </>
};

export default AddDoctorInfoForm;
