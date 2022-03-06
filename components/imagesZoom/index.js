import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import { Overlay, Global, Header, SlickWrapper, ImageWrapper, Indicator } from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세이미지</h1>
        <button onClick={onClose}>닫기</button>
      </Header>
      <SlickWrapper>
        <Slick initialSlide={0} beforeChange={(slide) => setCurrentSlide(slide)} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
          {images.map((image) => (
            <ImageWrapper key={image.src}>
              <img src={image.src} alt={image.src} />
            </ImageWrapper>
          ))}
        </Slick>
        <Indicator>{`${currentSlide + 1} / ${images.length}`}</Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ImagesZoom;
