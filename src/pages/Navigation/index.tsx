import React from "react";
import { Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Diet, Training, Summary, Custom } from "../../components";
import "swiper/css";

export const Navigation = (): any => {
  return (
    <Flex h="100vh" w="100%">
      <Swiper
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        defaultValue={3}
        loop={true}
      >
        <SwiperSlide>
          <Diet />
        </SwiperSlide>
        <SwiperSlide>
          <Summary />
        </SwiperSlide>
        <SwiperSlide>
          <Training />
        </SwiperSlide>
        <SwiperSlide>
          <Custom />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
