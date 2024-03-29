import React, { useEffect, useState, useRef } from 'react';
import Sheet from 'react-modal-sheet';
import ModalSheetTitleWrap from './ModalSheetTitleWrap';
import Swiper from "swiper";
import 'swiper/css';
import DateUtil from '../../utils/DateUtil';

interface PropsType {
    isOpen: boolean,
    onClose: any,
    title: string,
    inputArray: string[],
    setInputArray: any,
    setContainerHeight: (arg0: any, arg1: string) => void,
    id?: string,
    onChange?: any,
    checked?: boolean
}

const Calendar = ({
    title,
    isOpen,
    onClose,
    inputArray,
    setInputArray,
    setContainerHeight,
    id, onChange,
    checked
}: PropsType) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [selectDate, setSelectDate] = useState({});
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);

    const minYear = 1900;
    const maxYear = DateUtil.getYearofToday();
    const createYear = (): number[] => {
        const years: number[] = [];

        for (let year = minYear; year <= maxYear; year++) {
            years.push(year);
        }

        return years;
    }
    const createMonth = (): number[] => {
        return Array.from({ length: 12 }, (_, index) => index + 1);
    };

    const createDay = (): number[] => {
        const lastDay = new Date(year, month, 0).getDate();
        return Array.from({ length: lastDay }, (_, index) => index + 1);
    };

    const initSwiper = () => {
        const swiperYearInstance = new Swiper('.year-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
            on: {
                slideChange: () => {
                    const yearList = createYear();
                    console.log(swiperYearInstance.activeIndex, swiperMonthInstance.activeIndex, swiperDayInstance.activeIndex);
                    setYear(yearList[swiperYearInstance?.activeIndex || 0]);
                },
            },
        });

        const swiperMonthInstance = new Swiper('.month-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
            on: {
                slideChange: () => {
                    const monthList = createMonth();
                    console.log(swiperYearInstance.activeIndex, swiperMonthInstance.activeIndex, swiperDayInstance.activeIndex);
                    setMonth(monthList[swiperMonthInstance?.activeIndex || 0]);
                },
            },
        });

        const swiperDayInstance = new Swiper('.day-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
            on: {
                slideChange: () => {
                    const dayList = createDay();
                    console.log(swiperYearInstance.activeIndex, swiperMonthInstance.activeIndex, swiperDayInstance.activeIndex);
                    setDay(dayList[swiperDayInstance?.activeIndex || 0]);
                },
            },
        });

        // 오늘 날짜로 세팅하는 부분
        swiperMonthInstance.activeIndex = parseInt(inputArray[1].split('-')[1]) - 1;
        swiperDayInstance.activeIndex = parseInt(inputArray[1].split('-')[2]) - 1;

        console.log(inputArray[1]);
    };

    useEffect(() => {
        initSwiper();

        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '95vw');
    }, [isOpen]);

    const setContainerTopBorderRadius = (left: number, right: number): void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    useEffect(() => {
        const lastDay = new Date(year, month, 0).getDate();
        if (day > lastDay) {
            setDay(lastDay);
        }
    }, [year, month]);

    const saveDate = (): void => {
        let selectedDate: string = "";
        if (year && month && day) {
            selectedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        }

        setSelectDate({
            year: year,
            month: month,
            day: day
        })

        let array = inputArray;
        array[1] = selectedDate;
        setInputArray([...array]);

        onClose();
    }

    return (
        <Sheet className={isOpen ? 'calendar-sheet open' : 'calendar-sheet'}
            isOpen={isOpen}
            onClose={function () { }}
            disableDrag={true}
        >
            <Sheet.Container ref={containerRef}
                style={{
                    backgroundColor: "#242424",
                }}
            >
                <Sheet.Content>
                    <ModalSheetTitleWrap
                        title={title}
                        onClose={onClose}
                        id={id}
                        onChange={onChange}
                        checked={checked}
                    />
                    <div className="DatePicker">
                        {/* Year */}
                        <div className="swiper-container year-container">
                            <div className="swiper-wrapper">
                                {createYear().map((yearItem) => (
                                    <div className="swiper-slide" key={yearItem}>
                                        {yearItem}년
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Month */}
                        <div className="swiper-container month-container">
                            <div className="swiper-wrapper">
                                {createMonth().map((monthItem) => (
                                    <div className="swiper-slide" key={monthItem}>
                                        {monthItem}월
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Day */}
                        <div className="swiper-container day-container">
                            <div className="swiper-wrapper">
                                {createDay().map((dayItem) => (
                                    <div className="swiper-slide" key={dayItem}>
                                        {dayItem}일
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <button type="button" className="common-btn-og" onClick={saveDate}>
                        저장하기
                    </button>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop
                onTap={onClose}
            />
        </Sheet>
    );
};

export default Calendar;
