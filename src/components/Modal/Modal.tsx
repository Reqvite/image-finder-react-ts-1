import { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalStyled } from "./Modal.styled";

const modalRoot: any = document.querySelector("#modal-root");

export interface ModalProps {
  toggleModal: (id?: number) => void;
  children: any;
}

export class Modal extends Component<ModalProps, {}> {
  componentDidMount(): void {
    window.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount(): void {
    window.removeEventListener("keydown", this.closeModal);
  }

  closeModal = (e: KeyboardEvent): void => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>{this.props.children}</ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
