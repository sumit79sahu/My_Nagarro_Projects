import { useState ,useEffect} from "react"
import { useSelector } from "react-redux";
export const useUser=()=>
{
    
    const { token } = useSelector((state) => state.persistedReducer.token);

    const getPayloadFromToken=(token)=>
    {
        const encodedPayload=token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    const [user,setUser]=useState(()=>
    {
        if(!token) return null;
         return getPayloadFromToken(token)
    });

    useEffect(()=>{if(!token )
        {setUser(null);}
    else
    {
        setUser(getPayloadFromToken(token))
    }},[token]);

    return user
}

