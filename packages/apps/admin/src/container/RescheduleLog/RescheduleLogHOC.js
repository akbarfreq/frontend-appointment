import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers';
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';

const {searchRescheduleLog, clearRescheduleLogMessage} = AppointmentDetailsMiddleware;
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware;
const {fetchSpecializationHospitalWiseForDropdown} = SpecializationSetupMiddleware;
const {fetchPatientMetaList} = PatientDetailsMiddleware;

const {
    appointmentSetupApiConstant,
    hospitalSetupApiConstants,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant
} = AdminModuleAPIConstants;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = hospitalSetupApiConstants;
const {FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN} = doctorSetupApiConstants;
const {SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL} = specializationSetupAPIConstants;
const {SEARCH_APPOINTMENT_RESCHEDULE} = appointmentSetupApiConstant;
const {ACTIVE_PATIENT_META_INFO_DETAILS} = patientSetupApiConstant;

const {isFirstDateGreaterThanSecondDate, getDateWithTimeSetToGivenTime} = DateTimeFormatterUtils;

const RescheduleLogHOC = (ComposedComponent, props, type) => {
    class RescheduleLogHOC extends React.PureComponent {
        state = {
            searchParameters: {
                fromDate: new Date(),
                toDate: new Date(),
                hospitalId: '',
                doctorId: '',
                specializationId: '',
                patientMetaInfoId: '',
                appointmentNumber: '',
                esewaId: '',
                patientType: ''
            },
            showModal: false,
            rescheduleLogList: [],
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
        };

        fetchHospitalForDropDown = async () => {
            try {
                await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN)
            } catch (e) {
                console.log(e)
            }
        };

        fetchDoctorsByHospital = async hospitalId => {
            await this.props.fetchActiveDoctorsHospitalWiseForDropdown(FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
                hospitalId);
        };

        fetchSpecializationByHospital = async hospitalId => {
            await this.props.fetchSpecializationHospitalWiseForDropdown(SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
                hospitalId);
        };

        fetchPatientMetaInfo = async hospitalId => {
            await this.props.fetchPatientMetaList(ACTIVE_PATIENT_META_INFO_DETAILS, hospitalId)
        };

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            this.searchRescheduleLog();
        };

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    hospitalId: '',
                    doctorId: '',
                    specializationId: '',
                    patientMetaInfoId: '',
                    appointmentNumber: '',
                    esewaId: '',
                    patientType: ''
                },
                rescheduleLogList: []
            });
            this.props.clearRescheduleLogMessage();
        };

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label;
                if (field) {
                    fieldName = field;
                    value = event;
                } else {
                    fieldName = event.target.name;
                    value = event.target.value;
                    label = event.target.label;
                }
                let searchParams = {...this.state.searchParameters};
                searchParams[fieldName] = label ? (value ? {value, label} : '') : value;
                await this.setStateValuesForSearch(searchParams);

                if (fieldName === 'hospitalId') {
                    if (value) {
                        this.callApiForHospitalChange(value);
                    }
                    await this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            doctorId: '',
                            specializationId: '',
                            patientMetaInfoId: ''
                        }
                    })
                }

                let errorMsg = "";
                if (['fromDate', 'toDate'].indexOf(fieldName) >= 0) {
                    if (isFirstDateGreaterThanSecondDate(
                        getDateWithTimeSetToGivenTime(searchParams.fromDate, 0, 0, 0),
                        getDateWithTimeSetToGivenTime(searchParams.toDate, 0, 0, 0))) {
                        errorMsg = "From date cannot be greater than To date!";
                        this.showWarningAlert(errorMsg);
                        this.clearAlertTimeout();
                    }

                }
            }
        };

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        };

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: !prevState.showModal
            }));
        };

        showWarningAlert = (message) => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "warning",
                    message: message
                }
            });
        };

        clearAlertTimeout = () => {
            setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            })
        };

        callApiForHospitalChange = hospitalId => {
            this.fetchDoctorsByHospital(hospitalId);
            this.fetchSpecializationByHospital(hospitalId);
            this.fetchPatientMetaInfo(hospitalId);
        };

        initialApiCalls = async () => {
            await this.fetchHospitalForDropDown();
            await this.searchRescheduleLog(1);
        };

        searchRescheduleLog = async (page) => {
            const {
                fromDate,
                toDate,
                hospitalId,
                doctorId,
                specializationId,
                appointmentNumber,
                esewaId,
                patientMetaInfoId,
                patientType
            } = this.state.searchParameters;

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page;

            let searchData = {
                fromDate,
                toDate,
                hospitalId: hospitalId.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || '',
                appointmentNumber,
                esewaId,
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || ''
            };

            try {

                await this.props.searchRescheduleLog(
                    SEARCH_APPOINTMENT_RESCHEDULE,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    },
                    searchData);
                let rescheduleLogs = this.appendSNToTable([...this.props.RescheduleLogReducer.rescheduleLogList]);
                await this.setState({
                    rescheduleLogList: [...rescheduleLogs],
                    totalRecords: this.props.RescheduleLogReducer.rescheduleLogList.length
                        ? this.props.RescheduleLogReducer.totalItems
                        : 0,
                    queryParams: {
                        ...this.state.queryParams,
                        page: updatedPage
                    }
                })
            } catch (e) {

            }
        };

        appendSNToTable = logList => {
            let newLogList = [];
            newLogList =
                logList.length &&
                logList.map((rescheduleData, index) => ({
                    ...rescheduleData,
                    sN: index + 1,
                    appointmentAmount: rescheduleData.appointmentAmount || 'N/A',
                    appointmentNumber: rescheduleData.appointmentNumber || 'N/A',
                    doctorName: rescheduleData.doctorName || 'N/A',
                    esewaId: rescheduleData.esewaId || 'N/A',
                    hospitalName: rescheduleData.hospitalName || 'N/A',
                    mobileNumber: rescheduleData.mobileNumber || 'N/A',
                    patientAge: rescheduleData.patientAge || 'N/A',
                    patientGender: rescheduleData.patientGender || 'N/A',
                    patientName: rescheduleData.patientName || 'N/A',
                    previousAppointmentDate: rescheduleData.previousAppointmentDate || 'N/A',
                    registrationNumber: rescheduleData.registrationNumber || 'N/A',
                    remarks: rescheduleData.remarks || 'N/A',
                    rescheduleAppointmentDate: rescheduleData.rescheduleAppointmentDate || 'N/A',
                    specializationName: rescheduleData.specializationName || 'N/A',
                    transactionNumber: rescheduleData.transactionNumber || 'N/A',
                    patientAddress: rescheduleData.patientAddress || 'N/A',
                }));
            return newLogList
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.clearAlertTimeout);
        }

        render() {
            const {
                searchParameters, rescheduleLogList, showAlert, alertMessageInfo, queryParams, totalRecords
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {activeDoctorsByHospitalForDropdown, doctorDropdownErrorMessage} = this.props.DoctorDropdownReducer;

            const {activeSpecializationListByHospital, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;

            const {isRescheduleLogLoading, rescheduleLogErrorMessage, totalAmount} = this.props.RescheduleLogReducer;

            const {patientList, patientDropdownErrorMessage} = this.props.PatientDropdownListReducer;

            return (
                <>
                    <div id="reschedule-log">
                        <ComposedComponent
                            {...this.props}
                            {...props}
                            searchHandler={{
                                handleSearchFormChange: this.handleSearchFormChange,
                                handleEnter: this.handleEnterPress,
                                resetSearch: this.handleSearchFormReset,
                                searchRescheduleLog: this.searchRescheduleLog,
                                hospitalList: hospitalsForDropdown,
                                doctorList: activeDoctorsByHospitalForDropdown,
                                doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                                specializationList: activeSpecializationListByHospital,
                                specializationDropdownErrorMessage: dropdownErrorMessage,
                                searchParameters: searchParameters,
                                patientListDropdown: patientList,
                                patientDropdownErrorMessage: patientDropdownErrorMessage
                            }}
                            rescheduleLogData={{
                                rescheduleLogList,
                                searchErrorMessage: rescheduleLogErrorMessage,
                                isRescheduleLogLoading,
                                searchAppointmentStatus: this.searchRescheduleLog
                            }}
                            paginationProps={{
                                queryParams: queryParams,
                                totalRecords: totalRecords,
                                handlePageChange: this.handlePageChange
                            }}
                        />
                        <CAlert
                            id="profile-manage"
                            variant={alertMessageInfo.variant}
                            show={showAlert}
                            onClose={this.closeAlert}
                            alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                            </> : <><i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                            </>}
                            message={alertMessageInfo.message}
                        />
                    </div>
                </>
            )
        }
    }

    return ConnectHoc(
        RescheduleLogHOC,
        [
            'RescheduleLogReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer',
            'PatientDropdownListReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchActiveDoctorsHospitalWiseForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            searchRescheduleLog,
            clearRescheduleLogMessage,
            fetchPatientMetaList
        }
    )
};

export default RescheduleLogHOC;