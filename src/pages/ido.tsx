import Countdown from "react-countdown";
/* @ts-ignore */
const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <>
      <div className="flex items-center text-primary">
        <div className="h-9 w-9 flex items-center justify-center text-[12px] font-medium border 
        border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.14)] rounded mr-2">{days}d</div>:
        <div className="h-9 w-9 flex items-center justify-center text-[12px] font-medium border 
        border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.14)] rounded mx-2">{hours}h</div>:
        <div className="h-9 w-9 flex items-center justify-center text-[12px] font-medium border 
        border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.14)] rounded mx-2">{minutes}m</div>:
        <div className="h-9 w-9 flex items-center justify-center text-[12px] font-medium border 
        border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.14)] rounded ml-2">{seconds}s</div>
      </div>
    </>
  );
};
const Ido = () => {
  return (
    <>
      <div className="md:flex items-stretch lg:pt-[100px]">
        <div className="flex-1 md:mr-8 mb-5 md:mb-0">
          <div className="p-4 lg:p-8 bg-dark rounded-[20px] border border-[rgba(255,255,255,0.14)]">
            <h1 className="lg:text-[32px] text-[26px] mb-8 font-bold">$ORLA Launchpad</h1>
            <div className="rounded-2xl border border-border p-4 lg:px-6 lg:py-8 mb-[48px]">
              <div className="sm:flex items-center mb-8">
                <p className="text-[16px] font-semibold mr-auto mb-3 sm:mb-0">Presale End In</p>
                <Countdown date={`01/29/2024`}
                  renderer={renderer} />
              </div>
              <div className="w-full h-1 bg-[#323536] mb-2">
                <div style={{ width: '70%' }} className="bg-primary h-full"></div>
              </div>
              <div className="text-right text-[16px] font-medium text-[rgba(255,255,255,0.38)]">32.46 ETH</div>
            </div>
            <div className="bg-[rgba(255,154,2,0.08)] rounded p-4 flex items-center border-b border-primary mb-2">
              <div className="mr-auto">
                <p className="text-[12px] text-[rgba(255,255,255,0.87)] leading-[16px] mb-1">Amount</p>
                <input className=" !rounded-none h-6 !border-none !p-0 text-white !text-[16px] !font-medium" type="number" name="" id="" placeholder="0" />
              </div>
              <button>Max</button>
            </div>
            <div className="text-[16px] text-[rgba(255,255,255,0.38)] mb-11">Balance: 0 ETH</div>
            <button className="w-full py-3">CONNECT</button>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-4 lg:p-8 bg-dark rounded-[20px] border border-[rgba(255,255,255,0.14)] mb-5">
            <h2 className="lg:text-[32px] text-[26px] mb-8 font-bold">Information</h2>
            <div className="border border-[rgba(255,255,255,0.14)] font-semibold">
              <div className="flex items-center border-b border-[rgba(255,255,255,0.14)]">
                <p className="flex-1 px-5 py-2.5 border-r border-[rgba(255,255,255,0.14)]">Launching Amount</p>
                <p className="flex-1 px-5 py-2.5 text-right">TBA</p>
              </div>
              <div className="flex items-center border-b border-[rgba(255,255,255,0.14)]">
                <p className="flex-1 px-5 py-2.5 border-r border-[rgba(255,255,255,0.14)]">Price</p>
                <p className="flex-1 px-5 py-2.5 text-right">1 ETH = TBA $ORLA</p>
              </div>
              <div className="flex items-center border-b border-[rgba(255,255,255,0.14)]">
                <p className="flex-1 px-5 py-2.5 border-r border-[rgba(255,255,255,0.14)]">WL Round Start</p>
                <p className="flex-1 px-5 py-2.5 text-right">TBA</p>
              </div>
              <div className="flex items-center border-b border-[rgba(255,255,255,0.14)]">
                <p className="flex-1 px-5 py-2.5 border-r border-[rgba(255,255,255,0.14)]">Public Round Start</p>
                <p className="flex-1 px-5 py-2.5 text-right">TBA</p>
              </div>
              <div className="flex items-center">
                <p className="flex-1 px-5 py-2.5 border-r border-[rgba(255,255,255,0.14)]">End</p>
                <p className="flex-1 px-5 py-2.5 text-right">TBA</p>
              </div>
            </div>
          </div>
          <div className="bg-dark rounded-[20px] border border-[rgba(255,255,255,0.14)]">
            <div className="flex flex-wrap items-center">
              <div className="flex-[0_0_50%] max-w-[50%] flex items-center p-4 lg:px-8 lg:py-5 border-r border-b border-[rgba(255,255,255,0.14)]">
                <div className="flex-[0_0_40px] mr-2">
                  <img src="images/1.svg" alt="" />
                </div>
                <div>
                  <p className="text-[rgba(255,255,255,0.64)] mb-2 text-[12px] font-medium">Minium contribution</p>
                  <p className="text-[18px] font-semibold">0.0 ETH</p>
                </div>
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] flex items-center p-4 lg:px-8 lg:py-5 border-b border-[rgba(255,255,255,0.14)]">
                <div className="flex-[0_0_40px] mr-2">
                  <img src="images/2.svg" alt="" />
                </div>
                <div>
                  <p className="text-[rgba(255,255,255,0.64)] mb-2 text-[12px] font-medium">Soft cap</p>
                  <p className="text-[18px] font-semibold">0.0 ETH</p>
                </div>
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] flex items-center p-4 lg:px-8 lg:py-5 border-r border-[rgba(255,255,255,0.14)]">
                <div className="flex-[0_0_40px] mr-2">
                  <img src="images/3.svg" alt="" />
                </div>
                <div>
                  <p className="text-[rgba(255,255,255,0.64)] mb-2 text-[12px] font-medium">Maxium contribution</p>
                  <p className="text-[18px] font-semibold">0.0 ETH</p>
                </div>
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] flex items-center p-4 lg:px-8 lg:py-5">
                <div className="flex-[0_0_40px] mr-2">
                  <img src="images/4.svg" alt="" />
                </div>
                <div>
                  <p className="text-[rgba(255,255,255,0.64)] mb-2 text-[12px] font-medium">Soft capHard cap</p>
                  <p className="text-[18px] font-semibold">0.0 ETH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ido;
