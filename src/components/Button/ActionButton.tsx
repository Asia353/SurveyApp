import { Tooltip } from "@nextui-org/react";
import {
  ArrowDown2,
  ArrowUp2,
  Diagram,
  Edit,
  EmojiHappy,
  Icon,
  Link2,
  Send,
  Trash,
} from "iconsax-react";
import React, { ComponentPropsWithoutRef } from "react";

const IconMap = {
  Trash,
  Edit,
  ArrowDown2,
  ArrowUp2,
  Send,
  Link2,
  Diagram,
  EmojiHappy,
};

function getTooltipContent(actionIcon: string) {
  switch (actionIcon) {
    case "Trash":
      return "Delete";
    case "Edit":
      return "Edit";
    case "ArrowDown2":
      return "Details";
    case "ArrowUp2":
      return "Hide details";
    case "Send":
      return "Publish";
    case "Link2":
      return "Copy link";
    case "Diagram":
      return "Show statistics";
    default:
      return "";
  }
}

function ActionButton({
  actionIcon,
  onClickFunction,
  tooltipValue,
  iconSize = 16,
  iconProps = {},
}: {
  actionIcon: keyof typeof IconMap;
  onClickFunction: () => void;
  iconSize?: number;
  iconProps?: Partial<ComponentPropsWithoutRef<Icon>>;
  tooltipValue?: string;
}) {
  const IconComp = IconMap[actionIcon];
  return (
    <Tooltip
      content={!tooltipValue ? getTooltipContent(actionIcon) : tooltipValue}
      offset={10}
    >
      <IconComp
        size={iconSize}
        onClick={onClickFunction}
        className="m-1"
        {...iconProps}
      />
    </Tooltip>
  );
}

export default ActionButton;
