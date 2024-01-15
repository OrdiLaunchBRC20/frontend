// import axios from "axios";
import xstore from "../components/xstore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const list = [
  {
    image: "4.png",
    content: "Bring your Bitcoin Inscriptions to ERC20",
  },
  {
    image: "5.png",
    content: "Earn $ORLA rewards through liquidity pools staking.",
  },
  {
    image: "6.png",
    content: "Trade fractions of Bitcoin Inscriptions on DEX for max returns.",
  },
  {
    image: "7.png",
    content: "Buy Inscriptions not listed anywhere.",
  }
]

const listNft = [
  {
    image: "token1.png",
    title: "μBitcoinFrogs",
  },
  {
    image: "token1.png",
    title: "μBitcoinFrogs",
  },
  {
    image: "token1.png",
    title: "μBitcoinFrogs",
  },
]

const Landing = () => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // console.error("params -> ", params);
    if (params.ref || params.reference) {
      let addr = params.ref || params.reference;
      console.error("ref addr -> ", addr);
      try {
        addr = ethers.utils.getAddress(addr);
        setCookie("refAddress", addr, 365);
      } catch (e) {
        console.error("ethers.utils.getAddress(addr) -> ", e);
      }
    }
  }, []);

  const setCookie = (cname: any, cvalue: any, exdays: any) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  return (
    <>
      <div className="container max-w-full lg:pb-[113px] pb-[60px]">
        <div className="flex items-center -mb-5">
          <img className="mr-auto w-[100px] md:w-auto" src="/images/2.png" alt="" />
          <img className="w-[100px] md:w-auto" src="/images/1.png" alt="" />
        </div>
        <div className="text-center">
          <p className="text-primary mb-6 uppercase font-bold">
            Ordi Launch
          </p>
          <h1 className="md:mb-[73px] mb-10 md:max-w-[767px] mx-auto">Inscription Liquidity Layer for BRC20 and Ethereum</h1>
          <div className="">
            <Link
              to="/swap"
              className="btn py-3.5 px-6 rounded-[100px] text-[16px] font-bold"
            >
              Start now
            </Link>
          </div>
        </div>
        <div className="flex items-center mt-[-70px]">
          <img className="mr-auto w-[100px] md:w-auto" src="/images/star.png" alt="" />
          <img className="w-[100px] md:w-auto" src="/images/3.png" alt="" />
        </div>
      </div>
      <div className="flex flex-wrap items-stretch mx-[-15px] pb-[30px]">
        {list.map((item, index) => {
          return (
            <div key={index} className="flex-[0_0_50%] md:flex-[0_0_25%] px-[15px] mb-[30px]">
              <div className="p-4 rounded bg-gradient-box h-full flex flex-col">
                <img className="mx-auto mb-2.5" src={`images/${item.image}`} alt={item.content} />
                <div className="mt-auto">
                  <p className="mb-3">{item.content}</p>
                  <img className="ml-auto" src="images/right-icon.png" alt="" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="overflow-x-auto pb-10">
        <table className="w-full border border-border bg-[#050300]">
          <thead>
            <tr>
              <th>Collection</th>
              <th>
                <div className="flex items-center">
                  <span>Market Cap</span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <span>Floor Price</span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <span>24h Change</span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <span>24h Volume</span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <span>TVL</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {listNft.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="md:flex items-center">
                      <div className="flex-[0_0_36px] mr-2 mb-2 md:mb-0">
                        <img className="rounded" src={`images/${item.image}`} alt="" />
                      </div>
                      <p className=" font-medium">{item.title}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img className="mr-2" src="images/ether.png" alt="" />
                      22,842.56
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img className="mr-2" src="images/ether.png" alt="" />
                      2.47
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center text-[#51DA7F]">
                      +5.42%
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img className="mr-2" src="images/ether.png" alt="" />
                      4.12
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img className="mr-2" src="images/ether.png" alt="" />
                      344.25
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Landing;
