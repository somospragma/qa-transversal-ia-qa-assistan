import {FC, ReactNode} from 'react';
import './list.component.scss';
interface ListProps {
  items: (string | ReactNode)[];
  className?: string;
  itemClassName?: string;
  nestedLists?: ReactNode[];
}

export const List: FC<ListProps> = ({
  items = [],
  className = "",
  itemClassName = "",
  nestedLists = [],
}) => {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={index} className={`list__item ${itemClassName}`}>
          {item}
          {nestedLists[index] && nestedLists[index]}
        </li>
      ))}
    </ul>
  );
};

export default List;
