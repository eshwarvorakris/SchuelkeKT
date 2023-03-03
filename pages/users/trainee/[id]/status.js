import { useEffect, useState, useContext } from "react";
import AppContext from "../../../../lib/appContext";
import useSWR, { mutate } from 'swr';
import auth from "../../../../model/auth.model";
import userModal from "../../../../model/user.model";
import courseModel from "../../../../model/course.model";
import assignmentModel from "../../../../model/assignment.model";
import widgetModel from "../../../../model/widget.model";
import AdminCourseCard from "../../../components/adminCourseCard";
import { useRouter } from "next/router";
import { config } from '../../../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../../../lib/helper';
import Link from 'next/link';
const editTrainee = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Trainee Status") }
    const [profileData, setprofileData] = useState([]);
    const [errorMessage, seterrorMessage] = useState("");
    const [allAsignments, setAllAsignments] = useState([]);
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: courses, mutate: couresListMutate, error, isLoading } = useSWR("couresList", async () => await courseModel.list(), config.swrConfig);

    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: profileData });
    const [statusKpis, setStatusKpis] = useState([]);
    useEffect(() => {
        //console.log("Courses => ", courses?.data)
        if (router.query.id !== undefined) {

            userModal.detail(router.query.id).then((res) => {
                setprofileData(res?.data);
                //console.log(res?.data);
                reset(res?.data);
            }).catch((error) => {
                console.log(error);
            });
            const assignmentUser = new FormData();
            assignmentUser.append("trainee_id", router.query.id);
            assignmentModel.traineeAttempts(assignmentUser).then((submittedRes) => {
                //console.log("list", submittedRes);
                setAllAsignments(submittedRes);
            });
            widgetModel.traineeStatusKpis(assignmentUser).then((res) => {
                console.log("kpi response", res);
                setStatusKpis(res);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [router, reset]);

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        seterrorMessage("");
        const formData = new FormData(event.target);
        //console.log(data.password);
        await userModal.update(router.query.id, formData).then((res) => {
            helper.sweetalert.toast("Trainee Updated");
            router.push("/users/trainee");
        }).catch((error) => {
            seterrorMessage(error.response?.data?.errors?.[0]?.message);
            console.error(error.response?.data?.errors?.[0]?.message)
            setFormErrors(error.response?.data?.errors);
        })
    });
    var curStatus = "";
    var submitColor = "";
    var passStatus = "";
    var passStatusColor = "";
    var averageScore = 0;
    return (
        <>
            <div className="trainee-body">
                <div className="trainee-list d-flex flex-column" style={{ padding: 'unset', height: 'unset' }}>
                    <div className="box-1"></div>
                    <div className="box-2"></div>

                    <div className="trainee-tag" style={{ zIndex: '1' }}>
                        <p>Trainee Status</p>
                    </div>

                    <div className="trainee-info" style={{flexWrap: 'wrap'}}>
                        <div className="trainee-ID d-flex gap-2 justify-self-center"><span>Trainee ID :</span>
                            <h6 style={{ color: '#008bd6' }}><strong>{profileData?.user_id}</strong></h6>
                        </div>
                        <div className="trainee-name d-flex gap-2 justify-self-center"><span>Trainee-name :</span>
                            <h6 style={{ color: '#000' }}><strong>{profileData?.full_name}</strong></h6>
                        </div>
                        <div className="courses-enrolled d-flex gap-2 justify-self-center "><span>No. of courses
                            Enrolled :</span>
                            <h6 style={{ color: '#000' }}> <strong>6</strong></h6>
                        </div>
                        <div className="courses-Email d-flex gap-2 justify-self-center"><span>Email :</span>
                            <h6 style={{ color: '#000' }}><strong>{profileData?.email}</strong></h6>
                        </div>
                    </div>

                    <div className="trainee-topic-cards row" style={{marginBottom:'unset'}}>
                        {courses?.data?.map((item, index) => {
                            //console.log(item);
                            return (
                                <AdminCourseCard key={`courseCard${index}`} courseData={item} courseIndex={index} />
                            )
                        })}
                    </div>

                    <div className="assignment-table">
                        <div className="table-header d-flex justify-content-between">
                            <div className="trainee-main-heading d-flex">
                                <div className="trainee-assignment-heading"></div>
                                {/* <div className="label-info d-flex text-warning gap-2">
                                    <div className="blank-dot-class"></div>
                                    <div className="dot-label" style={{ backgroundColor: '#ffc50f' }}></div>
                                    <span></span>
                                </div> */}
                            </div>
                            {/* <div className="assignment-filter">

                                <div className="dropdown">
                                    <button type="button" className="btn dropdown-toggle dropdown-btn"
                                        id="book-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        Filter
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="book-dropdown">
                                        <div className="dropdown-content">
                                            <div className="d-flex flex-column">
                                                <div className="heading">
                                                    <p>Submission Status</p>
                                                </div>
                                                <div className="checkbox-items d-flex gap-2">
                                                    <div className="CB">
                                                        <input type="checkbox" id="vehicle1" name="vehicle1"
                                                            value="Bike" />
                                                        <label for="vehicle1">Submited</label><br />
                                                    </div>
                                                    <div className="CB">
                                                        <input type="checkbox" id="vehicle2" name="vehicle2"
                                                            value="Car" />
                                                        <label for="vehicle2">Pending</label><br />
                                                    </div>
                                                    <div className="CB">
                                                        <input type="checkbox" id="vehicle3" name="vehicle3"
                                                            value="Boat" />
                                                        <label for="vehicle3">Not Started</label><br /><br />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-column gap-1">
                                                <div className="heading">
                                                    <p>Obtained Score</p>
                                                </div>
                                                <div className="progressbar d-flex">
                                                    <span>0%</span>
                                                    <div className="progress" style={{ height: '5px', width: '100%' }}>
                                                        <div className="progress-bar" role="progressbar"
                                                            style={{ width: '90%' }} aria-valuenow="75" aria-valuemin="0"
                                                            aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span>100%</span>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-column gap-2">
                                                <div className="heading">
                                                    <p>Passing Status</p>
                                                </div>
                                                <div className="checkbox-items d-flex gap-2">
                                                    <div className="CB">
                                                        <input type="checkbox" id="vehicle1" name="vehicle1"
                                                            value="Bike" />
                                                        <label for="vehicle1">Pass</label><br />
                                                    </div>
                                                    <div className="CB">
                                                        <input type="checkbox" id="vehicle2" name="vehicle2"
                                                            value="Car" />
                                                        <label for="vehicle2">Fail</label><br />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-column gap-1">
                                                <div className="heading">
                                                    <p>No. of Attempts</p>
                                                </div>
                                                <div className="progressbar d-flex">
                                                    <span>0%</span>
                                                    <div className="progress" style={{ height: '5px', width: '100%' }}>
                                                        <div className="progress-bar" role="progressbar"
                                                            style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0"
                                                            aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span>10%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {(layoutValues?.profile?.role == 'admin') &&
                            <div className="dashboard-info" style={{ padding: '2rem 0rem', marginTop: 'unset' }}>
                                <div className="total-courses" style={{ padding: '1rem 2rem' }}>
                                    <div className="left-info" style={{ justifySelf: 'unset' }}>
                                        <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                                            <h1 className="text-light" >{statusKpis.totalCourse}</h1>
                                        </div>
                                        <div className="explicit-info text-light">
                                            <p>Total Courses</p>
                                        </div>
                                    </div>
                                    <div className="right-icon">
                                        <img src="/trainer-images/dashboard images/icon-1.png" alt="" className="icon-info" />
                                    </div>
                                </div>

                                <div className="total-courses" style={{ padding: '1rem 2rem' }}>
                                    <div className="left-info" style={{ justifySelf: 'unset' }}>
                                        <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                                            <h1 className="text-light" >{statusKpis.totalCourseCompleted}</h1>
                                        </div>
                                        <div className="explicit-info text-light">
                                            <p>Course Completed</p>
                                        </div>
                                    </div>
                                    <div className="right-icon">
                                        <img src="/trainer-images/dashboard images/icon-4.png" alt="" className="icon-info" />
                                    </div>
                                </div>

                                <div className="total-courses" style={{ padding: '1rem 2rem' }}>
                                    <div className="left-info" style={{ justifySelf: 'unset' }}>
                                        <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                                            <h1 className="text-light" >{statusKpis.averageScore}</h1>
                                        </div>
                                        <div className="explicit-info text-light">
                                            <p>Average Score</p>
                                        </div>
                                    </div>
                                    <div className="right-icon">
                                        <img src="/admin-images/sheet.svg" alt="" className="icon-info" />
                                    </div>
                                </div>

                                <div className="total-courses" style={{ padding: '1rem 2rem' }}>
                                    <div className="left-info" style={{ justifySelf: 'unset' }}>
                                        <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                                            <h1 className="text-light" >{statusKpis.totalTrainingHour}</h1>
                                        </div>
                                        <div className="explicit-info text-light">
                                            <p>Training Time</p>
                                        </div>
                                    </div>
                                    <div className="right-icon">
                                        <img src="/trainer-images/dashboard images/icon-3.png" alt="" className="icon-info" />
                                        <img src="/trainer-images/dashboard images/icon-3(2).png" className="vector-fig" alt="" />
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="table-data" style={{ padding: '2rem 0rem 0rem 0rem', height: 'fit-content', overflow: 'unset', paddingBottom: '2rem' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <td style={{ width: '15%' }}>Course Name</td>
                                        <td style={{ width: '15%' }}>Course Status</td>
                                        <td style={{ width: '5%' }}>No. of Attempts</td>
                                        <td style={{ width: '5%' }}>Average Score</td>
                                        <td style={{ width: '5%' }}>Obtained Score</td>
                                        <td style={{ width: '5%' }}>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allAsignments?.map((item, index) => {
                                        curStatus = 'Submitted';
                                        submitColor = 'text-success';
                                        if(item?.curData?.status != "submitted") {
                                            submitColor = 'text-danger';
                                            curStatus = 'Not Submitted<';
                                        }
                                        passStatusColor = 'text-success';
                                        passStatus = "Pass";
                                        if(item?.maxPercent < 80) {
                                            passStatusColor = 'text-danger';
                                            passStatus = 'Fail';
                                        }
                                        averageScore = (item?.totalScore / item.totalAttempts)
                                        return (
                                            <tr key={index}>
                                                <td>{item?.curData?.course?.course_name}</td>
                                                <td className={submitColor}><span>{curStatus}</span></td>
                                                <td>{item.totalAttempts}</td>
                                                <td>{averageScore}%</td>
                                                <td className={passStatusColor}>{item?.maxPercent}%</td>
                                                <td className={passStatusColor}>{passStatus}</td>
                                            </tr>
                                        );
                                    })}

                                    {/* <tr>
                                        <td>Assignment 2</td>
                                        <td className="text-danger">
                                            <span>Not Submitted</span>
                                        </td>
                                        <td>-</td>
                                        <td>90%</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Assignment 3</td>
                                        <td className="text-success">
                                            <span>Submitted</span>
                                        </td>
                                        <td>2</td>
                                        <td>94%</td>
                                        <td className="text-warning">86%</td>
                                        <td className="text-success">Pass</td>
                                    </tr>
                                    <tr>
                                        <td>Assignment 4</td>
                                        <td className="text-success">
                                            <span>Submitted</span>
                                        </td>
                                        <td>1</td>
                                        <td>93%</td>
                                        <td className="text-danger">24%</td>
                                        <td className="text-danger">Fail</td>
                                    </tr>
                                    <tr>
                                        <td>Final Assignment</td>
                                        <td className="">
                                            <span>Not Started</span>
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default editTrainee;