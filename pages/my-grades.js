import { useState, useContext, useEffect } from "react";
import useSWR from 'swr';
import auth from "../model/auth.model";
import Router from "next/router";
import AppContext from '../lib/appContext';
import assignmentModel from "../model/assignment.model";
const mygrade = () => {
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("My Grades") }
    const [allAsignments, setAllAsignments] = useState([]);
    useEffect(() => {
        assignmentModel.list().then((submittedRes) => {
            console.log("list", submittedRes);
            setAllAsignments(submittedRes);
        });
    }, []);
    var curdate = "";
    var curImage = "";
    return (
        <>
            <form>
                <div className="trainee-body">
                    <div className="trainee-list d-flex flex-column" style={{ padding: 'unset', height: 'unset' }}>
                        <div className="box-1"></div>
                        <div className="box-2"></div>

                        <div className="trainee-tag" style={{ zIndex: '1' }}>
                            <p>My Grades</p>
                        </div>

                        <div className="body-row">
                            <div><span><strong>Grade Items</strong></span></div>
                            <div><span><strong>Percentage</strong></span></div>
                            <div><span><strong>Submitted On</strong></span></div>
                        </div>


                        <div className="Quizzes-heading-1">
                            <span style={{ color: "#008BD6" }}>Courses</span>
                        </div>

                        <div className="Quiz-container custom-scroll">
                            {allAsignments?.map((item, index) => {
                                curdate = new Date(item?.curData?.updated_at)
                                curdate = curdate.toLocaleString();
                                curImage = "/trainee-images/trainee-my-grade/octicon_checklist-24.png";
                                if(item?.curData?.course?.course_thumbnail) {
                                    curImage = item?.curData?.course?.course_thumbnail;
                                }
                                return (
                                    <div className="Quiz-1 d-flex justify-content-between" key={index}>
                                        <div className="grade-item d-flex gap-1 align-items-center">
                                            <div className="grade-icon">
                                                <img src={curImage} alt="Course Image" height={20} width={20} />
                                            </div>
                                            <span>{item?.curData?.course?.course_name}</span>
                                        </div>
                                        <div className="Percentage">
                                            <span><strong>{item.maxPercent}%</strong></span>
                                        </div>
                                        <div className="Remarks">
                                            <span>{curdate}</span>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}
export default mygrade;