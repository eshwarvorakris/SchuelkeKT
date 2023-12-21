import GraphComponent from "./GraphComponent";
import widgetModel from "../../../model/widget.model";
import { useState } from "react";
import { useEffect } from "react";
const AdminGraph1 = () => {


  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCountryAr, setSelectedCountryAr] = useState(["all"]);
  const [selectedTopic, setSelectedTopic] = useState("all");

  const [chartLabel, setChartLabel] = useState([]);
  const [learningHour, setLearningHour] = useState([]);
  const [enrolledTrainee, setEnrolledTrainee] = useState([]);
  const [completionHour, setCompletionHour] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showMoreLink, setShowMoreLink] = useState("");

  const [countryLink, setCountryLink] = useState("");
  const [topicLink, setTopicLink] = useState("");

  const adminGraph = async () => {
    const formData = new FormData();
    formData.append("country", selectedCountryAr);
    formData.append("category", selectedTopic);
    setLearningHour([]);
    setEnrolledTrainee([]);
    setCompletionHour([]);
    setChartLabel([]);
    await widgetModel.adminGraph1(formData).then((result) => {
      console.log(result.data);
      if (result?.data?.chartData) {
        if (result?.data?.chartData.length > 0) {
          const labels = result?.data?.chartData.map(({ labels }) => {

            if(labels == 'all')
            {
              return 'All Countries'
            }
          
            return labels
          
          });
          const learnHour = result?.data?.chartData.map(({ learningHour }) => learningHour);
          const enroll = result?.data?.chartData.map(({ totalTraineeEnrolled }) => totalTraineeEnrolled);
          const complete = result?.data?.chartData.map(({ completionHour }) => completionHour);
          setChartLabel(labels);
          setEnrolledTrainee(enroll);
          setCompletionHour(complete);
          setLearningHour(learnHour);
        }
      }
    })
  }

  useEffect(() => {
    adminGraph();
    let link = "";
    if(selectedCountryAr.length > 1) {
      setShowMore(false)
    } else {
      if(selectedCountryAr.length > 0) {
        if(selectedCountryAr[0] != "all") {
          link = "country="+selectedCountryAr[0];
        }
      }
      setShowMore(true);
    }
    setCountryLink(link);
  }, [selectedCountryAr, selectedTopic])

  const chartData = {
    labels: chartLabel,
    datasets: [
      {
        label: 'Learning Hours',
        data: learningHour,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Enrolled Trainees',
        data: enrolledTrainee,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Time of Completion',
        data: completionHour,
        backgroundColor: 'rgba(74, 50, 168, 0.5)',
        borderColor: 'rgba(74, 50, 168, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleCountryChangeParent = (country) => {
    // console.log("parent", country)
    let curCountry = [];
    country.map((item, index) => {
      curCountry.push(item.value);
    })
    setSelectedCountryAr(curCountry);
    
    //setSelectedCountry(country.value);
  };

  const handleTopicChangeParent = (topic) => {
    setSelectedTopic(topic.value);
    let link = "";
    if(topic.value !== "all") {
      link = "category="+topic.value+"&topic="+topic.label;
    }
    setTopicLink(link);
    //// console.log("parent", topic.value)
  };

  useEffect(() => {
    let link = "";
    if(countryLink != "") {
      link = countryLink;
    }

    if(topicLink != "") {
      if(link != "") {
        link += "&";
      }
      link += topicLink;
    }
    setShowMoreLink(link);
  }, [countryLink, topicLink])
  return (
    <>
      <GraphComponent
        chartData={chartData}
        chartType={`bar`}
        isYear={false}
        isCategory={true}
        Title={`Countries Performance`}
        Description={``}
        showMore={showMore}
        showMoreLink={`course_analytics?${showMoreLink}`}
        onCountryChangeParent={handleCountryChangeParent}
        onTopicChanged={handleTopicChangeParent}
        isMultiCountry={true}
      />
    </>
  );
};

export default AdminGraph1;