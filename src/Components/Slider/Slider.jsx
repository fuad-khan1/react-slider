import { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";

const Slider = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerPage >= products.length ? 0 : prevIndex + cardsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - cardsPerPage < 0
        ? products.length - cardsPerPage
        : prevIndex - cardsPerPage
    );
  };

  useEffect(() => {
    const url = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error =>", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8 relative flex flex-wrap overflow-hidden">
      {products
        .slice(currentIndex, currentIndex + cardsPerPage)
        .map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-64 bg-white shadow-md mx-4 rounded-md transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={product.thumbnail}
              className="w-64 h-48 rounded-t-lg"
            />

            <div className="p-4 flex flex-col h-full">
              <div className="flex items-center">
                <p className="text-sm text-orange-400">{product.rating}</p>
                <p className="text-sm text-orange-400">
                  <HiStar />
                </p>
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-red-500 font-bold text-xl mb-2">{`$${product.price}`}</p>
              <p className="text-sm">{product.description}</p>
              <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-700 hover:text-white">
                Add to Cart
              </button>
            </div>
          </div>
        ))}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 bg-gray-300 p-2 rounded-full hover:bg-orange-400 hover:text-white"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 bg-gray-300 p-2 rounded-full hover:bg-orange-400 hover:text-white"
      >
        {">"}
      </button>
    </div>
  );
};

export default Slider;


