import { useState, useEffect, useContext } from "react";
import AppContext from "../../../lib/appContext";
import useSWR, { mutate } from 'swr';
import auth from "../../../model/auth.model";
import userModal from "../../../model/user.model";
import { useRouter } from "next/router";
import { config } from '../../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
const addTrainer = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Add Trainer") }
    const [errorMessage, seterrorMessage] = useState("");

    const { data: userId, userIderror, userIdisLoading } = useSWR('nextUserId', async () => await userModal.getNextUserId({ role: "trainer" }));
    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        seterrorMessage("");
        if (data.password === data.password_confirmation) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(data.password)) {
                const formData = new FormData(event.target);
                //console.log(data, formData);
                formData.append('role', 'trainer');
                //console.log(data.password);
                await userModal.addUser(formData).then((res) => {
                    helper.sweetalert.toast("Trainer Added");
                    router.push("/users/trainer");
                }).catch((error) => {
                    if(error.response?.data?.errors?.[0]?.message == "email must be unique") {
                        seterrorMessage("This email address is not available for creation.");
                        helper.sweetalert.toast("This email address is not available for creation.", "warning");
                    } else if (error.response?.data?.errors?.[0]?.message == "contact_no must be unique") {
                        seterrorMessage("This contact number is not available for creation.");
                        helper.sweetalert.toast("This contact number is not available for creation.", "warning");
                    } else {
                        seterrorMessage(error.response?.data?.errors?.[0]?.message);
                    }
                    
                    console.error(error.response?.data)
                    setFormErrors(error.response?.data?.errors);
                })
            } else {
                helper.sweetalert.toast("Password must be at least 8 characters consisting of numbers, uppercase and lowercase letters", "warning");
                seterrorMessage("Password must be at least 8 characters consisting of numbers, uppercase and lowercase letters");
            }
        } else {
            helper.sweetalert.toast("Passwords Not Matched", "warning");
            seterrorMessage("Passwords Not Matched");
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    useEffect(() => {
        setPasswordType("password");
        if (showPassword) {
            setPasswordType("text");
        }
    }, [showPassword])

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    useEffect(() => {
        setConfirmPasswordType("password");
        if (showConfirmPassword) {
            setConfirmPasswordType("text");
        }
    }, [showConfirmPassword])
    const [passwordStrengthColor, setPasswordStrengthColor] = useState("red");
    const [passwordStrengthText, setPasswordStrengthText] = useState("Low");
    const onPasswordChange = (e) => {
        let strength = 0;
        let password = e.target.value;
        //If password contains both lower and uppercase characters
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            strength += 1;
        }
        //If it has numbers and characters
        if (password.match(/([0-9])/)) {
            strength += 1;
        }
        //If it has one special character
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
            strength += 1;
        }
        //If password is greater than 7
        if (password.length > 7) {
            strength += 1;
        }

        if(strength < 2) {
            setPasswordStrengthText("Low");
            setPasswordStrengthColor("red");
        } else if (strength == 3) {
            setPasswordStrengthText("Medium");
            setPasswordStrengthColor("#acac0d");
        } else if (strength == 4) {
            setPasswordStrengthText("Strong");
            setPasswordStrengthColor("green");
        }
    };
    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data" >

                <div className="trainee-body">
                    <div className="trainee-list-createcourse d-flex flex-column">
                        <div className="box-1-enrolledtrainers"></div>
                        <div className="box-2-enrolledtrainers"></div>

                        <div className="trainee-tag-enrolledtrainers">
                            <p>Register Trainer</p>
                        </div>
                        <div className="trainer-ID">
                            <span>Trainer ID -</span>
                            <span style={{ fontWeight: '600', color: '#008bd6' }}> {userId?.data} </span>
                            <span style={{ color: '#008bd6', fontWeight: '100', fontSize: '12px' }}
                                className="pl-2">(Auto-generated)</span>
                        </div>
                        <div className="trainer-ID"><b className='text-danger'>{errorMessage}</b></div>
                        <div className="trainer-name" style={{ display: 'block' }}>
                            <h6>Trainer Name</h6>
                            <input type="text" {...register("full_name", { required: "Fill Name" })} placeholder="Enter Trainer's full name" />
                        </div>

                        <div className="trainer-email">
                            <h6>Trainer Email</h6>
                            <input type="email" {...register("email", { required: "Fill Email Address" })} placeholder="Enter Trainer's email address" />
                        </div>

                        <div className="trainer-name" style={{ display: 'block' }}>
                            <h6>Trainer Contact</h6>
                            <input type="text" {...register("contact_no", { required: "Fill Contact Number" })} placeholder="Enter Trainer's Contact Number" />
                        </div>

                        <div className="trainer-email-password">
                            <div className="d-flex gap-2 text-info">
                                <h6>Create password</h6>
                                <span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                <span style={{ color: passwordStrengthColor, fontSize: '12px' }}>password strength -
                                    <strong>{passwordStrengthText}</strong></span>
                            </div>
                            <div className="input-group ">
                                <input className="form-control"
                                    style={{ width: 'unset' }} type={passwordType}
                                    {...register("password", { required: "Fill Password" })}
                                    placeholder="Enter a Password" onKeyUp={onPasswordChange} />
                                <span className="input-group-text show-pass" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <i class="fa fa-eye-slash"></i>
                                    ) : (
                                        <i class="fa fa-eye"></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="trainer-email-password-comform">
                            <h6>Confirm Password</h6>
                            <div className="input-group ">
                                <input type={confirmPasswordType} style={{ width: 'unset' }} className="form-control" {...register("password_confirmation", { required: "Fill Confirm Password" })} placeholder="Re-enter your password" />
                                <span className="input-group-text show-pass" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? (
                                        <i class="fa fa-eye-slash"></i>
                                    ) : (
                                        <i class="fa fa-eye"></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="btn-container">
                            <Link href="/users/trainer" className="cancel-btn" style={{ textDecoration: 'none' }}>Cancel</Link>

                            <button type="submit" data-toggle="modal" data-target="#myModal"
                                className="create-btn">Create
                                Account</button>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default addTrainer;