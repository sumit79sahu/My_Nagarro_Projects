import React from "react";
import img1 from '../../Assets/Images/login.jpg'
import '../../Assets/styles/Components/FormImage.css'

export default function FormImage()
{
    return(
        <>
         <img src={img1} alt="" className="form-image"/>
        </>
    )
}