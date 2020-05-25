import {HospitalApiIntegrationActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const fetchFeatureTypeForDrodown = path => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalFeatureTypeDropdownPending())
  try {
    const response = await Axios.get(path)
    dispatch(
      HospitalApiIntegrationActions.hospitalFeatureTypeDropdownSuccess(
        response.data
      )
    )
    // return response.data;
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalFeatureTypeDropdownError(
        e.errorMessage
      )
    )
  }
}

export const saveHospitalIntegration = (
  path,
  integrationData
) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiSavePending())
  try {
    let response = await Axios.post(path, integrationData)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiSaveSuccess(
        'Hospital Api Integrated Successfully.'
      )
    )
    return response
  } catch (e) {
    dispatch(HospitalApiIntegrationActions.hospitalApiSaveError(e.errorMessage))
    throw e
  }
}

export const fetchRequestMethodDropdown = path => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalRequestMethodDropdownPending())
  try {
    const response = await Axios.get(path)
    dispatch(
      HospitalApiIntegrationActions.hospitalRequestMethodDropdownSuccess(
        response.data
      )
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalRequestMethodDropdownError(
        e.errorMessage
      )
    )
  }
}

export const searchApiIntegrationData = (
  path,
  pagination,
  searchData
) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiSearchPending())
  try {
    const response = await Axios.putWithPagination(path, pagination, searchData)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiSearchSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalApiSearchError(e.errorMessage)
    )
  }
}

export const editApiIntegrationData = (path, data) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiEditPending())
  try {
    const response = await Axios.put(path, data)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiEditSuccess(response.data)
    )
  } catch (e) {
    dispatch(HospitalApiIntegrationActions.hospitalApiEditError(e.errorMessage))
  }
}

export const previewApiIntegrationData = (path, id) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiPreviewSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hopitalApiPreviewError(e.errorMessage)
    )
  }
}

export const deleteApiIntegrationData = (path, data) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiDeletePending())
  try {
    const response = await Axios.del(path, data)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiDeleteSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalApiDeleteError(e.errorMessage)
    )
  }
}
