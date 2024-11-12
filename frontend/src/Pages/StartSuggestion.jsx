import { useNavigate } from "react-router-dom";
import UserAtHome from "../Compnents/UserAtHome";
import PreferredCategory from "./PreferredCategory";
import { useEffect } from "react";

export default function StartSuggestion(){

    const navigate = useNavigate();
    // localStorage.setItem("askPreferredCategory", true);
    useEffect(()=>{
        if(!localStorage.getItem("askPreferredCategory")){
            navigate('/');
        }
        console.log(localStorage.getItem("askPreferredCategory"))
    }, [])
    return <div className="flex ">
        <div className="w-3/4">
            <PreferredCategory />
        </div>
        <div className="w-1/4">
            <UserAtHome heading={"Connect with Authors"} />
        </div>
    </div>
}