import React from "react"
import IcBackBtn from "../../assets/images/icon/ic_back_btn.png";
import { useNavigate } from "react-router-dom";

interface PropsType{
    title: string
}

const TitleWrap = ({title}:PropsType) => {

    let navigate = useNavigate();

    return (
        <div className="title-wrap">
            <span className="back-btn" onClick={() => navigate(-1)}><img src={IcBackBtn} alt="back-btn" /></span>
            <h2 className="title">{title}</h2>
        </div>
    )
}

export default TitleWrap;
