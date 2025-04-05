import { fetchAgentById } from "@/app/api";

interface RouteParams {
  params: {
    id: string;
  };
}

export function GET(request: Request, { params }: RouteParams) {
  return fetchAgentById(params.id, request);
}
