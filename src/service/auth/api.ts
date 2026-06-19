import API from "../api";
import type { LoginSchema } from "./form";
import type { AuthResponse, RefreshToken } from "./type";

export const postAuth = async (data: LoginSchema) => {
  try {
    const response = await API.post("https://dummyjson.com/auth/login", data);

    if (response.status === 200) {
      return response.data as AuthResponse;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postRefreshToken = async (refreshToken: string) => {
  try {
    const response = await API.post("https://dummyjson.com/auth/refresh", {
      refreshToken,
    });

    if (response.status === 200) {
      return response.data as RefreshToken;
    }
  } catch (error) {
    console.error(error);
  }
};