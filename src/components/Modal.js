import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById( 'modal' );
class Modal extends Component {
    constructor() {
      super();
      this.modal = document.createElement( 'div' );
      this.modal.classList.add("modal");
      this.modalContent = document.createElement( 'div' );
      this.modalContent.classList.add("modal-content");
      this.modal.appendChild( this.modalContent );

      this.wrapperRef = React.createRef();
      // use without arrow functions only
      // this.setWrapperRef = this.setWrapperRef.bind(this);
      // this.handleClickOutside = this.handleClickOutside.bind(this);
     }

   componentDidMount() {
      modalRoot.appendChild( this.modal );
      document.addEventListener("mousedown", this.handleClickOutside);
   }

   componentWillUnmount() {
    modalRoot.removeChild( this.modal );
    document.removeEventListener("mousedown", this.handleClickOutside);
 }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggleModal();
    }
  }

    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    render() {
        return createPortal(<div ref={this.setWrapperRef}>{this.props.children}</div>, this.modalContent);
    }
}

export default Modal;