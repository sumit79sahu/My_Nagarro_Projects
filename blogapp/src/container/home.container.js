import Home from '../layout/home.layout'
import {connect} from 'react-redux'

const mapStateToProps=state=>({
  Data:state.BlogData
})
const mapDispatchToProps=dispatch=>({
})
export default connect(mapStateToProps,mapDispatchToProps)(Home)

