import React, { useState } from "react";
import { connect } from "react-redux";
import {
  changeName,
  changeNickName,
  changeEmail,
  changePassword,
  changePasswordCheck,
} from "../../reducers/userInfoReducer";

const UserInfo = ({ title, name, type, placeholder, ...rest }: any) => {
  const [validInput, setValidInput] = useState<boolean>(false);
  const handleChangeInputValue = (e: any) => {
    const targetName = e.target.name;
    const targetData = e.target.value;

    if (targetName === "name") {
      rest.modifyName(targetData);
      if (targetData !== "") {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    } else if (targetName === "nickName") {
      rest.modifyNickName(targetData);
      if (targetData !== "") {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    } else if (targetName === "email") {
      rest.modifyEmail(targetData);
      if (targetData !== "") {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    } else if (targetName === "password") {
      rest.modifyPassword(targetData);
      if (targetData !== "") {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    } else {
      rest.modifyPasswordCheck(targetData);
      if (targetData !== "") {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    }
  };

  return (
    <div className="userInfo__contain">
      <p
        className={
          validInput ? "userInfo__title-extend" : "userInfo__title-basic"
        }
      >
        {title}
      </p>
      <input
        name={name}
        type={type}
        className={
          validInput ? "userInfo__input-extend" : "userInfo__input-basic"
        }
        placeholder={placeholder}
        onChange={handleChangeInputValue}
      />
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//   return { userInfo: state };
// };

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyName: (name: string) => dispatch(changeName(name)),
    modifyNickName: (nickName: string) => dispatch(changeNickName(nickName)),
    modifyEmail: (email: string) => dispatch(changeEmail(email)),
    modifyPassword: (pw: string) => dispatch(changePassword(pw)),
    modifyPasswordCheck: (pw: string) => dispatch(changePasswordCheck(pw)),
  };
};

export default connect(null, mapDispatchToProps)(UserInfo);
