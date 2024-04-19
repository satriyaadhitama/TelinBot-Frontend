import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import Dropdown from '@/components/Dropdown';
import Modal from '@/components/Modal';
import {
  deleteFinanceReport,
  getFinanceReport,
  patchFinanceReport,
  postFinanceReport,
} from '@/services/finance';
import { DropdownOption } from '@/types/components/DropdownOption';
import {
  faEdit,
  faFileDownload,
  faFileUpload,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { completeQuarters } from '../helpers';

interface FinanceReportProps {
  id?: number;
  year: number;
  q: number;
  title: string;
  file?: string;
}

interface AddFileProps {
  year: number;
  q: number;
}

const ActionContext = createContext();

const AddFile: React.FC<AddFileProps> = ({ year, q }) => {
  const { toggleAction } = useContext(ActionContext);

  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle the file change event
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFinance = async (year: string, q: string, file: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('q', q);
    formData.append('year', year);

    await postFinanceReport(formData);
  };

  // Handle the submission of the file
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      toggleAction();
      await uploadFinance(year.toString(), q.toString(), file);
      toggleAction();
      closeModal();
    }
  };

  return (
    <div>
      <Modal
        title={`Upload file to Q${q} ${year}`}
        isOpen={isModalOpen}
        close={closeModal}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center"
          style={{ width: 400 }}
        >
          <div className="form-group" style={{ marginRight: 20 }}>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
      <div className="d-flex justify-content-center" style={{ width: 85 }}>
        <button
          className="btn btn-primary btn-icon d-flex justify-content-center align-items-center"
          style={{ padding: '5px 10px' }}
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faFileUpload} fontSize={20} />
        </button>
      </div>
    </div>
  );
};

const EditFile: React.FC<{
  id: number | undefined;
  year: number;
  q: number;
}> = ({ id, year, q }) => {
  const { toggleAction } = useContext(ActionContext);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleFileDelete = async () => {
    const response = confirm(`Delete Finance Report Q${q} ${year}?`);
    if (response) {
      toggleAction();
      await deleteFinanceReport(id);
      toggleAction();
    }
  };

  const uploadFinance = async (id: number, file: string) => {
    const formData = new FormData();
    formData.append('file', file);

    await patchFinanceReport(id, formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      toggleAction();
      await uploadFinance(id, file);
      toggleAction();
      closeModal();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ width: 85 }}>
        <button
          className="btn btn-warning btn-icon d-flex justify-content-center align-items-center"
          style={{ padding: '5px 8.7px' }}
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faEdit} fontSize={20} />
        </button>
        <button
          className="btn btn-danger btn-icon d-flex justify-content-center align-items-center"
          style={{ padding: '5px 8.7px' }}
          onClick={handleFileDelete}
        >
          <FontAwesomeIcon icon={faTrash} fontSize={20} />
        </button>
      </div>

      <Modal
        title={`Update file Q${q} ${year}`}
        isOpen={isModalOpen}
        close={closeModal}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center"
          style={{ width: 400 }}
        >
          <div className="form-group" style={{ marginRight: 20 }}>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

const FinanceReport: React.FC<FinanceReportProps> = ({
  id,
  year,
  q,
  title,
  file,
}) => {
  return (
    <div className="d-flex align-items-center">
      <div
        className="finance-report-container w-100"
        style={{ marginRight: '1rem' }}
      >
        <h4>{title}</h4>
        {file ? (
          <a href={file} target="_blank">
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </a>
        ) : (
          <p></p>
        )}
      </div>
      <div className="mx-3">
        {file ? (
          <EditFile id={id} year={year} q={q} />
        ) : (
          <AddFile year={year} q={q} />
        )}
      </div>
    </div>
  );
};

interface FinanceData {
  id?: number;
  year: number;
  q: number;
  file?: string;
}

function Main() {
  const [isActionActive, setIsActionActive] = useState(false);

  const toggleAction = () => {
    setIsActionActive((prev) => !prev);
  };

  const [data, setData] = useState<FinanceData[] | []>([]);
  const options = [
    { name: '2020', value: 2020 },
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
    const fetchData = async () => {
      const responseData = await getFinanceReport(selectedOption.value);
      const yearlyData = completeQuarters(responseData, selectedOption.value);
      setData(yearlyData);
    };
    fetchData();
  }, [selectedOption, isActionActive]);

  return (
    <ContentWrapper title="Financial Report">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-11">
          <div
            className=" d-flex justify-content-end mb-4"
            style={{ marginRight: 30 }}
          >
            <Dropdown
              placeholder={selectedOption.name}
              options={options}
              onSelect={handleSelect}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <ActionContext.Provider value={{ toggleAction }}>
              {data.map((item) => {
                return (
                  <div
                    className="mb-4 flex-grow-1"
                    key={`${item.q}-${item.year}`}
                  >
                    <FinanceReport
                      id={item.id}
                      year={item.year}
                      q={item.q}
                      title={`Laporan Keuangan Q${item.q} ${selectedOption.name}`}
                      file={item.file}
                    />
                  </div>
                );
              })}
            </ActionContext.Provider>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Main;
