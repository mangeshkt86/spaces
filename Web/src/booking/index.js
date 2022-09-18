import React, { useState, Fragment, useContext, useEffect, useMemo} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AllocationContext } from "../contexts/allocationContext";
import { getAllAllocations } from "../apis/allocationApi";

const columns = [
    { field: 'Id', headerName: 'ID', width: 70 },
    { field: 'Oecode', headerName: 'OECode', width: 80 },
    { field: 'DeskNumber', headerName: 'Desk', width: 130 },
    { field: 'StartDate', headerName: 'Start Date', width: 130 },
    { field: 'EndDate', headerName: 'End Date', width: 130 },
    { field: 'CreatedBy', headerName: 'Created By', width: 130 },
    { field: 'CreatedDate', headerName: 'Created Date', width: 130 },
    { field: 'Status', headerName: 'Status', width: 60 }
];

// const rows = [
//     { id: 1, oecode: '1234', deskNumber: 'ABCD', startDate: '12/09/2022', endDate:'12/09/2022', createdBy:'mangesh', createdDate:'12/09/2022',status:'Y' },
//     { id: 2, oecode: '1234', deskNumber: 'ABCD', startDate: '12/09/2022', endDate:'12/09/2022', createdBy:'mangesh', createdDate:'12/09/2022',status:'Y' },
//     { id: 3, oecode: '1234', deskNumber: 'ABCD', startDate: '12/09/2022', endDate:'12/09/2022', createdBy:'mangesh', createdDate:'12/09/2022',status:'Y' },
//     { id: 4, oecode: '1234', deskNumber: 'ABCD', startDate: '12/09/2022', endDate:'12/09/2022', createdBy:'mangesh', createdDate:'12/09/2022',status:'Y' },
// ];

export default function Booking() {
    const alloc = useContext(AllocationContext);

    return (
        <Fragment>
            <h1>Booking</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={alloc.allocation}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    checkboxSelection
                    getRowId={(row) => row.Id}
                />
            </div>
        </Fragment>
    )
}