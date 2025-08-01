import React from 'react';
import { LinterMessage, LinterMessageType } from '../types';
import { ErrorIcon, SuggestionIcon, WarningIcon, CheckIcon } from './icons';

interface LinterProps {
  messages: LinterMessage[];
}

const Linter: React.FC<LinterProps> = ({ messages }) => {

  const getIconAndColor = (type: LinterMessageType) => {
    switch(type) {
        case LinterMessageType.Error:
            return { icon: <ErrorIcon />, color: 'text-red-400' };
        case LinterMessageType.Warning:
            return { icon: <WarningIcon />, color: 'text-amber-400' };
        case LinterMessageType.Suggestion:
            return { icon: <SuggestionIcon />, color: 'text-blue-400' };
        default:
            return { icon: <ErrorIcon />, color: 'text-gray-500' };
    }
  }

  return (
    <div className="w-80 flex-shrink-0 p-4 bg-surface/70 rounded-lg flex flex-col h-full">
      <h2 className="text-sm font-semibold tracking-wider text-gray-400 mb-4 flex-shrink-0">REAL-TIME LINTER</h2>
      <div className="flex-grow space-y-2.5 overflow-y-auto pr-1 -mr-2">
        {messages.length === 0 && (
            <div className="text-center text-gray-500 pt-8 flex flex-col items-center h-full justify-center">
                <CheckIcon className="text-green-500 animate-check-icon" />
                <p className="font-semibold text-gray-300 mt-4">Prompt looks good!</p>
                <p className="text-sm text-gray-500">No issues detected.</p>
            </div>
        )}
        {messages.map((msg, index) => {
            const { icon, color } = getIconAndColor(msg.type);
            return (
                <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                    <div className={`flex-shrink-0 mt-0.5 ${color}`}>
                        {icon}
                    </div>
                    <p className="text-gray-300 text-[15px] leading-relaxed">{msg.message}</p>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Linter;