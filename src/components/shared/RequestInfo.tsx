import { useEffect, useState } from "react";
import { tesloApi } from "../../api/teslo.api";

export const RequestInfo = () => {
  const [info, setInfo] = useState();
  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then(({ data }) => setInfo(data))
      .catch((e) => setInfo(e));
  }, []);
  return (
    <>
      <h2>Informacion</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};
