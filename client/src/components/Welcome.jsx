import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import coin from "../../images/coin.png";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import tshirt from "../../images/tshirt.jpeg";
import tiploader from "./cart.css";
import { Loader } from ".";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);
  const [quantity,setOrderCount]=useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const increaseOrderCount = () => {
    setOrderCount(prevCount => prevCount + 1);
  }
  
  const decreaseOrderCount = () => {
    if (quantity > 0) {
      setOrderCount(prevCount => prevCount - 1);
    }
  };
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    console.log("proceeding to the transaction")
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-2xl text-white ">
          Scott International <br /> Mens Regular Fit T-Shirt
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
           Oversized Baggy Fit Comfortable Pure Cotton Round T-Shirt 
          </p>
          <div className="flex text-white">
          ⭐️4.5/5 <div style={{color:`#f8f8ff`}}>(1567)</div>
          </div>
          <br></br>
          <div >
          <div className="flex text-white">
          </div>
          </div>
          <span className="text-white">Cart:
          <span className="ml-3">
        <button onClick={decreaseOrderCount} className="rounded-tl-2xl rounded-bl-2xl bg-gray-700 text-white px-3 py-1 rounded-l"> -</button>
        <span className="bg-gray-700 text-white px-3 py-1.5">{quantity}</span>
        <button onClick={increaseOrderCount} className=" rounded-tr-2xl rounded-br-2xl bg-gray-700 text-white px-3 py-1 rounded-r">+</button>
      </span>
      </span>
       
          {true && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          
        <span className="text-white mt-2 ">SIZE GUIDE</span>
          <div className="grid sm:grid-cols-5 grid-cols-5 w-full mt-5">
          {["S", "M", "L", "XL", "2XL"].map((size, index) => (
          <button
          key={index}
            type="button"
           onClick={() => handleSizeClick(size)}
          >
      <div
        className={`${
          selectedSize === size
            ? "bg-gray-700 text-white"
            : "text-white"
        } ${
          size === "S" ? "rounded-tl-lg rounded-bl-lg" : ""
        } ${
          size === "2XL" ? "rounded-tr-lg rounded-br-lg" : ""
        } min-h-[50px] sm:px-0 px-2 sm:min-w-[1px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light`}
      >
        {size}
      </div>
    </button>
  ))}
</div>

        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <span><img src={tshirt} alt="tshirt" className="w-300 rounded-lg"/></span>
          <br></br>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <div className="tooltip text-white">
            Terms & Conditions ℹ︎
            <span className="tooltiptext"><ul>
    <li style={{ marginBottom: "8px" }}>1. Token Value and earning criteria: Each token holds a value of Rs 5 and may be acquired by users through purchases, referrals, and specific platform-defined activities.</li>
    <li style={{ marginBottom: "8px" }}>2. Loyalty Points Reward: Users are entitled to receive loyalty points equivalent to 1% of the transaction amount, which can subsequently be redeemed for future purchases.</li>
    <li style={{ marginBottom: "8px" }}>3. Token Expiration Policy: Tokens have a validity period of 1 month from their date of creation, thereby necessitating their utilization within this timeframe.</li>
  </ul></span>
          </div>
            <div className="price h-[1px] w-full bg-gray-400 my-2" />

            {isLoading 
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-black w-full mt-2 border-[1px] p-2 border-[#3d4f7c] bg-[#FFBF00] rounded-full cursor-pointer"
                >
                  Total Price=
                  {quantity*500}
                  <br></br>
                  Flip coins={quantity*0.05}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
