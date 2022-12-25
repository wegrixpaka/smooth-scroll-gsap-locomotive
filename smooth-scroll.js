gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector(".c-container");
const horizontalScrollWrapperClassName =
    ".c-horizontal-scrolling-section__wrapper";
const horizontalScrollingTriggerClassName = ".c-horizontal-scrolling-section";
const startingScrollPosition = "top top";

const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
});

ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
        return arguments.length
            ? scroller.scrollTo(value, 0, 0)
            : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed",
});

scroller.on("scroll", ScrollTrigger.update);

const handleHorizontalScrolling = () => {
    const horizontalScrollingWrapper = document.querySelector(
        horizontalScrollWrapperClassName
    );
    const horizontalScrollingWrapperWidth =
        horizontalScrollingWrapper.offsetWidth;
    const horizontalScrollLength =
        horizontalScrollingWrapperWidth - window.innerWidth;

    gsap.to(horizontalScrollWrapperClassName, {
        scrollTrigger: {
            scroller: pageContainer,
            scrub: true,
            trigger: horizontalScrollingTriggerClassName,
            pin: true,
            start: startingScrollPosition,
            end: horizontalScrollingWrapperWidth,
        },
        x: -horizontalScrollLength,
    });
};

window.addEventListener("load", function () {
    handleHorizontalScrolling();
    ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll
    ScrollTrigger.refresh();
});
