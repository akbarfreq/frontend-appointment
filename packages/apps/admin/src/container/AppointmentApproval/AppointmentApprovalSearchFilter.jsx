import React, {PureComponent} from 'react'
import {
    Col,
    Container,
    Row,
    OverlayTrigger,
    Tooltip,
    Button
} from 'react-bootstrap'
import {
    CButton,
    CHybridSelect,
    CForm,
    CHybridInput
} from '@frontend-appointment/ui-elements'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'

class AppointmentApprovalListSearchFilter extends PureComponent {
    state = {
        isSearchFormExpanded: false
    }

    toggleSearchForm = async () => {
        const searchFilter = document.getElementById('advanced-search')
        if (searchFilter) searchFilter.classList.toggle('collapsed')
        await this.setState({
            isSearchFormExpanded: !this.state.isSearchFormExpanded
        })
    }

    handleSearchButtonClick = () => {
        this.props.searchHandler.searchAppointment(1)
        this.toggleSearchForm()
    }

    render() {
        const {searchHandler} = this.props
        const {
            handleEnter,
            handleSearchFormChange,
            resetSearch,
            hospitalsDropdown,
            doctorsDropdown,
            doctorDropdownErrorMessage,
            activeSpecializationList,
            specializationDropdownErrorMessage,
            searchParameters,
            patientListDropdown,
            patientDropdownErrorMessage
        } = searchHandler

        return (
            <>
                {this.state.isSearchFormExpanded ? (
                    <div id="advanced-search" className="advanced-search">
                        <div className="search-header d-flex justify-content-between">
                            <h5 className="title">Search Appointment Check-In List</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant="outline-secondary"
                                    size="sm"
                                    name="Reset"
                                    onClickHandler={resetSearch}
                                >
                                    &nbsp; <i className="fa fa-refresh"/>
                                </CButton>
                            </div>
                        </div>
                        <CForm id="" className=" mt-4">
                            <Container-fluid>
                                <Row>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="clientId"
                                            name="hospitalId"
                                            label="Client"
                                            placeholder={hospitalsDropdown.length ? "Select Client" : "No client(s) available."}
                                            options={hospitalsDropdown}
                                            isDisabled={hospitalsDropdown.length ? false : true}
                                            value={searchParameters.hospitalId}
                                            onChange={handleSearchFormChange}
                                            onKeyDown={handleEnter}
                                        />
                                    </Col>
                                    <Col sm={12} md={6} xl={4}>
                                        <div className="d-flex">
                                            <CEnglishDatePicker
                                                id="from-date"
                                                name="fromDate"
                                                label="From Date"
                                                dateFormat="yyyy-MM-dd"
                                                // maxDate={0}
                                                showDisabledMonthNavigation={true}
                                                peekNextMonth={true}
                                                showMonthDropdown={true}
                                                showYearDropdown={true}
                                                dropdownMode="select"
                                                selected={searchParameters.fromDate}
                                                onKeyDown={event => handleEnter(event)}
                                                onChange={date =>
                                                    handleSearchFormChange(date, 'fromDate')
                                                }
                                            />
                                            &nbsp;&nbsp;
                                            <CEnglishDatePicker
                                                id="to-date"
                                                name="toDate"
                                                label="To Date"
                                                dateFormat="yyyy-MM-dd"
                                                // maxDate={0}
                                                showDisabledMonthNavigation={true}
                                                selected={searchParameters.toDate}
                                                peekNextMonth={true}
                                                showMonthDropdown={true}
                                                showYearDropdown={true}
                                                dropdownMode="select"
                                                onKeyDown={event => handleEnter(event)}
                                                onChange={date =>
                                                    handleSearchFormChange(date, 'toDate')
                                                }
                                            />
                                        </div>
                                    </Col>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="specializationId"
                                            label="Specialization"
                                            placeholder={searchParameters.hospitalId ?
                                                (activeSpecializationList.length ?
                                                    "Select specialization." : "No specialization(s) available.")
                                                : "Select client first"}
                                            name="specializationId"
                                            onKeyDown={event => handleEnter(event)}
                                            options={activeSpecializationList}
                                            value={searchParameters.specializationId}
                                            isDisabled={
                                                activeSpecializationList.length ? false : true
                                            }
                                            onChange={handleSearchFormChange}
                                            onEnter={handleEnter}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="doctorId"
                                            label="Doctor"
                                            placeholder={searchParameters.hospitalId ?
                                                (doctorsDropdown.length ?
                                                    "Select doctor." : "No doctor(s) available.")
                                                : "Select client first"}
                                            name="doctorId"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => handleSearchFormChange(event)}
                                            options={doctorsDropdown}
                                            value={searchParameters.doctorId}
                                            isDisabled={!doctorsDropdown.length}
                                            onEnter={handleEnter}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridInput
                                            id="appointmentNumber"
                                            name="appointmentNumber"
                                            placeholder="Appointment Number"
                                            value={searchParameters.appointmentNumber}
                                            onChange={handleSearchFormChange}
                                            onKeyDown={handleEnter}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="admin-meta-info"
                                            name="patientMetaInfoId"
                                            label="Patients Detail"
                                            placeholder={searchParameters.hospitalId ?
                                                (patientListDropdown.length ?
                                                    "Name, Mobile no Or Reg. no" : "No patient(s) available.")
                                                : "Select client first"}
                                            options={patientListDropdown}
                                            value={searchParameters.patientMetaInfoId}
                                            isDisabled={!patientListDropdown.length}
                                            onChange={handleSearchFormChange}
                                            onEnter={handleEnter}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="patientType"
                                            label="Patient Type"
                                            name="patientType"
                                            value={searchParameters.patientType}
                                            options={[
                                                {value: 'N', label: 'New'},
                                                {value: 'Y', label: 'Registered'}
                                            ]}
                                            placeholder="Select Patient Type."
                                            onChange={handleSearchFormChange}
                                            onEnter={handleEnter}
                                        />
                                    </Col>

                                    {/*<Col sm={12} md={6} xl={4}>*/}
                                    {/*    <CHybridSelect*/}
                                    {/*        id="patientCategory"*/}
                                    {/*        label="Appointment Category"*/}
                                    {/*        name="patientCategory"*/}
                                    {/*        options={[*/}
                                    {/*            {value: 'Y', label: 'Self'},*/}
                                    {/*            {value: 'N', label: 'Others'}*/}
                                    {/*        ]}*/}
                                    {/*        value={searchParameters.patientCategory}*/}
                                    {/*        placeholder="Select Patient Category."*/}
                                    {/*        onChange={handleSearchFormChange}*/}
                                    {/*        onEnter={handleEnter}*/}
                                    {/*    />*/}
                                    {/*</Col>*/}

                                    <Col
                                        sm={12}
                                        md={{span: 8, offset: 4}}
                                        xl={{span: 6, offset: 6}}
                                    >
                                        <div className="pull-right">
                                            <CButton
                                                id="toggle-search-profiles"
                                                variant="light"
                                                size="sm"
                                                className=" btn-action mr-2"
                                                name="Close"
                                                onClickHandler={this.toggleSearchForm}
                                            />
                                            <CButton
                                                id="search-profiles"
                                                variant="primary"
                                                className="btn-action"
                                                name="Search"
                                                onClickHandler={this.handleSearchButtonClick}
                                            ></CButton>
                                        </div>
                                    </Col>
                                </Row>
                            </Container-fluid>
                            <div className="search-toggle-btn"></div>
                        </CForm>
                    </div>
                ) : (
                    <div
                        className="search-filter-wrapper"
                        onClick={this.toggleSearchForm}
                    >
                        <ul id="" className="search-filter-item">
                            <li>
                                <CButton id="spec-filter" variant="primary" name="">
                                    <>
                                        <i className="fa fa-filter"></i>
                                        &nbsp; Filter
                                    </>
                                </CButton>
                            </li>
                            {searchParameters.appointmentNumber && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Appointment Number</Tooltip>
                                        )}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParameters.appointmentNumber}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParameters.hospitalId && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Client</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.hospitalId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.fromDate && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">From Date</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.fromDate.toLocaleDateString()}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.toDate && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">To Date</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.toDate.toLocaleDateString()}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.patienMetaInfoId && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Patient Meta Info</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.patientMetaInfoId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.doctorId && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Doctor Name</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.doctorId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.specializationId && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Specialization Name</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.specializationId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.patientType && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Patient Type</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.patientType.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters.patientCategory && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Patient Type</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.patientCategory.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </>
        )
    }
}

export default AppointmentApprovalListSearchFilter
