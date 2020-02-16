import {patientDetailsConstants} from './patientDetailActionConstants'

const {
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_START,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS,
  PATIENT_CLEAR_DROPDOWN_META,
  PATIENT_EDIT_ERROR,
  PATIENT_EDIT_PENDING,
  PATIENT_EDIT_SUCCESS,
  PATIENT_LIST_ERROR,
  PATIENT_LIST_PENDING,
  PATIENT_LIST_SUCCESS,
  PATIENT_PREVIEW_ERROR,
  PATIENT_PREVIEW_PENDING,
  CLEAR_PATIENT_EDIT_MESSAGE,
  CLEAR_PATIENT_PREVIEW_MESSAGE,
  PATIENT_PREVIEW_SUCCESS
} = patientDetailsConstants

export const patientActiveDropdownFetchingStart = () => {
  return {
    type: PATIENT_ACTIVE_DROPDOWN_META_FETCH_START
  }
}

export const patientActiveDropdownFetchingSuccess = data => {
  return {
    type: PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS,
    payload: {data}
  }
}

export const patientActiveDropdownFetchingError = message => {
  return {
    type: PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const clearPatientDropdownSuccessMessage = () => {
  return {
    type: PATIENT_CLEAR_DROPDOWN_META
  }
}

export const patientSearchStart = () => {
  return {
    type: PATIENT_LIST_PENDING
  }
}

export const patientSearchSuccess = data => {
  return {
    type: PATIENT_LIST_SUCCESS,
    payload: {data}
  }
}

export const patientSearchError = message => {
  return {
    type: PATIENT_LIST_ERROR,
    payload: {
      data: message
    }
  }
}

export const patientEditPending = () => {
  return {
    type: PATIENT_EDIT_PENDING
  }
}

export const patientEditSuccess = data => {
  return {
    type: PATIENT_EDIT_SUCCESS,
    payload: {data}
  }
}

export const patientEditError = message => {
  return {
    type: PATIENT_EDIT_ERROR,
    payload: {
      data: message
    }
  }
}

export const patientPreviewPending = () => {
  return {
    type: PATIENT_PREVIEW_PENDING
  }
}

export const patientPreviewSuccess = data => {
  return {
    type: PATIENT_PREVIEW_SUCCESS,
    payload: {data}
  }
}

export const patientPreviewError = message => {
  return {
    type: PATIENT_PREVIEW_ERROR,
    payload: {
      data: message
    }
  }
}

export const clearPatientEditMessage = () => {
  return {
    type: CLEAR_PATIENT_EDIT_MESSAGE
  }
}

export const clearPatientPreviewMessage = () => {
  return {
    type: CLEAR_PATIENT_PREVIEW_MESSAGE
  }
}
