import moment from 'moment';
import Link from 'next/link';
export default function recentLearningCard() {
  const rand = 1 + Math.random() * (100 - 1);
  return (
    <>
      <div className="learning-card cardleaern">
        <div className="thumbnail-container">
          <img className="thumbnail-img" src="/trainee-images/trainee-dashboard/card-thumbnail.png"
            alt="" />
        </div>
        <div className="topic-info d-flex flex-column">
          <div className="topic-heading-container">
            <div className="topic-heading">
              <h5>Gastroestrology</h5>
            </div>
            <div className="time-left-info" style={{ color: "#030303" }}><span>9hrs 41mins left</span></div>
          </div>

          <div className="progress-info" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <div className="d-flex flex-column gap-1">
              <div className="percentage-info" style={{ padding: '0px' }}>
                <span>80% Employees Completed</span>
              </div>
              <div className="progress-bar-info">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{
                    width: "75%",
                    ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100"
                  }}>
                  </div>
                </div>
              </div>
              <div className="completed-info">
                <span><span className="text-primary">67 </span>Out of 90 Completed</span>
              </div>
            </div>
            <div className="button-container" style={{ padding: 'unset' }}>
              <a href="#">
                <button type="button" className="learning-btn">Continue Learning</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}