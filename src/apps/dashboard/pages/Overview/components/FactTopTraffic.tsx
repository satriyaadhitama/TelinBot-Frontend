import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Label,
} from 'recharts';
import { ContentWrapper } from '@/apps/dashboard/components';
import React, { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import { getMonthName } from '@/utils/date';
import { getTopTrafficYearly } from '@/services/overview';
import { convertGBtoTB } from '@/utils/format';
import { getMaxValue } from '../../helpers';
import { CustomTooltipProps } from '@/types/components/CustomTooltip';
import { ChartDataProps } from '@/types/data/ChartDataProps';
import { DropdownOption } from '@/types/components/DropdownOption';

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <h4 className="fs-md-1 fst-italic">{getMonthName(parseInt(label))}</h4>
        <span className="fs-rg">{payload[0].value} TBs</span>
      </div>
    );
  }
  return null;
};

const Chart: React.FC<ChartDataProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ left: 5 }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff7373" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff7373" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="x"
          stroke="#ff7373"
          fillOpacity={1}
          fill="url(#color)"
        />

        <XAxis
          dataKey="y"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            if (parseInt(str) % 2 === 1) {
              return getMonthName(parseInt(str));
            } else {
              return '';
            }
          }}
        />

        <YAxis
          dataKey="x"
          axisLine={false}
          tickLine={false}
          tickCount={10}
          style={{ fontSize: '10px' }}
          domain={[0, getMaxValue(data)]}
        >
          <Label
            value={'Bandwidth (TBs)'}
            angle={-90}
            dx={-20}
            style={{ fontSize: '14px' }}
          />
        </YAxis>

        <Tooltip content={CustomTooltip} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

function FactTopTraffic() {
  const [data, setData] = useState([]);

  const options = [
    { name: '2021', value: 2021 },
    { name: '2022', value: 2022 },
    { name: '2023', value: 2023 },
    { name: '2024', value: 2024 },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const yearlyBandwidth = async () => {
      const data = await getTopTrafficYearly(selectedOption.value);
      const convertedData = data.map((item) => ({
        x: convertGBtoTB(item.bandwidth),
        y: item.month,
      }));
      console.log(convertedData);
      setData(convertedData);
    };

    yearlyBandwidth();
  }, [selectedOption]);
  return (
    <ContentWrapper title="Fact Top Traffic">
      <div className="d-flex justify-content-end mb-3">
        <Dropdown
          placeholder={selectedOption.name}
          options={options}
          onSelect={handleSelect}
        />
      </div>
      <div>
        <Chart data={data} />
      </div>
    </ContentWrapper>
  );
}

export default FactTopTraffic;
