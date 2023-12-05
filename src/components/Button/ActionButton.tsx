import { Tooltip } from "@nextui-org/react";
import {
  ArrowDown2,
  ArrowUp2,
  Edit,
  EmojiHappy,
  Send,
  Sun1,
  Trash,
} from "iconsax-react";
import React from "react";

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
      return "Upload";
    default:
      return "";
  }
}

function ActionButton({
  actionIcon,
  onClickFunction,
}: {
  actionIcon: string;
  onClickFunction: () => void;
}) {
  const iconMap: { [key: string]: React.ReactNode } = {
    Trash: <Trash size="16" className="m-1" />,
    Edit: <Edit size="16" className="m-1" />,
    ArrowDown2: <ArrowDown2 size="16" className="m-1" />,
    ArrowUp2: <ArrowUp2 size="16" className="m-1" />,
    Send: <Send size="16" className="m-1" />,
    EmojiHappy: (
      <EmojiHappy
        className="self-center mr-5"
        size="22"
        color="#A1A1AA"
        variant="Bold"
      />
    ),
    Default: <Sun1 size="16" className="m-1" />,
  };

  const icon = iconMap[actionIcon] || iconMap.Default;
  return (
    <Tooltip content={getTooltipContent(actionIcon)} offset={10}>
      {React.cloneElement(icon as React.ReactElement, {
        onClick: onClickFunction,
      })}
    </Tooltip>
  );
}

export default ActionButton;
