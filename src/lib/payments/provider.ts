import { MockTelebirrProvider } from './mockTelebirrProvider';
import { PaymentProvider } from './types';

// Swap this factory to the approved Telebirr adapter when production credentials are available.
const mockProvider = new MockTelebirrProvider();

export const getPaymentProvider = (): PaymentProvider => mockProvider;
