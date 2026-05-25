import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { ConnectButton } from '@mysten/dapp-kit-react/ui';
import { dAppKit } from './dapp-kit';

export function DAppKitClientProvider({ children }: { children: React.ReactNode }) {
	return <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>;
}
export { ConnectButton };