import { Result, Skeleton } from "antd";
import ContactList from "../../components/ContactList/ContactList";
import { useAppSelector } from "../../hooks/redux";
import { IContacts } from "../../model/IAccount";
import { UserAPI } from "../../store/API/UserAPI";
import "./Account.scss";

const Account = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { data, isLoading, isError, isSuccess } = UserAPI.useGetAccountQuery(user);
  // const [deleteAccount, { isError: isErrorAccount, isLoading: isLoadingAccaunt }] = UserAPI.useDeleteContactMutation();

  const deleteContact = (contact: IContacts) => {};
  const sendChanges = (contact: IContacts) => {};

  return (
    <div>
      <h1 className="account-title">Ваши контакты, {user}</h1>
      {isLoading && <Skeleton active />}
      {isError && <Result status="500" title="500" subTitle="Видимо что-то пошло не так..." />}
      {isSuccess && (
        <>
          <h2>После поиска...</h2>
          <ContactList contacts={data.contacts} deleteContact={deleteContact} sendChanges={sendChanges} />
        </>
      )}
    </div>
  );
};

export default Account;
