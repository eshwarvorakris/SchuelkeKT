import GraphComponent from "./GraphComponent";
import widgetModel from "../../../model/widget.model";
import { useState } from "react";
import { useEffect } from "react";
const AdminGraph1 = () => {

  const [learningHour, setLearningHour] = useState(0);
  const [enrolledTrainee, setEnrolledTrainee] = useState(0);
  const [completionHour, setCompletionHour] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const adminGraph = async () => {
    const formData = new FormData();
    formData.append("country", selectedCountry);
    formData.append("category", selectedTopic);
    setLearningHour(0);
    setEnrolledTrainee(0);
    setCompletionHour(0);
    await widgetModel.adminGraph1(formData).then((result) => {
      //console.log(result.data);
      if (result.data) {
        setLearningHour(result.data.learningHour);
        setEnrolledTrainee(result.data.totalTraineeEnrolled);
        setCompletionHour(result.data.completionHour);
      }
    })
  }

  useEffect(() => {
    adminGraph();
  }, [selectedCountry, selectedTopic])

  const chartData = {
    labels: [''],
    datasets: [
      {
        label: 'Learning Hour',
        data: [learningHour],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Enrolled Trainees',
        data: [enrolledTrainee],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Time For Completion',
        data: [completionHour],
        backgroundColor: 'rgba(74, 50, 168, 0.5)',
        borderColor: 'rgba(74, 50, 168, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleCountryChangeParent = (country) => {
    //console.log("parent", country.value)
    setSelectedCountry(country.value);
  };

  const handleTopicChangeParent = (topic) => {
    setSelectedTopic(topic.value);
    //console.log("parent", topic.value)
  };
  return (
    <>
      <GraphComponent
        chartData={chartData}
        chartType={`bar`}
        isYear={false}
        isCategory={true}
        Title={`Countries Performance`}
        Description={``}
        showMore={true}
        showMoreLink="course_analytics"
        onCountryChangeParent={handleCountryChangeParent}
        onTopicChanged={handleTopicChangeParent}
      />
    </>
  );
};

export default AdminGraph1;