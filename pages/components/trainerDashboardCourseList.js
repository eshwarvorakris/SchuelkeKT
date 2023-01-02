export default function adminDashboardGraph() {

  return (
    <>
      <div class="category-create-btn d-flex justify-content-between">

        <div class="category d-flex gap-3 align-items-center">
          <h6 for="category" style={{ color: "#7E878C", fontFamily: "Co-text" }}>Category: </h6>
          <select name="category" id="cars" className='select-dashboard'>
            <option value="Country">-Select-</option>
            <option value="Country">Country</option>
            <option value="Blanket">Blanket</option>
            <option value="Product">Product</option>
          </select>
        </div>
        <div class="create-course-btnn">
          <div class="create-course">
            <a href="./courses/create">
              <button class="btn btn-primary create-course-btnn"
                style={{ backgroundColor: "#008bd6" }}>Create
                Course <strong>+</strong></button>
            </a>
          </div>
        </div>
      </div>
      <div class="course-info-cards">
        <div class="course-info-card-1 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnaila.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Country</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>

                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-2 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnailb.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Blanket</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>

                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-3 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/3-thumbnail.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Country</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>
                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-4 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnaila.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Product</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: ' 75%', ariaValuenow: '75', ariaValuemin: "0", ariaValuemax: "100" }}>
                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-5 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnailc.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Country</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: ' 75%', ariaValuenow: "75", ariAluemin: "0", ariaValuemax: "100" }}>
                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>
      </div><div class="trainer-pagination">
        <nav class="pagination-container-dashboard d-flex justify-content-end">
          <div class="pagination">
            <a class="pagination-newer" href="#">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </a>
            <span class="pagination-inner">
              <a href="#">1</a>
              <a class="pagination-active" href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
            </span>
            <a class="pagination-older" href="#">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}