import '../Assets/styles/Pages/UserProfile.css'
import ProfileEdit from '../Layout/ProfileEdit'
import userimage from '../Assets/Images/user.jpg'
import { useUser } from '../hooks/useUser'
import { useSelector } from 'react-redux'
import NavbarComponent from '../Component/Navbars/NavbarComponent';
import Footer from "../Component/Footer/Footer";
export default function MyProfile() {
    const { name, email } = useUser()
    const { token } = useSelector((state) => state.persistedReducer.token);
    const onDelete= async()=>
    {
        const result=await fetch(`http://localhost:3000/api/userdelete/${email}`,{method:'delete',headers: { "content-type": "application/json", Authorization: `Bearer ${token}` }})
        const response=await result.json();
        console.log(response)
    }
    return (
        <>
            <NavbarComponent />
            <div className="my-profile-container">
                <div className="my-profile-name-navbar">
                    <div className="my-profile-name border">
                        <img src={userimage} alt="" className='user-img' />
                        <h5>Hii<br />{name}</h5>
                    </div>
                </div>
                <div className="my-profile-information border">
                    <ProfileEdit />
                    <div className='my-profile-information-faq'>
                        <h5>FAQs</h5>
                        <div className='fqa-ques-ans'>
                            <span className='fqa-ques'>What happens when I update my email address?</span>
                            <span>Your login email id changes, likewise. You'll receive all your account related communication on your updated email address.</span>
                            <span className='fqa-ques'>When will my Quickmart account be updated with the new email address?</span>
                            <span>It happens as soon as you confirm the verification code sent to your email and save the changes.</span>
                            <span className='fqa-ques'>What happens to my existing Quickmart account when I update my email address?</span>
                            <span>Updating your email address doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</span>
                        </div>
                        
                    </div>
                    <button className='link account-close-link' onClick={onDelete}>Deactivate Account</button>

                </div>

            </div>
            <Footer/>
        </>
    )
}

