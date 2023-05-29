import Select from 'react-select';
import BaseModel from "../../model/base.model";
import { useContext, useState } from "react";
import { useEffect } from 'react';
import _ from 'lodash';
export default function countrySelect(props) {
  const [isLoading, setisLoading] = useState(true);
  const [selectCountry, setSelectCountry] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);

  const countryLists = async () => {
    setisLoading(true);
    await BaseModel.countrylist().then((result) => {
      if (result) {
        const opt = [];
        let countries = _.orderBy(result, [function (o) { return o.name.common; }], ['asc']);
        if(props?.addAll) {
          if(props.addAll === true) {
            opt.push({ value: 'all', label: 'All Country' })
            setSelectCountry({ value: 'all', label: 'All Country' });
          }
        }
        countries?.map((item, index) => {
          opt.push({ value: item.name.common, label: item.name.common })
        });
        if (opt.length > 0) {
          setCountryOptions(opt);
          setisLoading(false);
        }
      }
    });
  }

  useEffect(() => {
    countryLists();
  }, []);

  const onCountrySelect = (e) => {
    //console.log(e.value);
    props.onCountryChange(e);
    setSelectCountry(e);
  };

  const countryStyles = {
    control: base => ({
      ...base,
      width: '100%',
      paddingTop: 0,
      paddingBottom: 0,
    })
  };

  return (
    <>
      <Select
        isSearchable
        options={countryOptions}
        name={"country"}
        placeholder="Select Country"
        value={selectCountry}
        onChange={onCountrySelect}
        styles={countryStyles}
        isMulti={true}
      />
    </>
  );
}