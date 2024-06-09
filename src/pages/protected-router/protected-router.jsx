import { useSelector } from "react-redux";
import Error404 from "../../conponent/error/error-404";
import { Navigate } from "react-router-dom";

const RouterAdmin = (props) => {
  const isAdmin = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const roleUser = user.role;
  if (isAdmin && roleUser === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <Error404 />;
  }
};
const Protectedrouter = (props) => {
  const isAuthentication = useSelector(
    (state) => state.account.isAuthentication
  );

  return (
    <>
      {isAuthentication ? (
        <RouterAdmin>{props.children}</RouterAdmin>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};
export default Protectedrouter;
