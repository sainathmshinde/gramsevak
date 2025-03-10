import { handleApiError, httpClient, Result } from "@/utils";

const getBlocksByDistrictId = async (districtId) => {
  try {
    const response = await httpClient.get(
      `/preset/getblocksbydistrictid?${districtId}`
    );
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default getBlocksByDistrictId;
