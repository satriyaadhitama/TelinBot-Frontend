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
import { useEffect, useState } from 'react';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import { DropdownOption } from '@/types/components/DropdownOption';
import { getUsersHistory } from '@/services/auth';
import { CustomTooltipProps } from '@/types/components/CustomTooltip';
import { ChartDataProps } from '@/types/data/ChartDataProps';
import { DataProps } from '@/types/data/DataProps';
import { getMaxValue } from '../../helpers';

type FilterType = 'week' | 'month';

const getPastData = (filter: FilterType, data: DataProps[]): DataProps[] => {
  const filters: { [key in FilterType]: number } = { week: 7, month: 30 };
  const currentDate = new Date();
  let resultData: DataProps[] = [];

  if (!data) return [];

  for (let i = filters[filter]; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0] + 'T00:00:00Z'; // Format to match the data
    // Find the data entry for the given date or use default value 0
    const dataEntry = data.find((d) => d.x === dateString);
    resultData.push({ x: dateString, y: dataEntry ? dataEntry.y : 0 });
  }
  return resultData;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
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
};

const Chart: React.FC<ChartDataProps> = ({ data }) => {
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
          dataKey="y"
          stroke="#ff7373"
          fillOpacity={1}
          fill="url(#color)"
        />

        <XAxis
          dataKey="x"
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
          dataKey="y"
          label={{
            value: 'Total Users',
            angle: -90,
            position: 'insideLeft',
          }}
          axisLine={false}
          tickLine={false}
          tickCount={5}
          tickFormatter={(number) => `${number}`}
          domain={[0, getMaxValue(data)]}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

function UsersChartHistory() {
  const [data, setData] = useState<DataProps[] | []>([]);
  const options = [
    { name: 'Weekly', value: 'week' },
    { name: 'Monthly', value: 'month' },
  ];
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(
    options[0]
  );

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchUsersHistory = async (filter: string) => {
      const responseData = await getUsersHistory(filter);
      const formattedData = responseData?.map((item) => ({
        x: item.date,
        y: item.value,
      }));
      setData(getPastData(selectedOption.value, formattedData));
    };
    fetchUsersHistory(selectedOption.value);
  }, [selectedOption]);

  return (
    <ContentWrapper title="USERS TRAFFIC">
      <div className="d-flex justify-content-end mb-3">
        <Dropdown
          placeholder={selectedOption.name}
          options={options}
          onSelect={handleSelect}
        />
      </div>
      <Chart data={data} />
    </ContentWrapper>
  );
}

export default UsersChartHistory;
