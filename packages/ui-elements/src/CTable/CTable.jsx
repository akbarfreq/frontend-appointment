import React, {PureComponent} from 'react';
import {Table} from "react-bootstrap";
import {Scrollbars} from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import {CButton} from "../../index";
import ActionForEditableTable from "./ActionForEditableTable";

class CTable extends PureComponent {

    state = {
        tableData: [],
        rowObject: {},
        isEditing: false,
        rowNumber: '',
        rowDataUnderAction: {}
    };

    handleInputChange = (e) => {

    };

    handleAddNewRow = () => {
        const rowData = JSON.parse(JSON.stringify({...this.state.rowObject}));
        let tableDataList = [...this.state.tableData];
        tableDataList.unshift(rowData);
        this.setState({
            tableData: [...tableDataList],
            isEditing: true,
            rowNumber: 0,
            rowDataUnderAction: {...rowData}
        });
    };

    handleEditRow = (e, data) => {
        let tableDataList = [...this.state.tableData];

        let currentRowUnderAction = {...this.state.rowDataUnderAction};
        let dataToEdit = tableDataList[data.rowIndex];

        Object.keys(dataToEdit).map(dataKey =>
            currentRowUnderAction[dataKey] = dataToEdit[dataKey],
        );
        currentRowUnderAction.onRowEdit = true;
        currentRowUnderAction.isNewRow = false;
        tableDataList[data.rowIndex] = currentRowUnderAction;
        if (this.state.isEditing) {
            tableDataList.shift();
        }
        this.setState({
            tableData: [...tableDataList],
            isEditing: true,
            rowDataUnderAction: {...currentRowUnderAction},
            rowNumber: data.rowIndex
        });
        this.props.onEdit(currentRowUnderAction);
    };

    handleClick = (e, data, type) => {
        const dataClicked = {...data};
        switch (type) {
            case 'ADD':
                let addType = dataClicked.data.isNewRow ? 'SAVE' : 'UPDATE';
                if (addType === 'SAVE') {
                    this.handleSaveRowData(e, data);
                } else {
                    this.handleUpdateRowData(e, data);
                }
                break;
            case 'CANCEL':
                let cancelType = dataClicked.data.isNewRow ? 'ADD' : 'EDIT';
                this.handleCancel(data, cancelType);
                break;
            case 'EDIT':
                this.handleEditRow(e, data);
                break;
            case 'DELETE':
                this.handleDelete(data);
            case 'PREVIEW':
                this.handlePreview(data);
            default:
                break;
        }
    };

    handleSaveRowData = async (e, data) => {
        const {isEditing, rowNumber} = this.state;
        let isEditingRow = isEditing,
            rowNumberSaved = rowNumber;

        const isSaved = await this.props.onSave(data);
        if (isSaved) {
            isEditingRow = false;
            rowNumberSaved = ''
        } else {
            isEditingRow = true;
        }
        this.setState({
            isEditing: isEditingRow,
            rowNumber: rowNumberSaved
        })
    };

    handleUpdateRowData = async (e, data) => {
        const {isEditing, rowNumber} = this.state;
        let isEditingRow = isEditing,
            rowNumberSaved = rowNumber;

        const isUpdated = await this.props.onUpdate(data);
        // if (isUpdated) {
        //     isEditingRow = false;
        //     rowNumberSaved = ''
        // } else {
        //     isEditingRow = true;
        // }
        // this.setState({
        //     isEditing: isEditingRow,
        //     rowNumber: rowNumberSaved
        // })
    };

    handleDelete = (deleteRow) => {
      this.props.onDelete(deleteRow.data);
    };

    handlePreview = (previewData)=>{
      this.props.onPreview(previewData.data);
    };

    handleCancel = (data, type) => {
        let tableDataList = [...this.state.tableData];
        if (type === "ADD") {
            tableDataList.shift();
        } else {
            tableDataList[data.rowIndex].onRowEdit = false;
        }
        this.setState({
            tableData: [...tableDataList],
            isEditing: false,
            rowNumber: '',
            rowDataUnderAction: {}
        });
        this.props.onCancel();
    };

    createRowObject = () => {
        let tableDataList = [...this.state.tableData];
        let row = {...tableDataList[0]};
        Object.keys(row).map(rowKey =>
            row[rowKey] = "",
        );
        this.setState({
            rowObject: {
                ...row,
                onRowEdit: true,
                isNewRow: true,
            }
        })
    };

    getFooterContent = (footerData) => {
        let columnData = [];
        for (let i = 0; i < Object.keys(footerData).length; i++) {
            let colData = footerData["col" + (i + 1)];
            columnData.push(
                <td colSpan={colData.colSpan && colData.colSpan}>
                    {colData.value}
                </td>
            )
        }
        return columnData;
    };

    setTableDataAndCreateRowObject = async (tableData) => {
        await this.setState({
            tableData: [...tableData]
        });
        this.createRowObject();
    };

    checkObjectEquality = (object1, object2) => {
        let areObjectsEqual = true;
        let object1Props = Object.getOwnPropertyNames(object1);
        let object2Props = Object.getOwnPropertyNames(object2);

        if (object1Props.length !== object2Props.length) {
            areObjectsEqual = false;
        }

        object1Props.map(object1Prop => {

            let value1 = object1[object1Prop];
            let value2 = object2[object1Prop];

            if (typeof value1 !== "function" || typeof value2 !== "function") {
                if (value1 !== value2) {
                    areObjectsEqual = false;
                }
            }
        });

        return areObjectsEqual;
    };

    areArrayOfObjectsEqual = (array1, array2) => {
        let isEqual = true;

        if (array1.length !== array2.length) {
            return !isEqual;
        } else {
            array1.map((array1Obj, index) => {
                isEqual = this.checkObjectEquality(array1Obj, array2[index])
            });
            return isEqual;
        }
    };

    componentDidMount() {
        this.setTableDataAndCreateRowObject(this.props.rowData);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {tableData, isEditing} = this.state;
        const {rowData} = this.props;
        if (!this.areArrayOfObjectsEqual(tableData, rowData)) {
            if (!isEditing) {
                this.setTableDataAndCreateRowObject(rowData);
            }
        }
    }

    render() {
        const {
            id,
            columnDefinition,
            rowData,
            footerData,
            headerBordered,
            headerBorderless,
            headerHover,
            headerResponsive,
            headerStriped,
            headerVariant,
            headerBsPrefix,
            bordered,
            borderless,
            hover,
            responsive,
            size,
            striped,
            variant,
            bsPrefix,
            headerClassName,
            bodyClassName,
            footerClassName,
            rowValid
        } = this.props;
        const {tableData, isEditing, rowNumber} = this.state;
        return <>
            <div id={id}>
                <CButton
                    id="add-new"
                    name="Add"
                    disabled={isEditing}
                    onClickHandler={this.handleAddNewRow}
                />
                <Table
                    className={headerClassName}
                    id={id}
                    bordered={headerBordered}
                    borderless={headerBorderless}
                    hover={headerHover}
                    responsive={headerResponsive}
                    size={size}
                    striped={headerStriped}
                    variant={headerVariant}
                    bsPrefix={headerBsPrefix}
                >
                    <thead>
                    <tr>
                        {columnDefinition.map((column, index) => (
                            <td key={column + index}>
                                {column.headerName}
                            </td>
                        ))}
                        <td>
                            Actions
                        </td>
                    </tr>
                    </thead>
                </Table>
                <Scrollbars
                    id="menus"
                    autoHide={true}
                    style={{height: 400}}>
                    <Table
                        className={bodyClassName}
                        id={id}
                        bordered={bordered}
                        borderless={borderless}
                        hover={hover}
                        responsive={responsive}
                        size={size}
                        striped={striped}
                        variant={variant}
                        bsPrefix={bsPrefix}
                    >
                        <tbody>
                        {
                            tableData.map((row, rowIndex) => (
                                <tr key={"row" + rowIndex}>
                                    {
                                        columnDefinition.map((column, colIndex) => (

                                                <td key={column.field + "-" + colIndex}>
                                                    {
                                                        (row.onRowEdit && Object.keys(column).includes('editComponent')) ?
                                                            <column.editComponent
                                                                node={{
                                                                    data: row,
                                                                    rowIndex: rowIndex
                                                                }}
                                                                onChange={this.handleInputChange}
                                                            /> :
                                                            Object.keys(column).includes('displayComponent') ?
                                                                <column.displayComponent
                                                                    node={{
                                                                        data: row,
                                                                        rowIndex: rowIndex
                                                                    }}/>
                                                                : row[column.field]

                                                    }
                                                </td>

                                            )
                                        )

                                    }
                                    <td>
                                        <ActionForEditableTable
                                            node={{
                                                data: row,
                                                rowIndex: rowIndex
                                            }}
                                            rowNumber={rowNumber}
                                            isEditing={isEditing}
                                            rowValid={rowValid}
                                            onClick={this.handleClick}/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Scrollbars>
                {
                    footerData ?
                        <Table
                            className={footerClassName}
                            id={id}
                            bordered={true}
                            borderless={borderless}
                            hover={hover}
                            responsive={responsive}
                            size={size}
                            striped={striped}
                            variant={variant}
                            bsPrefix={bsPrefix}>
                            <tbody>
                            {
                                rowData.map((row, rowIndex) => (
                                    <td key={rowIndex}>
                                    </td>
                                ))
                            }
                            </tbody>
                            <tfoot>
                            {
                                footerData.map(footer =>
                                    <tr>
                                        {
                                            this.getFooterContent(footer)
                                        }
                                    </tr>)
                            }
                            </tfoot>
                        </Table>
                        : ''
                }
            </div>
        </>;
    }
}

CTable.propTypes = {
    columnDefinition: PropTypes.arrayOf(PropTypes.shape({
        headerName: PropTypes.string.isRequired,
        field: PropTypes.string,
        displayComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        editComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    })).isRequired,
    id: PropTypes.string.isRequired,
    rowData: PropTypes.arrayOf(PropTypes.object),
    footerData: PropTypes.arrayOf(PropTypes.shape({
        footerRowData: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any.isRequired,
            colSpan: PropTypes.string
        }))
    })),
    rowValid: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onEdit: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onPreview: PropTypes.func,
    bordered: PropTypes.bool,
    borderless: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    size: PropTypes.string,
    striped: PropTypes.bool,
    variant: PropTypes.string,
    bsPrefix: PropTypes.string
};


export default CTable;
