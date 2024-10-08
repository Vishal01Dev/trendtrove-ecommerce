import React from "react";
import { Link } from "react-router-dom";
import { navigationRoutes, socialMedia } from "../../utils/navigationRoutes";
import Input from "../common/Input";
import Button from "../common/Button";
import { useForm } from "react-hook-form";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { register } = useForm();

  return (
    <div className="px-5 sm:px-10 md:px-16 lg:px-24 py-10 shadow-inner">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div className="col-span-1">
          <div className="flex flex-col justify-center gap-y-5">
            <Link to="/">
              <h1 className="text-secondary font-bold text-2xl inline-block">
                TREND <span className="text-primary">TROVE</span>
              </h1>
            </Link>
            <p className="text-secondary text-light">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed illo
              dignissimos alias., nesciunt perferendis dolore adipisci ipsa
              omnis soluta enim.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1">
              <h2 className="text-primary font-semibold text-lg mb-4 uppercase tracking-widest">
                Quick Links
              </h2>
              <ul className="space-y-1">
                {navigationRoutes.map((route) => (
                  <li key={route.title} className="hover:underline">
                    <Link to={route.path}>{route.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <h2 className="text-primary font-semibold text-lg mb-4 uppercase tracking-widest">
                My Account
              </h2>
              <ul className="space-y-1">
                <li className="hover:underline">
                  <Link to="/account">Account</Link>
                </li>
                <li className="hover:underline">
                  <Link to="/orders">Orders</Link>
                </li>
                <li className="hover:underline">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="hover:underline">
                  <Link to="/wishlist">Wishlist</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col justify-center">
            <h2 className="text-primary font-semibold text-lg mb-4 uppercase tracking-widest">
              Newsletter
            </h2>
            <form action="">
              <div className="flex justify-start items-center gap-x-2">
                <Input
                  placeholder="Your email"
                  id="newsletter"
                  name="newsletter"
                  register={register}
                />
                <Button
                  type="submit"
                  title="Subscribe"
                  buttonStyles="text-white bg-primary"
                />
              </div>
            </form>
            <div className="flex justify-start items-center gap-x-3 mt-5">
              {socialMedia.map((media) => {
                const Icon = media.icon;
                return (
                  <div
                    key={media.title}
                    className="bg-gray-100 p-2.5 rounded-full w-fit text-xs font-bold text-secondary"
                  >
                    <Link to={media.link}>
                      <Icon size={22} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
