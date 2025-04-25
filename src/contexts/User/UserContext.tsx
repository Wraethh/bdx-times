import { createContext, useContext } from "react";
import { UserType } from "../../services/types";

type UserContextType = {
    user?: UserType | null,
    loginUser?: (username: string, password: string) => Promise<void>,
    logoutUser?: () => void,
}

export const UserContext = createContext<UserContextType>({});
export const useUser = () => useContext(UserContext);