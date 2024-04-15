import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';
import Dropdown from '@/components/Dropdown';
import { useState } from 'react';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';

interface ChartData {
  date: string; // ISO date string
  value: number;
}

function getRandomInt(min, max) {
  min = Math.ceil(min); // Ensure the minimum is rounded up to the nearest whole number
  max = Math.floor(max); // Ensure the maximum is rounded down to the nearest whole number
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

const data: ChartData[] = [];
for (let num = 7; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: getRandomInt(0, 50),
  });
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <h4 className="fs-md-1">
          {format(parseISO(label), 'eeee, d MMM, yyyy')}
        </h4>
        <span className="fs-lg">{payload[0].value} Users</span>
      </div>
    );
  }
  return null;
}

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff7373" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff7373" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="value"
          stroke="#ff7373"
          fillOpacity={1}
          fill="url(#color)"
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 2 === 1) {
              return format(date, 'MMM, d');
            }
            return '';
          }}
        />

        <YAxis
          dataKey="value"
          label={{
            value: 'Total Users',
            angle: -90,
            position: 'insideLeft',
          }}
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `${number}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

function UsersChartHistory() {
  const options = ['Weekly', 'Monthly', 'Yearly'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log(option);
  };

  return (
    <ContentWrapper title="USERS TRAFFIC">
      <div className="d-flex justify-content-end mb-3">
        <Dropdown
          placeholder={selectedOption}
          options={options}
          onSelect={handleSelect}
        />
      </div>
      <Chart />
    </ContentWrapper>
  );
}

export default UsersChartHistory;
