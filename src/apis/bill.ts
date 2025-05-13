import { request } from '@/utils';
import type { Bill } from '@/store/modules/bill';

const billListApi = async (): Promise<Bill[]> => {
  return await request.get<any, Bill[]>('http://localhost:8888/billList');
};

export { billListApi };
