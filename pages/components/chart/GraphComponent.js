import Chart from "./chart";
import CountryLists from "../countryListDropdown";
import YearList from "../yearDropdown";
import CategoryList from "../categoryListDropdown";
import Link from 'next/link';
const GraphComponent = ({
  chartData,
  Title = "",
  Description = "",
  IsCountry = true,
  isYear = true,
  isCategory = false,
  chartType = "bar",
  showMore = false,
  showMoreLink = "",
  onCountryChangeParent,
  onTopicChanged
}) => {

  const handleCountryChange = (country) => {
    onCountryChangeParent(country)
    //console.log(country);
  };
  const handleSelectChange = (option) => {
    onTopicChanged(option)
    //console.log("category option = ",option);
  };
  return (
    <div className="score-analysis">
      <div className="graph-header" style={{ padding: '0.1rem' }}>
        <div className="left">
          <h6>{Title}</h6>
          <span>{Description}</span>
        </div>
        <div className="right d-flex flex-column gap-1">
          {IsCountry &&
            <div className="country-select">
              <div style={{ marginLeft: '0.2rem' }}>
                <CountryLists onCountryChange={handleCountryChange} addAll={true} /> <br />
              </div>
            </div>
          }

          {isYear &&
            <div className="year-select">
              <div>
                <label htmlFor="year">Year - </label>
              </div>
              <div style={{ marginLeft: '0.2rem' }}>
                <YearList />
              </div>
            </div>
          }

          {isCategory &&
            <div className="country-select">
              <div style={{ marginLeft: '0.2rem' }}>
                <CategoryList onCategoryChange={handleSelectChange} addAll={true} /> <br />
              </div>
            </div>
          }
        </div>
      </div>
      <Chart data={chartData} chartType={chartType} />
      {showMore &&
        <Link href={showMoreLink}>Show More</Link>
      }
      
    </div>
  );
};

export default GraphComponent;