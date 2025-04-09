import {
  GET as get,
  POST as post,
  PUT as put,
  DELETE as del,
} from "../utils/http";
import { useHeaders } from "./useHeaders";

export const useHttp = () => {
  const headers = useHeaders();

  const GET = async <T>(url: string): Promise<T> => {
    return get<T>(url, headers);
  };

  const POST = async <T>(url: string, body: T): Promise<T> => {
    return post<T>(url, body, headers);
  };

  const PUT = async <T>(url: string, body: T): Promise<T> => {
    return put<T>(url, body, headers);
  };

  const DELETE = async (url: string): Promise<void> => {
    return del(url, headers);
  };

  return { GET, POST, PUT, DELETE };
};
