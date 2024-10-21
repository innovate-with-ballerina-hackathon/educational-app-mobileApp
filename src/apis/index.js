import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "../helpers/constants";
import axios from "axios";


export const useDataProvider = () => {
    return {
        "articles":{
            "get": () => useQuery({
                queryKey: ["articles"],
                queryFn: async () => {
                    const response = await axios.get(`${BACKEND_URL}/articles`);
                    return response.data;
            }
        })
        }
    }
}