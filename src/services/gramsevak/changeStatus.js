import { handleApiError, httpClient, Result } from "../../utils";

const changeStatus = async (payload) => {
  try {
    const response = await httpClient.post(`/gramsevak/changestatus`, payload);
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default changeStatus;
