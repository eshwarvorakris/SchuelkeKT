import { useEffect, useState, useContext } from "react";
import AppContext from "../../../../lib/appContext";
import useSWR, { mutate } from 'swr';
import auth from "../../../../model/auth.model";
import userModal from "../../../../model/user.model";
import courseModel from "../../../../model/course.model";
import { useRouter } from "next/router";
import { config } from '../../../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../../../lib/helper';
import moment from 'moment';
import Link from 'next/link';
const editTrainee = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Trainee Status") }
    const [profileData, setprofileData] = useState([]);
    const [errorMessage, seterrorMessage] = useState("");
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const [allCourses, setAllCourses] = useState([]);
    const [courseSubmitted, setCourseSubmitted] = useState(0);
    //const { data: courses, mutate: couresListMutate, error, isLoading } = useSWR("couresList", async () => await courseModel.list(), config.swrConfig);

    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: profileData });

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
            QueryParam.trainer_id = router.query.id;
            delete (QueryParam.id);
            courseModel.list(QueryParam).then((res) => {
                //console.log("courses => ",res);
                setCourseSubmitted(res?.data.length);
                setAllCourses(res?.data);
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

    return (
        <>
            <div className="trainee-body">
                <div className="trainee-list d-flex flex-column" style={{ padding: 'unset', height: 'unset' }}>
                    <div className="box-1"></div>
                    <div className="box-2"></div>

                    <div className="trainee-tag" style={{ zIndex: '1' }}>
                        <p>Trainer Status</p>
                    </div>

                    <div className="trainee-info" style={{flexWrap: 'wrap'}}>
                        <div className="trainee-ID d-flex gap-2 justify-self-center"><span>Trainee ID :</span>
                            <h6 style={{ color: '#008bd6' }}><strong>{profileData?.user_id}</strong></h6>
                        </div>
                        <div className="trainee-name d-flex gap-2 justify-self-center"><span>Trainer-name :</span>
                            <h6><strong>{profileData?.full_name}</strong></h6>
                        </div>
                        <div className="courses-enrolled d-flex gap-2 justify-self-center "><span>Courses
                            Submitted :</span>
                            <h6> <strong>{courseSubmitted}</strong></h6>
                        </div>
                        <div className="courses-Email d-flex gap-2 justify-self-center"><span>Email :</span>
                            <h6><strong>{profileData?.email}</strong></h6>
                        </div>
                    </div>

                    <div className="assignment-table">

                        <div className="table-data" style={{ padding: '2rem 0rem 0rem 0rem', height: 'fit-content', overflow: 'unset', paddingBottom: '2rem' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '5%' }}>#</td>
                                        <td style={{ width: '15%' }}>Course Name</td>
                                        <td style={{ width: '15%' }}>Topic</td>
                                        <td style={{ width: '5%' }}>Date Of<br />Launch</td>
                                        <td style={{ width: '5%' }}>Due<br />Date</td>
                                        <td style={{ width: '5%' }}>No Of<br />Modules</td>
                                        <td style={{ width: '5%' }}>Training<br />Time</td>
                                        <td style={{ width: '5%' }}>Approval<br />Status</td>
                                    </tr>
                                    {allCourses?.map((item, index) => {
                                        let approveClass = "";
                                        let approveStatus = "Pending";
                                        if(item.status == "approved") {
                                            approveClass = "text-success";
                                            approveStatus = "Approved";
                                        } else if (item.status == "rejected") {
                                            approveClass = "text-danger";
                                            approveStatus = "Rejected";
                                        }
                                        return (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item.course_name}</td>
                                                <td>{item.category.category_name}</td>
                                                <td>{item.course_launch_date}</td>
                                                <td>{moment(item.course_launch_date).add(item.week_duration, 'weeks').format("Do MMM YY")}</td>
                                                <td>{item.total_modules}</td>
                                                <td>{item.total_training_hour}</td>
                                                <td className={approveClass}>
                                                    <span>{approveStatus}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    
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