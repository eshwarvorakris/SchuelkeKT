
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Image from "next/image";
const index = () => {
  return (
    <>
      <div>
        <div class="section1-admin">


          <div class="blank-class"></div>

          <Sidebar/>

          <div class="container-2">
            <div class="col-md-12 trainee-right">
                <div class="blank-nav-class"></div>

                <Topnavbar/>
                <form>
                    <div class="dashboard-info">
                        <div class="total-courses">
                            <div class="left-info">
                                <div class="numeric-info text-light">
                                    <h1 className="text-light">46</h1>
                                </div>
                                <div class="explicit-info text-light">
                                    <p>Total Courses</p>
                                </div>
                            </div>
                            <div class="right-icon">
                                <img src="/admin-images/1.png" alt="" class="icon-info"/>
                            </div>
                        </div>
                        <div class="enrolled-trainees">
                            <div class="left-info">
                                <div class="numeric-info text-light">
                                    <h1 className="text-light">96</h1>
                                </div>
                                <div class="explicit-info text-light">
                                    <p>Total Trainees</p>
                                </div>
                            </div>
                            <div class="right-icon">
                                <svg class="chalkboard-icon icon-info" style={{color: "white"}}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                    <rect width="300" height="300" fill="none"></rect>
                                    <path
                                        d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H53.4a7.9,7.9,0,0,0,7.2-4.6,48.1,48.1,0,0,1,86.8,0,7.9,7.9,0,0,0,7.2,4.6H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,168a32,32,0,1,1,32-32A32.1,32.1,0,0,1,104,168Zm112,32H159.4a63.7,63.7,0,0,0-13.1-16H192a8,8,0,0,0,8-8V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v96a8,8,0,0,0,6,7.7A64.2,64.2,0,0,0,48.6,200H40V56H216Z"
                                        fill="white"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="training-hours">
                            <div class="left-info">
                                <div class="numeric-info text-light">
                                    <h1 className="text-light">1284</h1>
                                </div>
                                <div class="explicit-info text-light">
                                    <p>Enrolled Training</p>
                                </div>
                            </div>
                            <div class="right-icon">
                                <img src="/admin-images/3.png" alt="" class="icon-info"/>
                            </div>
                        </div>
                        <div class="courses-completion">
                            <div class="left-info">
                                <div class="numeric-info text-light">
                                    <h1 className="text-light">700</h1>
                                </div>
                                <div class="explicit-info text-light">
                                    <p>Training Hours</p>
                                </div>
                            </div>
                            <div class="right-icon">
                                <img src="/trainer-images/dashboard images/icon-3.png" alt="" class="icon-info"/>
                                <img src="/trainer-images/dashboard images/icon-3(2).png" class="vector-fig"
                                    alt=""/>
                            </div>
                        </div>
                    </div>

                    <div class="graph-container">
                        <div class="score-analysis">
                            <div class="graph-header">
                                <div class="left">
                                    <h6>Score Analysis</h6>
                                    <span>Average score of trainees across different regions in different
                                        topics</span>
                                </div>
                                <div class="right d-flex flex-column gap-1">
                                    <div class="country-select">
                                        <div>
                                            <span>Country -</span>
                                        </div>
                                        <div>
                                            <select class="custom-scroll countries"></select> <br/>
                                        </div>
                                    </div>
                                    <div class="year-select">
                                        <div>
                                            <label for="year">Year -</label>
                                        </div>
                                        <div>
                                            <select class="year custom-scroll" name="year"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <canvas id="myChart"></canvas>
                        </div>

                        <div class="course-analysis">
                            <div class="graph-header">
                                <div class="left">
                                    <h6>Country Analysis</h6>
                                    <span>Topic-wise course distribution in different regions.</span>
                                </div>
                                <div class="right d-flex flex-column gap-1">
                                    <div class="country-select">
                                        <div>
                                            <span>Country -</span>
                                        </div>
                                        <div>
                                            <select class="custom-scroll countries-2"></select> <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pie-graph">
                                <div class="info-part">
                                    <div class="country d-flex gap-3 align-items-center">
                                        <div class="color-container-1 clr-container"></div>
                                        <div class="info">
                                            <div class="number-info">182</div>
                                            <div class="topic-info">Country Topic</div>
                                        </div>
                                    </div>
                                    <div class="product d-flex gap-3 align-items-center">
                                        <div class="color-container-2 clr-container"></div>
                                        <div class="info">
                                            <div class="number-info">127</div>
                                            <div class="topic-info">Product Topic</div>
                                        </div>
                                    </div>
                                    <div class="Blanket d-flex gap-3 align-items-center">
                                        <div class="color-container-3 clr-container"></div>
                                        <div class="info">
                                            <div class="number-info">643</div>
                                            <div class="topic-info">Blanket Topic</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pie-chart">
                                    <canvas id="myChartpie"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="two-graph-container">
                        <div class="trainee-activity">
                            <div class="graph-header">
                                <div class="left">
                                    <h6>Trainee Activity Analysis</h6>
                                    <span>Course % completed on monthly basis by the in regions</span>
                                </div>
                                <div class="right d-flex flex-column gap-1">
                                    <div class="country-select">
                                        <div>
                                            <span>Country -</span>
                                        </div>
                                        <div>
                                            <select class="custom-scroll countries-3"></select> <br/>
                                        </div>
                                    </div>
                                    <div class="year-select">
                                        <div>
                                            <label for="year">Year -</label>
                                        </div>
                                        <div>
                                            <select class="custom-scroll year-2" name="year"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <canvas id="myChart3"></canvas>

                        </div>
                        <div class="time-analysis">
                            <div class="graph-header">
                                <div class="left">
                                    <h6>Time Analysis</h6>
                                    <span>Days & Hours Spent in learning over a month in different regions</span>
                                </div>
                                <div class="right d-flex flex-column gap-1">
                                    <div class="country-select">
                                        <div>
                                            <span>Country -</span>
                                        </div>
                                        <div>
                                            <select class="custom-scroll countries-4"></select> <br/>
                                        </div>
                                    </div>
                                    <div class="year-select">
                                        <div>
                                            <label for="year">Year -</label>
                                        </div>
                                        <div>
                                            <select class="year-3 custom-scroll" name="year"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <canvas id="myChart4"></canvas>

                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default index;