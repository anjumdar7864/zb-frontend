import { apiCaller } from "../../middleware/api-caller";


export const commonAPICall = async (method, url, payload , ) => {
  const myJson = await apiCaller({ method, url, data:payload });
  if ((myJson && myJson?.status == "200") || myJson?.status == "201") {
   
    return { data:myJson?.data, isError: false, message: "" , sessionExpired: false };
  } else if ((myJson && myJson?.status == "401") || myJson?.status == "401"){
    const message = myJson?.response?.data?.message ?? "Session expired";

    return { data: [], isError: true, message , sessionExpired: true};
  } else{
    const message = myJson?.response?.data?.message ?? "Something went wrong";
    return { data: [], isError: true, message , sessionExpired: false};
  }
};