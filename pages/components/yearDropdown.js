import Select from 'react-select';
import { useContext, useState } from "react";
import { useEffect } from 'react';
export default function yearDropdown() {
  const [isLoading, setisLoading] = useState(true);
  const curYear = new Date().getFullYear();

  return (
    <>
      <select className="year custom-scroll">
        {
          (() => {
            let optionItem = [];
            for (var preYear = curYear; preYear >= curYear - 2; preYear--) {
              //console.log("year - ", curYear);
              optionItem.push(<option value={preYear}>{preYear}</option>)
            }
            return (<>{optionItem}</>);
          })()
        }
      </select>
    </>
  );
}