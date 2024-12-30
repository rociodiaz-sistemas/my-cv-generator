import { ModalBox } from "./ModalBox";

export const ModalWrapper: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => (
  <ModalBox isModalOpen={isOpen} handleCloseModal={onClose}>
    {children}
  </ModalBox>
);
