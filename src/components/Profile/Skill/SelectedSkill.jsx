import React from "react";
import SkillImage from "../../Common/Image/SkillImage";
import { CATEGORYS_PATH } from "../../../constants/category";

export default function SelectedSkill({
  skill,
  isEditing,
  index,
  removeSkill,
}) {
  const handleClick = () => {
    if (!isEditing) return;

    removeSkill(index);
  };
  return (
    <li
      className={`relative ${
        isEditing ? "hover:opacity-60 cursor-pointer duration-150" : ""
      }`}
      onClick={handleClick}
    >
      <SkillImage size="lg" language={skill} imageUrl={CATEGORYS_PATH[skill]} />
    </li>
  );
}
