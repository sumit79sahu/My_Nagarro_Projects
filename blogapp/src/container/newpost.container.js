import NewPost from "../layout/newpost.layout";
import {connect} from 'react-redux'
import {NewBlog} from '../services/action/action'
const mapStateToProps=state=>({
  data:state.BlogData
})
const mapDispatchToProps=dispatch=>({
    NewBlogHandler:data=>dispatch(NewBlog(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(NewPost)
