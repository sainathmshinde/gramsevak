import { handleApiError, httpClient, Result } from "@/utils";

const getgramsevakList = async (searchTerm, statusName) => {
  try {
    const response = await httpClient.get(
      `/gramsevak/getgramsevaklist?serachTerm=${searchTerm}&status=${statusName}`
    );
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default getgramsevakList;
