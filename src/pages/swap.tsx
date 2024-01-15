// import axios from "axios";
import { useEffect, useState } from "react"; //useCallback,
// import { Helmet } from "react-helmet";
// import { Outlet, Link } from "react-router-dom";
// import xstore from "../components/xstore";
import ee from "../components/ee";
// import detectEthereumProvider from "@metamask/detect-provider";
// import { isMobile } from "react-device-detect";
// import { CHAIN_EXT_INFO } from "../components/chain";
// declare var window: any;

// let lastMessageTimeout: any = null;

const swap = {
  listToken: [
    {
      tick : 'ordi',
      name: "ORDI",
      token: "ORDI",
      icon: "/images/icons/ordi.png",
    },
    {
      tick : 'mubi',
      name: "Multibit",
      token: "MUBI",
      icon: "/images/icons/mubi.png",
    },
  ],
  slip: [
    {
      id: 1,
      number: "1",
    },
    {
      id: 2,
      number: "2",
    },
    {
      id: 3,
      number: "3",
    },
    {
      id: 4,
      number: "5",
    },
  ],

  icons: [
    {
      tick: "ordi",
      icon: "/images/icons/ordi.png",
    },
    {
      tick: "sats",
      icon: "/images/icons/sats.png",
    },
    {
      tick: "VMPX",
      icon: "/images/icons/vmpx.png",
    },
    {
      tick: "zbit",
      icon: "/images/icons/zbit.png",
    },
    {
      tick: "meme",
      icon: "/images/icons/meme.png",
    },
    {
      tick: "mubi",
      icon: "/images/icons/mubi.png",
    },
  ],
};

const Swap = (props: any) => {
  const code = "ordilaunch@2023";

  // const [wallet, setWallet] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [selectToken, setSelectToken] = useState<boolean>(false);
  const [referralCodeVisible, setReferralCodeVisible] =
    useState<boolean>(false);
  const [slip, setSlip] = useState<boolean>(false);
  //const [slipActive, setSlipActive] = useState(0);
  // const [user, setUser] = useState<any>(null);
  const [referralCode, setReferralCode] = useState<string>("");
  const [listToken, setListToken] = useState<any>(swap.listToken);
  const [token, setToken] = useState<any>(null);
  const [tokenSwap, setTokenSwap] = useState<any>(null);
  const [numberOfToken, setNumberOfToken] = useState<any>("100");
  const [numberOfSatoshi, setNumberOfSatoshi] = useState<any>("");
  const [btcPrice, setbtcPrice] = useState<any>("");

  const [slippage, setSlippage] = useState<any>(1);

  const [term, setTerm] = useState<any>("");

  const [message, setMessage] = useState<any>({
    text: "",
    type: "", //error,warning,success,info
    timeout: 1000,
  });

  useEffect(() => {
    if (getCookie("login") == "false") {
      return;
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://market-api.unisat.io/unisat-market-v3/brc20/auction/brc20_types_many`,
        {
          mode: "cors",
          method: "POST",
          body: "{}",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );
      const data = await response.json();
      console.error("data -> ", data);
      setListToken(data?.data?.list);
      setbtcPrice(data?.data?.BTCPrice);
    })();
  }, []);

  const checkReferralCodeClickHandler = async () => {
    if (referralCode != code) {
      ee.dispatch("page-message", {
        text: `${
          referralCode == null || referralCode.trim() == ""
            ? "Please enter a referral code."
            : "Your referral code dose not match."
        }`,
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    } else {
      ee.dispatch("page-message", {
        text: `Your referral code is correct. Please connect your wallet to start swapping.`,
        type: "info",
        timeout: 5 * 1000,
      });
    }
  };

  const showSelectToken = () => {
    setSelectToken(!selectToken);
  };
  const closeSelectToken = () => setSelectToken(false);

  const closeReferralCodeVisible = () => setReferralCodeVisible(false);

  const showSlip = () => {
    setSlip(!slip);
  };
  const closeSlip = () => setSlip(false);

  const swapToken = () => {
    setTokenSwap(!tokenSwap);
  };

  const getCookie = (cname: any) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const setCookie = (cname: any, cvalue: any, exdays: any) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  const selectTokenClickHandler = (item: any, _: any) => {
    setToken(item);
    closeSelectToken();
    if (+numberOfToken > 0) {
      setNumberOfSatoshi(numberOfToken * item.curPrice);
    }
  };

  const numberOfTokenChangeHandler = (e: any) => {
    if (isNaN(e.target.value)) {
      setNumberOfToken(0);
      setNumberOfSatoshi(0);
    } else {
      setNumberOfToken(e.target.value);
      if (token) {
        setNumberOfSatoshi(e.target.value * token.curPrice);
      }
    }
  };

  const swapClickHandler = (e: any) => {
    if (token == null) {
      ee.dispatch("page-message", {
        text: `Please select a token.`,
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    if (numberOfToken == null || numberOfToken == "") {
      ee.dispatch("page-message", {
        text: "Please enter the number of tokens.",
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    setReferralCodeVisible(true);
  };

  return (
    <>
      <div className="md:w-[560px] mx-auto w-full">
        <h2 className="mb-[8px] font-semibold text-gradient inline-block">
          Swap
        </h2>
        <p className="text-[14px] leading-[17px] text-[#C7C5C2] mb-[32px]">
          Minimum Swapping amount : 0.004 BTC
        </p>
        <div className="mb-[32px] border-[1px] border-primary rounded-lg p-[16px_16px_8px] relative flex flex-col bg-dark">
          <div
            onClick={swapToken}
            className="bg-[#372401] cursor-pointer rounded border-[3px] border-[#140C00] hover:border-primary w-[32px] h-[32px] flex items-center justify-center absolute translate-y-[-50%] translate-x-[-50%] z-[1] left-1/2 top-1/2  text-primary"
          >
            <i className="ordinal-two-arrow text-[18px]"></i>
          </div>
          <div
            className={`${
              tokenSwap ? "order-top" : ""
            } relative bg-[#372401] rounded-[12px] p-[16px] mb-[8px]`}
          >
            <input
              className="border-none bg-transparent !p-[0_140px_0_0] !text-[24px] !font-normal w-full"
              type="number"
              name=""
              id=""
              placeholder="Satoshi"
              value={numberOfSatoshi}
            />
            <div className="absolute right-[16px] top-1/2 translate-y-[-50%] cursor-pointer">
              <div className="bg-[#2A2113] rounded-[62px] p-[8px] flex items-center text-[18px] font-semibold text-primary">
                <img className="w-[24px] mr-2" src="/images/coin.png" alt="" />
                BTC
                {/* <i className="ml-[8px] ordinal-arrow-down text-primary text-[16px]"></i> */}
              </div>
            </div>
          </div>
          <div className="relative bg-[#372401] rounded-[12px] p-[16px] mb-[8px]">
            <input
              className="border-none bg-transparent !p-[0_140px_0_0] !text-[24px] !font-normal w-full"
              type="number"
              name=""
              id=""
              placeholder="0"
              onChange={numberOfTokenChangeHandler}
              value={numberOfToken}
            />
            <div
              className="absolute right-[16px] top-1/2 translate-y-[-50%] cursor-pointer"
              onClick={showSelectToken}
            >
              <div className="bg-[#2A2113] rounded-[62px] p-[8px] flex items-center text-[18px] font-semibold text-primary">
                {token?.name || "Select token"}
                <i className="ml-[8px] ordinal-arrow-down text-primary text-[16px]"></i>
              </div>
            </div>
          </div>
          {/* Popup select token */}
          {selectToken && (
            <div className="flex items-center justify-center fixed z-30 h-full w-full top-0 left-0">
              <div className="z-[1] md:w-[565px] w-full mx-[15px] bg-[#291800] rounded-2xl p-[16px] shadow-[3px_4px_11px_rgba(247,159,28,0.25)] relative lg:max-h-[600px] max-h-[400px] overflow-y-auto">
                <div className="relative border-b-[1px] border-[#382200] mb-[8px]">
                  <i className="ordinal-search cursor-pointer text-[22px] absolute top-[15px] left-[10px] hover:text-primary"></i>
                  <input
                    className="!px-[50px] border-none !font-normal !text-[15px]"
                    type="text"
                    placeholder="Search name or symbol"
                    value={term}
                    onChange={(e) => {
                      setTerm(e.target.value);
                    }}
                  />
                  <i
                    onClick={closeSelectToken}
                    className="ordinal-close cursor-pointer text-[20px] absolute top-[15px] right-[10px] hover:text-primary"
                  ></i>
                </div>
                <div className="">
                  {listToken
                    ?.filter((t: any) => {
                      return (
                        term == null ||
                        term.trim() == "" ||
                        t.tick?.toLowerCase().includes(term.toLowerCase())
                      );
                    })
                    .map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-end items-center mb-[8px] last:mb-0 p-[8px] rounded-lg hover:bg-[#A06903] cursor-pointer"
                          onClick={(e) => selectTokenClickHandler(item, e)}
                        >
                          <div className="flex mr-auto">
                            <p className="mr-[16px] rounded-full w-[32px] h-[32px] bg-[#FF9A02] flex items-center justify-center text-[10px] text-ellipsis overflow-hidden whitespace-nowrap px-[0px]">
                              {swap?.icons?.find((icon: any) => {
                                return icon.tick?.trim().toLowerCase() == item.tick?.trim().toLowerCase();
                              })?.icon ? (
                                <img
                                  className="w-[100%]"
                                  src={
                                    swap?.icons?.find((icon: any) => {
                                      return icon.tick == item.tick;
                                    })?.icon
                                  }
                                />
                              ) : (
                                <>{item.tick?.substring(0, 1)?.toUpperCase()}</>
                              )}
                            </p>
                            <div>
                              <p className="text-[15px] leading-[18px] font-semibold">
                                {item.name}
                              </p>
                              <p className="text-[15px] leading-[18px] text-[#C1C1C1]">
                                {item.token}
                              </p>
                            </div>
                          </div>
                          <p className="text-[15px] leading-[18px] text-[#C1C1C1]">
                            Availble
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div
                onClick={closeSelectToken}
                className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
              ></div>
            </div>
          )}

          {referralCodeVisible && (
            <div className="flex items-center justify-center fixed z-30 h-full w-full top-0 left-0">
              <div className="z-[1] md:w-[565px] w-full mx-[15px] bg-[#291800] md:rounded-2xl rounded-lg md:p-[20px] p-[15px] shadow-[3px_4px_11px_rgba(247,159,28,0.25)] relative lg:max-h-[600px] max-h-[400px] overflow-y-auto">
                <div className="relative border-b-[1px] border-[#382200] mb-[8px]">
                  <span className="mb-[16px] block pr-[25px]">
                    Please enter referral code to swap
                  </span>
                  <i
                    onClick={closeReferralCodeVisible}
                    className="ordinal-close cursor-pointer text-[16px] absolute top-[2px] right-[10px] hover:text-primary"
                  ></i>
                </div>
                <div className="flex justify-end">
                  <input
                    className="mr-auto !font-normal !p-[12px_16px] overflow-hidden whitespace-nowrap text-ellipsis"
                    type="text"
                    placeholder="Referral code"
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <button
                    onClick={checkReferralCodeClickHandler}
                    className="ml-[10px]"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div
                onClick={closeReferralCodeVisible}
                className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
              ></div>
            </div>
          )}
        </div>
        <div className="mb-[32px] sm:flex border-[1px] border-primary rounded-lg text-[12px] leading-[14px] bg-dark">
          <p
            onClick={showSlip}
            className="p-[13px_16px] sm:border-r-[1px] sm:border-b-0 border-b-[1px] border-border flex items-center cursor-pointer"
          >
            SLIPPAGE {slippage}%{" "}
            <i className="ml-[8px] cursor-pointer ordinal-arrow-down text-primary"></i>
          </p>
          <p className="p-[13px_16px] sm:border-r-[1px] sm:border-b-0 border-b-[1px] border-border">
            SWAP FEE (1%)
          </p>
          <p className="p-[13px_16px] flex items-center">
            1 BTC{" "}
            <img
              className="mx-[5px]"
              src="/images/approximately-equal.svg"
              alt=""
            />{" "}
            {/* 3198.923393 ORDI{" "}
            <img
              className="mx-[5px]"
              src="/images/approximately-equal.svg"
              alt=""
            />{" "} */}
            ${btcPrice}
          </p>
        </div>
        {/* Popup Slip */}
        {slip && (
          <div className="flex items-center justify-center fixed z-30 h-full w-full top-0 left-0">
            <div className="mx-[15px] bg-[#140C00] rounded-xl p-[16px] border-[1px] border-primary relative w-[240px] z-[1]">
              <div className="relative">
                <p className="text-[12px] leading-[14px] mb-[26px]">
                  Your transaction will not complete if price slips below target
                  threshold.
                </p>
              </div>
              <div className="flex items-center justify-center cursor-pointer mx-[-4px]">
                {swap?.slip.map((item: any, index: any) => {
                  return (
                    <div key={index} className="flex-1 px-[4px]">
                      <p
                        onClick={() => {
                          setSlippage(item.number);
                          closeSlip();
                        }}
                        className={`${
                          slippage == item.number && "active"
                        } p-[8px_15px] bg-gradient rounded cursor-pointer`}
                      >
                        {item.number}
                        {"%"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              onClick={closeSlip}
              className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
            ></div>
          </div>
        )}

        <div className="mb-[32px]">
          <button className="w-full" onClick={swapClickHandler}>
            Swap
          </button>
        </div>
        <div className="p-[16px] bg-[#382200] rounded-xl mb-[32px]">
          <p className="mb-[16px]">
            Acknowledgment of Terms & Conditions of access!
          </p>
          <p className="mb-[16px]">
            Use of the Ordi Launch website, services, dapp, or application is
            subject to Ordi Launch's terms and conditions. By proceeding and
            engaging with the protocol,{" "}
          </p>
          <p>
            I confirm that I am aware of these terms and conditions and accept
            them in full.
          </p>
        </div>
        <div className="p-[16px] border-[1px] border-primary rounded-xl">
          <p className="mb-[16px] flex items-center">
            <img className="mr-[8px]" src="/images/streamline.svg" alt="" />
            This is a beta version
          </p>
          <p className="mb-[16px]">
            This website is currently in beta. Thank you for your patience!
          </p>
          <p>Report an issue</p>
        </div>
      </div>
    </>
  );
};

export default Swap;
