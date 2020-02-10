import {appointmentDetailsConstants} from '@frontend-appointment/action-module'

const {
  CLEAR_REFUND_LIST_MESSAGE,
  REFUND_FETCH_ERROR,
  REFUND_FETCH_START,
  REFUND_FETCH_SUCCESS,
  APPROVAL_FETCH_ERROR,
  APPROVAL_FETCH_START,
  APPROVAL_FETCH_SUCCESS,
  CLEAR_APPROVAL_LIST_MESSAGE,
  CLEAR_LOG_LIST_MESSAGE,
  CLEAR_STATUS_LIST_MESSAGE,
  LOG_FETCH_ERROR,
  LOG_FETCH_START,
  LOG_FETCH_SUCCESS,
  STATUS_FETCH_ERROR,
  STATUS_FETCH_START,
  STATUS_FETCH_SUCCESS
} = appointmentDetailsConstants

const initialState = {
  refundList: [],
  isRefundListLoading: true,
  refundErrorMessage: '',
  totalRefundAmount: '',
  totalItems: ''
}
const appointmentLogState = {
  logList: [],
  isLogListLoading: true,
  logErrorMessage: '',
  totalAmount: '',
  totalItems: ''
}

const appointmentApprovalState = {
  approvalList: [],
  isApprovalListLoading: true,
  approvalErrorMessage: '',
  totalAmount: '',
  totalItems: ''
}

const appointmentStatusState = {
  statusList: [],
  isStatusListLoading: true,
  statusErrorMessage: '',
  totalAmount: '',
  totalItems: ''
}
export const AppointmentRefundListReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case REFUND_FETCH_START:
      return {
        ...state,
        refundList: [],
        isRefundListLoading: true,
        refundErrorMessage: '',
        totalRefundAmount: '',
        totalItems: ''
      }
    case REFUND_FETCH_SUCCESS:
      return {
        ...state,
        refundList: [...action.payload.data.refundAppointments],
        isRefundListLoading: false,
        refundErrorMessage: '',
        totalRefundAmount: action.payload.data.totalRefundAmount,
        totalItems: action.payload.data.totalItems
      }
    case REFUND_FETCH_ERROR:
      return {
        ...state,
        refundList: [],
        isRefundListLoading: false,
        refundErrorMessage: action.payload.data,
        totalRefundAmount: '',
        totalItems: ''
      }
    case CLEAR_REFUND_LIST_MESSAGE:
      return {
        ...state,
        refundErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentLogListReducer = (
  state = {...appointmentLogState},
  action
) => {
  switch (action.type) {
    case LOG_FETCH_START:
      return {
        ...state,
        logList: [],
        isLogListLoading: true,
        logErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case LOG_FETCH_SUCCESS:
      return {
        ...state,
        logList: action.payload.data,
        isLogListLoading: true,
        logErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case LOG_FETCH_ERROR:
      return {
        ...state,
        logList: [],
        isLogListLoading: true,
        logErrorMessage: action.payload.data,
        totalAmount: '',
        totalItems: ''
      }
    case CLEAR_LOG_LIST_MESSAGE:
      return {
        ...state,
        logErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentApprovalListReducer = (
  state = {...appointmentApprovalState},
  action
) => {
  switch (action.type) {
    case APPROVAL_FETCH_START:
      return {
        ...state,
        approvalList: [],
        isApprovalListLoading: true,
        approvalErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case APPROVAL_FETCH_SUCCESS:
      return {
        ...state,
        approvalList: action.payload.data,
        isApprovalListLoading: true,
        approvalErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case APPROVAL_FETCH_ERROR:
      return {
        ...state,
        approvalList: [],
        isApprovalListLoading: true,
        approvalErrorMessage: action.payload.data,
        totalAmount: '',
        totalItems: ''
      }
    case CLEAR_APPROVAL_LIST_MESSAGE:
      return {
        ...state,
        approvalErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentStatusListReducer = (
    state = {...appointmentStatusState},
    action
  ) => {
    switch (action.type) {
      case STATUS_FETCH_START:
        return {
          ...state,
          statusList: [],
          isStatusListLoading: true,
          statusErrorMessage: '',
          totalAmount: '',
          totalItems: ''
        }
      case STATUS_FETCH_SUCCESS:
        return {
          ...state,
          statusList:action.payload.data,
          isStatusListLoading: true,
          statusErrorMessage: '',
          totalAmount: '',
          totalItems: ''
        }
      case STATUS_FETCH_ERROR:
        return {
          ...state,
          statusList: [],
          isStatusListLoading: true,
          statusErrorMessage: '',
          totalAmount: '',
          totalItems: ''
        }
      case CLEAR_STATUS_LIST_MESSAGE:
        return {
          ...state,
          statusErrorMessage: ''
        }
      default:
        return {...state}
    }
  }
  
