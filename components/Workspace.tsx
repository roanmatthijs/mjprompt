import React, { useRef, useMemo, useState, useEffect } from 'react';
import { ClearIcon, CopyIcon, MagicWandIcon, SaveIcon, SaveSetIcon, ShuffleIcon, StrategyIcon, ChevronDownIcon } from './icons';
import CodeMirror, { EditorView, ViewUpdate } from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { LinterMessage, LinterMessageType } from '../types';
import { linter, lintGutter } from "@codemirror/lint";
import { ARTIST_COMPONENTS, STYLE_COMPONENTS } from '../constants';

// --- Syntax Highlighting Parser ---
const midjourneyLang = StreamLanguage.define({
  token: (stream) => {
    if (stream.match(/--[\w-]+/)) return "parameter";
    if (stream.match(/::/)) return "separator";
    if (stream.match(/\{|\}/)) return "permutation";
    if (stream.match(/\(\s*.*?\s*:\s*[\d\.]+\s*\)/)) {
        stream.backUp(1);
        while(stream.peek() !== '(' && stream.pos > 1) {
            stream.backUp(1);
        }
        return "weight";
    }

    const artistRegex = new RegExp(`\\b(${ARTIST_COMPONENTS.join('|').replace(/ /g, '\\s')})\\b`, 'i');
    if (stream.match(artistRegex)) return "artist";

    const styleRegex = new RegExp(`\\b(${STYLE_COMPONENTS.join('|').replace(/ /g, '\\s')})\\b`, 'i');
    if (stream.match(styleRegex)) return "style";

    if (stream.match(/[\w\s]+/)) {
      if (stream.string.split(' --')[0].trim().startsWith(stream.current())) {
         return "subject"
      }
    }

    stream.next();
    return null;
  },
});

const editorTheme = EditorView.theme({
  '&': {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
  },
  '.cm-content': {
    caretColor: '#6366F1',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#6366F1',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: 'none',
  },
   '&.cm-focused': {
    outline: 'none',
  },
  '.cm-tooltip': {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1F2937'
  }
});


interface WorkspaceProps {
  promptText: string;
  setPromptText: (text: string) => void;
  onSave: () => void;
  onSaveSet: () => void;
  onInspire: () => void;
  onShuffle: () => void;
  onSpecificityLadder: () => void;
  onConceptualForge: () => void;
  linterMessages: LinterMessage[];
}

const Workspace: React.FC<WorkspaceProps> = ({ promptText, setPromptText, onSave, onSaveSet, onInspire, onShuffle, onSpecificityLadder, onConceptualForge, linterMessages }) => {
  const editorRef = useRef<any>(null);
  const [weightPopover, setWeightPopover] = useState<{top: number, left: number, from: number, to: number} | null>(null);
  const [isStrategyMenuOpen, setIsStrategyMenuOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
  };

  const handleClear = () => {
    setPromptText('');
  };

  const dynamicLinter = linter(() => {
    return linterMessages.map(msg => ({
      from: msg.startIndex ?? 0,
      to: msg.endIndex ?? 0,
      severity: msg.type === LinterMessageType.Error ? "error" : msg.type === LinterMessageType.Warning ? "warning" : "info",
      message: msg.message,
    }));
  }, {
     delay: 0,
     markerFilter: (markers) => markers.filter(m => m.from !== m.to)
  });

  const handleWeightChange = (weight: number) => {
    if (!weightPopover || !editorRef.current) return;
    const view = editorRef.current.view;
    const selectedText = view.state.doc.sliceString(weightPopover.from, weightPopover.to);
    
    const cleanText = selectedText.replace(/^\(\s*(.*?)\s*:\s*[\d\.]+\s*\)$/, '$1');
    const newText = `(${cleanText}:${weight.toFixed(1)})`;

    view.dispatch({
        changes: { from: weightPopover.from, to: weightPopover.to, insert: newText },
        selection: { anchor: weightPopover.from + newText.length }
    });
    setWeightPopover(null);
  }

  const handleSelection = (update: ViewUpdate) => {
    const view = update.view;
    const selection = view.state.selection.main;
    
    if (selection.from !== selection.to) {
        const coords = view.coordsAtPos(selection.head);
        if (coords) {
          setWeightPopover({ top: coords.bottom, left: coords.left, from: selection.from, to: selection.to });
        }
    } else {
        setWeightPopover(null);
    }
  }

  return (
    <div id="workspace-area" className="flex-grow flex flex-col p-4 bg-surface/70 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wider text-gray-400">PROMPT WORKSPACE</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsStrategyMenuOpen(!isStrategyMenuOpen)}
              title="Prompt Strategies"
              className="btn-lift-glow flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-md text-white font-semibold transition-all duration-200"
            >
              <StrategyIcon />
              <span>Strategies</span>
              <ChevronDownIcon className={`transition-transform duration-200 ${isStrategyMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isStrategyMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-white/10 rounded-lg shadow-2xl z-50 p-2 animate-fade-in">
                <button onClick={() => { onInspire(); setIsStrategyMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md hover:bg-primary-accent hover:text-white transition-colors">
                  <span className="font-semibold">Thematic Prompt</span>
                  <span className="block text-xs text-gray-400">Generate a full, themed prompt.</span>
                </button>
                <button onClick={() => { onShuffle(); setIsStrategyMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md hover:bg-primary-accent hover:text-white transition-colors">
                  <span className="font-semibold">Shuffle Artist</span>
                  <span className="block text-xs text-gray-400">Swap the artist in your current prompt.</span>
                </button>
                <button onClick={() => { onSpecificityLadder(); setIsStrategyMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md hover:bg-primary-accent hover:text-white transition-colors">
                  <span className="font-semibold">Specificity Ladder</span>
                  <span className="block text-xs text-gray-400">Build a prompt with expert-level specificity.</span>
                </button>
                <button onClick={() => { onConceptualForge(); setIsStrategyMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md hover:bg-primary-accent hover:text-white transition-colors">
                  <span className="font-semibold">Conceptual Forge</span>
                  <span className="block text-xs text-gray-400">Combine a subject with advanced material/style concepts.</span>
                </button>
              </div>
            )}
          </div>
          <span className="w-px h-5 bg-white/10 mx-1"></span>
          <button onClick={handleCopy} title="Copy Prompt" className="p-2 text-gray-400 hover:text-white rounded-md icon-btn-hover"><CopyIcon /></button>
          <button onClick={handleClear} title="Clear Prompt" className="p-2 text-gray-400 hover:text-white rounded-md icon-btn-hover"><ClearIcon /></button>
          <span className="w-px h-5 bg-white/10 mx-1"></span>
          <button onClick={onSaveSet} className="btn-lift-glow flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-md text-white font-semibold transition-all duration-200"><SaveSetIcon /> Save as Set</button>
          <button onClick={onSave} className="btn-lift-glow flex items-center gap-2 px-4 py-2 text-sm bg-primary-accent hover:bg-indigo-500 rounded-md text-white font-semibold transition-all duration-200"><SaveIcon /> Save to History</button>
        </div>
      </div>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-md text-lg leading-relaxed resize-none relative workspace-focused-glow">
        <CodeMirror
            ref={editorRef}
            value={promptText}
            onChange={(val) => setPromptText(val)}
            extensions={[midjourneyLang, dynamicLinter, editorTheme, EditorView.lineWrapping, EditorView.updateListener.of(handleSelection)]}
            basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
                autocompletion: false,
            }}
            placeholder="Craft your V7 prompt here, or click components below..."
        />
        {weightPopover && (
          <div 
              className="absolute z-10 bg-[#1A1A1D] border border-white/10 rounded-lg shadow-xl p-2 flex items-center gap-2"
              style={{ top: `${weightPopover.top + 5}px`, left: `${weightPopover.left}px`}}
          >
              <span className="text-xs font-semibold text-gray-400">Weight:</span>
              <button onClick={() => handleWeightChange(0.5)} className="text-xs px-2 py-0.5 bg-black/20 hover:bg-white/10 rounded">0.5</button>
              <button onClick={() => handleWeightChange(1.5)} className="text-xs px-2 py-0.5 bg-black/20 hover:bg-white/10 rounded">1.5</button>
              <button onClick={() => handleWeightChange(2.0)} className="text-xs px-2 py-0.5 bg-black/20 hover:bg-white/10 rounded">2.0</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;