import {PatientDetailsActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const fetchPatientMetaDropdown = (path, id) => async dispatch => {
  dispatch(PatientDetailsActions.patientActiveDropdownFetchingStart())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      PatientDetailsActions.patientActiveDropdownFetchingSuccess(response.data)
    )
    return response.data
  } catch (e) {
    dispatch(
      PatientDetailsActions.patientActiveDropdownFetchingError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const clearPatientDetails = () => async dispatch => {
  dispatch(PatientDetailsActions.clearPatientDropdownSuccessMessage())
}

export const editPatient = (path, data) => async dispatch => {
  dispatch(PatientDetailsActions.patientEditPending())
  try {
    const response = await Axios.put(path, data)
    dispatch(PatientDetailsActions.patientEditSuccess(response.data))
    return response.data
  } catch (e) {
    dispatch(
      PatientDetailsActions.patientEditError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const clearPatientPreview = () => async dispatch => {
  dispatch(PatientDetailsActions.clearPatientPreviewMessage())
}

export const previewPatient = (path, id) => async dispatch => {
  dispatch(PatientDetailsActions.patientPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(PatientDetailsActions.patientPreviewSuccess(response.data))
    return response.data
  } catch (e) {
    dispatch(
      PatientDetailsActions.patientPreviewError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const fetchPatientMetaList = (
  path,
  pagination,
  searchData
) => async dispatch => {
  dispatch(PatientDetailsActions.patientSearchStart())
  try {
    const response = await Axios.putWithPagination(path, pagination, searchData)
    dispatch(PatientDetailsActions.patientSearchSuccess(response.data))
    return response.data
  } catch (e) {
    dispatch(
      PatientDetailsActions.patientSearchError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}
