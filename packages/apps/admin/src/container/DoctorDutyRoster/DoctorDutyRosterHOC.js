import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {
    DateTimeFormatterUtils,
    DoctorDutyRosterUtils,
    EnterKeyPressUtils,
    TryCatchHandler
} from "@frontend-appointment/helpers";
import {
    DoctorDutyRosterMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware,
    WeekdaysMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CAlert, CButton, CModal} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import DoctorDutyRosterPreviewModal from "./common/DoctorDutyRosterPreviewModal";

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware;
const {fetchDoctorsBySpecializationIdForDropdown, fetchActiveDoctorsForDropdown} = DoctorMiddleware;
const {fetchWeekdays} = WeekdaysMiddleware;
const {
    createDoctorDutyRoster,
    fetchDoctorDutyRosterList,
    fetchExistingDoctorDutyRoster,
    fetchExistingDoctorDutyRosterDetails,
    fetchDoctorDutyRosterDetailById,
    deleteDoctorDutyRoster,
    updateDoctorDutyRoster,
    clearDDRSuccessErrorMessage,
    updateDoctorDutyRosterOverride,
    deleteDoctorDutyRosterOverride
} = DoctorDutyRosterMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {ACTIVE_DROPDOWN_SPECIALIZATION} = AdminModuleAPIConstants.specializationSetupAPIConstants;
const {FETCH_DOCTOR_BY_SPECIALIZATION_ID, FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN} = AdminModuleAPIConstants.doctorSetupApiConstants;
const {FETCH_WEEKDAYS} = CommonAPIConstants.WeekdaysApiConstants;
const {
    CREATE_DOCTOR_DUTY_ROSTER,
    DELETE_DOCTOR_DUTY_ROSTER,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID,
    UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE,
    FETCH_EXISTING_DOCTOR_DUTY_ROSTER,
    FETCH_EXISTING_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID,
    SEARCH_DOCTOR_DUTY_ROSTER,
    UPDATE_DOCTOR_DUTY_ROSTER,
    DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE,
} = AdminModuleAPIConstants.doctorDutyRosterApiConstants;

const {getDateWithTimeSetToGivenTime, addDate} = DateTimeFormatterUtils;

const DoctorDutyRosterHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRoster extends PureComponent {
        state = {
            showExistingRosterModal: false,
            showAddOverrideModal: false,
            isModifyOverride: false,
            showAlert: false,
            formValid: true,
            showConfirmModal: false,
            showDeleteModal: false,
            showEditModal: false,
            showDeleteOverrideModal: false,
            hospital: null,
            specialization: null,
            doctor: null,
            rosterGapDuration: '',
            status: 'Y',
            fromDate: new Date(),
            toDate: new Date(),
            hasOverrideDutyRoster: 'N',
            isWholeWeekOff: 'N',
            doctorWeekDaysDutyRosterRequestDTOS: [],
            doctorDutyRosterOverrideRequestDTOS: [],
            overrideRequestDTO: {
                fromDate: new Date(),
                toDate: new Date(),
                startTime: '',
                endTime: '',
                dayOffStatus: 'N',
                remarks: '',
                status: 'Y',
                doctorDutyRosterOverrideId: '',
                id: ''
            },
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            existingRosterTableData: [],
            existingDoctorWeekDaysAvailability: [],
            existingOverrides: [],
            searchParameters: {
                fromDate: new Date(),
                toDate: addDate(new Date(), 30),
                hospital: null,
                specialization: null,
                doctor: null
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            deleteRequestDTO: {
                id: 0,
                remarks: '',
                status: 'D'
            },
            updateDoctorDutyRosterData: {
                fromDate: '',
                toDate: '',
                hospital: null,
                specialization: null,
                doctor: null,
                doctorDutyRosterId: 0,
                hasOverrideDutyRoster: '',
                remarks: '',
                rosterGapDuration: 0,
                status: '',
                weekDaysDutyRosterUpdateRequestDTOS: [],
                overridesUpdate: [],
                originalOverrides: [],
                formValid: true
            },
            overrideUpdateErrorMessage: '',
            deleteOverrideErrorMessage: ''
        };

        resetAddForm = async () => {
            const weekDays = await this.getWeekDaysDataForForm();
            await this.setState({
                hospital: null,
                specialization: null,
                doctor: null,
                rosterGapDuration: '',
                status: 'Y',
                fromDate: new Date(),
                toDate: new Date(),
                hasOverrideDutyRoster: 'N',
                isWholeWeekOff: 'N',
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDays],
                doctorDutyRosterOverrideRequestDTOS: [],
                overrideRequestDTO: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    startTime: '',
                    endTime: '',
                    dayOffStatus: 'N',
                    remarks: '',
                    status: 'Y'
                },
            })
        };

        resetSearchForm = async () => {
            this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    fromDate: new Date(),
                    toDate: new Date(),
                    hospital: null,
                    specialization: null,
                    doctor: null
                }
            });
            await this.searchDoctorDutyRoster(1);
        };

        resetEditForm = () => {
            this.setState({
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    fromDate: '',
                    toDate: '',
                    hospital: null,
                    specialization: null,
                    doctor: null,
                    doctorDutyRosterId: 0,
                    hasOverrideDutyRoster: '',
                    remarks: '',
                    rosterGapDuration: 0,
                    status: '',
                    weekDaysDutyRosterUpdateRequestDTOS: [],
                    overridesUpdate: [],
                    originalOverrides: [],
                    updateFormValid: true
                },
            })
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        fetchHospitalsForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
        };

        fetchActiveSpecializationForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchSpecializationForDropdown(ACTIVE_DROPDOWN_SPECIALIZATION))
        };

        fetchActiveDoctors = async () => {
            await this.props.fetchActiveDoctorsForDropdown(FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN);
        };

        fetchWeekdaysData = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchWeekdays(FETCH_WEEKDAYS));
            let weekDaysData = await this.getWeekDaysDataForForm();
            this.setState({
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
            });
        };

        fetchExistingRoster = async () => {
            const {doctor, fromDate, toDate, specialization} = this.state;
            return await this.props.fetchExistingDoctorDutyRoster(
                FETCH_EXISTING_DOCTOR_DUTY_ROSTER, {
                    doctorId: doctor ? doctor.value : '',
                    specializationId: specialization ? specialization.value : '',
                    fromDate: fromDate,
                    toDate: toDate
                });
        };

        fetchDoctorDutyRosterDetailsById = async id => {
            await this.props.fetchDoctorDutyRosterDetailById(FETCH_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID, id);
        };

        handleShowExistingRoster = () => {
            this.setState({
                showExistingRosterModal: !this.state.showExistingRosterModal
            })
        };

        handleInputChange = (event, fieldValid) => {
            event && this.bindValuesToState(event, fieldValid);
        };

        handleDateChange = (date, name) => {
            date && this.setState({
                [name]: date
            })
        };

        handleDoctorAvailabilityFormChange = (event, fieldName, index) => {
            let value = fieldName ? event : event.target.checked;
            let doctorWeekDaysAvailability;
            switch (type) {
                case 'ADD':
                    doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                    this.setAvailabilityData(fieldName, doctorWeekDaysAvailability, index, value);
                    this.setState({
                        doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysAvailability]
                    });
                    break;
                case 'MANAGE':
                    doctorWeekDaysAvailability = [...this.state.updateDoctorDutyRosterData.weekDaysDutyRosterUpdateRequestDTOS];
                    this.setAvailabilityData(fieldName, doctorWeekDaysAvailability, index, value);
                    this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            weekDaysDutyRosterUpdateRequestDTOS: [...doctorWeekDaysAvailability]
                        }
                    });
                    break;
                default:
                    break;
            }
        };

        handleWholeWeekOff = (event) => {
            if (event) {
                let doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                let updatedWeekDays = doctorWeekDaysAvailability.map(day => {
                    this.setDefaultStartAndEndTimeAndDayOffStatus(event.target.checked, day);
                    return day;
                });
                this.setState({
                    isWholeWeekOff: event.target.checked ? 'Y' : 'N',
                    doctorWeekDaysDutyRosterRequestDTOS: [...updatedWeekDays]
                })
            }
        };

        handleOverrideDutyRoster = (event) => {
            if (event) {
                let isOverride = event.target.checked;
                switch (type) {
                    case 'ADD':
                        if (isOverride) {
                            this.setState({
                                hasOverrideDutyRoster: 'Y',
                                showAddOverrideModal: true
                            })
                        } else {
                            this.setState({
                                hasOverrideDutyRoster: 'N',
                                doctorDutyRosterOverrideRequestDTOS: [],
                                overrideRequestDTO: {
                                    fromDate: new Date(),
                                    toDate: new Date(),
                                    startTime: '',
                                    endTime: '',
                                    dayOffStatus: '',
                                    remarks: '',
                                    id: '',
                                    status: 'Y'
                                },
                            })
                        }
                        break;
                    case 'MANAGE':
                        if (isOverride) {
                            this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    hasOverrideDutyRoster: 'Y',
                                },
                                showAddOverrideModal: true
                            })
                        } else {
                            this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    hasOverrideDutyRoster: 'N',
                                    overridesUpdate: []
                                },
                                overrideRequestDTO: {
                                    fromDate: new Date(),
                                    toDate: new Date(),
                                    startTime: '',
                                    endTime: '',
                                    dayOffStatus: '',
                                    remarks: '',
                                    id: '',
                                    status: 'Y'
                                },
                            })
                        }
                        break;
                    default:
                        break;
                }

            }

        };

        handleOverrideFormInputChange = (event, field) => {
            if (event) {
                let key = field ? field : event.target.name;
                let value = field ? event
                    : (event.target.type === 'checkbox' ? (event.target.checked === true ? 'Y' : 'N')
                        : event.target.value);
                let overrideRequestDTO = {...this.state.overrideRequestDTO};
                if (key === 'dayOffStatus' && event.target.checked) {
                    this.setDefaultStartAndEndTimeAndDayOffStatus(event.target.checked, overrideRequestDTO);
                } else {
                    overrideRequestDTO[key] = value;
                }
                this.setState({
                    overrideRequestDTO: {...overrideRequestDTO}
                })
            }
        };

        handleAddOverride = async (isAddAnother, isModifyOverride) => {
            let overrideList = type === 'ADD' ? [...this.state.doctorDutyRosterOverrideRequestDTOS] :
                [...this.state.updateDoctorDutyRosterData.overridesUpdate];
            let currentOverride = {...this.state.overrideRequestDTO};
            switch (type) {
                case 'ADD':
                    if (isModifyOverride) {
                        // IF MODIFYING EXISTING OVERRIDE REPLACE OLD ONE WITH NEW MODIFIED
                        overrideList[currentOverride.id] = currentOverride;
                    } else {
                        // ELSE SIMPLY ADD
                        overrideList.push(currentOverride);
                    }
                    this.setState({
                        doctorDutyRosterOverrideRequestDTOS: [...overrideList],
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            id: ''
                        },
                        isModifyOverride: false,
                        showAddOverrideModal: isAddAnother,
                        overrideUpdateErrorMessage: ''
                    });
                    break;
                case 'MANAGE':
                    try {
                        let dataToSave = {
                            dayOffStatus: currentOverride.dayOffStatus,
                            doctorDutyRosterId: this.state.updateDoctorDutyRosterData.doctorDutyRosterId,
                            doctorDutyRosterOverrideId: isModifyOverride ? currentOverride.doctorDutyRosterOverrideId : '',
                            endTime: currentOverride.endTime,
                            overrideFromDate: currentOverride.fromDate,
                            overrideToDate: currentOverride.toDate,
                            remarks: currentOverride.remarks,
                            startTime: currentOverride.startTime,
                            status: 'Y',
                        };
                        try {
                            let response = await this.updateOverride(dataToSave);
                            if (isModifyOverride) {
                                overrideList[currentOverride.id] = currentOverride;
                            } else {
                                currentOverride.doctorDutyRosterOverrideId = response.savedOverrideId;
                                overrideList.push(currentOverride);
                            }
                            this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    overridesUpdate: [...overrideList]
                                },
                                overrideRequestDTO: {
                                    ...this.state.overrideRequestDTO,
                                    fromDate: new Date(),
                                    toDate: new Date(),
                                    startTime: '',
                                    endTime: '',
                                    dayOffStatus: 'N',
                                    remarks: '',
                                    id: ''
                                },
                                isModifyOverride: false,
                                showAddOverrideModal: isAddAnother,
                                overrideUpdateErrorMessage: ''
                            });
                        } catch (e) {
                            await this.setState({
                                overrideUpdateErrorMessage: e.errorMessage ? e.errorMessage : 'Error Occurred while adding/modifying override.'
                            })
                        }
                    } catch (e) {

                    }
                    break;
                default:
                    break;
            }

        };

        handleModifyOverride = (data, index) => {
            switch (type) {
                case 'ADD':
                    this.setState({
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: data.fromDate,
                            toDate: data.toDate,
                            startTime: data.startTime,
                            endTime: data.endTime,
                            dayOffStatus: data.dayOffStatus,
                            remarks: data.remarks,
                            id: data.id ? data.id : index
                        },
                        isModifyOverride: true,
                        showAddOverrideModal: true
                    });
                    break;
                case 'MANAGE':
                    this.setState({
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(data.fromDate),
                            toDate: new Date(data.toDate),
                            startTime: new Date(data.startTime),
                            endTime: new Date(data.endTime),
                            dayOffStatus: data.dayOffStatus,
                            remarks: data.remarks,
                            doctorDutyRosterOverrideId: data.doctorDutyRosterOverrideId,
                            id: data.id ? data.id : index
                        },
                        isModifyOverride: true,
                        showAddOverrideModal: true
                    });
                    break;
            }
        };

        handleRemoveOverride = async (data, index) => {
            switch (type) {
                case 'ADD':
                    let overrides = [...this.state.doctorDutyRosterOverrideRequestDTOS];
                    overrides.splice(index, 1);
                    this.setState({
                        doctorDutyRosterOverrideRequestDTOS: [...overrides]
                    });
                    break;
                case 'MANAGE':
                    this.props.clearDDRSuccessErrorMessage();
                    let deleteRequestDTO = {...this.state.deleteRequestDTO};
                    deleteRequestDTO['id'] = data.doctorDutyRosterOverrideId;
                    // deleteRequestDTO['doctorDutyRosterOverrideId'] = data.doctorDutyRosterOverrideId;
                    await this.setState({
                        deleteRequestDTO: deleteRequestDTO,
                        showDeleteOverrideModal: true,
                        showAlert: false,
                        deleteOverrideErrorMessage: ''
                    });
                    break;
            }

        };

        handleSaveButtonClick = async () => {
            await this.setState({
                showConfirmModal: true
            })
        };

        handleViewDetailsExisting = async (data) => {
            try {
                let detailsData = await this.props.fetchExistingDoctorDutyRosterDetails(
                    FETCH_EXISTING_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID, data.doctorDutyRosterId);
                this.setState({
                    existingDoctorWeekDaysAvailability: [...detailsData.weekDaysRosters],
                    existingOverrides: [...detailsData.overrideRosters]
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage
                    }
                })
            }
        };

        handleSearchInputChange = (event, fieldName) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;

            this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    [key]: label ? {label, value} : value
                }
            })
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchDoctorDutyRoster();
        };

        handlePreview = async id => {
            try {
                await this.fetchDoctorDutyRosterDetailsById(id);
                const doctorDutyRosterInfo = await this.prepareDataForPreview();
                const {
                    hospital, specialization, doctor, rosterGapDuration,
                    fromDate, toDate, hasOverrideDutyRoster, doctorWeekDaysDutyRosterRequestDTOS,
                    doctorDutyRosterOverrideRequestDTOS
                } = doctorDutyRosterInfo;
                await this.setState({
                    hospital: hospital,
                    showConfirmModal: true,
                    showAlert: false,
                    specialization: {...specialization},
                    doctor: {...doctor},
                    rosterGapDuration: rosterGapDuration,
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate),
                    hasOverrideDutyRoster: hasOverrideDutyRoster,
                    doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysDutyRosterRequestDTOS],
                    doctorDutyRosterOverrideRequestDTOS: [...doctorDutyRosterOverrideRequestDTOS]
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage ? e.errorMessage : 'Error occurred while fetching Doctor Duty Roster details.'
                    },
                });
            }

        };

        handleDelete = async data => {
            this.props.clearDDRSuccessErrorMessage();
            let deleteRequestDTO = {...this.state.deleteRequestDTO};
            deleteRequestDTO['id'] = data.id;
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                showDeleteModal: true,
                showAlert: false
            })
        };

        handleDeleteRemarksChange = event => {
            const {name, value} = event.target;
            let deleteRequest = {...this.state.deleteRequestDTO};
            deleteRequest[name] = value;
            this.setState({
                deleteRequestDTO: deleteRequest
            })
        };

        handleEdit = async editId => {
            try {
                await this.fetchDoctorDutyRosterDetailsById(editId);
                const doctorDutyRosterInfo = await this.prepareDataForPreview();
                await this.prepareDataForEdit(doctorDutyRosterInfo);
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage ? e.errorMessage : 'Error occurred while fetching Doctor Duty Roster details.'
                    },
                });
            }
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event)
        };

        setStateValues = (key, value, label, fieldValid) => {
            if (type === 'ADD') {
                label ? value ?
                    this.setState({[key]: {value, label}})
                    : this.setState({[key]: null})
                    : this.setState({[key]: value, [key + "Valid"]: fieldValid})
            } else if (type === 'MANAGE') {
                label ? value ?
                    this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            [key]: {value, label}
                        }
                    })
                    : this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            [key]: null
                        }
                    })
                    : this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            [key]: value, [key + "Valid"]: fieldValid
                        }
                    })
            }
        };

        setAvailabilityData(fieldName, doctorWeekDaysAvailability, index, value) {
            if (fieldName) {
                doctorWeekDaysAvailability[index][fieldName] = value;
            } else {
                this.setDefaultStartAndEndTimeAndDayOffStatus(value, doctorWeekDaysAvailability[index]);
            }
        }

        setShowAddOverrideModal = () => {
            let hasOverride;
            switch (type) {
                case 'ADD':
                    hasOverride = this.state.doctorDutyRosterOverrideRequestDTOS.length <= 0 ? 'N'
                        : this.state.hasOverrideDutyRoster;
                    this.setState({
                        showAddOverrideModal: !this.state.showAddOverrideModal,
                        isModifyOverride: false,
                        overrideUpdateErrorMessage: '',
                        hasOverrideDutyRoster: hasOverride,
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            status: 'Y',
                            doctorDutyRosterOverrideId: '',
                            id: ''
                        }
                    });
                    break;
                case 'MANAGE':
                    hasOverride = this.state.updateDoctorDutyRosterData.overridesUpdate.length <= 0 ? 'N'
                        : this.state.updateDoctorDutyRosterData.hasOverrideDutyRoster;
                    this.setState({
                        showAddOverrideModal: !this.state.showAddOverrideModal,
                        isModifyOverride: false,
                        overrideUpdateErrorMessage: '',
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            hasOverrideDutyRoster: hasOverride
                        },
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            status: 'Y',
                            doctorDutyRosterOverrideId: '',
                            id: ''
                        }
                    });
                    break;
            }

        };

        setShowModal = () => {
            this.setState({
                showConfirmModal: false,
                showDeleteModal: false,
                showEditModal: false
            })
        };

        setShowDeleteOverrideModal = () => {
            this.setState({
                showDeleteOverrideModal: !this.state.showDeleteOverrideModal
            })
        };

        setDefaultStartAndEndTimeAndDayOffStatus = (dayOff, doctorWeekDaysAvailability) => {
            if (dayOff) {
                doctorWeekDaysAvailability.dayOffStatus = 'Y';
                doctorWeekDaysAvailability.startTime =
                    getDateWithTimeSetToGivenTime(new Date(), 24, 0, 0);
                doctorWeekDaysAvailability.endTime =
                    getDateWithTimeSetToGivenTime(new Date(), 12, 0, 0);
            } else {
                doctorWeekDaysAvailability.dayOffStatus = 'N';
                doctorWeekDaysAvailability.startTime = '';
                doctorWeekDaysAvailability.endTime = '';
            }
        };

        bindValuesToState = async (event, fieldValid) => {
            let fieldName = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            await this.setStateValues(fieldName, value, label, fieldValid);

            if (fieldName === 'specialization') {
                await this.props.fetchDoctorsBySpecializationIdForDropdown(FETCH_DOCTOR_BY_SPECIALIZATION_ID, value);
                await this.setState({
                    doctor: null
                })
            }
            // this.checkFormValidity();
        };

        closeAlert = () => {
            // this.props.clearDepartmentSuccessErrorMessagesFromStore();
            this.setState({
                showAlert: !this.state.showAlert
            });
        };

        getWeekDaysDataForForm = () => {
            return DoctorDutyRosterUtils.prepareWeekdaysData([...this.props.WeekdaysReducer.weekdaysList]);
        };

        getExistingRoster = async () => {
            try {
                const existingRosters = await this.fetchExistingRoster();
                if (existingRosters.length) {
                    this.setState({
                        showAlert: false,
                        showExistingRosterModal: true,
                        existingRosterTableData: [...existingRosters],
                        existingDoctorWeekDaysAvailability: [],
                        existingOverrides: [],
                    })
                } else {
                    this.setState({
                        showAlert: true,
                        alertMessageInfo: {
                            variant: "warning",
                            message: "No existing rosters found."
                        }
                    })
                }
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage
                    }
                })
            }

        };

        initialApiCalls = async () => {
            await this.fetchHospitalsForDropdown();
            await this.fetchActiveSpecializationForDropdown();
            await this.fetchWeekdaysData();
            if (type === 'MANAGE') {
                await this.fetchActiveDoctors();
                await this.searchDoctorDutyRoster(1);
            }
        };

        prepareDataForPreview = async () => {
            const {doctorDutyRosterInfo, overrideRosters, weekDaysRosters} =
                this.props.DoctorDutyRosterPreviewReducer.doctorDutyRosterPreviewData;
            const {
                id, specializationName, specializationId, doctorId, doctorName, rosterGapDuration,
                fromDate, toDate, hasOverrideDutyRoster, hospitalId, hospitalName, status,
            } = doctorDutyRosterInfo && doctorDutyRosterInfo;

            return {
                id: id,
                hospital: {label: hospitalName, value: hospitalId},
                specialization: {label: specializationName, value: specializationId},
                doctor: {label: doctorName, value: doctorId},
                rosterGapDuration: rosterGapDuration,
                fromDate: new Date(fromDate),
                toDate: new Date(toDate),
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysRosters],
                doctorDutyRosterOverrideRequestDTOS: [...overrideRosters],
                status: status
            };
        };

        prepareDataForEdit = async doctorDutyRosterInfo => {
            const {
                id, hospital, specialization, doctor, rosterGapDuration,
                fromDate, toDate, hasOverrideDutyRoster, doctorWeekDaysDutyRosterRequestDTOS,
                doctorDutyRosterOverrideRequestDTOS, status
            } = doctorDutyRosterInfo;

            let weekDaysAvailabilityData = doctorWeekDaysDutyRosterRequestDTOS.map(weekDay => {
                weekDay.startTime = new Date(weekDay.startTime);
                weekDay.endTime = new Date(weekDay.endTime);
                weekDay.dayOffStatus = weekDay.dayOffStatus ? weekDay.dayOffStatus : 'N';
                return weekDay;
            });

            await this.setState({
                showEditModal: true,
                showAlert: false,
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate),
                    hospital: {...hospital},
                    specialization: {...specialization},
                    doctor: {...doctor},
                    doctorDutyRosterId: id,
                    hasOverrideDutyRoster: hasOverrideDutyRoster,
                    remarks: '',
                    rosterGapDuration: rosterGapDuration,
                    status: status,
                    weekDaysDutyRosterUpdateRequestDTOS: [...weekDaysAvailabilityData],
                    overridesUpdate: [...doctorDutyRosterOverrideRequestDTOS],
                    originalOverrides: [...doctorDutyRosterOverrideRequestDTOS]
                },
            })
        };

        saveDoctorDutyRoster = async () => {
            const {
                doctorDutyRosterOverrideRequestDTOS, doctor, doctorWeekDaysDutyRosterRequestDTOS, fromDate,
                hasOverrideDutyRoster, rosterGapDuration, specialization, status, toDate, hospital
            } = this.state;
            let dataToSave = {
                fromDate,
                toDate,
                specializationId: specialization ? specialization.value : '',
                doctorId: doctor ? doctor.value : '',
                hospitalId: hospital ? hospital.value : '',
                rosterGapDuration,
                doctorWeekDaysDutyRosterRequestDTOS,
                hasOverrideDutyRoster,
                doctorDutyRosterOverrideRequestDTOS,
                status,
            };
            const {saveSuccessMessage, saveErrorMessage} = this.props.DoctorDutyRosterSaveReducer;
            try {
                await this.props.createDoctorDutyRoster(CREATE_DOCTOR_DUTY_ROSTER, dataToSave);
                this.setState({
                    showConfirmModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: saveSuccessMessage ? saveSuccessMessage : 'Doctor Duty Roster saved successfully.'
                    },
                });
                this.resetAddForm();
            } catch (e) {
                this.setState({
                    showAlert: true,
                    showConfirmModal: false,
                    alertMessageInfo: {
                        variant: "danger",
                        message: saveErrorMessage ? saveErrorMessage : 'Error occurred while saving Doctor Duty Roster.'
                    },
                });
            }
        };

        searchDoctorDutyRoster = async page => {
            const {fromDate, toDate, hospital, specialization, doctor} = this.state.searchParameters;
            let searchData = {
                doctorId: doctor ? doctor.value : '',
                specializationId: specialization ? specialization.value : '',
                fromDate: fromDate,
                toDate: toDate
            };

            let updatedPage =
                this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);

            await this.props.fetchDoctorDutyRosterList(
                SEARCH_DOCTOR_DUTY_ROSTER,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            );

            await this.setState({
                totalRecords: this.props.DoctorDutyRosterListReducer.doctorDutyRosterList.length
                    ? this.props.DoctorDutyRosterListReducer.doctorDutyRosterList[0].totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        };

        deleteDoctorDutyRoster = async () => {
            try {
                await this.props.deleteDoctorDutyRoster(
                    DELETE_DOCTOR_DUTY_ROSTER,
                    this.state.deleteRequestDTO
                );
                await this.setState({
                    showDeleteModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: this.props.DoctorDutyRosterDeleteReducer.deleteSuccessMessage
                    }
                });
                await this.searchDoctorDutyRoster(1);
            } catch (e) {
                this.setState({
                    showDeleteModal: true,
                });
            }
        };

        editDoctorDutyRoster = async () => {
            const {
                doctorDutyRosterId, hasOverrideDutyRoster, remarks, rosterGapDuration, status,
                weekDaysDutyRosterUpdateRequestDTOS
            } = this.state.updateDoctorDutyRosterData;
            let updateData = {
                doctorDutyRosterId: doctorDutyRosterId,
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                remarks: remarks,
                rosterGapDuration: rosterGapDuration,
                status: status,
                weekDaysDutyRosterUpdateRequestDTOS: weekDaysDutyRosterUpdateRequestDTOS
            };
            const {editSuccessMessage} = this.props.DoctorDutyRosterEditReducer;
            try {
                await this.props.updateDoctorDutyRoster(UPDATE_DOCTOR_DUTY_ROSTER, updateData);
                this.setState({
                    showEditModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: editSuccessMessage ? editSuccessMessage : 'Doctor Duty Roster saved successfully.'
                    },
                });
                this.resetEditForm();
                await this.searchDoctorDutyRoster();
            } catch (e) {

            }
        };

        updateOverride = async (overrideData) => {
            try {
                return await this.props.updateDoctorDutyRosterOverride(UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE, overrideData);
            } catch (e) {
                throw e;
            }
        };

        deleteOverride = async (data, index) => {
            let deleteData = {
                id: this.state.deleteRequestDTO.id,
                status: 'N',
                remarks: this.state.deleteRequestDTO.remarks
            };
            try {
                await this.props.deleteDoctorDutyRosterOverride(DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE, deleteData);
                let overrides = [...this.state.updateDoctorDutyRosterData.overridesUpdate];
                overrides.splice(index, 1);
                this.setState({
                    updateDoctorDutyRosterData: {
                        ...this.state.updateDoctorDutyRosterData,
                        overridesUpdate: [...overrides]
                    },
                    showDeleteOverrideModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                });
            } catch (e) {
                this.setState({
                    deleteOverrideErrorMessage: e.errorMessage ? e.errorMessage : 'Error occurred while deleting override'
                })
            }
        };

        render() {
            const {
                showExistingRosterModal, hospital, specialization, doctor, rosterGapDuration, fromDate, toDate,
                doctorWeekDaysDutyRosterRequestDTOS, isWholeWeekOff,
                hasOverrideDutyRoster, overrideRequestDTO, doctorDutyRosterOverrideRequestDTOS,
                showAlert, alertMessageInfo, showAddOverrideModal, isModifyOverride, formValid, showConfirmModal,
                existingRosterTableData, existingDoctorWeekDaysAvailability, existingOverrides,
                searchParameters, queryParams, totalRecords, showDeleteModal, deleteRequestDTO,
                showEditModal, updateDoctorDutyRosterData, overrideUpdateErrorMessage, showDeleteOverrideModal,
                deleteOverrideErrorMessage
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            const {activeSpecializationList, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;
            const {doctorsBySpecializationForDropdown, doctorDropdownErrorMessage, activeDoctorsForDropdown} = this.props.DoctorDropdownReducer;

            const {isSaveRosterLoading} = this.props.DoctorDutyRosterSaveReducer;
            const {deleteErrorMessage} = this.props.DoctorDutyRosterDeleteReducer;
            const {editErrorMessage} = this.props.DoctorDutyRosterEditReducer;
            const {doctorDutyRosterList, isSearchRosterLoading, searchErrorMessage} = this.props.DoctorDutyRosterListReducer;
            return (<>
                <ComposedComponent
                    {...props}
                    doctorInfoData={
                        {
                            hospital: hospital,
                            specialization: specialization,
                            doctor: doctor,
                            rosterGapDuration: rosterGapDuration,
                            fromDate: fromDate,
                            toDate: toDate
                        }
                    }
                    overrideData={{...overrideRequestDTO}}
                    doctorAvailabilityData={doctorWeekDaysDutyRosterRequestDTOS}
                    hospitalList={hospitalsForDropdown}
                    specializationList={activeSpecializationList}
                    specializationDropdownError={dropdownErrorMessage}
                    doctorList={doctorsBySpecializationForDropdown}
                    activeDoctorList={activeDoctorsForDropdown}
                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                    showExistingRosterModal={showExistingRosterModal}
                    wholeWeekOff={isWholeWeekOff}
                    handleWholeWeekOff={this.handleWholeWeekOff}
                    handleShowExistingRoster={this.handleShowExistingRoster}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleDoctorAvailabilityFormChange={this.handleDoctorAvailabilityFormChange}
                    handleEnter={this.handleEnter}
                    getExistingRoster={this.getExistingRoster}
                    hasOverrideDutyRoster={hasOverrideDutyRoster}
                    doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}
                    handleOverrideDutyRoster={this.handleOverrideDutyRoster}
                    showAddOverrideModal={showAddOverrideModal}
                    setShowAddOverrideModal={this.setShowAddOverrideModal}
                    handleOverrideFormInputChange={this.handleOverrideFormInputChange}
                    addOverride={this.handleAddOverride}
                    onModifyOverride={this.handleModifyOverride}
                    onRemoveOverride={this.handleRemoveOverride}
                    isModifyOverride={isModifyOverride}
                    formValid={formValid}
                    showConfirmModal={showConfirmModal}
                    setShowConfirmModal={this.setShowModal}
                    saveDoctorDutyRoster={this.saveDoctorDutyRoster}
                    onSaveButtonClick={this.handleSaveButtonClick}
                    isSaveRosterLoading={isSaveRosterLoading}
                    existingRosterTableData={existingRosterTableData}
                    onViewDetailsExisting={this.handleViewDetailsExisting}
                    existingDoctorWeekDaysAvailability={existingDoctorWeekDaysAvailability}
                    existingOverrides={existingOverrides}
                    searchParameters={searchParameters}
                    resetSearchForm={this.resetSearchForm}
                    searchDoctorDutyRoster={() => this.searchDoctorDutyRoster(1)}
                    onSearchInputChange={this.handleSearchInputChange}
                    isSearchRosterLoading={isSearchRosterLoading}
                    searchErrorMessage={searchErrorMessage}
                    doctorDutyRosterList={doctorDutyRosterList}
                    paginationData={{...queryParams, totalRecords}}
                    handlePageChange={this.handlePageChange}
                    onPreviewHandler={this.handlePreview}
                    onDeleteHandler={this.handleDelete}
                    onEditHandler={this.handleEdit}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={this.setShowModal}
                    remarksHandler={this.handleDeleteRemarksChange}
                    remarks={deleteRequestDTO.remarks}
                    deleteDoctorDutyRoster={this.deleteDoctorDutyRoster}
                    deleteErrorMessage={deleteErrorMessage}
                    showEditModal={showEditModal}
                    setShowModal={this.setShowModal}
                    updateDoctorDutyRosterData={updateDoctorDutyRosterData}
                    editErrorMessage={editErrorMessage}
                    overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                    editDoctorDutyRoster={this.editDoctorDutyRoster}
                    setShowDeleteOverrideModal={this.setShowDeleteOverrideModal}
                    showDeleteOverrideModal={showDeleteOverrideModal}
                    deleteOverrideErrorMessage={deleteOverrideErrorMessage}
                    deleteOverride={this.deleteOverride}
                />
                <CModal
                    show={showConfirmModal}
                    modalHeading="Doctor Duty Roster Details"
                    size="xl"
                    bodyChildren={
                        <DoctorDutyRosterPreviewModal
                            doctorInfoData={{
                                hospital: hospital,
                                specialization: specialization,
                                doctor: doctor,
                                rosterGapDuration: rosterGapDuration,
                                fromDate: fromDate,
                                toDate: toDate
                            }}
                            doctorAvailabilityData={doctorWeekDaysDutyRosterRequestDTOS}
                            hasOverrideDutyRoster={hasOverrideDutyRoster}
                            doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}/>
                    }
                    footerChildren={type === 'ADD' ?
                        <CButton
                            variant="primary"
                            name={isSaveRosterLoading ? 'Confirming' : 'Confirm'}
                            disabled={isSaveRosterLoading}
                            size="lg"
                            className="float-right btn-action mr-3"
                            onClickHandler={this.saveDoctorDutyRoster}/> : ''
                    }
                    onHide={this.setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
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
            </>);
        }
    }

    return ConnectHoc(
        DoctorDutyRoster,
        [
            'DoctorDropdownReducer',
            'DoctorDutyRosterDeleteReducer',
            'DoctorDutyRosterEditReducer',
            'DoctorDutyRosterListReducer',
            'DoctorDutyRosterPreviewReducer',
            'DoctorDutyRosterSaveReducer',
            'HospitalDropdownReducer',
            'SpecializationDropdownReducer',
            'WeekdaysReducer',
        ],
        {
            clearDDRSuccessErrorMessage,
            createDoctorDutyRoster,
            deleteDoctorDutyRoster,
            fetchActiveDoctorsForDropdown,
            fetchActiveHospitalsForDropdown,
            fetchDoctorDutyRosterDetailById,
            fetchDoctorDutyRosterList,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchExistingDoctorDutyRoster,
            fetchExistingDoctorDutyRosterDetails,
            fetchSpecializationForDropdown,
            fetchWeekdays,
            updateDoctorDutyRoster,
            updateDoctorDutyRosterOverride,
            deleteDoctorDutyRosterOverride
        })
};

export default DoctorDutyRosterHOC;
