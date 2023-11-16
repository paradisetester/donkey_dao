import { Component } from "react";
import Slider from "react-slick";
export default class SlickMultipleitems extends Component {
  render() {
    const settings = {
      centerMode: true,
      centerPadding: "80px",
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      infinite: true,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: "80px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: "80px",
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <Slider {...settings}>
        <div>
          <img src="img/donkey_left.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_bg.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_right.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_left.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_bg.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_right.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_left.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_bg.jpg" alt="Gallery Img" />
        </div>
        <div>
          <img src="img/donkey_right.jpg" alt="Gallery Img" />
        </div>
      </Slider>
    );
  }
}
