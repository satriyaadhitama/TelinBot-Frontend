import api from './api';

const getTopTrafficYearly = async (year: number) => {
  const response = await api.get(`/api/services/top-traffic?year=${year}`);
  return response.data;
};

const getTrafficCDN = async (category: string, length?: number) => {
  if (length) {
    const response = await api.get(
      `/api/services/traffic-cdn?category=${category}&length=${length}`
    );
    return response.data;
  } else {
    const response = await api.get(
      `/api/services/traffic-cdn?category=${category}`
    );
    return response.data;
  }
};

export { getTopTrafficYearly, getTrafficCDN };
