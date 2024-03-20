import React from "react";
import {
  BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseEther } from "viem";

export default function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const account = useAccount();

  const address = account?.address;

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get("address");
    const value = formData.get("value");
    sendTransaction({ to: address, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "500px",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "0.5rem",
        margin: "1rem",
      }}
    >
      <input
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
        }}
        name="address"
        defaultValue="0x62a938990E6934a825897e2319EEb355d4D2e910"
        required
      />
      <input
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
        }}
        name="value"
        defaultValue="0.000005"
        required
      />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Send"}
      </button>
      {hash && (
        <div
          style={{
            color: "green",
            backgroundColor: "rgba(25, 100, 250, 0.1)",
            border: "1px solid green",
            padding: "1rem",
            borderRadius: "0.5rem",
            margin: "1rem",
          }}
        >
          Transaction Hash: {hash}
        </div>
      )}

      {error && (
        <div
          style={{
            color: "red",
            //white
            backgroundColor: "rgba(25, 100, 250, 0.1)",
            border: "1px solid red",
            padding: "1rem",
            borderRadius: "0.5rem",
            margin: "1rem",
          }}
        >
          Error:{" "}
          {error instanceof BaseError ? error.shortMessage : error.message}
        </div>
      )}
    </form>
  );
}
