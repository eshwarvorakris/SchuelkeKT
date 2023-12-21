import Chart from "./chart";
import CountryLists from "../countryListDropdown";
import CountryListsMulti from "../countryListDropdownMulti";
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
  isMultiCountry = false,
  onCountryChangeParent,
  onTopicChanged
}) => {

  const handleCountryChange = (country) => {
    onCountryChangeParent(country)
    // console.log(country);
  };
  const handleSelectChange = (option) => {
    onTopicChanged(option)
    //// console.log("category option = ",option);
  };
  return (
    <div className="score-analysis">
      <div className="graph-header" style={{ padding: '0.1rem', minHeight:'124px' }}>
        <div className="left mb-3">
          <h6>{Title}</h6>
          <span>{Description}</span>

        </div>
        <div className="right d-flex flex-column gap-1">
          {!isMultiCountry &&
            <>
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
            </>
          }

        </div>
        {isMultiCountry &&
          <div>
          <div style={{ marginTop: '5px', width:'100%' }} class="mb-3">
            <CountryListsMulti onCountryChange={handleCountryChange} addAll={true} />
          </div>
          {isCategory &&
            <div className="country-select" style={{marginTop:'5px'}}>
              <div >
                <CategoryList onCategoryChange={handleSelectChange} addAll={true} /> <br />
              </div>
            </div>
          }
          </div>
        }
      </div>
      <Chart data={chartData} chartType={chartType} />
      {/* {showMore && showMoreLink != "get_enrolled" &&
        <Link href={showMoreLink}>Show More</Link> 
      } */}

    </div>
  );
};

export default GraphComponent;