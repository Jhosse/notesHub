import React from "react";

interface ITagsLabelProps {
  tags: string[];
}

const TagsLabel = ({ tags }: ITagsLabelProps) => {
  return (
    <ul className="py-2 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <li
          key={`entry-tags-list-${index}`}
          className={`p-1 border rounded border-yellow-400`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagsLabel;
