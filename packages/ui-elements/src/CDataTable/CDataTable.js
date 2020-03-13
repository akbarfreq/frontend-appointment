import React, {PureComponent} from 'react'
// import { AgGridReact} from 'ag-grid-react'
// import 'ag-grid/dist/styles/ag-grid.css';
// import 'ag-grid/dist/styles/ag-theme-balham-dark.css';
import {AgGridReact} from '@ag-grid-community/react'
import {AllCommunityModules} from '@ag-grid-community/all-modules'

import '@ag-grid-community/all-modules/dist/styles/ag-grid.scss'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham/sass/ag-theme-balham.scss'

class CDataTable extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      gridApi: '',
      rowChanged: []
    }
  }

  onGridReady = params => {
    this.setState({
      gridApi: params
    })
    if(this.props.dataSource){
    const updateData = data => {
      var dataSource = {
        rowCount: null,
        getRows: function (params) {
          console.log('asking for ' + params.startRow + ' to ' + params.endRow)
          setTimeout(function () {
            var rowsThisPage = data.slice(params.startRow, params.endRow)
            var lastRow = -1
            if (data.length <= params.endRow) {
              lastRow = data.length
            }
            params.successCallback(rowsThisPage, lastRow)
          }, 500)
        }
      }
      params.api.setDatasource(dataSource)
    }

    try {
      const response = this.props.dataSource()
      updateData(response)
    } catch (e) {
        console.log(e);
    }
    }
    params.api.sizeColumnsToFit()
  }

  checkDataAndFilterTheData = event => {
    let datum = [...this.state.rowChanged]
    for (let i = 0; i < this.props.rowData.length; i++) {
      if (datum.length > i) {
        if (datum[i].id === event.data.id) {
          datum[i] = {...event.data}
          break
        }
      } else {
        datum[i] = {...event.data}
        break
      }
    }
    return datum
  }

  onCellValueChanged = e => {
    let data = this.checkDataAndFilterTheData(e)
    this.setState({
      rowChanged: data
    })
  }

  onSelectionChanged = row => {
    this.props.getSelectedRows &&
      this.props.getSelectedRows(row.api.getSelectedRows()[0].id)
  }

  onCellClicked = e => {
    if (e.value) {
      let dataToPassed = e.data.id ? e.data.id : e.data
      this.props.getSelectedRows && this.props.getSelectedRows(dataToPassed)
    }
  }

  getRowHeight = params => {
    return params.node.rowHeight
  }

  render () {
    const {
      id,
      tableId,
      width,
      height,
      classes,
      enableSorting,
      columnDefs,
      rowData,
      defaultColDef,
      rowSelection,
      frameworkComponents,
      floatingFilter,
      editType,
      cellMouseOver,
      rowHeight,
      rowModelType,
      paginationPageSize,
      cacheOverflowSize,
      maxConcurrentDatasourceRequests,
      infiniteInitialRowCount,
      maxBlocksInCache
    } = this.props

    return (
      <>
        <div style={{width: width, height: height}} className={classes} id={id}>
          <AgGridReact
            id={tableId}
            enableSorting={enableSorting}
            columnDefs={[...columnDefs]}
            rowData={[...rowData]}
            defaultColDef={{...defaultColDef}}
            onGridReady={this.onGridReady}
            rowSelection={rowSelection}
            // onSelectionChanged={rows => this.onSelectionChanged(rows)}
            frameworkComponents={frameworkComponents}
            floatingFilter={floatingFilter}
            editType={editType}
            enableColResize
            onCellFocused={this.props.onCellFocused}
            cellMouseOver={cellMouseOver}
            modules={AllCommunityModules}
            onCellClicked={this.onCellClicked}
            rowHeight={rowHeight}
            rowModelType={rowModelType}
            paginationPageSize={paginationPageSize}
            cacheOverflowSize={cacheOverflowSize}
            maxConcurrentDatasourceRequests={maxConcurrentDatasourceRequests}
            infiniteInitialRowCount={infiniteInitialRowCount}
            maxBlocksInCache={maxBlocksInCache}
          />
        </div>
      </>
    )
  }
}

export default CDataTable
