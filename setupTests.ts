import { expect, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import "@testing-library/jest-dom/vitest";
import { server } from './src/mocks/server';


expect.extend(matchers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


afterEach(()=>{
  vi.clearAllMocks();
  cleanup();
})