// configuration values that might change per deployment
export const DEMO_CREDENTIALS = {
  email: import.meta.env.VITE_DEMO_EMAIL || "user1@example.com",
  password: import.meta.env.VITE_DEMO_PASSWORD || "password123",
};
