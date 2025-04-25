import { useState, type ReactNode, type ReactElement, useEffect } from "react";
import { UserType } from "../../services/types";
import { UserContext } from "./UserContext";

export function UserProvider({ children }: {children: ReactNode}): ReactElement {
  const [user, setUser] = useState<UserType | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as UserType;
        setUser(parsedUser);
      } catch (error) {
        console.error("User parsing failed", error);
      }
    }
  }, []);

  const loginUser = async (username:string, password:string) => {
      try {
          await fetch('https://dummyjson.com/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  username: username,
                  password: password,
              }),
          })
          .then(res => res.json())
          .then(data => {
            if (data.message) {
              throw new Error(data.message);
            } 
              setUser(data);
              localStorage.setItem("user", JSON.stringify(data))
          });
      } catch (error) {
        throw new Error(`loginUser failed: ${(error as Error).message}`)
      }
  }

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
