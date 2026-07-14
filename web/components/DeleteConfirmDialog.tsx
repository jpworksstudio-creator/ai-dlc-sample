"use client";

type DeleteConfirmDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-4 shadow-lg">
        <h3 id="delete-dialog-title" className="text-base font-semibold text-gray-900">
          すべての家計データを削除しますか？
        </h3>
        <p id="delete-dialog-desc" className="text-sm text-gray-700">
          この操作は取り消せません。
        </p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={onConfirm}
            className="flex min-h-11 w-full items-center justify-center rounded-lg border-2 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            削除する
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
