import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch} from 'react-redux';
import { Navbar, Container, Button } from "react-bootstrap";
import { Link,useParams} from "react-router-dom";
import img1 from "../Assets/Images/email-verify.png";
import "../Assets/styles/Layout/Verification.css";
import { useState } from "react";
import { CloseButton } from 'react-bootstrap';
import { emailVerificationShow } from "../Store/Verification/EmailVerification";

export default function EmailVerification() {

  const {email,verificationShow}=useSelector(state=>state.emailverification)

  const [code,setCode]=useState('')
  const dispatch=useDispatch()
  
 const verify= async()=>
 {
  const result=await fetch(`http://localhost:3000/api/verify/${email}`,{method:'put',headers:{'content-type':'application/json'},body:JSON.stringify({code})})
  const response=await result.json();
  if(response.message==='success')dispatch(emailVerificationShow({email:'',verificationShow:false,successShow:true,failShow:false}))
  if(response.message==='fail')dispatch(emailVerificationShow({email:'',verificationShow:false,successShow:false,failShow:true}))
  setCode('')
 }



  return (
    <>
      <Modal
        show={verificationShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body >
            <div className="verification-box">
              <img src={img1} className="verify-email" alt="" />
              <h5 className="verify-title">VERIFY YOUR EMAIL ADDRESS</h5>
              <div className="verify-divider"></div>
              <div className="verify-text-container">
                <span className="verify-text">
                  Verify code has been send to
                </span>
                <span className="verify-email-text">{email}</span>
              </div>
              <span>
                Please check your email and enter the verification code below to
                verify your email address
              </span>
              <div className="verify-form">
                <input type="text" className="verify-inpt" placeholder="code" value={code} onChange={(e)=>setCode(e.target.value)} />
                <Button className="verify-btn" variant="success" onClick={verify}>
                  Verify
                </Button>
              </div>
              <CloseButton type="button" className='close' onClick={() => dispatch(emailVerificationShow({email:'',verificationShow:false,successShow:false,failShow:false}))} />
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
