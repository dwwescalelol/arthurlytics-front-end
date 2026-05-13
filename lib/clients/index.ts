import { mockClient } from "./mock";
import { cloudClient } from "./cloud";

export const client =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ? mockClient : cloudClient;
