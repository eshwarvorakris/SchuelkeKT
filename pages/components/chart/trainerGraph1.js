import GraphComponent from "./GraphComponent";
import widgetModel from "../../../model/widget.model";
import { useState } from "react";
import { useEffect } from "react";
const TrainerGraph1 = () => {

  const [traineeCompleted, setTraineeCompleted] = useState(0);
  const [enrolledTrainee, setEnrolledTrainee] = useState(0);
  
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const trainerGraph = async () => {
    const formData = new FormData();
    formData.append("country", selectedCountry);
    formData.append("category", selectedTopic);
    setTraineeCompleted(0);
    setEnrolledTrainee(0);
    await widgetModel.trainerGraph1(formData).then((result) => {
      console.log(result.data);
      if (result.data) {
        setTraineeCompleted(result.data.traineeCompleted);
        setEnrolledTrainee(result.data.enrolledTrainee);
      }
    })
  }

  useEffect(() => {
    trainerGraph();
  }, [selectedCountry, selectedTopic])

  const chartData = {
    labels: [''],
    datasets: [
      {
        label: 'Trainees Enrolled',
        data: [enrolledTrainee],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Trainees Completed Courses',
        data: [traineeCompleted],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
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
        Description={`Only showing data for trainees enrolled in your module`}
        showMore={true}
        showMoreLink="get_enrolled"
        onCountryChangeParent={handleCountryChangeParent}
        onTopicChanged={handleTopicChangeParent}
      />
    </>
  );
};

export default TrainerGraph1;