import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch} from 'react-redux';
import { Button } from "react-bootstrap";
import img1 from "../Assets/Images/email-fail.svg";
import "../Assets/styles/Layout/Verification.css";
import { CloseButton } from 'react-bootstrap';
import { emailVerificationShow } from "../Store/Verification/EmailVerification";

export default function EmailVerificationSuccess() {

  const {failShow}=useSelector(state=>state.emailverification)
  const dispatch=useDispatch()

  return (
    <>
      <Modal
        show={failShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <div className="verification-success-box">
          <img src={img1} className="verify-email" alt="" />
          <h3 className="verify-title">Sorry, your email has not been verified.</h3>
          <CloseButton type="button" className='close' onClick={() => dispatch(emailVerificationShow({email:'',verificationShow:false,successShow:false,failShow:false}))} />
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}