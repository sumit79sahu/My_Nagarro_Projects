import { DELETE_BLOG, NEW_BLOG ,EDIT_BLOG} from '../constants'
export default function BlogData(state = [], action) {
    switch (action.type) {
        case NEW_BLOG:
            return [...state, { data: action.data }];
        case DELETE_BLOG:
            state = state.filter(({ data }) => {
                return action.data[0].data.Title !== data.Title ? data : null
            })
            return state;
        case EDIT_BLOG:
                state = state.filter(({ data }) => {
                    return action.data.Title !== data.Title ? data : null
                })
                state=[...state,{data:action.data}]
                return state;
        default:
            return state;
    }
}
