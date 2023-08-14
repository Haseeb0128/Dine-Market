import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

import Image from "next/image";

export const Footer = () => {
  return (
    <div className="">
      <div className="bg-white border-t flex flex-col px-4 py-2">
        <div className="flex flex-col mb-10 gap-4 p-4 justify-center items-center">
          <h2 className="text-2xl font-bold">Subscribe Our Newsletter</h2>
          <p className="text-center">
            Get the latest information and promo offers directly
          </p>
          <div className="flex gap-3 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Enter Email address"
              className="p-2 rounded-md w-[300px] border"
            />
            <button className="bg-[#0F172A] text-white rounded-lg py-2 px-4">
              Submit
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:px-8 md:py-4">
          <div className="flex flex-col gap-7 p-4 sm:mx-auto">
            <Image src={"/Logo.png"} width={150} height={150} alt="Logo" />
            <p>
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made.
            </p>
            <div className="flex gap-4 items-center">
              <div>
                <BsFacebook size={35} />
              </div>
              <div>
                <BsInstagram size={35} />
              </div>
              <div>
                <BsTwitter size={35} />
              </div>
            </div>
          </div>
          <div className="p-4 sm:mx-auto">
            <ul className="flex flex-col gap-3">
              <li className="mb-3">
                <h3 className="text-xl font-bold">Company</h3>
              </li>
              <li>About</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>How it Works</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="p-4 sm:mx-auto">
            <ul className="flex flex-col gap-3">
              <li className="mb-3">
                <h3 className="text-xl font-bold">Support</h3>
              </li>
              <li>Support Center</li>
              <li>24th Service</li>
              <li>Quick Chat</li>
            </ul>
          </div>
          <div className="p-4 sm:mx-auto">
            <ul className="flex flex-col gap-3">
              <li className="mb-3">
                <h3 className="text-xl font-bold">Contact</h3>
              </li>
              <li>Whatsapp</li>
              <li>24th Service</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="grid lg:grid-cols-2 md:grid-cols-2 md:px-8 md:py-4 p-4">
          <div className="mb-4 md:mb-0">
            <h3>Copyright © 2022 Dine Market</h3>
          </div>
          <div className="mb-2 md:mb-0">Code by.Haseeb0128 on Github</div>
        </div>
      </div>
    </div>
  );
};
