import React from 'react';

export const DoctorRevenueAppointmentAmount = props => {
  const {cancelledRevenue, doctorRevenue, totalRevenue} = props.node.data
  return (
    
      <div id="revenueAmountId" className="dr-amount">Rs. {totalRevenue}
      <ul id="breakDownAmountId" className="dr-details">
        <li><i className="fa fa-money"></i> {cancelledRevenue}</li>
        <li><i className="fa fa-money red"></i> {doctorRevenue}</li>
      </ul>
      </div>

  )
}
