import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        // Fetch books and users data
        const res = await axios.get("http://localhost:4001/book");
        const userRes = await axios.get("http://localhost:4001/user");
  
        // Filter books with price of 0
        const freeBooks = res.data.filter((book) => book.price === 0);
  
        // Merge books with user information
        const mergedBooks = freeBooks.map((book) => {
          const user = userRes.data.find((user) => user._id === book.userId);
          return {
            ...book,
            addedBy: user ? user.fullname : "Unknown", 
            contact: user ? user.email : "Unknown", 
          };
        });
  
        setBook(mergedBooks);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);
  

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 pb-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">
            Free Offered{" "}
            <span className="text-pink-500">Courses</span>
          </h1>
          <p>
            Discover a variety of books offered at no cost. 
            Enhance your knowledge with our carefully curated selection of free books available for download and reading.
          </p>
        </div>
        <div>
          <Slider {...settings}>
            {book.map((item) => (
            <Cards key={item.id} item={item} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default Freebook;
