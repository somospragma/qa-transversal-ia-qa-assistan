import {FC} from 'react';
import './image.component.scss';
type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  figureClassName?: string;
  caption?: string;
  captionClassName?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
};

export const Image: FC<ImageProps> = ({
  src,
  alt,
  className = "",
  figureClassName = "",
  caption,
  captionClassName = "",
  width,
  height,
  onClick
}) => {
  return (
    <figure className={figureClassName}>
      <img 
        src={src} alt={alt} 
        className={className} width={width} 
        height={height} onClick={onClick} 
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
      {caption && <figcaption className={captionClassName}>{caption}</figcaption>}
    </figure>
  );
};

export default Image;
