import React, {useState} from 'react';
import IcSettingBtn from "../../assets/images/icon/ic_setting_btn.png";
import IcPlusBtnOg from "../../assets/images/icon/ic_plus_btn_orange.png";
import { inject, observer } from 'mobx-react';
import MainText from "../../components/main/MainText";
import MainExchangedCount from "../../components/main/MainExchangedCount";
import MainSearch from "../../components/main/MainSearch";
import FilterBtn from "../../components/main/MainFilterBtn";
import MainFriendList from "../../components/main/MainFriendList";
import MainRegister from "../../components/main/MainRegister";

const Main = () => {

    const [isEmptyList, setIsEmptyList] = useState<boolean>(false);
    const [registerBtn, setRegisterBtn] = useState<boolean>(false);

    const handleRegisterBtn = () => {
        if(registerBtn){
            setRegisterBtn(false);
        } else {
            setRegisterBtn(true);
        }
    }

    return (
        <div className="Main inner">
            <div className="main-header">
                <span className="setting-btn"><img src={IcSettingBtn} alt="setting-btn" /></span>
            </div>
            <MainText isEmptyList={isEmptyList} />
            <MainExchangedCount />
            <MainSearch />
            <FilterBtn />
            <MainFriendList isEmptyList={isEmptyList} />
            {registerBtn ? <MainRegister handleRegisterBtn={handleRegisterBtn} /> :
                <button type="button" className="add-btn" onClick={handleRegisterBtn}>
                    <span className="add-btn-plus"><img src={IcPlusBtnOg} alt="ic_plus_btn"/></span>
                </button>
            }
        </div>
    );
};


export default inject('RootStore')(observer(Main));
