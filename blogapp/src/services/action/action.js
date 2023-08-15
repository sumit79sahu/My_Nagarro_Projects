import {NEW_BLOG,DELETE_BLOG,EDIT_BLOG} from '../constants'

export const NewBlog=(data)=>
{
    return{
        type:NEW_BLOG,
        data:data
    };
}

export const DeleteBlog=(data)=>
{
    return{
        type:DELETE_BLOG,
        data:data
    };
}

export const EditBlog=(data)=>
{
    return{
        type:EDIT_BLOG,
        data:data
    };
}

