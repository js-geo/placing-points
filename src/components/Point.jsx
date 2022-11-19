import { useLabelContext } from "../App";

export const Point = ({ left, top, showLabel, ...props }) => {
  const labelContext = useLabelContext();

  const label = `${left}, ${top}`;

  const style = {
    marginLeft: `${left}px`,
    marginTop: `${top - 30}px`,
  };

  return (
    <div className={`Point-${labelContext}`} style={style}>
      {showLabel ? label : null} {props.children}
    </div>
  );
};
