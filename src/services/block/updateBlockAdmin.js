import { handleApiError, httpClient, Result } from "../../utils";

const updateBlockAdmin = async (admin) => {
  try {
    const response = await httpClient.post(`/block/updateBlockAdmin`, admin);
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default updateBlockAdmin;
