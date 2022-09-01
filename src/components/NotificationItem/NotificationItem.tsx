import { notification } from "antd";
import React, { useEffect } from "react";

interface NotificationItemProps {
  message: string;
  description: string;
  isError: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ message, description, isError }) => {
  useEffect(() => {
    isError &&
      notification.error({
        message: message,
        description: description,
        duration: 2,
      });
  }, [isError]);

  return <></>;
};

export default NotificationItem;
