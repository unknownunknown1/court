import React from "react";
import styled from "styled-components/macro";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Icon } from "antd";
import { Button } from "../adapters/antd";
import { getSideChainParams, isSupportedSideChain } from "../api/side-chain";
import TokenSymbol from "./token-symbol";
import useChainId from "../hooks/use-chain-id";

const { useDrizzle } = drizzleReactHooks;

export default function GetSideChainPnkButton({ size, type, icon, className, ...rest }) {
  const { drizzle } = useDrizzle();
  const chainId = useChainId(drizzle.web3);
  const isSupported = isSupportedSideChain(chainId);
  const { bridgeAppUrl } = isSupported ? getSideChainParams(chainId) : {};

  return isSupported ? (
    <StyledButton
      size={size}
      type={type}
      href={bridgeAppUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      {...rest}
    >
      <span>
        Get <TokenSymbol chainId={chainId} token="xPNK" />
      </span>
      {icon ? <Icon type={icon} /> : null}
    </StyledButton>
  ) : null;
}

GetSideChainPnkButton.propTypes = Button.propTypes;

GetSideChainPnkButton.defaultProps = {
  size: "large",
  type: "secondary",
};

const StyledButton = styled(Button)`
  box-shadow: none;
  text-shadow: none;
`;
