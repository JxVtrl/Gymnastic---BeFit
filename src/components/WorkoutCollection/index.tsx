import React from "react";
import { Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SeriesMocked = [
  {
    id: 0,
    title: "Treino A",
    workout: ["Peito", "Costas"],
  },
  {
    id: 1,
    title: "Treino B",
    workout: ["Perna", "Triceps"],
  },
  {
    id: 2,
    title: "Treino C",
    workout: ["Biceps", ""],
  },
];

export const WorkoutCollection: React.FC = () => {
  return (
    <Swiper
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      defaultValue={3}
      loop={true}
      style={{ width: "100%", alignContent: "center" }}
    >
      {SeriesMocked.map((item) => (
        <SwiperSlide
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex h="65px" w="350px" border="1px solid #000">
            {item.title}
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
