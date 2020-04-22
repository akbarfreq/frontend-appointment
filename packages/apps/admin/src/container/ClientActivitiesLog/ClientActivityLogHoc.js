import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AdminLoggingMiddleware,
  HospitalSetupMiddleware,
  fetchAdminMetaInfoByHospitalId,
  clearAdminSuccessErrorMessagesFromStore
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {EnterKeyPressUtils} from '@frontend-appointment/helpers'
import './activity-log.scss'
import {
  DateTimeFormatterUtils,
  menuRoles,
  LocalStorageSecurity
} from '@frontend-appointment/helpers'
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchAdminLog, fetchAdminLogStatistics,fetchAdminDiagramStatistics} = AdminLoggingMiddleware

const AdminActivityLogHOC = (ComposedComponent, props, type) => {
  const {
    hospitalSetupApiConstants,
    adminLoggingConstant,
    adminSetupAPIConstants
  } = AdminModuleAPIConstants

  class AdminActivityLogDetails extends React.PureComponent {
    state = {
      searchParameters: {
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        toDate: new Date(),
        hospitalId: '',
        parentId: '',
        roleId: '',
        adminMetaInfoId:''
      },
      queryParams: {
        page: 0,
        size: 4
      },
      statsQueryParams: {
        page: 0,
        size: 4
      },
      statsTotalRecord: 0,
      totalRecords: 0,
      showModal: false,
      previewData: {},
      rolesList: [],
      menuList: []
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    searchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveHospitalsForDropdown(
          hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
        )
      } catch (e) {
        console.log(e)
      }
    }
    searchHospitalAdminDropDown = async (id)=> {
      try{
        await this.props.fetchAdminMetaInfoByHospitalId(adminSetupAPIConstants.FETCH_ADMIN_META_INFO_BY_HOSPITAL_ID,id)
      }catch(e){
        console.log(e);
      }
    }

    searchAdminActivityLog = async (page, pageChange) => {
      const {
        fromDate,
        hospitalId,
        parentId,
        roleId,
        toDate,
        userName,
        adminMetaInfoId
      } = this.state.searchParameters
      let searchData = {
        fromDate,
        toDate,
        userName,
        hospitalId: hospitalId.value || '',
        parentId: parentId.value || '',
        roleId: roleId.value || '',
        adminMetaInfoId:adminMetaInfoId.value||''
      }
      if (pageChange === 'A') {
        let updatedPage =
          this.state.queryParams.page === 0
            ? 1
            : page
            ? page
            : this.state.queryParams.page
        await this.props.fetchAdminLog(
          adminLoggingConstant.FETCH_CLIENT_LOG,
          {
            page: updatedPage,
            size: this.state.queryParams.size
          },
          searchData
        )

        await this.setState({
          totalRecords: this.props.AdminLoggingSearchReducer.logSearchData
            .length
            ? this.props.AdminLoggingSearchReducer.totalItems
            : 0,
          queryParams: {
            ...this.state.queryParams,
            page: updatedPage
          }
        })
      }
      if (pageChange === 'B') {
        let updatedPage =
          this.state.statsQueryParams.page === 0
            ? 1
            : page
            ? page
            : this.state.statsQueryParams.page
        await this.props.fetchAdminLogStatistics(
          adminLoggingConstant.FETCH_CLIENT_LOG_STATS,
          {
            page: updatedPage,
            size: this.state.queryParams.size
          },
          searchData
        )
        await this.setState({
          statsTotalRecord: this.props.AdminLoggingStatsSearchReducer
            .logStatsSearchData.length
            ? this.props.AdminLoggingStatsSearchReducer.totalItems
            : 0,
          statsQueryParams: {
            ...this.state.statsQueryParams,
            page: updatedPage
          }
        })
      }
      if (pageChange === 'C') {
        await this.props.fetchAdminDiagramStatistics(
          adminLoggingConstant.FETCH_CLIENT_CHART,
          searchData
        )
      }
    }

    appendSNToTable = logList => {
      let newLogList = []
      if (logList.length)
        newLogList = logList.map((spec, index) => ({
          ...spec,
          sN: index + 1
        }))

      return newLogList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchAdminActivityLog('', 'A')
    }

    handlePageChangeStats = async newPage => {
      await this.setState({
        statsQueryParams: {
          ...this.state.statsQueryParams,
          page: newPage
        }
      })
      this.searchAdminActivityLog('', 'B')
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentNumber: '',
          fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
          toDate: new Date(),
          hospitalId: '',
          parentId: '',
          roleId: '',
          adminMetaInfoId:''
        }
      })
      this.searchAdminActivityLog('','A')
      this.searchAdminActivityLog('','B')
      this.props.clearAdminSuccessErrorMessagesFromStore();
       
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    previewCall = data => {
      this.setState({
        previewData: data,
        showModal: true
      })
    }

    handleSearchFormChange = async (event, field) => {
      if (event) {
        let fieldName, value, label
        if (field) {
          fieldName = field
          value = event
        } else {
          fieldName = event.target.name
          value = event.target.value
          label = event.target.label
        }
        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        if(fieldName ==='hospitalId'){
          this.searchHospitalAdminDropDown(value);
          searchParams['adminMetaInfoId']=''
        }
        await this.setStateValuesForSearch(searchParams)
      }
    }

    setShowModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }))
    }

    makeRoleData = () => {
      const roles =
        menuRoles && menuRoles.length
          ? menuRoles
              .map(menu => ({
                value: menu.id,
                label: menu.name,
                isTab: menu.parent_role_id ? true : false
              }))
              .filter(filMenu => filMenu.isTab)
          : []
      this.setState({
        rolesList: [...roles]
      })
    }

    makeMenuData = () => {
      const assignedMenus = LocalStorageSecurity.localStorageDecoder(
        'userMenus'
      )
      const filterMenusDropdown = []
      if (assignedMenus && assignedMenus.length) {
        assignedMenus.map(assignMenus => {
          if (assignMenus.childMenus.length) {
            assignMenus.childMenus.map(child => {
              filterMenusDropdown.push({value: child.id, label: child.name})
            })
          } else {
            filterMenusDropdown.push({
              value: assignMenus.id,
              label: assignMenus.name
            })
          }
        })
      }
      this.setState({
        menuList: [...filterMenusDropdown]
      })
    }
    async componentDidMount () {
      await this.searchAdminActivityLog('','A')
      await this.searchAdminActivityLog('','B')
      await this.searchAdminActivityLog('','C')
      await this.searchHospitalForDropDown()
      //await this.searchHospitalAdminDropDown();
      this.makeRoleData()
      this.makeMenuData()
    }

    changeHospitalAdminDropdownValue = dropdownData => {
      let dropDataNew = []
      dropDataNew = dropdownData.map(dropData => {
        const {adminMetaInfoId, metaInfo} = dropData
        return {
          value: adminMetaInfoId,
          label: metaInfo
        }
      })
      return dropDataNew
    }
    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        previewData,
        rolesList,
        menuList,
        statsQueryParams,
        statsTotalRecord,
        adminMetaInfoId
      } = this.state

      const {
        isLogSearchSearchLoading,
        logSearchData,
        logSearchErrorMessage
      } = this.props.AdminLoggingSearchReducer

      const {
        isLogStatsSearchSearchLoading,
        logStatsSearchData,
        logStatsSearchErrorMessage
      } = this.props.AdminLoggingStatsSearchReducer
      const {
        isLogDiagramSearchLoading,
        logDiagramSearchData,
        logDiagramSearchErrorMessage,
        totalCounts
      } = this.props.AdminLoggingDiagramSearchReducer
      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      const {adminMetaInfoByHospitalIdForDropdown} = this.props.AdminSetupReducer
      console.log("====",adminMetaInfoByHospitalIdForDropdown)
      return (
        <div id="admin-acitivity-log">
          <ComposedComponent
            {...this.props}
            {...props}
            searchHandler={{
              handleEnter: this.handleEnterPress,
              handleSearchFormChange: this.handleSearchFormChange,
              resetSearch: this.handleSearchFormReset,
              searchAdminActivityLog: this.searchAdminActivityLog,
              hospitalsDropdown: hospitalsForDropdown,
              adminMetaInfoByHospitalIdForDropdown:this.changeHospitalAdminDropdownValue(adminMetaInfoByHospitalIdForDropdown),
              searchParameters: searchParameters,
              parentList: menuList,
              roles: rolesList
            }}
            paginationProps={{
              queryParams: queryParams,
              totalRecords: totalRecords,
              handlePageChange: this.handlePageChange,
              statsQueryParams:statsQueryParams,
              statsTotalRecord:statsTotalRecord,
              handlePageChangeStats:this.handlePageChangeStats
            }}
            adminLogData={{
              isSearchLoading: isLogSearchSearchLoading,
              logList: this.appendSNToTable(logSearchData),
              searchErrorMessage: logSearchErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: previewData
            }}
            adminLogStatsData={{
              isLogStatsSearchSearchLoading: isLogStatsSearchSearchLoading,
              logStatsSearchData: this.appendSNToTable(logStatsSearchData),
              logStatsSearchErrorMessage: logStatsSearchErrorMessage
            }}
            adminDiagramStatsData={{
              isLogDiagramSearchLoading: isLogDiagramSearchLoading,
              logDiagramSearchData: logDiagramSearchData,
              logDiagramSearchErrorMessage: logDiagramSearchErrorMessage,
              totalCounts: totalCounts
            }}
          />
        </div>
      )
    }
  }

  return ConnectHoc(
    AdminActivityLogDetails,
    [
      'HospitalDropdownReducer',
      'AdminLoggingStatsSearchReducer',
      'AdminLoggingSearchReducer',
      'AdminLoggingDiagramSearchReducer',
      'AdminSetupReducer'
    ],
    {
      fetchActiveHospitalsForDropdown,
      fetchAdminLog,
      fetchAdminDiagramStatistics,
      fetchAdminLogStatistics,
      fetchAdminMetaInfoByHospitalId,
      clearAdminSuccessErrorMessagesFromStore
    }
  )
}
export default AdminActivityLogHOC
