import { Navigate, useLocation } from "react-router-dom";
import PinCode from "../../pages/PinCode";
import { useDispatch, useSelector } from "react-redux";
import { setPinMatched } from "../../redux/Actions";
import { pinMatchedSelector } from "../../redux/Selectors";


type LayoutProps = {
  component: React.ComponentType;
}

const Layout = ({ component: Component }: LayoutProps) => {
  const { pathname } = useLocation();

  const pinCode = localStorage.getItem("code");
  const pinMatched = useSelector(pinMatchedSelector);
  const dispatch = useDispatch()


  if (!pinCode) {
    return <Navigate to="/set-code" replace state={{ returnUrl: pathname }} />;
  }
  console.log(pathname);


  if (!pinMatched) {
    return <PinCode onSuccess={() => dispatch(setPinMatched(true))} />;
  }

  return <Component />;
};

export default Layout;