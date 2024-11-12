import { useEffect } from "react"
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { useSelector } from "react-redux";

export default function SuggestedHomePost(){
    const { currentUser } = useSelector(state=>state.user);
    useEffect(()=>{
        (async ()=>{
            const response = await fetch(apiEndPoints.getHomePostSuggestion(currentUser._id, page));
            const data = await response.json();

            console.log(data);
        })();
    }, [])
    return <div>
        suggested home post
    </div>
}