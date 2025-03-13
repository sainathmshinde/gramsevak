import { handleApiError, httpClient, Result } from "../../utils";

const uploadGovernmentDoc = async (formData) => {
  try {
    const response = await httpClient.post(
      `/district/uploadGovernmentDoc`,
      formData
    );
    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default uploadGovernmentDoc;
