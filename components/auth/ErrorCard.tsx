import React from "react";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      linkTo="login"
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-red-500 text-3xl" />
      </div>
    </CardWrapper>
  );
};
