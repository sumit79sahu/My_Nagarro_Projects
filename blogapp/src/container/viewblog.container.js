import ViewBlog from '../layout/viewblog.layout'
import {connect} from 'react-redux'
import { DeleteBlog,EditBlog } from '../services/action/action'

const mapStateToProps=state=>({
    data:state.BlogData
})
const mapDispatchToProps=dispatch=>({
    DeleteBlogHandler:data=>dispatch(DeleteBlog(data)),
    EditBlogHandler:data=>dispatch(EditBlog(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(ViewBlog)