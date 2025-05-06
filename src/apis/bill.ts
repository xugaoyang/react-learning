import { request } from '@/utils';

const billListApi = async () => {
  return await request.get('http://localhost:8888/user');
};

export { billListApi };
