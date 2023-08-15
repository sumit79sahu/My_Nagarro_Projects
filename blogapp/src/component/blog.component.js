import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import {  toast } from 'react-toastify';
import '../css/blog.css'
export default function Blog({ props, Delete, Edit }) {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)
    const [editblog, setEditblog] = useState({ Title: props[0].data.Title, Likes: props[0].data.Likes, Category: props[0].data.Category, Content: props[0].data.Content });
    const [Category, setCategory] = useState(false)
    const [Content, setContent] = useState(false)

    const Like = (e) => {
        editblog["Likes"]++
        Edit(editblog)
    }
    const Deleteblog = (e) => {
        e.preventDefault();
        const s = window.confirm("Are sure you want to delete this blog")
        if (s) {
            Delete(props)
            navigate('/')
            toast.success('Blog successfully deleted', {autoClose:3000,position: toast.POSITION.BOTTOM_RIGHT})
        }
    }

    const GetEditblog = (e) => {
        e.preventDefault();
        const data = { ...editblog }
        const name = e.target.getAttribute('name')
        if(name==="Category") setCategory(false)
        if(name==="Content") setContent(false)
        const value = e.target.value;
        data[name] = value
        setEditblog(data);
    }

    const Editblog = (e) => {
        e.preventDefault();
        if(editblog["Category"] !== "" && editblog["Content"] !== "")
        {
            Edit(editblog)
            setEdit(false)
            toast.success('Blog successfully edited', {autoClose:3000,position: toast.POSITION.BOTTOM_RIGHT})
            
        }
        if(editblog["Category"] === "")
        {
            setCategory(true)
        }
        if(editblog["Content"] === "")
        {
            setContent(true)   
        }


    }
    return (
        <>
            <div className="blog">
                <div className="blog-cntr">
                    <div className='blog-btn'>
                        <Button variant="primary" className="" onClick={(e) => Like(e)} disabled={edit ? true : false} >Like</Button>
                        <Button variant="success" className="" onClick={() => setEdit(true)} disabled={edit ? true : false}>Edit</Button>
                        <Button variant="danger" className="" onClick={(e) => { Deleteblog(e) }} disabled={edit ? true : false}>Delete</Button>
                        <Button as={Link} to={"/"} variant="secondary">Back</Button>
                    </div>
                    <div className='read-blog'>
                        {
                            props.map(({ data }) => {
                                return (
                                    edit ?
                                        <React.Fragment key=" ">
                                            <h2>
                                                {data.Title}
                                            </h2>
                                            <Form className='form edit-form ' onSubmit={(e) => Editblog(e)} >
                                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">

                                                    <div className='label-box'>
                                                        <Form.Label>Category</Form.Label>
                                                        {Category ? <span className='error'>This field is required</span> : <span className='error'></span>}

                                                    </div>
                                                    <Form.Control type="text" name='Category' placeholder="Enter Your Blog Category" pattern="^[a-zA-Z ]*$" defaultValue={data.Category} onChange={(e) => GetEditblog(e)} />
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">

                                                    <div className='label-box'>
                                                        <Form.Label>Content</Form.Label>
                                                        {Content ? <span className='error'>This field is required</span> : <span className='error'></span>}
                                                    </div>
                                                    <Form.Control as="textarea" name='Content' rows={4} defaultValue={data.Content} onChange={(e) => GetEditblog(e)} />
                                                </Form.Group>
                                                <Button variant="success" type='submit' className='submit' >Update</Button>
                                                <Button variant="danger" type='reset' onClick={() => setEdit(false)} className='cancel' >Cancel</Button>

                                            </Form>
                                        </React.Fragment>
                                        : <React.Fragment key=" ">
                                            <h2 className='edit-title'>
                                                {data.Title}
                                            </h2>
                                            <h4 className='edit-category'>
                                                {
                                                    data.Category
                                                }
                                            </h4>
                                            <h6 className='edit-likes'>
                                                {
                                                    data.Likes
                                                } Likes
                                            </h6>
                                            <p className='edit-content'>
                                                {
                                                    data.Content
                                                }
                                            </p>
                                        </React.Fragment>

                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}