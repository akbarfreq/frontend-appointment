import React from 'react'
import AdminActivityLogSearchFilter from './AdminActivityLogSearchFilter'
import AdminActivityLogDataTable from './AdminActivityLogDataTable'
import AdminActivityLogHoc from './AdminActivityLogHoc'

const AdminActivityLog = props => {
  const AcitivityLog = AdminActivityLogHoc(
    ({searchHandler, paginationProps, adminLogData,adminLogStatsData,adminDiagramStatsData}) => (
      <>
        <div>
          <AdminActivityLogSearchFilter searchHandler={searchHandler}  />
        </div>

        <div className="">
          <AdminActivityLogDataTable
            tableHandler={adminLogData}
            paginationProps={paginationProps}
            adminLogStatsData={adminLogStatsData}
            adminDiagramStatsData={adminDiagramStatsData}
            fromDate ={searchHandler.searchParameters.fromDate}
            toDate ={searchHandler.searchParameters.toDate}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AcitivityLog/>
}

export default AdminActivityLog;
