import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
import cx from "classnames";

import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

//css modules
import styles from "./index.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const handleMenuClick = (menuItemName) => {
    dispatch(menuItemClick(menuItemName)); //menuItemClick: (state, action). pass parameter for action. i.e action.payload
  };

  const handleActionClick = (actionItemName) => {
    dispatch(actionItemClick(actionItemName));
  };

  return (
    <div className={styles.menuContainer}>
      <div
        //[styles.active] syntax is from classnames package
        //inspect browser html and css code to get better idea
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionClick(MENU_ITEMS.UNDO)}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionClick(MENU_ITEMS.REDO)}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FontAwesomeIcon icon={faDownload} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
