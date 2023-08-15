import '../Assets/styles/Pages/UserProfile.css'
import * as Yup from "yup";
import { useUser } from '../hooks/useUser'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authToken } from "../Store/Login/userAuthorizationSlice";
import TextBox from '../Component/Inputs/TextBox';
import SelectBox from '../Component/Inputs/SelectBox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
export default function ProfileEdit() {

    const { name, email, mobileno, gender } = useUser()


    const [PIEdit, setPIEdit] = useState(false)
    const [EmailEdit, setEmailEdit] = useState(false)
    const { token } = useSelector((state) => state.persistedReducer.token);

    const [error,setError]=useState(false)


    const dispatch = useDispatch();
    const onSave = async (value) => {
        const result = await fetch(`http://localhost:3000/api/useredit/${email}`, { method: 'put', headers: { "content-type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: value.name, gender: value.gender, mobileno: value.mobileno }) })
        const response = await result.json();
        if(response.message==="unauthorizised user")
        {
            setError(true)
        }
        if(response.message==="success")
        {
            dispatch(authToken(response.token));
            setPIEdit(false)
        }
    }

    const onCancel=(cancel,resetForm)=>
    {
        if(cancel==="pi")
        {
            setPIEdit(false)
            resetForm()
        }
    }

    return (
        <>
            <div className="profile-edit-information">

                <Formik
                    initialValues={{ name: name, gender: gender, mobileno: mobileno }}
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        gender: Yup.string()
                            .oneOf(
                                ['male', 'female'],
                                'Invalid Gender'
                            ),
                        mobileno: Yup.string().min(10, 'Invalid mobile no').matches(/[0-9]/, "Invalid mobile no"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        onSave(values)
                    }}
                >
                    {
                        ({ resetForm }) => (
                            <Form>
                                <div className='profile-edit-label-link'>
                                    <h4 className="profile-edit-label">Personal Information</h4>
                                    {
                                        PIEdit ?
                                            (
                                                <>
                                                    <button type='submit' className='link' >Save</button>
                                                    <button type='reset' className='link' onClick={()=>onCancel('pi',resetForm)}>Cancel</button>
                                                </>
                                            ) : (

                                                <button type='button' className='link' onClick={() => setPIEdit(true)}>Edit</button>
                                            )
                                    }
                                </div>
                                <div className='profile-edit-box '>
                                    <TextBox
                                        className="edit-inpt"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        disabled={!PIEdit} />
                                    <SelectBox as="select" disabled={!PIEdit} className='edit-inpt' name='gender'>
                                        <option value="">select gender</option>
                                        <option value="male" >male</option>
                                        <option value="female" >female</option>
                                    </SelectBox>
                                    <TextBox
                                        className="edit-inpt"
                                        name="mobileno"
                                        type="text"
                                        placeholder="Mobile No"
                                        disabled={!PIEdit} />
                                </div>
                            </Form>
                        )

                    }
                </Formik>

                <div className='profile-edit-label-link'>
                    <h4 className="profile-edit-label">Email Address</h4>
                    {
                        EmailEdit ?
                            (
                                <>
                                    <button type='submit' className='link' >Save</button>
                                    <button type='reset' className='link' onClick={()=>setEmailEdit(false)}>Cancel</button>
                                </>
                            ) : (

                                <button type='button' className='link' onClick={() => setEmailEdit(true)}>Edit</button>
                            )
                    }
                </div>
                <div className='profile-edit-box '>
                    <div className='input-container'>
                        <input type="text" value={email} placeholder='Email' disabled={!EmailEdit} className='edit-inpt' />
                        {/* <span className='input-error'>error</span> */}
                    </div>
                </div>
            </div>
        </>
    )
}