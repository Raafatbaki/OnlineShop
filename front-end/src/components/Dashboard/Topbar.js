import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
export default function Topbar() {
  const menu = useContext(Menu);
  const setIsopen = menu.setIsopen;
  return (
    <div className="top-bar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <h3> E-commerce</h3>
        <FontAwesomeIcon
          onClick={() => setIsopen((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
      </div>
    </div>
  );
}
