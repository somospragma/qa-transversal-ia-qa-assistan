import './loading.component.scss';



export const Loading = () => {
  return (
    <div className="loading-modal">
      <div className="loading-modal__overlay">
        <div className="loading-modal__spinner" />
      </div>
    </div>
  );
};

export default Loading;
