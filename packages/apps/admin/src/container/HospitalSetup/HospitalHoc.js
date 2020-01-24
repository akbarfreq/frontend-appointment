import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {HospitalSetupMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  FileExportUtils,
  AdminInfoUtils
} from '@frontend-appointment/helpers'
import './specialization.scss'
const {
  clearHospitalCreateMessage,
  createHospital,
  deleteHospital,
  editHospital,
  previewHospital,
  searchHospital,
  //downloadExcelForHospitals
} = HospitalSetupMiddleware
const HospitalHOC = (ComposedComponent, props, type) => {
  const {hostpitalSetupApiConstants} = AdminModuleAPIConstants
  class HospitalSetup extends React.PureComponent {
    state = {
      hospitalData: {
        name: '',
        address: '',
        panNumber: '',
        status: '',
        hospitalCode: '',
        contactNumber: [],
        contactNumberUpdateRequestDTOS: []
      },
      hospitalLogo: '',
      formValid: false,
      nameValid: false,
      codeValid: false,
      logoValid: false,
      showConfirmModal: false,
      errorMessageForHospitalName:
        'Specialization Name should not contain special characters',
      errorMessageForHospitalCode:
        'Specialization Code should not contain special characters',
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showHospitalModal: false,
      showEditModal: false,
      deleteModalShow: false,
      searchParameters: {
        code: '',
        id: null,
        name: '',
        status: {value: '', label: 'All'}
      },
      queryParams: {
        page: 0,
        size: 10
      },
      deleteRequestDTO: {
        id: 0,
        remarks: '',
        status: 'D'
      },
      totalRecords: 0
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    setShowModal = () => {
      this.setState({
        showHospitalModal: false,
        deleteModalShow: false,
        showEditModal: false
      })
    }

    resetHospitalStateValues = () => {
      this.setState({
        hospitalData: {
          name: '',
          address: '',
          panNumber: '',
          status: '',
          hospitalCode: '',
          contactNumber: [],
          contactNumberUpdateRequestDTOS: []
        },
        hospitalLogo: '',
        formValid: false,
        nameValid: false,
        codeValid: false,
        showEditModal: false
      })
    }

    checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
      let stateObj = {[fieldName]: valueToChange}
      if (eventName)
        if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
      return {...stateObj}
    }

    setTheState = async (fieldName, valueToChange, valid, eventName) => {
      await this.setState(
        this.checkInputValidity(fieldName, valueToChange, valid, eventName)
      )
    }

    closeAlert = () => {
      this.props.clearHospitalCreateMessage()
      this.setState({
        showAlert: !this.state.showAlert,
        alertMessageInfo: ''
      })
    }

    checkFormValidity = eventType => {
      const {hospitalData, nameValid} = this.state
      let formValidity =
        nameValid &&
        hospitalData.name &&
        hospitalData.code &&
        hospitalData.status

      if (eventType === 'E')
        formValidity =
          formValidity &&
          hospitalData.remarks &&
          hospitalData.contactNumberUpdateRequestDTOS.length
      else formValidity = formValidity && hospitalData.contactNumber
      this.setState({
        formValid: formValidity
      })
    }

    addContactNumber = (eventType, fieldName, value) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].push(value);
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    removeContactNumber = (eventType, fieldName, idx) => {
     let hospitalData = {...this.state.hospitalData};
     const filteredHospitalData = hospitalData[fieldName].splice(idx,1);
     this.setTheState('hospitalData', filteredHospitalData);
     this.checkFormValidity(eventType);
    }
    
    editContactNumber = (eventType,fieldName,value,idx) => {
      let hospitalData = {...this.state.hospitalData};
      hospitalData[fieldName][idx]=value
      this.setTheState('hospitalData', filteredHospitalData);
      this.checkFormValidity(eventType);
    }

    
    handleOnChange = async (event, fieldValid, eventType) => {
      let hospital = {...this.state.hospitalData}
      let {name, value, label} = event.target
      value = name === 'code' ? value.toUpperCase() : value
      hospital[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState('hospitalData', hospital, fieldValid, name)
      this.checkFormValidity(eventType)
    }

    setShowConfirmModal = () => {
      this.setState({showConfirmModal: !this.state.showConfirmModal})
    }

    handleConfirmClick = async () => {
      const {name, code, status} = this.state.specializationData
      try {
        await this.props.createHospital(
          hostpitalSetupApiConstants.CREATE_HOSPITAL,
          {
            name,
            code,
            status
          }
        )
        this.resetHospitalStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalSaveReducer
                    .createHospitalsuccessMessage
          }
        })
      } catch (e) {
        await this.setShowConfirmModal()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: e.errorMessage ? e.errorMessage : e.message
          }
        })
      }
    }

    previewApiCall = async id => {
      await this.props.previewHospital(
        hostpitalSetupApiConstants.FETCH_HOSPITAL_DETAILS,
        id
      )
    }

    onPreviewHandler = async id => {
      try {
        await this.previewApiCall(id)
        this.setState({
          showHospitalModal: true
        })
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.HospitalPreviewReducer
              .hospitalPreviewErrorMessage
          }
        })
      }
    }

    onEditHandler = async id => {
      this.props.clearHospitalCreateMessage()
      try {
        await this.previewApiCall(id)
        const {
          name,
          code,
          status,
          remarks
        } = this.props.HospitalPreviewReducer.hospitalPreviewData
        let formValid = this.state.formValid
        if (remarks) formValid = true
        this.setState({
          showEditModal: true,
          specializationData: {
            id: id,
            name: name,
            code: code,
            status: status,
            remarks: remarks
          },
          formValid: formValid
        })
      } catch (e) {
        console.log(e)
      }
    }

    searchHospital = async page => {
      const {code, name, status, id} = this.state.searchParameters
      let searchData = {
        name: name,
        code: code,
        status: status.value,
        id: id
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.searchHospital(
        hostpitalSetupApiConstants.SEARCH_HOSPITAL,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )

      await this.setState({
        totalRecords: this.props.HospitalSearchReducer.hospitalList
          .length
          ? this.props.HospitalSearchReducer.hospitalList[0]
              .totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    appendSNToTable = hospitalList => {
      const newHospitalList =
        hospitalList.length &&
        hospitalList.map((spec, index) => ({
          ...spec,
          sN: index + 1,
          name: spec.name.toUpperCase()
        }))
      return newHospitalList;
    }
    
    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchSpecialization()
    }

    editHospital = async () => {
      try {
        await this.props.editHospital(
          hostpitalSetupApiConstants.EDIT_HOSPITAL,
          this.state.specializationData
        )
        this.resetHospitalStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalEditReducer
              .hospitalEditSuccessMessage
          }
        })
        await this.searchSpecialization()
      } catch (e) {}
    }

    onDeleteHandler = async id => {
      this.props.clearHospitalCreateMessage()
      let deleteRequestDTO = {...this.state.deleteRequestDTO}
      deleteRequestDTO['id'] = id
      await this.setState({
        deleteRequestDTO: deleteRequestDTO,
        deleteModalShow: true
      })
    }

    deleteRemarksHandler = event => {
      const {name, value} = event.target
      let deleteRequest = {...this.state.deleteRequestDTO}
      deleteRequest[name] = value
      this.setState({
        deleteRequestDTO: deleteRequest
      })
    }

    onSubmitDeleteHandler = async () => {
      try {
        await this.props.deleteHospital(
          hostpitalSetupApiConstants.DELETE_HOSPITAL,
          this.state.deleteRequestDTO
        )
        await this.setState({
          deleteModalShow: false,
          deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalDeleteReducer.deleteSuccessMessage
          },
          showAlert: true
        })
        await this.searchSpecialization()
      } catch (e) {
        this.setState({
          deleteModalShow: true
        })
      }
    }
    
    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          code: '',
          status: {value: '', label: 'All'},
          name: '',
          id: null
        }
      })
      this.searchSpecialization()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    handleSearchFormChange = async event => {
      if (event) {
        let fieldName = event.target.name
        let value = event.target.value
        let label = event.target.label
        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        await this.setStateValuesForSearch(searchParams)
      }
    }
    setFormValidManage = () => {
      this.setState({
        formValid: true
      })
    }
    async componentDidMount () {
      if (type === 'M') {
        await this.searchSpecialization()
        //this.setFormValidManage();
      }
    }
    render () {
      const {
        hospitalData,
        showAlert,
        showConfirmModal,
        formValid,
        codeValid,
        nameValid,
        errorMessageForHospitalCode,
        errorMessageForHospitalName,
        alertMessageInfo,
        showHospitalModal,
        showEditModal,
        deleteModalShow,
        searchParameters,
        queryParams,
        deleteRequestDTO,
        totalRecords
      } = this.state

      const {
        isSearchLoading,
        hospitalList,
        searchErrorMessage
      } = this.props.HospitalSearchReducer

      const {
        hospitalPreviewData,
        isPreviewLoading,
        hospitalPreviewErrorMessage
      } = this.props.HospitalPreviewReducer

      const {
        hospitalEditErrorMessage
      } = this.props.HospitalEditReducer

      const {deleteErrorMessage} = this.props.HospitalDeleteReducer
      return (
        <ComposedComponent
          {...this.props}
          {...props}
          handleEnter={this.handleEnterPress}
          hospitalData={hospitalData}
          resetStateAddValues={this.resetHospitalStateValues}
          closeAlert={this.closeAlert}
          showConfirmModal={showConfirmModal}
          formValid={formValid}
          showAlert={showAlert}
          codeValid={codeValid}
          nameValid={nameValid}
          errorMessageForHospitalCode={errorMessageForHospitalCode}
          errorMessageForHospitalName={errorMessageForHospitalName}
          alertMessageInfo={alertMessageInfo}
          handleInputChange={this.handleOnChange}
          submitAddChanges={this.handleConfirmClick}
          setShowConfirmModal={this.setShowConfirmModal}
          handleSearchFormChange={this.handleSearchFormChange}
          deleteRemarksHandler={this.deleteRemarksHandler}
          resetSearch={this.handleSearchFormReset}
          searchHospital={this.searchHospital}
          handlePageChange={this.handlePageChange}
          handleSearchFormChange={this.handleSearchFormChange}
          onSubmitDeleteHandler={this.onSubmitDeleteHandler}
          editHospital={this.editSpeclization}
          onEditHandler={this.onEditHandler}
          onDeleteHandler={this.onDeleteHandler}
          onPreviewHandler={this.onPreviewHandler}
          // appendSNToTable={this.appendSNToTable}
          setShowModal={this.setShowModal}
          showHospitalModal={showHospitalModal}
          showEditModal={showEditModal}
          deleteModalShow={deleteModalShow}
          searchParameters={searchParameters}
          queryParams={queryParams}
          deleteRequestDTO={deleteRequestDTO}
          totalRecords={totalRecords}
          isSearchLoading={isSearchLoading}
          specializationList={this.appendSNToTable(hospitalList)}
          searchErrorMessage={searchErrorMessage}
          specializationPreviewErrorMessage={hospitalPreviewErrorMessage}
          deleteErrorMessage={deleteErrorMessage}
          specializationEditErrorMessage={hospitalEditErrorMessage}
          isPreviewLoading={isPreviewLoading}
          specializationPreviewData={hospitalPreviewData}
          addContactNumber={this.addContactNumber}
          removeContactNumber={this.removeContactNumber}
          editContactNumber={this.editContactNumber}
        ></ComposedComponent>
      )
    }
  }
  return ConnectHoc(
    HospitalSetup,
    [
      'HospitalSaveReducer',
      'HospitalDeleteReducer',
      'HospitalEditReducer',
      'HospitalPreviewReducer',
      'HospitalSearchReducer'
    ],
    {
      clearHospitalCreateMessage,
      createHospital,
      deleteHospital,
      editHospital,
      previewHospital,
      searchHospital,
    }
  )
}
export default HospitalHOC
