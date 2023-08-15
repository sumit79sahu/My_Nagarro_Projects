import '../css/posts.css'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react';
import { blogContext } from '../layout/home.layout';

export default function Posts() {
    const props = useContext(blogContext)

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const Next = (e) => {
        e.preventDefault();
        setStart(end);
        setEnd(end + 3);
    }
    const Previous = (e) => {
        e.preventDefault();
        setStart(start - 3);
        setEnd(start);
    }
    return (
        <>
            <div className="posts">
                <div className="cntr">
                    <div className='add-btn'>
                        <Button as={Link} to={'/NewPost'} variant="success">New Post</Button>
                    </div>
                    <div className='view-posts'>

                        {
                            props.slice(start, end).map(({ data }) => {
                                return (
                                    <React.Fragment key={data.Title}>
                                        <Link as={Link} to={`/ViewBlog/${data.Title}`} className='post'>
                                            <Card style={{  height: '20vh' }} className=" card shadow-sm bg-body-tertiary rounded">
                                                <Card.Body className=' card-body'>
                                                <Card.Subtitle as="h4"  className='blog-title'>{data.Title}</Card.Subtitle>
                                                    <Card.Subtitle className=" category mb-1 text-muted">{data.Category}</Card.Subtitle>

                                                    <div className='content-box'>
                                                        {data.Content.length >= 100 ?
                                                            <Card.Text className='content'>
                                                                {data.Content.slice(0, 100)}<strong> ...ReadMore</strong>
                                                            </Card.Text>
                                                            :
                                                            <Card.Text className='content'>
                                                                {
                                                                    data.Content
                                                                }
                                                            </Card.Text>
                                                        }
                                                        <Card.Text className='like text-muted'>
                                                            {data.Likes} Likes
                                                        </Card.Text>

                                                    </div>
                                                </Card.Body>
                                            </Card>

                                        </Link>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='pagination'>

                    {
                        start === 0 ? <div></div> : <Button className='page' onClick={(e) => { Previous(e) }}>Previous</Button>
                    }
                                        {
                        (props.slice(start, end).length === 3 && props[end]!==undefined) ? <Button className='page' onClick={(e) => Next(e)}>Next</Button> : <div></div>
                    }
                </div>
            </div>

        </>
    )
}