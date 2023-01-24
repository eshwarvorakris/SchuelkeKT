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

    const { data: courses, mutate: couresListMutate, error, isLoading } = useSWR("couresList", async () => await courseModel.list(), config.swrConfig);

    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: profileData });

    useEffect(() => {
        //console.log("Courses => ", courses?.data)
        if (router.query.id !== undefined) {
            userModal.detail(router.query.id).then((res) => {
                setprofileData(res?.data);
                console.log(res?.data);
                reset(res?.data);
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
            <div class="trainee-body">
                <div class="trainee-list d-flex flex-column" style={{ padding: 'unset', height: 'unset' }}>
                    <div class="box-1"></div>
                    <div class="box-2"></div>

                    <div class="trainee-tag" style={{ zIndex: '1' }}>
                        <p>Trainer Status</p>
                    </div>

                    <div class="trainee-info">
                        <div class="trainee-ID d-flex gap-2 justify-self-center"><span>Trainee ID :</span>
                            <h6 style={{ color: '#008bd6' }}><strong>{profileData?.user_id}</strong></h6>
                        </div>
                        <div class="trainee-name d-flex gap-2 justify-self-center"><span>Trainer-name :</span>
                            <h6><strong>{profileData?.full_name}</strong></h6>
                        </div>
                        <div class="courses-enrolled d-flex gap-2 justify-self-center "><span>Courses
                            Submitted :</span>
                            <h6> <strong>6</strong></h6>
                        </div>
                        <div class="courses-Email d-flex gap-2 justify-self-center"><span>Email :</span>
                            <h6><strong>{profileData?.email}</strong></h6>
                        </div>
                    </div>

                    <div class="assignment-table">
                        
                        <div class="table-data" style={{ padding: '2rem 0rem 0rem 0rem', height: 'fit-content', overflow: 'unset', paddingBottom: '2rem' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '15%' }}>Assignment Name</td>
                                        <td style={{ width: '15%' }}>Submimssion Status</td>
                                        <td style={{ width: '5%' }}>No. of Attempts</td>
                                        <td style={{ width: '5%' }}>Average Attempts</td>
                                        <td style={{ width: '5%' }}>Average Score</td>
                                        <td style={{ width: '5%' }}>Obtained Score</td>
                                        <td style={{ width: '5%' }}>Passing Status</td>
                                    </tr>
                                    <tr>
                                        <td>Assignment 1</td>
                                        <td class="text-success">
                                            <span>Submitted</span>
                                        </td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>92%</td>
                                        <td class="text-success">97%</td>
                                        <td class="text-success">Pass</td>
                                    </tr>
                                    <tr>
                                        <td>Assignment 2</td>
                                        <td class="text-danger">
                                            <span>Not Submitted</span>
                                        </td>
                                        <td>-</td>
                                        <td>1</td>
                                        <td>90%</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Assignment 3</td>
                                        <td class="text-success">
                                            <span>Submitted</span>
                                        </td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>94%</td>
                                        <td class="text-warning">86%</td>
                                        <td class="text-success">Pass</td>
                                    </tr>
                                    <tr>
                                        <td>Assignment 4</td>
                                        <td class="text-success">
                                            <span>Submitted</span>
                                        </td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>93%</td>
                                        <td class="text-danger">24%</td>
                                        <td class="text-danger">Fail</td>
                                    </tr>
                                    <tr>
                                        <td>Final Assignment</td>
                                        <td class="">
                                            <span>Not Started</span>
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
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