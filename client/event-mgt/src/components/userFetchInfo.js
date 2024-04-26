import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const UserInfoFetcher = ({ token }) => {
  const { loginUser } = useContext(AuthContext);
  const { data, isPending, error } = useFetch(
    token ? "http://localhost:5000/user/info" : null,
    token
  );

  useEffect(() => {
    if (data) {
      loginUser(data);
    }
  }, [data, loginUser]);

  return null;
};

export default UserInfoFetcher;
