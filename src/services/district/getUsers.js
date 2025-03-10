import { handleApiError, httpClient, Result } from "@/utils";

const getUsers = async () => {
  try {
    const response = await httpClient.get(`/district/getusers`);
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default getUsers;
