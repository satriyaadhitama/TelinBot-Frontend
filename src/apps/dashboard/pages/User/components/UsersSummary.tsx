import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';

interface CardProps {
  title: string;
  total: number;
}

const SummaryCard: React.FC<CardProps> = ({ title, total }) => {
  return (
    <div className="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
      <ContentWrapper>
        <div className="d-flex align-items-center">
          <div className="mx-4">
            <FontAwesomeIcon
              icon={faUser}
              fontSize={45}
              className="text-color-primary"
            />
          </div>
          <div className="card-body">
            <h6 className="card-title fw-bold fs-md-1 mb-1">{title}</h6>
            <p className="card-text display-6">{total}</p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

function UsersSummary() {
  return (
    <div className="">
      <div className="row">
        <SummaryCard title="Current Online" total={5} />
        <SummaryCard title="Today Activity" total={30} />
        <SummaryCard title="Available Users" total={100} />
      </div>
    </div>
  );
}

export default UsersSummary;
