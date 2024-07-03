interface IProps {
  children?: React.ReactNode;
  onClose?: () => void;
}
export const Modal = ({ children, onClose }: IProps) => {
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden backdrop-blur-sm	  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
      onClick={onClose}
    >
      <div className="flex p-4 w-full h-full max-h-full justify-center items-center ">
        <div className="flex bg-white rounded-lg shadow  justify-center" onClick={(event)=> event.stopPropagation() }>
          {children}
        </div>
      </div>
    </div>
  );
};
