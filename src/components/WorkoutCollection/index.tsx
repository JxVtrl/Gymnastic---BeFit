import React from "react";
import { Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SeriesMocked = [
  {
    id: 0,
    title: "Treino A",
    workout: ["Peito", "Costas"],
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: 1,
    title: "Treino B",
    workout: ["Perna", "Triceps"],
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    title: "Treino C",
    workout: ["Biceps", ""],
    url: "https://images.unsplash.com/photo-1526408984842-5f1323d42469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
          <Flex
            background={`url(${item.url})`}
            backgroundSize='cover'
            backgroundRepeat='no-repeat'
            backgroundPosition='center'
            h="100px"
            w="350px"
            border="1px solid #000"
          >
            {item.title}
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
