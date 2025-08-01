import React from 'react';
import { HistoryItem } from '../types';
import { DeleteIcon, HistoryIcon, RestoreIcon } from './icons';

interface HistoryPanelProps {
    history: HistoryItem[];
    onRestore: (prompt: string) => void;
    onDelete: (id: string) => void;
    onClear: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore, onDelete, onClear, isOpen, setIsOpen }) => {
    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="fixed bottom-6 right-6 z-50 bg-primary-accent hover:bg-indigo-500 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-accent/50"
                aria-label="Toggle History Panel"
            >
                <HistoryIcon />
            </button>
            <div 
                className={`fixed top-0 right-0 h-full bg-surface/80 backdrop-blur-lg shadow-2xl z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full max-w-lg border-l border-white/10 flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-xl font-bold">Prompt History</h2>
                    <div className="flex items-center gap-2">
                        {history.length > 0 && 
                            <button onClick={onClear} className="text-sm text-gray-400 hover:text-red-400 transition-colors">Clear All</button>
                        }
                        <button onClick={() => setIsOpen(false)} className="text-3xl text-gray-400 hover:text-white transition-colors leading-none">&times;</button>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto p-4">
                    {history.length === 0 ? (
                        <div className="text-center text-gray-500 pt-16 flex flex-col items-center justify-center h-full">
                           <HistoryIcon />
                            <p className="text-lg mt-4">No saved prompts yet.</p>
                            <p className="text-sm">Click "Save to History" in the workspace to save your creations.</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {history.slice().reverse().map(item => (
                                <li key={item.id} className="group bg-black/20 p-3 rounded-lg flex justify-between items-start gap-3 border border-transparent hover:border-white/10 transition-colors">
                                    <p className="text-base text-gray-300 break-words flex-grow pr-2">{item.prompt}</p>
                                    <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button onClick={() => onRestore(item.prompt)} title="Restore" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"><RestoreIcon /></button>
                                        <button onClick={() => onDelete(item.id)} title="Delete" className="p-2 text-red-500 hover:text-red-400 hover:bg-white/10 rounded-md transition-colors"><DeleteIcon /></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistoryPanel;