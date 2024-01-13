import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeBrushSize, changeColor } from "@/slice/toolboxSlice";
import cx from "classnames";

const Toolbox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOptions =
    activeMenuItem === MENU_ITEMS.PENCIL || MENU_ITEMS.ERASER;

  const dispatch = useDispatch();

  const handleChangeColor = (color) => {
    dispatch(changeColor({ item: activeMenuItem, color: color }));
  };

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  const Stroke = (
    <div className={styles.toolItem}>
      <h4 className={styles.toolText}>Stroke Color</h4>
      <div className={styles.itemContainer}>
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.BLACK,
          })}
          style={{ backgroundColor: COLORS.BLACK }}
          onClick={() => handleChangeColor(COLORS.BLACK)}
        />
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.BLUE,
          })}
          style={{ backgroundColor: COLORS.BLUE }}
          onClick={() => handleChangeColor(COLORS.BLUE)}
        />
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.GREEN,
          })}
          style={{ backgroundColor: COLORS.GREEN }}
          onClick={() => handleChangeColor(COLORS.GREEN)}
        />
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.ORANGE,
          })}
          style={{ backgroundColor: COLORS.ORANGE }}
          onClick={() => handleChangeColor(COLORS.ORANGE)}
        />
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.PURPLE,
          })}
          style={{ backgroundColor: COLORS.PURPLE }}
          onClick={() => handleChangeColor(COLORS.PURPLE)}
        />
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.RED,
          })}
          style={{ backgroundColor: COLORS.RED }}
          onClick={() => handleChangeColor(COLORS.RED)}
        />
        <div
          className={cx(styles.colorBox, {
            [styles.active]: color == COLORS.YELLOW,
          })}
          style={{ backgroundColor: COLORS.YELLOW }}
          onClick={() => handleChangeColor(COLORS.YELLOW)}
        />
      </div>
    </div>
  );

  const Brush = (
    <div className={styles.toolItem}>
      <h4 className={styles.toolText}>Brush Size </h4>
      <div className={styles.itemContainer}>
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={size}
          onChange={updateBrushSize}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOptions && Stroke} {showBrushToolOptions && Brush}
    </div>
  );
};

export default Toolbox;
