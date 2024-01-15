import { useEffect, useState } from "react"; // useCallback,
import { ethers } from "ethers";
import { ETHEREUM_NETWORK, CONTRACT } from "../components/chain";
import { airdrop_abi, token_abi } from "../components/abi";
import { isMobile } from "react-device-detect";
import detectEthereumProvider from "@metamask/detect-provider";
import ee from "../components/ee";
import Countdown from "react-countdown";
import axios from "axios";
// import axios from "axios";
// import moment from "moment";
// import { TwitterShareButton } from "react-share";
let currentChainId = 0;
declare var window: any;
const isEthereumChain = (chainId: any) => {
  return chainId && chainId - 0 === ETHEREUM_NETWORK?.chainId - 0;
};

/* @ts-ignore */
const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <>
      <div className="flex items-center justify-center p-4 lg:p-0">
        <div className="lg:h-[123px] lg:w-[123px] h-[80px] w-[80px] rounded-full bg-[#FFEAB2] flex flex-col items-center justify-center drop-shadow lg:-mr-8 lg:ml-0 mx-1 relative z-[1] lg:mt-2">
          <img src="images/d.svg" alt="" />
          <p className="lg:text-[28px] text-[18px] text-black font-bold leading-normal">
            {days}
          </p>
          <p className="font-semibold text-[12px]">DAY</p>
        </div>
        <div className="lg:h-[123px] lg:w-[123px] h-[80px] w-[80px] rounded-full bg-[#FFDD80] flex flex-col items-center justify-center drop-shadow lg:-mr-8 lg:ml-0  mx-1 lg:-mt-2">
          <img src="images/h.svg" alt="" />
          <p className="lg:text-[28px] text-[18px] text-black font-bold leading-normal">
            {hours}
          </p>
          <p className="font-semibold text-[12px] uppercase">hours</p>
        </div>
        <div className="lg:h-[123px] lg:w-[123px] h-[80px] w-[80px] rounded-full bg-[#FFD14D] flex flex-col items-center justify-center drop-shadow lg:-mr-8 lg:ml-0  mx-1 relative z-[1] lg:mt-4">
          <img src="images/m.svg" alt="" />
          <p className="lg:text-[28px] text-[18px] text-black font-bold leading-normal">
            {minutes}
          </p>
          <p className="font-semibold text-[12px] uppercase">minutes</p>
        </div>
        <div className="lg:h-[123px] lg:w-[123px] h-[80px] w-[80px] rounded-full bg-[#FFC525] flex flex-col items-center justify-center drop-shadow lg:-mr-3 lg:ml-0  mx-1 lg:-mt-6">
          <img src="images/s.svg" alt="" />
          <p className="lg:text-[28px] text-[18px] text-black font-bold leading-normal">
            {seconds}
          </p>
          <p className="font-semibold text-[12px] uppercase">seconds</p>
        </div>
      </div>
    </>
  );
};

const Airdrop = () => {
  const [user, setUser] = useState<any>(null);
  const [contractState, setContractState] = useState<any>(null);
  // const [appState, setAppState] = useState<any>(null);
  const [isPoints, setPoints] = useState(false);
  const [isInvitees, setInvitees] = useState(false);
  const [isReward, setReward] = useState(false);
  const [token, setToken] = useState<any>(null);
  const [refAddress, setRefAddress] = useState<any>(null);
  // const [userStakeInfo, setUserStakeInfo] = useState < any > (null);
  // const [topPoints, setTopPoints] = useState < any > ([]);
  // const [topReferrals, setTopReferrals] = useState < any > ([]);
  // const [dailyRewards, setDailyRewards] = useState < any > ([]);
  // const [totalPoint, setTotalPoint] = useState < any > (0);

  // const [stakeList, setStakeList] = useState < any > ([]);
  // const [claimList, setClaimList] = useState < any > ([]);
  // const [refList, setRefList] = useState < any > ([]);
  const [shared, setShared] = useState<any>(false);

  // const [topPointLimit, setTopPointLimit] = useState < any > (10);
  // const [topReferralLimit, setTopReferralLimit] = useState < any > (10);

  const [message, setMessage] = useState<any>(0);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    setShared(
      getCookie("twitter_shared")
        ? JSON.parse(getCookie("twitter_shared"))
        : false
    );
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const [
  //       topPointsRes,
  //       topReferralsRes,
  //       dailyRewardsRes,
  //       totalPointRes,
  //       appStateRes,
  //     ] = await Promise.all([
  //       axios.get(
  //         `/api/erapad/stakers?sort=point,-1&page=1&limit=${topPointLimit}`
  //       ),
  //       axios.get(
  //         `/api/erapad/stakers?sort=references.totalLvl1Count,-1&page=1&limit=${topReferralLimit}`
  //       ),
  //       axios.get("/api/erapad/daily-rewards?sort=_id,-1&page=1&limit=1000"),
  //       axios.get("/api/erapad/stakers/sum"),
  //       axios.get("/api/erapad/config"),
  //     ]);
  //     if (+topPointsRes.status == 200) {
  //       setTopPoints([...topPointsRes.data.stakers]);
  //     }
  //     if (+topReferralsRes.status == 200) {
  //       setTopReferrals([...topReferralsRes.data.stakers]);
  //     }
  //     if (+dailyRewardsRes.status == 200) {
  //       setDailyRewards([...dailyRewardsRes.data.dailyRewards]);
  //     }
  //     if (+totalPointRes.status == 200) {
  //       setTotalPoint(totalPointRes.data.sum);
  //     }
  //     if (+appStateRes.status == 200) {
  //       setAppState({ ...appStateRes.data });
  //     }
  //   })();
  // }, [0]);

  // useEffect(() => {
  //   (async () => {
  //     const topPointsRes = await axios.get(
  //       `/api/erapad/stakers?sort=point,-1&page=1&limit=${topPointLimit}`
  //     );
  //     if (+topPointsRes.status == 200) {
  //       setTopPoints([...topPointsRes.data.stakers]);
  //     }
  //   })();
  // }, [topPointLimit]);

  // useEffect(() => {
  //   (async () => {
  //     const topReferralsRes = await axios.get(
  //       `/api/erapad/stakers?sort=references.totalLvl1Count,-1&page=1&limit=${topReferralLimit}`
  //     );
  //     if (+topReferralsRes.status == 200) {
  //       setTopReferrals([...topReferralsRes.data.stakers]);
  //     }
  //   })();
  // }, [topReferralLimit]);

  const getDefaultProvider = () => {
    const provider = ethers.providers.getDefaultProvider(
      ETHEREUM_NETWORK.rpcUrls[0]
    );
    return provider;
  };

  const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum);
  };

  const getContract = (provider: any = null) => {
    const contract = new ethers.Contract(
      ethers.utils.getAddress(`${CONTRACT}`),
      airdrop_abi,
      provider || getDefaultProvider()
    );
    return contract;
  };

  // const getUserStakeInfo = async (ref: any) => {
  //   const res = await axios.get(`/api/erapad/stakers/${ref}`);
  //   if (+res.status == 200) {
  //     return res.data.staker;
  //   }
  //   return null;
  // };

  const getContractState = async () => {
    const contract = getContract();
    const _state = await contract._state();
    return _state;
  };

  const getToken = async (address: any) => {
    const provider = getDefaultProvider();
    const contract = new ethers.Contract(
      ethers.utils.getAddress(`${address}`),
      token_abi,
      provider
    );
    const [name, symbol, decimals] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
    ]);
    return {
      address: address,
      name,
      symbol,
      decimals: decimals.toString(),
    };
  };

  const switchToEthereumChain = async () => {
    // Request to switch to the selected Ethereum network
    // try {
    //   await window.ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [
    //       {
    //         chainId: "" + ethers.utils.hexValue(ETHEREUM_NETWORK?.chainId),
    //       },
    //     ],
    //   });
    // } catch (switchError) {
    //   await window.ethereum.request({
    //     method: "wallet_addEthereumChain",
    //     params: [
    //       {
    //         ...ETHEREUM_NETWORK,
    //         chainId: "" + ethers.utils.hexValue(ETHEREUM_NETWORK?.chainId),
    //       },
    //     ],
    //   });
    // }
  };

  // this has to be set once globally. metamask suggests
  const setMetamaskListener = (ethereum: any) => {
    ethereum?.on("accountsChanged", reloadPage);
    ethereum?.on("chainChanged", reloadPage);
    ethereum?.on("disconnect", reloadPage);
  };

  const setCookie = (cname: any, cvalue: any, exdays: any) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

  const reloadPage = () => {
    setCookie("user", "", 0);
    window.location.reload();
  };

  const initalPage = async (ref: any, chainId: any) => {
    currentChainId = chainId;
    if (!isEthereumChain(chainId)) {
      ee.dispatch("page-message", {
        text: "Please switch your wallet to " + ETHEREUM_NETWORK?.chainName,
        type: "info",
        timeout: 5 * 1000,
      });
      await switchToEthereumChain();
    }
    setUser(ref);
    setCookie("login", "true", 1);
    setCookie("user", ref, 1);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.ref || params.reference) {
      let addr = params.ref || params.reference;
      try {
        addr = ethers.utils.getAddress(addr);
        setRefAddress(addr);
      } catch (e) {
        console.error("ethers.utils.getAddress(addr) -> ", e);
      }
    } else {
      let addr = getCookie("refAddress");
      if (addr) {
        try {
          addr = ethers.utils.getAddress(addr);
          setRefAddress(addr);
        } catch (e) {
          console.error("ethers.utils.getAddress(addr) -> ", e);
        }
      }
    }
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const _state = await getContractState();
  //     console.error("_state -> ", _state);
  //     setContractState({ ..._state });
  //   })();
  // }, [0]);

  useEffect(() => {
    (async () => {
      if (contractState) {
        const token = await getToken(
          contractState._usdtTokenAddress?.toString()
        );
        setToken({ ...token });
      }
    })();
  }, [contractState]);

  // useEffect(() => {
  //   (async () => {
  //     if (user) {
  //       const userStakeInfo = await getUserStakeInfo(user);
  //       console.error("userStakeInfo -> ", userStakeInfo);
  //       setUserStakeInfo(userStakeInfo);
  //     }
  //   })();
  // }, [user]);

  useEffect(() => {
    if (getCookie("login") == "false") {
      return;
    }
    async function detectMetamask() {
      if (window.ethereum) {
        const provider: any = await detectEthereumProvider({
          mustBeMetaMask: true,
        });
        if (provider) {
          let chainId =
            (await provider.request({
              method: "eth_chainId",
            })) - 0;
          window.ethereum
            .request({ method: "eth_accounts" })
            .then((accounts: any) => {
              if (accounts && accounts.length > 0) {
                (async () => {
                  await initalPage(accounts[0], chainId);
                })();
                setMetamaskListener(window.ethereum);
              } else {
                if (isMobile) {
                  window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((accounts: any) => {
                      if (accounts && accounts.length > 0) {
                        (async () => {
                          await initalPage(accounts[0], chainId);
                        })();
                        setMetamaskListener(window.ethereum);
                      }
                    });
                }
              }
            })
            .catch((err: any) => {
              console.error("detectEther -> ", err);
            });
        }
      }
    }

    detectMetamask();
  }, [0]);

  // const activePoints = async () => {
  //   setPoints(true);
  //   const res = await axios.get(
  //     `/api/erapad/activities?page=1&limit=10&sort=_id,-1&action=STAKE&source=EVENT&walletAddress=${userStakeInfo.walletAddress}`
  //   );
  //   if (+res.status == 200) {
  //     setStakeList([...res.data.activities]);
  //   }
  // };
  const hidePoints = () => {
    setPoints(!isPoints);
  };
  // const activeInvitees = async () => {
  //   setInvitees(true);
  //   const res = await axios.get(
  //     `/api/erapad/stakers?page=1&limit=10&sort=_id,-1&refAddress=${userStakeInfo.walletAddress}`
  //   );
  //   if (+res.status == 200) {
  //     setRefList([...res.data.stakers]);
  //   }
  // };
  const hideInvitees = () => {
    setInvitees(!isInvitees);
  };
  // const activeReward = async () => {
  //   setReward(true);
  //   const res = await axios.get(
  //     `/api/erapad/activities?page=1&limit=10&sort=_id,-1&action=CLAIM&source=EVENT&walletAddress=${userStakeInfo.walletAddress}`
  //   );
  //   if (+res.status == 200) {
  //     setClaimList([...res.data.activities]);
  //   }
  // };
  const hideReward = async () => {
    setReward(!isReward);
  };

  // const claimClickHandler = async (e: any) => {
  //   try {
  //     if (!user) {
  //       ee.dispatch("page-message", {
  //         text: "Please connect to your wallet first.",
  //         type: "info",
  //         timeout: 5 * 1000,
  //       });
  //       return;
  //     }

  //     if (!isEthereumChain(currentChainId)) {
  //       ee.dispatch("page-message", {
  //         text: "Please switch your wallet to mainnet.",
  //         type: "info",
  //         timeout: 5 * 1000,
  //       });
  //       return;
  //     }
  //     if (!shared) {
  //       ee.dispatch("page-message", {
  //         text: "Please tweet to Claim.",
  //         type: "info",
  //         timeout: 5 * 1000,
  //       });
  //       return;
  //     }
  //     ee.dispatch("page-message", {
  //       text: "Processing...",
  //       type: "info",
  //       timeout: 10 * 60 * 1000,
  //     });
  //     if (userStakeInfo) {
  //       const res = await axios.post(
  //         `/api/erapad/stakers/${userStakeInfo._id?.toString()}/request-claim`
  //       );
  //       // console.error("res -> ", res);
  //       if (+res.status == 200 || +res.status == 201) {
  //         const provider = getProvider();
  //         const contract = getContract(provider.getSigner());
  //         let gasPriceRes = await provider.getGasPrice();
  //         console.error("res.data -> ", res.data);
  //         let params: any = [
  //           `${ethers.utils
  //             .parseUnits(`${res.data.unclaimedRewards}`, "6")
  //             .toString()}`,
  //           `${res.data.claimNonce}`,
  //           `${res.data.claimSignature}`,
  //         ];

  //         let value = `${0}`;

  //         const gesLimitRes = await contract.estimateGas.claim(...params, {
  //           value,
  //         });

  //         const tx = await contract.claim(...params, {
  //           gasLimit: gesLimitRes.toString(),
  //           gasPrice: gasPriceRes.toString(),
  //           value,
  //         });
  //         if (tx) {
  //           try {
  //             await axios.post(`/api/erapad/activities`, {
  //               walletAddress: userStakeInfo.walletAddress,
  //               hash: tx.hash,
  //               action: "CLAIM",
  //               changed: "0",
  //               stakerId: userStakeInfo._id,
  //               txParams: params,
  //               source: "POST",
  //             });
  //           } catch (e) {
  //             console.error(e);
  //           }
  //           await tx.wait();
  //           ee.dispatch("page-message", {
  //             text: "Your transaction has been commit successfully.",
  //             type: "info",
  //             timeout: 10 * 1000,
  //           });
  //         }
  //       }
  //     } else {
  //       ee.dispatch("page-message", {
  //         text: "Please buy a trunk first.",
  //         type: "info",
  //         timeout: 5 * 1000,
  //       });
  //     }
  //   } catch (e: any) {
  //     console.error(e);
  //     if (e.code == -32603 || e.data?.code == -32000) {
  //       ee.dispatch("page-message", {
  //         text: "Sorry. You do not have enough ether to complete this transaction",
  //         type: "info",
  //         timeout: 10 * 1000,
  //       });
  //     } else {
  //       ee.dispatch("page-message", {
  //         text:
  //           e.reason ||
  //           e.data?.message ||
  //           e.error?.message ||
  //           e.response?.data?.message ||
  //           e.message,
  //         type: "info",
  //         timeout: 10 * 1000,
  //       });
  //     }
  //   }
  // };

  // const createReferralClickHandler = async (e: any) => {
  //   if (user) {
  //     await navigator.clipboard.writeText(
  //       `${window.location.origin}/airdrop?ref=${user}`
  //     );
  //     ee.dispatch("page-message", {
  //       text: "Your referral link was copied to the clipboard.",
  //       type: "info",
  //       timeout: 5 * 1000,
  //     });
  //   } else {
  //     ee.dispatch("page-message", {
  //       text: "Please connect your wallet first.",
  //       type: "info",
  //       timeout: 5 * 1000,
  //     });
  //   }
  // };

  // const stakeTrunkClickHandler = async (boxId: any, e: any) => {
  //   try {
  //     if (!user) {
  //       ee.dispatch("page-message", {
  //         text: "Please connect to your wallet first.",
  //         type: "info",
  //         timeout: 5 * 1000,
  //       });
  //       return;
  //     }

  //     if (!isEthereumChain(currentChainId)) {
  //       ee.dispatch("page-message", {
  //         text: "Please switch your wallet to mainnet.",
  //         type: "info",
  //         timeout: 5 * 1000,
  //       });
  //       return;
  //     }
  //     ee.dispatch("page-message", {
  //       text: "Processing...",
  //       type: "info",
  //       timeout: 10 * 60 * 1000,
  //     });

  //     const provider = getProvider();
  //     const contract = getContract(provider.getSigner());
  //     let gasPriceRes = await provider.getGasPrice();

  //     let params: any = [
  //       `${boxId}`,
  //       `${ethers.utils.getAddress(
  //         refAddress || ethers.constants.AddressZero
  //       )}`,
  //     ];

  //     let value = contractState._boxs[boxId - 1].eth?.toString();

  //     const gesLimitRes = await contract.estimateGas.stake(...params, {
  //       value,
  //     });

  //     const tx = await contract.stake(...params, {
  //       gasLimit: gesLimitRes.toString(),
  //       gasPrice: gasPriceRes.toString(),
  //       value,
  //     });
  //     if (tx) {
  //       try {
  //         await axios.post(`/api/erapad/activities`, {
  //           walletAddress: userStakeInfo.walletAddress,
  //           hash: tx.hash,
  //           action: "STAKE",
  //           changed: "0",
  //           stakerId: userStakeInfo._id,
  //           txParams: params,
  //           source: "POST",
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //       await tx.wait();
  //       ee.dispatch("page-message", {
  //         text: "The tx has been commit successfully. Your point is being updated shortly.",
  //         type: "info",
  //         timeout: 10 * 1000,
  //       });
  //     }
  //   } catch (e: any) {
  //     console.error(e);
  //     if (e.code == -32603 || e.data?.code == -32000) {
  //       ee.dispatch("page-message", {
  //         text: "Sorry. You do not have enough ether to complete this transaction",
  //         type: "info",
  //         timeout: 10 * 1000,
  //       });
  //     } else {
  //       ee.dispatch("page-message", {
  //         text: e.reason || e.data?.message || e.error?.message || e.message,
  //         type: "info",
  //         timeout: 10 * 1000,
  //       });
  //     }
  //   }
  // };

  const checkWalletClickHandler = async (e: any) => {
    if (!wallet) {
      ee.dispatch("page-message", {
        text: "Please enter your wallet address.",
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    let res = await axios.get(`/api/check?wallet=${wallet}`);
    // console.log("res -> ", res);
    if (res.data && JSON.parse(res.data)) {
      setMessage(1);
    } else {
      setMessage(2);
    }
  };

  return (
    <>
      <div className="lg:pt-10 w-full lg:w-auto text-black lg:max-w-[922px] mx-auto">
        <img className="mb-10" src="images/ban1.png" alt="" />
        <div className="mb-8 lg:rounded-[60px] rounded-3xl bg-white lg:flex items-center">
          <div className="sm:flex items-center mr-auto p-7 pl-5">
            <img
              className="sm:mr-2.5 mx-auto"
              src="images/air-image3.svg"
              alt=""
            />
            <h2 className="text-black leading-normal text-center sm:text-left">
              Claiming will start in
            </h2>
          </div>
          <Countdown date={`01/29/2024`} renderer={renderer} />
        </div>
        <div className="lg:rounded-[60px] rounded-3xl bg-white box-shadown py-10 px-4 text-center">
          <h2 className="mb-5 text-black leading-normal">
            Check Airdrop Eligibility
          </h2>
          <p className="text-[16px] font-medium mb-9">
            Connect your wallet to check if your are eligible for the $ORLA
            Airdrop
          </p>
          <div className="lg:flex justify-center items-center">
            <div className="lg:order-2 md:w-[420px]">
              {/* <button className="text-[16px] font-bold rounded-[100px] py-3.5 px-5 hover:border-primary hover:text-black mb-10">Connect Wallet</button> */}
              <div className="">
                <input
                  className="!text-black !border-black !rounded-full !py-3 mb-4 placeholder-black !font-normal"
                  type="text"
                  placeholder="Enter wallet..."
                  onChange={(e) => setWallet(e.target.value)}
                />
                <div className="mb-4 font-medium px-2">
                  {message == 1 && <p>This account won the airdrop</p>}
                  {message == 2 && (
                    <p>
                      This account did not win the airdrop, but you can still
                      participate in the IDO
                    </p>
                  )}
                </div>
                <button
                  onClick={checkWalletClickHandler}
                  className="text-[16px] font-bold rounded-[100px] py-3.5 px-5 hover:border-primary hover:text-black mb-10"
                >
                  Check
                </button>
              </div>
              <h3 className="text-black mb-5 font-bold leading-normal">
                ELIGIBILITY CRITERIA
              </h3>
              <div className="flex item-center justify-center">
                <p className="mx-2 font-medium text-[rgba(0,0,0,0.64)]">
                  $ORLA User
                </p>
                <p className="mx-2 font-medium text-[rgba(0,0,0,0.64)]">
                  BRC20 User
                </p>
                <p className="mx-2 font-medium text-[rgba(0,0,0,0.64)]">
                  Ethereum User
                </p>
              </div>
            </div>
            <div className="mr-auto lg:order-1 hidden lg:block">
              <img src="images/air-image.svg" alt="" />
            </div>
            <div className="ml-auto lg:order-3  hidden lg:block">
              <img src="images/air-image2.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Airdrop;
