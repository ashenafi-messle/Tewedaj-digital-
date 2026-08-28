import type { CreditAgreement } from '../../types';

export interface CreateCreditInput {
  customerId: string;
  customerName: string;
  customerPhone: string;
  telebirrAccount: string;
  goodsDescription: string;
  totalAmount: number;
  dueDate?: string;
  terms?: string;
}

export interface CreditQuery {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface CreditPage {
  items: CreditAgreement[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreditService {
  list(query?: CreditQuery): Promise<CreditPage>;
  getById(id: string): Promise<CreditAgreement | null>;
  create(input: CreateCreditInput): Promise<CreditAgreement>;
}
