import { useState } from "react";
import _ from 'lodash';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useEffect } from "react";
import { helper } from '../../lib/helper';
export default function ExportExcelButton({ exportExcelData, excelName = "" }) {

  useEffect(() => {
    console.log("exportExcelData", exportExcelData);
  }, [])
  var curDate = new Date().toISOString().slice(0, 10);
  const handleExport = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(exportExcelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, curDate + '-' + excelName + '.xlsx');
      helper.sweetalert.toast("Excel Saved");
    } catch(err) {
      helper.sweetalert.toast("Please Try Again Later");
      console.log(err.message);
    }
    
  };

  return (
    <>
      <button onClick={handleExport} className=" btn create-course-btn " style={{ backgroundColor: '#10793F', color: 'white' }}>
        Export Excel
      </button>
    </>
  );
}