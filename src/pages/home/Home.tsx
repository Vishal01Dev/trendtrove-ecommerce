import categoryMen from "../../assets/categories/category-2.jpg";
import categoryWomen from "../../assets/categories/category-1.jpg";
import categoryKids from "../../assets/categories/category-3.jpg";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAllProductsAsync,
  selectAllProducts,
  selectProductStatus,
} from "../../redux/product/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const products = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector(selectProductStatus);

  const [status, setStatus] = useState<string>("Idle");

  useEffect(() => {
    setStatus(productStatus);
  }, [productStatus]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
        <div className="col-span-1">
          <div className="relative">
            <div className="">
              <img src={categoryMen} alt="men" className="w-full" />
            </div>
            <div className="absolute inset-0 flex justify-center  flex-col pl-8 items-start">
              <h2 className="text-2xl font-bold tracking-wide">
                Men's fashion
              </h2>

              <Link
                to="/shop"
                className="text-secondary font-semibold uppercase py-0.4 border-b-2 border-primary my-2"
              >
                shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative">
            <div className="">
              <img src={categoryWomen} alt="men" className="w-full"/>
            </div>
            <div className="absolute inset-0 flex justify-center  flex-col pl-8 items-start">
              <h2 className="text-2xl font-bold tracking-wide">
                Women's fashion
              </h2>

              <Link
                to="/shop"
                className="text-secondary font-semibold uppercase py-0.4 border-b-2 border-primary my-2"
              >
                shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative">
            <div className="">
              <img src={categoryKids} alt="men" className="w-full"/>
            </div>
            <div className="absolute inset-0 flex justify-center  flex-col pl-8 items-start">
              <h2 className="text-2xl font-bold tracking-wide">
                Kid's fashion
              </h2>

              <Link
                to="/shop"
                className="text-secondary font-semibold uppercase py-0.4 border-b-2 border-primary my-2"
              >
                shop now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="my-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl uppercase font-semibold tracking-wide">
            Trending Products
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-8 my-5">
          {status === "loading" ? (
            <p className="font-semibold text-2xl text-gray-600">Loading...</p>
          ) : (
            products &&
            products.length > 0 &&
            products.slice(0, 6).map((product) => (
              <div className="col-span-1" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
