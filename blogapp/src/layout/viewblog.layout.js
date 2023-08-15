import Blog from "../component/blog.component"
import Header from '../component/header.component';
import {useParams} from 'react-router-dom'
export default function ViewBlog(props)
{
    const {Title}=useParams()
    const {DeleteBlogHandler,EditBlogHandler}=props
    const blog= props.data.filter(({data})=>
    { 
        return data.Title===Title?data:null;
    })
    return(
        <>
        <Header/>
        <Blog props={blog} Delete={DeleteBlogHandler} Edit={EditBlogHandler}/>
        </>
    )
}