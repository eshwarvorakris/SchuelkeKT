import Select from 'react-select';
import categoryModel from "../../model/category.model";
import { useContext, useState } from "react";
import { useEffect } from 'react';
import _ from 'lodash';
export default function CategorySelect(props) {
  const [isLoading, setisLoading] = useState(true);
  const [selectedOptions, setSelectedOption] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);

  const categoryLists = async () => {
    setisLoading(true);
    await categoryModel.list().then((result) => {
      if (result) {

        const opt = [];
        let countries = _.orderBy(result.data, [function (o) { return o.category_name; }], ['asc']);
        //// console.log(countries)
        if (props?.addAll) {
          if (props.addAll === true) {
            opt.push({ value: 'all', label: 'All Topics' });
            if (!props?.defaultVal) {
              setSelectedOption({ value: 'all', label: 'All Topics' })
            }
          }
        }

        if (props?.defaultVal) {
          setSelectedOption(props?.defaultVal)
        }

        countries?.map((item, index) => {
          opt.push({ value: item.id, label: item.category_name })
        });
        if (opt.length > 0) {
          setSelectOptions(opt);
          setisLoading(false);
        }
      }
    });
  }

  useEffect(() => {
    categoryLists();
  }, []);

  const onOptionSelect = (e) => {
    //// console.log(e.value);
    props.onCategoryChange(e);
    setSelectedOption(e);
  };

  const selectStyles = {
    control: base => ({
      ...base,
      height: 30,
      minHeight: 30,
      width: '10rem',
      paddingTop: 0,
      paddingBottom: 0,
    })
  };

  return (
    <>
      {!isLoading &&
        <Select
          isSearchable
          options={selectOptions}
          name={"category"}
          placeholder="Select Topic"
          value={selectedOptions}
          onChange={onOptionSelect}
          styles={selectStyles}
        />
      }

    </>
  );
}