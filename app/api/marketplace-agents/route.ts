import { fetchAllAgents } from "@/app/api";

export function GET(request: Request) {
  return fetchAllAgents(request);
}
