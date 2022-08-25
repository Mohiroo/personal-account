import { Empty, Skeleton } from "antd";
import React from "react";
import ContactList from "../../components/ContactList/ContactList";
import { useAppSelector } from "../../hooks/redux";
import { UserAPI } from "../../store/API/UserAPI";
import "./Account.scss";

const Account = () => {
  const { name } = useAppSelector((state) => state.authReducer);
  const { data, isLoading, isError, isSuccess } =
    UserAPI.useGetAccountQuery(name);

  return (
    <div>
      <h1>Ваши контакты, {name}</h1>
      {isLoading && <Skeleton active />}
      {isError && <h1>ОШИБКА</h1>}
      {isSuccess && (
        <>
          <h2>После поиска...</h2>
          {data?.contacts.length !== 0 ? (
            <Empty description={'Контактов нет :('} />
          ) : (
            <ContactList/>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
