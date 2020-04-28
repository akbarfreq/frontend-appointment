import React from 'react'
import TransactionLogSearchFilter from './TransactionLogSearchFilter'
import TransactionLogDataTable from './TransactionLogDataTable'
import TransactionLogHoc from './TransactionLogHoc'
import {Col, Container} from 'react-bootstrap';

const TransactionLog = props => {
    const TransactionLog = TransactionLogHoc(
        ({searchHandler, paginationProps, tableHandler, appointmentStatistics}) => (
            <>
                <div>
                    <TransactionLogSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <TransactionLogDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                    />
                </div>
                {
                    tableHandler.appointmentLogList && tableHandler.appointmentLogList.length ?
                        <Container className="revenue-details" fluid>

                            <div className="row">
                                <h5 className="rd-title">Revenue Details</h5>
                            </div>
                            <div className="row rd-container">


<Col md={4} className="p-0  mt-4">
    <div className="rd-card book">
        <div className="icon">
            B
        </div>
        <div className="rd-content ">
            <div className="label">  Booked</div>
            <div> <span
                className="amt"> NPR {appointmentStatistics.bookedAmount || 0}</span> from<span
                    className="apt">  {appointmentStatistics.bookedAppointmentsCount || 0} </span>Appt.</div>

            <div className="follow-up"><i className="fa fa-tag"></i><span className="fl-label"> Follow-up </span> <span
                className="amt"> NPR 200</span> from<span
                    className="apt"> 10 </span>Appt.</div>
        </div>
    </div>

</Col>

<Col md={4} className="p-0  mt-4">
    <div className="rd-card checkin">
        <div className="icon">
            CH
        </div>
        <div className="rd-content ">
            <div>   <span className="label">Checked-In</span> </div>
            <div> <span
                className="amt"> NPR {appointmentStatistics.checkedInAmount || 0}</span> from<span
                className="apt"> {appointmentStatistics.checkedInAppointmentsCount || 0} </span>Appt.</div>
                <div className="follow-up"><i className="fa fa-tag"></i><span className="fl-label"> Follow-up </span> <span
                className="amt"> NPR 200</span> from<span
                    className="apt"> 10 </span>Appt.</div>
        </div>
    </div>

</Col>

<Col md={4} className="p-0  mt-4">
    <div className="rd-card cancel">
        <div className="icon">
            C
        </div>
        <div className="rd-content ">
            <div>   <span className="label">Cancel</span> </div>
            <div> <span
                className="amt"> NPR {appointmentStatistics.cancelAmount || 0}</span> from <span
                className="apt"> {appointmentStatistics.cancelAppointmentsCount || 0} </span>Appt.</div>
                 <div className="follow-up"><i className="fa fa-tag"></i><span className="fl-label"> Follow-up </span> <span
                className="amt"> NPR 200</span> from<span
                    className="apt"> 10 </span>Appt.</div>
        </div>
    </div>

</Col>

<Col md={4} className="p-0  mt-4">
    <div className="rd-card refund">
        <div className="icon">
            R
        </div>
        <div className="rd-content ">
            <div>   <span className="label">Refund</span></div>
            <div> <span
                className="amt"> NPR {appointmentStatistics.revenueFromRefundedAmount || 0}</span> from
            <span className="apt">  {appointmentStatistics.revenueFromRefundedAppointmentsCount || 0} </span>Appt.</div>
         <div className="follow-up"><i className="fa fa-tag"></i><span className="fl-label"> Follow-up </span> <span
                className="amt"> NPR 200</span> from<span
                    className="apt"> 10 </span>Appt.</div>
        </div>
    </div>

</Col>

<Col md={4} className="p-0  mt-4">
    <div className="rd-card refund-client">
        <div className="icon">
            RE
        </div>
        <div className="rd-content">
            <div>   <span className="label">Refunded Amount to Client </span> </div>
            <div> <span
                className="amt"> NPR {appointmentStatistics.refundedAmount || 0}</span> from
            <span className="apt"> {appointmentStatistics.refundedAppointmentsCount || 0} </span>Appt.
            </div>
            <div className="follow-up"><i className="fa fa-tag"></i><span className="fl-label"> Follow-up </span> <span
                className="amt"> NPR 200</span> from<span
                    className="apt"> 10 </span>Appt.</div>
       
        </div>
    </div>

</Col>
{/* <Col md={4} className="p-0  mt-4">
    <div className="rd-card follow-up">
        <div className="icon">
            F
        </div>
        <div className="rd-content">
            <span>   <span className="label">Follow Up</span> </span>
            <span> <span
                className="amt"> NPR {appointmentStatistics.followUpAmount || 0}</span> from
    <span
        className="apt"> {appointmentStatistics.followUpCount || 0}</span> Appointments</span>
        </div>
    </div>

</Col> */}


<Col  md={4} className="p-0  mt-4">
    <div className="rd-card total">
        <div className="icon">
            &nbsp;
        </div>
        <div className="rd-content ">
        <span> <span className="amt"> NPR {appointmentStatistics.totalAmount || 0}</span> from
        <span className="apt"> {
        (appointmentStatistics.bookedAppointmentsCount +
            appointmentStatistics.checkedInAppointmentsCount +
            appointmentStatistics.cancelAppointmentsCount +
            appointmentStatistics.revenueFromRefundedAppointmentsCount) || 0
        } </span>Appt.</span>
            <span>   <span
                className="label">Total Revenue Amount from Client <br></br><span
                className="inc">(Incl. Booked Appts. revenue)</span> </span> </span>

        </div>
    </div>


</Col>


</div>
</Container>
                        : ""
                }
            </>
        ),
        props,
        ''
    )

    return <TransactionLog/>
}

export default TransactionLog
