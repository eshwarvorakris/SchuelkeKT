import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router'
export default function chapterCard({ chapterData, chapterIndex }) {
  const router = useRouter();
  const QueryParam = router.query;
  const rand = 1 + Math.random() * (100 - 1);
  const chapterStatus = "locked"; // ongoing / completed / locked
  return (
    <>
      <Link className="topic-link" href={`/chapter/${chapterData?.id}?course=${QueryParam?.id}&module=${chapterData?.module_id}`} style={{ textDecoration: 'none' }}>
        <div className="chapter-1">
          <span>Chapter {chapterIndex + 1}: {chapterData?.title}</span>

          <span className="remaining-info">2hrs 30mins
            <i className="fa fa-solid fa-chevron-down " style={{ paddingLeft: '0.5rem' }}></i>
          </span>

          <div className="lastcol">
            {chapterStatus == "completed" &&
              <>
                <div className="chapter-completed-icon circle-icon">
                  <span>
                    <i className="completed-icon fa fa-solid fa-check"></i>
                  </span>
                </div>
              </>
            }

            {chapterStatus == "ongoing" &&
              <>
                <div className="progress-bar-info">
                  <div className="progress-circle progress-size over50 p90" style={{ fontSize: '6px', margin: 'unset' }}>
                    <span style={{ fontSize: '10px', left: '-30%', top: '-30%' }}>90%</span>
                    <div className="left-half-clipper">
                      <div className="first50-bar"></div>
                      <div className="value-bar"></div>
                    </div>
                  </div>
                </div>
              </>
            }

            {chapterStatus == "locked" &&
              <>
                <div className="chapter-locked-icon">
                  <span>
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>
              </>
            }
          </div>

        </div>
      </Link>
    </>
  );
}