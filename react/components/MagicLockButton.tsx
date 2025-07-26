import React, { useState } from "react";
import { Button, ButtonProps } from "@arco-design/web-react";
export interface MagicLockButtonProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}
const MagicLockButton: React.FC<MagicLockButtonProps> = ({
  onClick,
  children,
  ...rest
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (internalLoading) return;
    const result = onClick?.(e);
    if (result && typeof result.then === "function") {
      setInternalLoading(true);
      try {
        await result;
      } finally {
        setInternalLoading(false);
      }
    }
  };
  return (
    <Button {...rest} loading={internalLoading} onClick={handleClick}>
      {" "}
      {children}{" "}
    </Button>
  );
};
export default MagicLockButton;
