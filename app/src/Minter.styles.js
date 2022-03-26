import styled from "styled-components";

export const MinterWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .minter_header_info {
      color: ${(props) => props.theme.text};
      font-weight: 500;
      b {
        color: ${(props) => props.theme.titleText};
        margin-left: 1rem;
      }
    }
    .minter_wallet_button {
      font-family: Inter;
      cursor: pointer;
      padding: 0.5rem 0.5rem;
      font-size: 16px;
      border-radius: 10px;
      outline: 0;
      border: 1px solid ${(props) => props.theme.titleText};
      background: 0;
      color: ${(props) => props.theme.text};
      font-weight: 500;
      :hover {
        background: ${(props) => props.theme.titleText};
        color: ${(props) => props.theme.bg};
      }
    }
  }

  .minter_body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h1 {
      color: ${(props) => props.theme.titleText};
      font-size: 56px;
      margin-bottom: 0.5rem;
      @media (max-width: 800px) {
        font-size: 32px;
        margin-bottom: 1rem;
      }
    }
    p {
      color: ${(props) => props.theme.text};
      margin-bottom: 2rem;
      @media (max-width: 800px) {
        /* font-size: 14px; */
      }
    }
    h2 {
      color: ${(props) => props.theme.titleText};
      margin-bottom: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;

      .minter_form_input {
        border: 1px solid ${(props) => props.theme.titleText};
        display: flex;
        border-radius: 12px;
        gap: 1rem;
        transition: all 0.15s ease-in;
        overflow: hidden;
        :focus-within {
          box-shadow: 0px 0px 6px 0px #00dacb;
        }
        input {
          font-family: Inter;
          color: ${(props) => props.theme.text};
          background: 0;
          outline: 0;
          border: 0;
          padding: 0.25rem 0.5rem;
          margin: 0.25rem;
          font-size: 18px;
          font-weight: 500;
          ::placeholder {
            color: gray;
          }
        }
        button {
          cursor: pointer;
          padding: 0.5rem 0.5rem;
          font-size: 16px;
          border: 0;
          outline: 0;
          border-left: 1px solid ${(props) => props.theme.titleText};
          background: ${(props) => props.theme.titleText};
          color: ${(props) => props.theme.bg};
          font-weight: 600;
          transition: all 0.1s ease-in;

          :disabled {
            color: white;
            pointer-events: none;
            border-color: ${(props) => props.theme.titleText};
            background: 0;
          }
        }
      }
    }
    .minter_message {
      font-size: 16px;
    }
    .prices_list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 0.5rem;
      column-gap: 1rem;
      div {
        :nth-of-type(odd) {
          color: white;
        }
        :nth-of-type(even) {
          color: ${(props) => props.theme.titleText};
          font-weight: 500;
        }
      }
    }
    .nft_images {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      flex-direction: column;
      h2 {
        font-size: 32px;
        color: ${(props) => props.theme.titleText};
        margin-bottom: 2rem;
      }
      .nft_images_grid {
        width: 100%;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        align-items: center;
        img {
          justify-self: center;
        }
      }
    }
  }
`;
