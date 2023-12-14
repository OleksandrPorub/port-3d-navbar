import React, { useEffect, useState } from 'react'
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import cl from "./SliderComp.module.scss"

import "./SliderComp.reStyle.scss";

register();
const sourceURL = '/custom_static/fotosamples/';
const pictures = [
    'f-01.png',
    'f-02.png',
    'f-03.png',
    'f-04.png',
    'f-05.png',
    'f-06.png',
    'f-07.png',
    'f-08.png',
    'f-09.png',
    'f-10.png',
    'f-11.png',
    'f-12.png',
    'f-13.png',
    'f-14.png',
    'f-15.png',
]

const swiperParams = {
    slidesPerView: 1,
    loop: true,
    speed: 100,
    spaceBetween: 15,
};

const slidesList = pictures.map((img, i) => (
    <swiper-slide key={(i + 1).toString()}><img className={cl.imgInner} src={sourceURL + img} alt="selfFoto" /></swiper-slide>
));

export default function SliderComp() {

    const [realIndex, setRealIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(0);

    useEffect(() => {
        const swiperElement = document.querySelector('swiper-container');
        setSwiperInstance(swiperElement);
        console.log(swiperElement);
        Object.assign(swiperElement, swiperParams);
        swiperElement.initialize();
        swiperElement.addEventListener('slidechange', (event) => {
            const [swiper] = event.detail;
            setRealIndex(swiper.realIndex);
        });
    }, [])

    return (
        <div className={cl.wrapper}>
            <div className={cl.outerBox}>
                <swiper-container className={cl.container}>
                    {slidesList}
                </swiper-container>
            </div>
            <div className={cl.controlBar}>
                <button className={cl.btn_slide_prev} onClick={() => { swiperInstance.swiper.slidePrev() }}>
                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor" transform-origin="center" transform="rotate(180)"></path></svg>                </button>
                <span className={cl.indexIndicator}>{realIndex + 1}</span>
                <button className={cl.btn_slide_next} onClick={() => { swiperInstance.swiper.slideNext() }}>
                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>
                </button>
            </div>
        </div>
    )
}

