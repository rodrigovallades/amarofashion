import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary-tiny-js';

let cloudinaryClient;

const ProductImage = ({ name, src, width, ...props }) => {
  const imgWidth = width || window.screen.width;
  let imageSource;

  if (!src) {
    return null;
  }

  cloudinaryClient = cloudinary({
    cloudName: 'rodrigovallades',
    secure: true,
    defaults: {
      fetchFormat: 'auto',
      resourceType: 'image',
      type: 'fetch',
    },
  });

  imageSource = cloudinaryClient(src, {
    crop: 'limit',
    dpr: window.devicePixelRatio < 1 ? 1 : window.devicePixelRatio,
    width: imgWidth,
  });

  return (<img src={imageSource} alt={name} {...props} />);
};

ProductImage.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default ProductImage;
