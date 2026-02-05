import api from "../axiosInstance";


interface LoginPayload {
    email: string;
    password: string;

}
interface SignupPayload {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role_id: number;
}
interface SignupResponse {
    message: string;

}
interface LoginResponse {
    message: string;

    token: string;

}
export const AuthService = {
    //هنا تضع بقية دوال authentication مثل logout و getProfile 
    signup: async (data: SignupPayload): Promise<SignupResponse> => {
        const res = await api.post('/register', data);
        return res.data;
    },
    login: async (data: LoginPayload): Promise<LoginResponse> => {
        const response = await api.post('/login', data);
        return response.data;
    }
}