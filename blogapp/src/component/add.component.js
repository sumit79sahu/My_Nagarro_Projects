// import { Button } from 'bootstrap';
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import '../css/add.css'
import {  toast } from 'react-toastify';
import {blogContext} from '../layout/newpost.layout'

function Add() {
    const props=useContext(blogContext)
    const [blogData, setBlogData] = useState({ "Title": "", "Likes": 0, "Category": "", "Content": "" });
    const [Title, setTitle] = useState(false)
    const [Category, setCategory] = useState(false)
    const [Content, setContent] = useState(false)
    const navigate = useNavigate();


    const GetBlogData = (e) => {
        e.preventDefault();
        const name = e.target.getAttribute('name')
        if(name==="Title") setTitle(false)
        if(name==="Category") setCategory(false)
        if(name==="Content") setContent(false)
        const value = e.target.value;
        const data = { ...blogData }
        data[name] = value
        setBlogData(data);
    }
    const AddNewBlog = (e) => {
        let exists=false
        e.preventDefault();
        if (blogData["Title"] !== "" && blogData["Category"] !== "" && blogData["Content"] !== "") {
            for(let i=0;i<props.data.length;i++)
            {
                if(props.data[i].data["Title"].toUpperCase()===blogData["Title"].toUpperCase())
                {
                    exists=true;
                    break;
                }
            }
            if(exists===false)
            {
                
                props.NewBlogHandler(blogData)
                navigate('/')   
                toast.success('Blog successfully added', {autoClose:3000,position: toast.POSITION.BOTTOM_RIGHT})
            }
            if(exists===true)
            {
                toast.error('Blog already present', {autoClose:3000,position: toast.POSITION.BOTTOM_RIGHT})
   
            }

        }
        if(blogData["Title"] === "")
        {
            setTitle(true)
        }
        if(blogData["Category"] === "")
        {
            setCategory(true)
        }
        if(blogData["Content"] === "")
        {
            setContent(true)   
        }
    }

    return (
        <>
            <div className="add-form">
                <div className="form-cntr">
                    <div className='back-btn'>
                        <Button as={Link} to={'/'} variant="primary">Back to Home</Button>
                    </div>
                    <Form className='form' onSubmit={(e) => AddNewBlog(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className='label-box'>
                                <Form.Label>Title</Form.Label>
                                {Title?<span className='error'>This field is required</span>:<span className='error'></span>}  
                            </div>

                            <Form.Control type="text" name='Title'  pattern="^[a-zA-Z ]*$" placeholder="Enter Your Blog Title" onChange={(e) => GetBlogData(e)} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className='label-box'>
                                <Form.Label>Category</Form.Label>
                                {Category?<span className='error'>This field is required</span>:<span className='error'></span>}
                               
                            </div>
                            <Form.Control type="text" name='Category'  pattern="^[a-zA-Z ]*$" placeholder="Enter Your Blog Category" onChange={(e) => GetBlogData(e)} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                            <div className='label-box'>
                                <Form.Label>Content</Form.Label>
                                {Content?<span className='error'>This field is required</span>:<span className='error'></span>}
                            </div>
                            <Form.Control as="textarea" name='Content' placeholder="Enter Your Blog Content" rows={3} onChange={(e) => GetBlogData(e)} />
                        </Form.Group>
                        <Button variant="success" type='submit' className='submit'>Submit</Button>
                        <Button variant="danger" type='reset' as={Link} to={'/'} className="cancel">Cancel</Button>
                    </Form>
                </div>
            </div>
            
        </>
    )
}
export default Add;