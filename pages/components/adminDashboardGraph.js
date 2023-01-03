export default function adminDashboardGraph() {

  return (
    <>
      <div className="graph-container">
        <div className="score-analysis">
          <div className="graph-header">
            <div className="left">
              <h6>Score Analysis</h6>
              <span>Average score of trainees across different regions in different
                topics</span>
            </div>
            <div className="right d-flex flex-column gap-1">
              <div className="country-select">
                <div>
                  <span>Country -</span>
                </div>
                <div>
                  <select className="custom-scroll countries"></select> <br />
                </div>
              </div>
              <div className="year-select">
                <div>
                  <label htmlFor="year">Year -</label>
                </div>
                <div>
                  <select className="year custom-scroll" name="year"></select>
                </div>
              </div>
            </div>
          </div>
          <canvas id="myChart"></canvas>
        </div>

        <div className="course-analysis">
          <div className="graph-header">
            <div className="left">
              <h6>Country Analysis</h6>
              <span>Topic-wise course distribution in different regions.</span>
            </div>
            <div className="right d-flex flex-column gap-1">
              <div className="country-select">
                <div>
                  <span>Country -</span>
                </div>
                <div>
                  <select className="custom-scroll countries-2"></select> <br />
                </div>
              </div>
            </div>
          </div>
          <div className="pie-graph">
            <div className="info-part">
              <div className="country d-flex gap-3 align-items-center">
                <div className="color-container-1 clr-container"></div>
                <div className="info">
                  <div className="number-info">182</div>
                  <div className="topic-info">Country Topic</div>
                </div>
              </div>
              <div className="product d-flex gap-3 align-items-center">
                <div className="color-container-2 clr-container"></div>
                <div className="info">
                  <div className="number-info">127</div>
                  <div className="topic-info">Product Topic</div>
                </div>
              </div>
              <div className="Blanket d-flex gap-3 align-items-center">
                <div className="color-container-3 clr-container"></div>
                <div className="info">
                  <div className="number-info">643</div>
                  <div className="topic-info">Blanket Topic</div>
                </div>
              </div>
            </div>
            <div className="pie-chart">
              <canvas id="myChartpie"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="two-graph-container">
        <div className="trainee-activity">
          <div className="graph-header">
            <div className="left">
              <h6>Trainee Activity Analysis</h6>
              <span>Course % completed on monthly basis by the in regions</span>
            </div>
            <div className="right d-flex flex-column gap-1">
              <div className="country-select">
                <div>
                  <span>Country -</span>
                </div>
                <div>
                  <select className="custom-scroll countries-3"></select> <br />
                </div>
              </div>
              <div className="year-select">
                <div>
                  <label htmlFor="year">Year -</label>
                </div>
                <div>
                  <select className="custom-scroll year-2" name="year"></select>
                </div>
              </div>
            </div>
          </div>
          <canvas id="myChart3"></canvas>

        </div>
        <div className="time-analysis">
          <div className="graph-header">
            <div className="left">
              <h6>Time Analysis</h6>
              <span>Days & Hours Spent in learning over a month in different regions</span>
            </div>
            <div className="right d-flex flex-column gap-1">
              <div className="country-select">
                <div>
                  <span>Country -</span>
                </div>
                <div>
                  <select className="custom-scroll countries-4"></select> <br />
                </div>
              </div>
              <div className="year-select">
                <div>
                  <label htmlFor="year">Year -</label>
                </div>
                <div>
                  <select className="year-3 custom-scroll" name="year"></select>
                </div>
              </div>
            </div>
          </div>
          <canvas id="myChart4"></canvas>

        </div>
      </div>
    </>
  );
}