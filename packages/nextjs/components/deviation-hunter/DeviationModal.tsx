"use client";

import { type FC, useEffect, useState } from "react";

interface DeviationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    assetPair: string;
    sources: string;
    deviation: {
      percentage: number;
      absolute: number;
    };
    timestamp: string;
  };
}

const DeviationModal: FC<DeviationModalProps> = ({ isOpen, onClose, data }) => {
  const [comment, setComment] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const words = comment.trim().split(/\s+/).filter(Boolean);
    setIsValid(words.length >= 3);
  }, [comment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-sm">
      <div className="modal-content bg-slate-50 rounded-xl w-full max-w-lg overflow-hidden transform transition-all duration-300 ease-out animate-modal-pop-in">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                You&apos;re a <span className="text-blue-600">Deviation Hunter!</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">Confirm the deviation you&apos;ve spotted and earn Merits.</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center my-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <svg
                className="text-blue-600"
                fill="currentColor"
                height="64"
                viewBox="0 0 256 256"
                width="64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M229.66,77.66l-48,48a8,8,0,0,1-11.32-11.32L188.69,96H132a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0v48h44.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,77.66ZM124,128a8,8,0,0,0-8,8v56H71.31l18.35-18.34a8,8,0,0,0-11.32-11.32l-48,48a8,8,0,0,0,0,11.32l48,48a8,8,0,0,0,11.32-11.32L71.31,192H116v56a8,8,0,0,0,16,0V136A8,8,0,0,0,124,128Z" />
              </svg>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-slate-100 rounded-md border border-slate-200">
              <span className="text-sm font-medium text-slate-600">Asset Pair:</span>
              <span className="text-sm font-semibold text-slate-800">{data.assetPair}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-100 rounded-md border border-slate-200">
              <span className="text-sm font-medium text-slate-600">Sources:</span>
              <span className="text-sm font-semibold text-slate-800">{data.sources}</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-amber-700">Deviation:</span>
                <span className="text-lg font-bold text-amber-600">{data.deviation.percentage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Absolute:</span>
                <span className="text-xs text-slate-700">${data.deviation.absolute.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-100 rounded-md border border-slate-200">
              <span className="text-sm font-medium text-slate-600">Timestamp:</span>
              <span className="text-sm font-semibold text-slate-800">{data.timestamp}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="userComments">
              Your Analysis (min. 3 words):
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="form-textarea w-full resize-none rounded-lg text-slate-700 border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 min-h-[100px] p-3 text-sm placeholder:text-slate-400"
              id="userComments"
              minLength={3}
              placeholder="Share your insights on this deviation..."
              required
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">
              Help us understand this deviation better. Your input is valuable!
            </p>
          </div>
        </div>

        <div className="bg-slate-100 px-6 py-4 sm:px-8 sm:py-5 border-t border-slate-200 flex flex-col sm:flex-row-reverse sm:items-center gap-3">
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg h-11 px-5 bg-blue-600 hover:bg-blue-700 text-slate-50 text-sm font-semibold leading-normal tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid}
            onClick={() => {
              // Handle submission
              console.log("Submitting deviation report with comment:", comment);
              onClose();
            }}
          >
            Confirm & Earn Merits
          </button>
          <button
            className="w-full sm:w-auto rounded-lg h-11 px-5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium leading-normal transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviationModal;
