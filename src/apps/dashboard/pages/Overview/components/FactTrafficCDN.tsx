import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import Dropdown from '@/components/Dropdown';
import { getTrafficCDN } from '@/services/overview';
import { DropdownOption } from '@/types/components/DropdownOption';
import { convertGBtoTB, truncate } from '@/utils/format';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getMaxValue } from '../../helpers';
import { CustomTooltipProps } from '@/types/components/CustomTooltip';

interface DataProps {
  x: number;
  y: any;
}

interface ChartProps {
  data: DataProps[];
  height?: number;
}

const renderCustomAxisTick = ({ payload, x, y, width, height }) => {
  const maxLength = 10; // Max length of text allowed
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {truncate(payload.value, maxLength)}
      </text>
    </g>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <h4 className="fs-md-1 fst-italic">{label}</h4>
        <span className="fs-rg">{payload[0].value} TBs</span>
      </div>
    );
  }
  return null;
};

const HorizontalChart: React.FC<ChartProps> = ({ data, height = 250 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          bottom: 25,
          left: 30,
        }}
      >
        <XAxis type="number" domain={[0, getMaxValue(data)]}>
          <Label value={'Usage (TB)'} dy={30} />
        </XAxis>
        <YAxis
          type="category"
          dataKey="y"
          tick={renderCustomAxisTick}
          style={{ fontSize: '10px' }}
        />

        <Tooltip content={CustomTooltip} />
        <Bar dataKey="x" fill="#ff4b4b" />
      </BarChart>
    </ResponsiveContainer>
  );
};

function FactTrafficCDN() {
  const options = [
    { name: 'Customer', value: 'customer_name' },
    { name: 'Product', value: 'product_name' },
    { name: 'Partner', value: 'partner' },
  ];
  const [data, setData] = useState([]);
  const [totalQueries, setTotalQueries] = useState(0);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const trafficCDNSummary = async () => {
      const responseData = await getTrafficCDN(selectedOption.value, 5);
      const totalQueries = responseData.total_queries;
      const data = responseData.data;
      const convertedData = data.map((item) => ({
        x: convertGBtoTB(item.total_usage),
        y: item.name,
      }));
      setTotalQueries(totalQueries);
      setData(convertedData);
    };
    trafficCDNSummary();
  }, [selectedOption]);

  return (
    <ContentWrapper title="Traffic CDN Summary">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p>
          From <strong>{totalQueries}</strong> Queries
        </p>
        <div className="d-flex flex-row align-items-center">
          <span className="mx-2">Summarize By</span>
          <Dropdown
            placeholder={selectedOption.name}
            options={options}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <div>
        <HorizontalChart data={data} height={250} />
      </div>
    </ContentWrapper>
  );
}

export default FactTrafficCDN;
