import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addproduct } from "./action/index";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { modifyUser } from "./actions/index";
const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  @media (max-width: 768px) {
  }
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 400px;
    height: 700px;
  }
  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const DetailsModal = ({
  imageLink,
  showModal,
  setShowModal,
  description,
  setIsDetail,
  forShopping,
  offline,
  setOffline,
  price,
  name,
  setForShopping,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //  delDetails(0);
    }
  };
  const addProductToArray = (name, quantity, price, image, description) => {
    addproduct(dispatch)({
      name: name,
      quantity: quantity,
      price: price,
      image: image,
      description: description,
    });
    // modProduct(dispatch)({ index: 0, image: "lol" });

    //console.log(product_redux);
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        if (forShopping === false) {
          //  delDetails(0);
        } else {
          setShowModal(false);
        }
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );
  const product_redux = useSelector((state) => state);
  const dispatch = useDispatch();

  const str = localStorage.getItem("indexDetailView");
  let number = JSON.parse(str);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {!forShopping ? (
        <>
          {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <ModalWrapper showModal={showModal}>
                <ModalImg src={imageLink} alt="a" />
                <ModalContent>
                  <p>{description}</p>
                  {!offline ? (
                    <div>
                      <Button
                        onClick={() => {
                          //console.log(product_redux[number]);

                          let addNewElement = true;
                          for (let i = 0; i < product_redux.length; i++) {
                            if (product_redux[i].name === name) {
                              addNewElement = false;
                              product_redux[i].quantity += number;
                              break;
                            }
                          }
                          if (addNewElement === true) {
                            addProductToArray(
                              name,
                              number,
                              price,
                              imageLink,
                              description
                            );
                          }
                          modifyUser({
                            email: localStorage.getItem("currentUser"),
                            name: name,
                            quantity: number,
                            price: price,
                            image: imageLink,
                          });
                        }}
                        size={"large"}
                      >
                        {" "}
                        add to cart
                      </Button>
                    </div>
                  ) : null}
                </ModalContent>

                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => {
                    //  delDetails(0);
                    setIsDetail(-1);
                  }}
                />
              </ModalWrapper>
            </Background>
          ) : null}
        </>
      ) : (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalContent>
            {" "}
            <h1>hello</h1>
            <h2>lol</h2>
          </ModalContent>
          <CloseModalButton
            aria-label="Close modal"
            onClick={() => {
              //  delDetails(0);
              //  setIsDetail(-1);
              setShowModal(false);
            }}
          />
        </Background>
      )}
    </>
  );
};
