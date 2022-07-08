import React, { useState, useEffect } from "react";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <div className="error">{message}</div>;
};

export default ErrorMessage;
