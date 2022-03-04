import React from "react";
import PropsTypes, { object } from "prop-types";

const PostImages = ({ images }) => {
  return <div>..구현중</div>;
};

export default PostImages;

PostImages.propsTypes = {
  images: PropsTypes.arrayOf(PropsTypes.object),
};
