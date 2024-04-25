import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faWeightHanging,
  faLayerGroup,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext.js";
import { WindowSize } from "../../Context/WindowContext.js";

export default function Sidebar() {
  const menu = useContext(Menu);
  const isopen = menu.isopen;
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;

  return (
    <div
      className="side-bar p-2"
      style={{
        left: windowSize < "768" ? (isopen ? 0 : "-100%") : 0,
        width: isopen ? "240px" : "fit-content",
      }}
    >
      <NavLink
        to={"users"}
        className="d-flex align-items-center gab-2 side-bar-link"
      >
        <FontAwesomeIcon
          icon={faUsers}
          style={{ padding: isopen ? "10px 8px 10px 15px" : "10px 4px" }}
        />
        <p className="m-2" style={{ display: isopen ? "block" : "none" }}>
          users
        </p>
      </NavLink>
      <NavLink
        to={"products"}
        className="d-flex align-items-center gab-2 side-bar-link"
      >
        <FontAwesomeIcon
          icon={faWeightHanging}
          style={{ padding: isopen ? "10px 8px 10px 15px" : "10px 4px" }}
        />
        <p className="m-2" style={{ display: isopen ? "block" : "none" }}>
          products
        </p>
      </NavLink>

      <NavLink
        to={"categories"}
        className="d-flex align-items-center gab-2 side-bar-link"
      >
        <FontAwesomeIcon
          icon={faLayerGroup}
          style={{ padding: isopen ? "10px 8px 10px 15px" : "10px 4px" }}
        />
        <p className="m-2" style={{ display: isopen ? "block" : "none" }}>
          categories
        </p>
      </NavLink>
      <NavLink
        to={"categories"}
        className="d-flex align-items-center gab-2 side-bar-link"
      >
        <FontAwesomeIcon
          icon={faBell}
          style={{ padding: isopen ? "10px 8px 10px 15px" : "10px 4px" }}
        />
        <p className="m-2" style={{ display: isopen ? "block" : "none" }}>
          Orders
        </p>
      </NavLink>
    </div>
  );
}
