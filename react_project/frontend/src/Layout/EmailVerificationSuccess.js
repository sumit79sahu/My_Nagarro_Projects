import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch} from 'react-redux';
import {Button } from "react-bootstrap";

import img1 from "../Assets/Images/email-success.jpg";
import "../Assets/styles/Layout/Verification.css";

import { CloseButton } from 'react-bootstrap';
import { emailVerificationShow } from "../Store/Verification/EmailVerification";
import { loginShow } from '../Store/Login/loginSlice'

export default function EmailVerificationSuccess() {

  const {successShow}=useSelector(state=>state.emailverification)
  const dispatch=useDispatch()


  const login=()=>
  {
    
    dispatch(emailVerificationShow({email:'',verificationShow:false,successShow:false,failShow:false}))
    dispatch(loginShow(true))
  }

  return (
    <>
      <Modal
        show={successShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <div className="verification-success-box">
          <img src={img1} className="verify-email" alt="" />
          <h3 className="verify-title">Congratulation,your email has been verified.</h3>
          <Button onClick={login}>Click here to login</Button>
          <CloseButton type="button" className='close' onClick={() => dispatch(emailVerificationShow({email:'',verificationShow:false,successShow:false,failShow:false}))} />
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}