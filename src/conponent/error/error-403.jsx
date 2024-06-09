import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

function ErrorAdmin() {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you didn't admin."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back Home
          </Button>
        }
      />
    </>
  );
}

export default ErrorAdmin;
