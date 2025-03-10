import { handleApiError, httpClient, Result } from "../../utils";

const updateDistrictAdmin = async (admin) => {
  try {
    const response = await httpClient.post(
      `/district/updateDistrictAdmin`,
      admin
    );
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default updateDistrictAdmin;
