import moment from 'moment';
import Link from 'next/link';
export default function moduleCard({ moduleData, moduleIndex }) {
  const rand = 1 + Math.random() * (100 - 1);
  return (
    <>
      <div>
        <div>
          <a href="#" className="module-anchor" style={{ textDecoration: 'none' }}>
            <div className="module-card card-1" style={{ backgroundColor: '#F3F3F3' }}>
              <span>{moduleIndex+1} . {moduleData?.module_name}</span>
            </div>
          </a>
        </div>
        <div className="" style={{padding: '1rem 0rem 0rem 0rem'}}>
          <div className="card-1-progress">
            <div className="progress" style={{ width: '100%' }}>
              <div className="progress-bar" role="progressbar" style={{ width: `${rand}%` }} aria-valuenow="0"
                aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}