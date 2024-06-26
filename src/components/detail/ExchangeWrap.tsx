import IcFilter from "../../assets/images/icon/ic_detail_filter.svg"
import { useEffect, useState } from "react";
import RootStore from "../../store/RootStore";
import { useNavigate } from "react-router-dom";
import { MindGetResponseProto, MindResponseProto } from "../../prototypes/mind/MindResponseProto";
import NullChecker from '../../utils/NullChecker';
import RadioWrap from "../common/RadioWrap";

interface params {
    detailInfo?: any,
    sequence?: any
}

enum FilterType {
    ALL = "ALL",
    GIVEN = "GIVEN",
    TAKEN = "TAKEN",
}

const ExchangeWrap = ({ detailInfo, sequence }: params) => {

    const [sort, setSort] = useState("ASC");
    const [exchangeData, setExchangeData] = useState<MindGetResponseProto>();

    const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

    const navigate = useNavigate();

    useEffect(() => {
        handleApiCall("DESC");
    }, []);

    useEffect(() => {
        console.log("filterType.toString() : " + filterType.toString());
    }, [filterType]);

    const handleFilter = async () => {

        if (sort === "ASC") {
            setSort("DESC");
            await handleApiCall(sort);
        } else if (sort === "DESC") {
            setSort("ASC");
            await handleApiCall(sort);
        }

    }
    const handleApiCall = async (sort: string) => {
        await RootStore.friendStore.getFriendExchange(sequence, sort, setExchangeData);
    }

    return (
        <div className="ExchangeWrap">
            <div className="exchange-title">
                <h3>마음 히스토리</h3>
                <div className="filter-wrap" onClick={handleFilter}>
                    <img src={IcFilter} alt="filter-icon" />
                    <span>{sort === "DESC" ? "과거순" : "최신순"}</span>
                </div>
            </div>
            <RadioWrap 
                options={[
                    {
                        name: 'filter',
                        id : 'ALL',
                        htmlFor : 'ALL',
                        content : '전체',
                        value : '전체',
                    }, {
                        name: 'filter',
                        id : 'GIVEN',
                        htmlFor : 'GIVEN',
                        content : '준 마음',
                        value : '준 마음',
                    }, {
                        name: 'filter',
                        id : 'TAKEN',
                        htmlFor : 'TAKEN',
                        content : '받은 마음',
                        value : '받은 마음',
                    }
                ]}
                onSelect={setFilterType}
                default="ALL"
            />
            {exchangeData ?
                <ul className="exchange-wrap">
                    {exchangeData.minds && exchangeData.minds.map((item: MindResponseProto, key: any) => (
                        (filterType === FilterType.ALL 
                        || item?.type?.toString() === filterType.toString()) ?
                        <li className="exchange-cont" key={key} onClick={() => navigate(`/page/relationship/${sequence}/${detailInfo?.nickname}/${item?.sequence}`)}>
                            <i className={item?.type === "TAKEN" ? "exchanged-circle tak" : item?.type === "GIVEN" ? "exchanged-circle giv" : "exchanged-circle giv"}></i>
                            <h4 className={item?.type === "TAKEN" ? "taken" : ""}>
                                {item?.type === "GIVEN" ?
                                    `${detailInfo?.nickname}님` :
                                    item?.type === "TAKEN" ?
                                        "나" : null}의 {item?.event}</h4>
                            <span className="exchanged-item">
                                {item?.item?.type === "CASH" ? item?.item?.name?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : item?.item?.name}
                                {item?.item?.type === "CASH" && "원"}
                            </span>
                            <span className="exchanged-date">{item?.date?.year}년 {item?.date?.month}월 {item?.date?.day}일</span>
                            {
                                !NullChecker.isEmpty(item?.item?.imageLink) &&
                                <div className="exchange-image"><img src={item?.item?.imageLink} alt='gift-img' /></div>
                            }
                            {item?.type === "GIVEN" &&
                                <span className="exchanged-givtak giv">준 마음</span>
                            }
                            {item?.type === "TAKEN" &&
                                <span className="exchanged-givtak tak">받은 마음</span>
                            }
                        </li> : null
                    ))}
                </ul>
                :
                <div style={{
                    color: "#818181",
                    textAlign: "center",
                    fontSize: "3.7vw",
                    fontWeight: "400",
                    paddingTop: "20%"
                }}>아직 기록이 없어요.</div>
            }
        </div>
    )
}

export default ExchangeWrap;
