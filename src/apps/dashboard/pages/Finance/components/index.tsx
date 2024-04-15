import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import Dropdown from '@/components/Dropdown';
import { useState } from 'react';

const FinanceReport = () => {
  return (
    <div className="finance-report-container">
      <h4>Laporan Keuangan QI 2024</h4>
    </div>
  );
};

function Main() {
  const options = [2020, 2021, 2022, 2023, 2024];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log(option);
  };

  return (
    <ContentWrapper title="Financial Report">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-10">
          <div className=" d-flex justify-content-end mb-4">
            <Dropdown
              placeholder={selectedOption}
              options={options}
              onSelect={handleSelect}
            />
          </div>
          <div>
            <div className="mb-4">
              <FinanceReport />
            </div>
            <div className="mb-4">
              <FinanceReport />
            </div>
            <div className="mb-4">
              <FinanceReport />
            </div>
            <div className="mb-4">
              <FinanceReport />
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Main;
