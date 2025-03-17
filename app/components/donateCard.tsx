'use client'

import React, { useState } from "react"

export default function DonationCard() {
  const [selectedAmount, setSelectedAmount] = useState("25")
  const [isMonthly, setIsMonthly] = useState(false)
  const priceOptions = ["10", "25", "50", "100", "200", "250", "500", "1000"]

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount)
  }

  const onTabClick = () => {
    setIsMonthly(!isMonthly)
    if (priceOptions.indexOf(selectedAmount) < 0) {
      setSelectedAmount("10")
    }
  }

  const getLink = (monthly: boolean, sum: string) => {
    if (!monthly) {
      return (
        "https://donate.stripe.com/dR602jfIca9VaoU000?locale=en&__embed_source=buy_btn_1P4475FGJfIenxLQ3jcc2HGL&__prefilled_amount=" +
        sum +
        "00"
      )
    } else {
      return {
        "10": "https://buy.stripe.com/fZedT9brW4PB40w6op",
        "25": "https://buy.stripe.com/dR65mDeE8bdZ40w8wF",
        "50": "https://buy.stripe.com/5kAeXdeE8bdZ8gM7su",
        "100": "https://buy.stripe.com/eVaaGX3Zu1Dp0Ok003",
        "200": "https://buy.stripe.com/6oE9CT8fKbdZ7cI28c",
        "250": "https://buy.stripe.com/fZedT9dA4a9VaoU149",
        "500": "https://buy.stripe.com/28og1h1Rmci30Ok3ci",
        "1000": "https://buy.stripe.com/5kA6qH67Ceqb8gMbIP",
        "1500": "https://buy.stripe.com/aEU5mD9jOa9VgNi9AI",
      }[sum]
    }
  }

  return (
    <div className="flex flex-col gap-[10px] min-w-[220px] max-w-[600px] mx-auto my-5 p-5 border border-gray-200 bg-gray-50 rounded-[16px] text-center">
      <div className="flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
        >
          <path d="m8.533.133 5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667l5.25-1.68a1.748 1.748 0 0 1 1.066 0Zm-.61 1.429.001.001-5.25 1.68a.251.251 0 0 0-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 0 0 .154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 0 0-.174-.238l-5.25-1.68a.25.25 0 0 0-.153 0ZM11.28 6.28l-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l.97.97 2.97-2.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
        </svg>
        <h2>Secure Donation</h2>
      </div>
      <label htmlFor="donation-type">Select donation type</label>
      <div
        id="donation-type"
        className="flex justify-center items-center bg-white border-2 border-gray-300 rounded-[16px] text-base"
      >
        <a
          onClick={onTabClick}
          className={
            isMonthly
              ? "cursor-pointer py-4 px-2 rounded-[14px] text-center w-1/2 flex justify-center items-center gap-2"
              : "cursor-pointer py-4 px-2 rounded-[14px] text-center w-1/2 flex justify-center items-center gap-2 text-blue-600 font-bold bg-blue-100 ring-2 ring-blue-600 ring-inset"
          }
        >
          Donate once
        </a>
        <a
          onClick={onTabClick}
          className={
            !isMonthly
              ? "cursor-pointer py-4 px-2 rounded-[14px] text-center w-1/2 flex justify-center items-center gap-2"
              : "cursor-pointer py-4 px-2 rounded-[14px] text-center w-1/2 flex justify-center items-center gap-2 text-blue-600 font-bold bg-blue-100 ring-2 ring-blue-600 ring-inset"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path
              d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 0 1-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 0 1-3.433 2.414 7.152 7.152 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z"
              fill="#ff7777"
            ></path>
          </svg>
          Monthly
        </a>
      </div>

      <div className="my-4">
        {priceOptions.map((amount) => (
          <button
            key={amount}
            className={
              selectedAmount === amount
                ? "border border-gray-200 bg-orange-500 text-white py-2 px-4 m-[5px] rounded-lg cursor-pointer text-base"
                : "border border-gray-200 bg-white py-2 px-4 m-[5px] rounded-lg cursor-pointer text-base"
            }
            onClick={() => handleAmountClick(amount)}
          >
            €{amount}
          </button>
        ))}
        <button
          className={
            priceOptions.indexOf(selectedAmount) < 0
              ? "border border-gray-200 bg-orange-500 text-white py-2 px-4 m-[5px] rounded-lg cursor-pointer text-base"
              : "border border-gray-200 bg-white py-2 px-4 m-[5px] rounded-lg cursor-pointer text-base"
          }
          onClick={() => handleAmountClick(isMonthly ? "1500" : "5")}
        >
          {isMonthly ? "€1500" : "Other"}
        </button>
      </div>

      <label htmlFor="amount">Amount to donate, EUR</label>
      <div className="flex justify-center items-center border border-gray-200 bg-white py-4 px-5 rounded-lg gap-1">
        <div className="text-[20px] text-[#777]">€</div>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount in EUR"
          value={selectedAmount}
          onChange={(e) => {
            if (!isMonthly) setSelectedAmount(e.target.value)
          }}
          className="w-full border-none bg-white p-0 rounded-lg text-[28px] text-left outline-none flex-grow text-blue-600"
        />
        <div className="text-[20px] text-[#777]">EUR</div>
      </div>

      <a
        id="donate-button"
        target="_blank"
        href={getLink(isMonthly, selectedAmount)}
        className="mt-2.5 bg-orange-500 text-[20px] font-bold border-none py-4 px-8 rounded-lg cursor-pointer no-underline text-white"
      >
        Donate
      </a>
    </div>
  )
}
