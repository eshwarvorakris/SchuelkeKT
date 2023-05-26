import GraphComponent from "./GraphComponent";
import widgetModel from "../../../model/widget.model";
import { useState } from "react";
import { useEffect } from "react";
const AdminGraph2 = () => {

  const [productTopic, setProductTopic] = useState(0);
  const [blanketTopic, setBlanketTopic] = useState(0);
  const [countryTopic, setCountryTopic] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const adminGraph = async () => {
    const formData = new FormData();
    formData.append("country", selectedCountry);
    setProductTopic(0);
    setBlanketTopic(0);
    setCountryTopic(0);
    await widgetModel.adminGraph2(formData).then((result) => {
      console.log(result.data);
      if (result.data) {
        setProductTopic(result.data.productTopic);
        setBlanketTopic(result.data.blanketTopic);
        setCountryTopic(result.data.countryTopic);
      }
    })
  }

  useEffect(() => {
    adminGraph();
  }, [selectedCountry])

  const chartData = {
    labels: [
      'Country Topic',
      'Product Topic',
      'Blanket Topic'
    ],
    datasets: [{
      label: 'Total Courses : ',
      data: [countryTopic, productTopic, blanketTopic],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const handleCountryChangeParent = (country) => {
    //console.log("parent", country.value)
    setSelectedCountry(country.value);
  };
  return (
    <>
      <GraphComponent
        chartData={chartData}
        chartType={`pie`}
        isYear={false}
        Title={`Country Analysis`}
        Description={`Topic-wise course distribution in different regions.`}
        onCountryChangeParent={handleCountryChangeParent}
      />
    </>
  );
};

export default AdminGraph2;