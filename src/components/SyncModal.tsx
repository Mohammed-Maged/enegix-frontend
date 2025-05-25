import type { FC } from "react";

interface SyncModalProps {
  visible: boolean;
  message?: string;
}

const SyncModal: FC<SyncModalProps> = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="text-lg font-semibold">{message || "Syncing users..."}</p>
      </div>
    </div>
  );
};

export default SyncModal;
