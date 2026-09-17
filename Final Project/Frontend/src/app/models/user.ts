export interface User {
  _id: string;
  name: string;
  email: string;
  role: "guest" | "host";
  phone?: string;
  avatar?: string;
}
