const topTrends = [
  {
    logo: 'logo-token.png',
    title: 'Bitmap'
  },
  {
    logo: 'logo-token.png',
    title: 'Bitcoin Punks'
  },
  {
    logo: 'logo-token.png',
    title: 'Bitcoin Frog'
  },
  {
    logo: 'logo-token.png',
    title: 'Ordinal Maxi Biz (OMB)'
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

const Earn = () => {
  return (
    <>
      <div className="xl:w-[922px] mx-auto w-full lg:mt-[50px]">
        <div className="lg:p-8 p-4 md:rounded-[36px] rounded-2xl md:flex items-center bg-gradient-box2 mb-[64px]">
          <div className="md:flex-[0_0_65%] md:pr-2">
            <h1 className="text-gradient inline-block mb-6">Earn With Us</h1>
            <p className="md:text-[20px] md:leading-[150%]">Simple and easy, <br /> Single-Stake your uTokens to earn fees with no worries.</p>
          </div>
          <div className="md:flex-[0_0_35%] hidden md:inline-block">
            <img src="images/candy.png" alt="" />
          </div>
        </div>
        <h2 className="mb-8">Top Trends</h2>
        <div className="flex flex-wrap items-stretch xl                                                   :-mx-4 -mx-2 mb-[60px]">
          {topTrends.map((item, index) => {
            return (
              <div key={index} className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_25%] md:max-w-[25%] xl:px-4 px-2 mb-4">
                <div className="h-full px-4 py-5 bg-gradient-box rounded-2xl flex flex-col">
                  <div className="flex mb-6">
                    <div className="mr-auto flex items-center">
                      <img className="w-10 h-10 rounded-full object-cover mr-2" src={`images/${item.logo}`} alt="" />
                      <div>
                        <p className="text-[12px] font-bold mb-1.5">{item.title}</p>
                        <p className="text-[11px] font-medium text-[rgba(255,255,255,0.48)] flex items-center">
                          APY
                          <span className="font-semibold text-[#51DA7F] ml-2">42.65%</span>
                        </p>
                      </div>
                    </div>
                    <img className="w-6" src="images/fire.svg" alt="" />
                  </div>
                  <button className="mt-auto bg-[#2A2113] bg-noimage text-primary normal-case font-semibold text-[14px]">Stake Now</button>
                </div>
              </div>
            )
          })}
        </div>
        <h2 className="mb-2.5">Reward Pools</h2>
        <p className="md:text-[16px] mb-[64px]">Stake your uTokens now to earn fees generated from Vault Redemptions fees.</p>
        <div className="overflow-x-auto pb-10">
          <table className="w-full border border-border bg-[#050300]">
            <thead>
              <tr>
                <th>Token</th>
                <th>
                  Staked Amount
                </th>
                <th>
                  Earned Amount
                </th>
                <th>
                  Total Staked Amount
                </th>
                <th>
                  Projected APY
                </th>
                <th>
                  Operation
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
                      <p className="font-medium">0</p>
                      <p className="text-[rgba(255,255,255,0.38)] text-[10px]">$0.00</p>
                    </td>
                    <td>
                      <p className="font-medium">0</p>
                      <p className="text-[rgba(255,255,255,0.38)] text-[10px]">$0.00</p>
                    </td>
                    <td>
                      <p className="font-medium">81,543,565 </p>
                    </td>
                    <td>
                      <p className="text-[#51DA7F] font-medium md:text-[16px]">35.66%</p>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <button className="py-2 px-2 rounded bg-[#2A2113] bg-noimage text-primary normal-case font-medium text-[13px] mr-3">Stake</button>
                        <button className="py-2 px-2 rounded bg-[#2A2113] bg-noimage text-primary normal-case font-medium text-[13px]">Unstake</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Earn;
