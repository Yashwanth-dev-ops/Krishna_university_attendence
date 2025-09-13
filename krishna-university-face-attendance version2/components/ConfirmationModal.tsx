import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
            aria-modal="true"
            role="dialog"
            aria-labelledby="confirmation-title"
            onClick={onCancel}
        >
            <div
                className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 w-full max-w-md m-4 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
                     <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 id="confirmation-title" className="text-2xl font-bold text-white mt-4">{title}</h2>
                <p className="text-gray-400 mt-2">{message}</p>

                <div className="mt-8 flex flex-col sm:flex-row-reverse items-center justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto px-8 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full sm:w-auto px-8 py-2 rounded-md font-semibold text-gray-300 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};
