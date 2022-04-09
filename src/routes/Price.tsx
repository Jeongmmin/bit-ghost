import { HTMLAttributes } from 'react';
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers, fetchCoinToday } from "../api";

interface ChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
  isNegative: boolean;
}

interface PriceData {
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
    // KRW: { 
    //   price: number;
    //   volume_24h: number;
    //   volume_24h_change_24h: number;
    //   market_cap: number;
    //   market_cap_change_24h: number;
    //   percent_change_15m: number;
    //   percent_change_30m: number;
    //   percent_change_1h: number;
    //   percent_change_6h: number;
    //   percent_change_12h: number;
    //   percent_change_24h: number;
    //   percent_change_7d: number;
    //   percent_change_30d: number;
    //   percent_change_1y: number;
    //   ath_price: number;
    //   ath_date: string ;
    //   percent_from_price_ath: number;
    // };
  };
}

const Overview = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
  padding: 10px;
  h3 {
    color: ${(props) => props.theme.priceTitleColor};
  }
`;

const RowOverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  span:first-child {
    font-size: 14px;
    text-transform: uppercase;
    /* margin-bottom: 5px; */
    color: ${(props) => props.theme.priceTitleColor};
  }
  span:last-child {
    font-size: 14px;
    text-transform: uppercase;
    /* margin-bottom: 5px; */
  }
`;

const PriceValue = styled.span<IItemProps>`
  color: ${props => props.isNegative ? "#6ab8fc" : "#ff5778"};
  /* font-size: 16px; */
`; 

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["today", coinId],
    () => fetchCoinToday(coinId)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 1000,
    }
  );

  
  const todayObj: any = data ? data[0] : {};
  
  const BaseUrl: any = tickersData?.quotes.USD;
  
  function checkBoolean(value: number) {
    if (Math.sign(value) === -1) {
      return true
    }else {
      return false
    } 
  }

  // console.log(Math.sign(BaseUrl.percent_change_15m))

  return (
    <div>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <h3>시가</h3>
              <span>{`$ ${todayObj.open.toFixed(3)}`}</span>
              <h3>고가</h3>
              <span>{`$ ${todayObj.high.toFixed(3)}`}</span>
            </OverviewItem>
            <OverviewItem>
              <h3>저가</h3>
              <span>{`$ ${todayObj.low.toFixed(3)}`}</span>
              <h3>종가</h3>
              <span>{`$ ${todayObj.close.toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>

          <RowOverviewItem>
            <span>시총</span>
            <span>{`${BaseUrl.market_cap
              .toFixed(3)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>지난 24시간 거래량</span>
            <span>{`${BaseUrl.volume_24h
              .toFixed(3)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>현재 시세</span>
            <span>{`${BaseUrl.price
              .toFixed(3)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>15 mimute</span>
            <PriceValue isNegative={!checkBoolean(BaseUrl.percent_change_15m) }>{`${BaseUrl.percent_change_15m} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>30 mimute</span>
            <PriceValue isNegative={checkBoolean(BaseUrl.percent_change_30m)}>{`${BaseUrl.percent_change_30m} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>1 hour</span>
            <PriceValue isNegative={checkBoolean(BaseUrl.percent_change_1h)}>{`${BaseUrl.percent_change_1h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>12 hour</span>
            <PriceValue isNegative={checkBoolean(BaseUrl.percent_change_12h)}>{`${BaseUrl.percent_change_12h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>24 hour</span>
            <PriceValue isNegative={checkBoolean(Math.sign(BaseUrl.percent_change_24h))}>{`${BaseUrl.percent_change_24h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>지난 24시간 거래 변동률</span>
            <PriceValue isNegative={checkBoolean(BaseUrl.volume_24h_change_24h)}>{`${BaseUrl.volume_24h_change_24h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>시총 가격 변동률</span>
            <PriceValue isNegative={checkBoolean(BaseUrl.market_cap_change_24h)}>{`${BaseUrl.market_cap_change_24h} %`}</PriceValue>
          </RowOverviewItem>
        </>
      )}
    </div>
  );
}

export default Price;
