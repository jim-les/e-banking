import React, { useState, useEffect } from "react";
import { FcDonate } from "react-icons/fc";
import { HiReceiptRefund } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  deposit,
  resetAccountStatus,
} from "../../state/features/Account/accountSlice";
import { PaymentMethods } from "../payment/PaymentMethods";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import { set } from "mongoose";
import axios from "axios";

const paymentMethods = [
  { id: "vodafoneCash", title: "Mpesa Cash" },
];

export const Deposit = () => {
  //state for withdraw balance
  const [depositAmount, setDepositAmount] = useState(100);
  const [method, setMethod] = useState(paymentMethods[0].title);
  const title = "Choose Payment Method";
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [loading, setLoading] = useState(false);

  //state for user password
  const [password, setPassword] = useState("");

  //state for alert messages
  const [msg, setMsg] = useState("");

  const { account, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userAccount
  );
  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess) {
      setMsg(
        `You Have Deposited ${new Intl.NumberFormat("ar-EG", {
          style: "currency",
          currency: "KES",
        }).format(depositAmount)} into your Account Successfully!`
      );
    }
  }, [isError, isSuccess, message, account, msg]);

  //get account id
  const accountId = useLocation().pathname.split("/").at(-1);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5072/api/mpesa?amount=${depositAmount}&PhoneNumber=${mpesaNumber}`);
      console.log(response.data);
      e.preventDefault();
      //set msg to none first
      setMsg("");

      const depositData = {
        accountId,
        depositAmount,
        token: user.token,
        oldPassword: password,
        id: user.id,
      };

      dispatch(deposit(depositData));
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  UseResetStatus(() => {
    return () => {
      dispatch(resetAccountStatus());
    };
  });

  return (
    <div className="max-w-5xl w-full">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
        <FcDonate className="mr-1" size={50} />
        Deposit Money
      </h3>
        <div className="flex justify-center items-center font-semibold flex-wrap gap-4 mb-2 p-2">
          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="depositAmount"
          >
            Enter Deposit Amount
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="number"
            name="depositAmount"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            min="100"
            required
          />

          <label
            className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
            htmlFor="password"
          >
            Type your Password
          </label>

          <input
            className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="p-2 mb-5">
      {/* Heading */}
      <h3 className="text-base font-semibold text-gray-900 p-2 bg-blue-200 border-r-4 border-blue-900 shadow-lg rounded">
        {title}
      </h3>

      {/* Choose Method */}
      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
            <div key={paymentMethod.id} className="flex items-center">
              <input
                name="payment-type"
                id={paymentMethod.id}
                type="radio"
                onChange={() =>
                  setMethod(paymentMethods[paymentMethodIdx].title)
                }
                defaultChecked={paymentMethodIdx === 0}
                className="focus:ring-indigo-500 accent-pink-500 h-4 w-4 text-indigo-600 border-gray-200"
                required
              />

              <label
                htmlFor={paymentMethod.id}
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                {paymentMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <p className="text-xs font-bold my-2 underline text-blue-500">
        *All Payments Methods Are FAKE Just Type Any Values.
      </p>

      {/* enter mpesa number */}
      <div className="flex justify-center items-center font-semibold flex-wrap gap-4 mb-2 p-2">
      <label
          className="basis-full sm:basis-[50%] text-md  my-2 sm:my-0  p-2 border-r-4 rounded shadow bg-blue-200 border-blue-800"
          htmlFor="mpesaNumber"
        >
          Enter Mpesa Number
        </label>

        <input
          className="basis-full  sm:basis-1/3  px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
          type="number"
          name="mpesaNumber"
          id="mpesaNumber"
          value={mpesaNumber}
          onChange={(e) => setMpesaNumber(e.target.value)}
          required
          placeholder="2547XXXXXXXX"
        />  
      </div>
      
        
    </div>

        {/*Request Status and Errors*/}
        {(isError || isSuccess) && (
          <MessagesContainer
            msg={msg}
            isSuccess={isSuccess}
            isError={isError}
          />
        )}

        {/*form button */}
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 w-full"
          onClick={handleSubmit}
        >
          {loading ? "Processing" : "Deposit"}
        </button>
    </div>
  );
};
