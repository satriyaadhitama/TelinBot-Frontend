import { Option } from '@/types/components/Option';
import { isNumericStr } from '@/utils/format';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const countries: Option[] = [
  { value: '+1', label: 'US (+1)' },
  { value: '+44', label: 'UK (+44)' },
  { value: '+1', label: 'CA (+1)' },
  { value: '+61', label: 'AU (+61)' },
  { value: '+62', label: 'ID (+62)' },
];

interface PhoneInputProps {
  onChange: (phoneNumber: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<Option>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (country: Option) => {
    setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (event) => {
    if (
      (isNumericStr(event.target.value) && event.target.value.length < 15) ||
      event.target.value.length === 0
    ) {
      setPhoneNumber(event.target.value);
    }
  };

  useEffect(() => {
    const completePhoneNumber = selectedCountry.value + phoneNumber;
    onChange(completePhoneNumber);
  }, [selectedCountry, phoneNumber]);

  return (
    <div className=" d-flex">
      <Select
        options={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        className="country-select"
      />
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Phone number"
        className="form-control"
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
};

export default PhoneInput;
