import { useMemo } from "react";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select as BPSelect } from "@blueprintjs/select";

const Select = ({
  id,
  intent,
  small,
  placeholder,

  options,
  optionRenderer,
  onChange,
  onClick,
  onOpening,
  value,
  loading,
}) => {

  const items = useMemo(() => {
    return options;
  }, [options]);
  const activeItem = useMemo(() => {
    return items.find(item => item.value === value);
  }, [value, items]);

  const itemRenderer = (item, { handleClick, modifiers }) => {
    return (
      <MenuItem
        key={item.value}
        active={modifiers.active}
        disabled={modifiers.disabled}
        onClick={handleClick}
        text={item.label}
      />
    )
  }

  return (
    <BPSelect
      filterable={false}
      items={items}
      activeItem={activeItem}
      itemRenderer={optionRenderer || itemRenderer}
      onItemSelect={onChange}
      popoverProps={{
        onOpening: onOpening,
        minimal: true
      }}
      noResults={(
        <MenuItem text={loading ? "Loading..." : "No Item"} />
      )}
    >
      <Button
        id={id}
        intent={intent}
        small={small}
        loading={loading}
        text={
          activeItem
            ? activeItem.label
            : (placeholder || "Select")
        }
        rightIcon="caret-down"
        onClick={onClick}
      />
    </BPSelect>
  )
}

export default Select;