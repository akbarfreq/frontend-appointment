import {signinUser} from './src/login-middleware'
import {
  clearAdminSuccessErrorMessagesFromStore,
  clearErrorMessageForDropdown,
  clearSuccessErrorMessagesFromStore,
  createAdmin,
  createProfile,
  deleteAdmin,
  deleteProfile,
  DepartmentSetupMiddleware,
  DoctorDutyRosterMiddleware,
  DoctorMiddleware,
  editAdmin,
  editProfile,
  fetchActiveProfileListForDropdown,
  fetchActiveProfilesByDepartmentId,
  fetchAdminList,
  fetchAdminMetaInfo,
  fetchAllProfileListForSearchDropdown,
  fetchProfileList,
  fetchProfileListBySubDepartmentId,
  HospitalSetupMiddleware,
  previewAdmin,
  previewProfile,
  QualificationSetupMiddleware,
  SpecializationSetupMiddleware,
  PatientDetailsMiddleware
} from './src/admin-middleware'
import {fetchUserMenus} from './src/menu-middleware'
import {fetchLoggedInAdminUserInfo} from './src/logged-in-admin-info-middleware'
import {logoutUser} from './src/logout-middleware'
import {
  changePassword,
  resetPassword,
  savePassword,
  verifyToken
} from './src/password-save-middleware'
import * as WeekdaysMiddleware from './src/weekdays-middleware/weekdaysMiddleware'
import * as AppointmentDetailsMiddleware from './src/admin-middleware/appointment-details-middleware/appointmentDetailsMiddleware'
import * as DashboardDetailsMiddleware from './src/dashboard-middleware/dashboardMiddleware'
import * as ForgotPasswordMiddleware from './src/forgot-password-and-verification-middleware/forgotPasswordAndVerificationMiddleware'
export {
  AppointmentDetailsMiddleware,
  changePassword,
  clearAdminSuccessErrorMessagesFromStore,
  clearErrorMessageForDropdown,
  clearSuccessErrorMessagesFromStore,
  createAdmin,
  createProfile,
  DashboardDetailsMiddleware,
  deleteAdmin,
  deleteProfile,
  DepartmentSetupMiddleware,
  DoctorDutyRosterMiddleware,
  DoctorMiddleware,
  editAdmin,
  editProfile,
  fetchActiveProfileListForDropdown,
  fetchAdminList,
  fetchAdminMetaInfo,
  fetchAllProfileListForSearchDropdown,
  fetchLoggedInAdminUserInfo,
  fetchProfileList,
  fetchProfileListBySubDepartmentId,
  fetchUserMenus,
  fetchActiveProfilesByDepartmentId,
  HospitalSetupMiddleware,
  logoutUser,
  previewAdmin,
  previewProfile,
  resetPassword,
  savePassword,
  signinUser,
  SpecializationSetupMiddleware,
  QualificationSetupMiddleware,
  verifyToken,
  WeekdaysMiddleware,
  PatientDetailsMiddleware,
  ForgotPasswordMiddleware
}
