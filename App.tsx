
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { HistoryItem, PlacementRule, PromptComponent, LinterMessage, LinterMessageType, CustomSet, ThemedDatabase } from './types';
import Header from './components/Header';
import Workspace from './components/Workspace';
import Linter from './components/Linter';
import ComponentGrid from './components/ComponentGrid';
import HistoryPanel from './components/HistoryPanel';
import Onboarding from './components/Onboarding';
import { ARTIST_COMPONENTS, INSPIRATION_CATEGORIES } from './constants';

function App() {
  const [themedDatabase, setThemedDatabase] = useState<ThemedDatabase | null>(null);

  useEffect(() => {
    fetch('/themedComponentData.json')
      .then(res => res.json())
      .then(data => setThemedDatabase(data))
      .catch(err => console.error("Failed to load themed data:", err));
  }, []);
  const [promptText, setPromptText] = useLocalStorage<string>('promptArchitect_session', '');
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('promptArchitect_history', []);
  const [customSets, setCustomSets] = useLocalStorage<CustomSet[]>('promptArchitect_customSets', []);
  const [linterMessages, setLinterMessages] = useState<LinterMessage[]>([]);
  const [hasOnboarded, setHasOnboarded] = useLocalStorage<boolean>('promptArchitect_hasOnboarded', false);
  const [isSaveSetModalOpen, setIsSaveSetModalOpen] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);

  // Handler to inspire with a random component from a random category
  const handleInspire = () => {
    const catKeys = Object.keys(INSPIRATION_CATEGORIES);
    const randomCatKey = catKeys[Math.floor(Math.random() * catKeys.length)] as keyof typeof INSPIRATION_CATEGORIES;
    const randomComponent = INSPIRATION_CATEGORIES[randomCatKey][Math.floor(Math.random() * INSPIRATION_CATEGORIES[randomCatKey].length)];
    const parts = promptText.split(' --');
    const mainPrompt = parts[0].trim();
    const params = parts.slice(1).map(p => `--${p}`);
    const newPrompt = mainPrompt ? `${mainPrompt}, ${randomComponent}` : randomComponent;
    setPromptText([newPrompt, ...params].join(' ').trim());
  };

  // Handler to shuffle artist in the prompt
  const handleShuffle = () => {
    const parts = promptText.split(' --');
    let mainPrompt = parts[0];
    const params = parts.slice(1).map(p => `--${p}`);
    const currentArtists = ARTIST_COMPONENTS.filter(artist => mainPrompt.includes(artist));
    if (currentArtists.length > 0) {
      const artistToReplace = currentArtists[0];
      let newArtist = artistToReplace;
      while (newArtist === artistToReplace) {
        newArtist = ARTIST_COMPONENTS[Math.floor(Math.random() * ARTIST_COMPONENTS.length)];
      }
      mainPrompt = mainPrompt.replace(artistToReplace, newArtist);
      setPromptText([mainPrompt, ...params].join(' ').trim());
    } else {
      // If no artist, add one
      const newArtist = ARTIST_COMPONENTS[Math.floor(Math.random() * ARTIST_COMPONENTS.length)];
      mainPrompt = `${mainPrompt ? mainPrompt + ',' : ''} by ${newArtist}`;
      setPromptText([mainPrompt, ...params].join(' ').trim());
    }
  };


  // Linter Logic
  useEffect(() => {
    const newMessages: LinterMessage[] = [];
    const mainPrompt = promptText.split(' --')[0] || '';

    // Rule 1: Subject Count
    if (mainPrompt) {
        const subjects = mainPrompt.split(',').filter(s => s.trim() && !s.match(/by\s[\w\s]+/));
        if (subjects.length > 4) {
            newMessages.push({ type: LinterMessageType.Warning, message: 'More than 4 subjects can lead to blended concepts. Consider simplifying.' });
        }
    }

    // Rule 2: No Negation
    const noMatch = promptText.match(/--no\s+([\w\s]+)/);
    if (noMatch) {
      newMessages.push({ type: LinterMessageType.Suggestion, message: 'V7 performs better without --no. Try describing what you *do* want instead.', startIndex: noMatch.index, endIndex: (noMatch.index ?? 0) + noMatch[0].length });
    }
    
    // Rule 3: No Imperatives
    const imperatives = ['show', 'illustrate', 'create', 'generate', 'make'];
    const imperativeRegex = new RegExp(`\\b(${imperatives.join('|')})\\b`, 'gi');
    let match;
    while((match = imperativeRegex.exec(mainPrompt)) !== null) {
        newMessages.push({ type: LinterMessageType.Suggestion, message: `Imperative words like "${match[0]}" are ignored. Focus on nouns and adjectives.`, startIndex: match.index, endIndex: match.index + match[0].length });
    }

    // Rule 5: Parameter Validation
    const params = promptText.matchAll(/--(\w+)\s+([\d\.]+)/g);
    for (const paramMatch of params) {
        const [full, key, valueStr] = paramMatch;
        const value = parseFloat(valueStr);
        const startIndex = paramMatch.index ?? 0;
        const endIndex = startIndex + full.length;

        if(key === 's' && (value < 0 || value > 1000)) {
            newMessages.push({ type: LinterMessageType.Error, message: 'Stylize (--s) must be between 0 and 1000.', startIndex, endIndex});
        }
        if(key === 'c' && (value < 0 || value > 100)) {
            newMessages.push({ type: LinterMessageType.Error, message: 'Chaos (--c) must be between 0 and 100.', startIndex, endIndex});
        }
    }

    setLinterMessages(newMessages);
  }, [promptText]);


  const handleComponentClick = useCallback((component: PromptComponent, value?: string) => {
    let newText = component.text;
    if (component.accepts_value && value) {
        newText = `${component.param} ${value}`;
    }

    setPromptText(currentPrompt => {
        const parts = currentPrompt.split(' --');
        let mainPrompt = parts[0].trim();
        let params = parts.slice(1).map(p => `--${p}`);

        switch (component.placement) {
            case PlacementRule.PREFIX:
                return `${newText}, ${currentPrompt}`;
            case PlacementRule.MIDDLE:
                return mainPrompt ? `${mainPrompt}, ${newText} ${params.join(' ')}`.trim() : `${newText} ${params.join(' ')}`.trim();
            case PlacementRule.REPLACE_ALL:
                return newText;
            case PlacementRule.SUFFIX_REPLACEABLE_PARAM:
                const paramRegex = new RegExp(`${component.param} \\S+`);
                const existingParamIndex = params.findIndex(p => p.startsWith(component.param as string));
                if (existingParamIndex > -1) {
                    params[existingParamIndex] = newText;
                } else {
                    params.push(newText);
                }
                return `${mainPrompt} ${params.join(' ')}`.trim();
            case PlacementRule.SUFFIX_PARAM:
                 params.push(newText);
                 return `${mainPrompt} ${params.join(' ')}`.trim();
            default:
                return `${currentPrompt} ${newText}`;
        }
    });
  }, [setPromptText]);

  const handleSaveToHistory = () => {
      if (!promptText.trim()) return;
      const newItem: HistoryItem = {
          id: crypto.randomUUID(),
          prompt: promptText.trim(),
          timestamp: Date.now()
      };
      if (!history.some(h => h.prompt === newItem.prompt)) {
          setHistory([newItem, ...history]);
      }
  };

  const handleSaveSet = () => {
    if (!promptText.trim()) return;
    setIsSaveSetModalOpen(true);
  }

  const confirmSaveSet = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newSetName.trim()) return;
    const newSet: CustomSet = {
        id: crypto.randomUUID(),
        name: newSetName.trim(),
        prompt: promptText.trim()
    };
    setCustomSets([newSet, ...customSets]);
    setNewSetName('');
    setIsSaveSetModalOpen(false);
  }

  const handleApplySet = (prompt: string) => {
      setPromptText(prompt);
  }
  
  const handleRestoreFromHistory = (prompt: string) => {
      setPromptText(prompt);
      setIsHistoryPanelOpen(false);
  };
  
  const handleDeleteFromHistory = (id: string) => {
      setHistory(history.filter(item => item.id !== id));
  };
  
  const handleClearHistory = () => {
      setHistory([]);
  };

  // --- Advanced Strategies ---
  const handleSpecificityLadder = async () => {
    let subject = window.prompt('Enter a simple subject (e.g., "car", "tree"):');
    if (!subject || !themedDatabase) return;
    // Select one random component from each key role
    const roles = ['Medium & Style', 'Lighting', 'Composition & Framing', 'Detail'];
    const selected: string[] = [];
    roles.forEach(role => {
      const comps = themedDatabase[role];
      if (comps && comps.length > 0) {
        const comp = comps[Math.floor(Math.random() * comps.length)];
        selected.push(comp.text);
      }
    });
    // Random aspect ratio
    const aspectRatios = ["--ar 1:1", "--ar 16:9", "--ar 4:5", "--ar 2:3", "--ar 3:2", "--ar 9:16"];
    const ar = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    // Assemble prompt
    const prompt = `${subject}, ${selected.join(', ')} ${ar}`;
    setPromptText(prompt);
  };

  const handleConceptualForge = async () => {
    let baseSubject = window.prompt('Enter a base subject (e.g., "warrior"):');
    if (!baseSubject) return;
    let concept = window.prompt('Enter a material/style concept (e.g., "glass"):');
    if (!concept) return;
    // Heuristic attribute generation
    const conceptMap: Record<string, string[]> = {
      glass: ["translucent", "crystalline", "fragile filigree"],
      fire: ["fiery", "glowing", "dynamic", "embers"],
      nebula: ["cosmic", "swirling", "colorful", "ethereal"],
      water: ["fluid", "reflective", "rippling", "clear"],
      metal: ["shiny", "polished", "cold", "industrial"],
      wood: ["organic", "grainy", "natural", "warm"],
      stone: ["solid", "rough", "ancient", "weathered"],
      ice: ["frozen", "transparent", "sharp", "cool"],
      smoke: ["wispy", "mysterious", "soft", "drifting"],
      cloud: ["fluffy", "soft", "airy", "light"],
      gold: ["luxurious", "gleaming", "ornate", "rich"],
      // Add more as needed
    };
    const attributes = conceptMap[concept.toLowerCase()] || [concept];
    const attrString = attributes.join(', ');
    // Grammar: "a [baseSubject] with [attributes] parts"
    const aspectRatios = ["--ar 1:1", "--ar 16:9", "--ar 4:5", "--ar 2:3", "--ar 3:2", "--ar 9:16"];
    const ar = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    const prompt = `a ${baseSubject} with ${attrString} parts ${ar}`;

    setPromptText(prompt);
  };


  return (
    <>
      {!hasOnboarded && <Onboarding onComplete={() => setHasOnboarded(true)} onSkip={() => setHasOnboarded(true)} />}
      <div 
        className={`h-screen w-screen flex flex-col bg-base-bg text-gray-200 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHistoryPanelOpen ? 'scale-[0.99] blur-sm brightness-75 -translate-x-12 rounded-2xl overflow-hidden' : 'scale-100 blur-0 brightness-100'}`}
      >
        <Header />
        <main className="flex-grow flex flex-col min-h-0 p-4 gap-4">
          <div className="flex flex-col md:flex-row gap-4 h-2/5 min-h-[250px]">
      <Workspace
        promptText={promptText}
        setPromptText={setPromptText}
        onSave={handleSaveToHistory}
        onSaveSet={handleSaveSet}
        onInspire={handleInspire}
        onShuffle={handleShuffle}
        onSpecificityLadder={handleSpecificityLadder}
        onConceptualForge={handleConceptualForge}
        linterMessages={linterMessages}
      />
            <div id="linter-area" className="h-full">
                <Linter messages={linterMessages} />
            </div>
          </div>
          <div className="flex-grow h-3/5 min-h-[300px]">
             <ComponentGrid 
                onComponentClick={handleComponentClick} 
                customSets={customSets}
                onSetApply={handleApplySet}
            />
          </div>
        </main>
      </div>

      <HistoryPanel 
        history={history} 
        onRestore={handleRestoreFromHistory}
        onDelete={handleDeleteFromHistory}
        onClear={handleClearHistory}
        isOpen={isHistoryPanelOpen}
        setIsOpen={setIsHistoryPanelOpen}
      />
       {isSaveSetModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
           <form onSubmit={confirmSaveSet} className="bg-surface p-5 rounded-lg shadow-2xl border border-white/10 w-full max-w-sm">
               <label htmlFor="set-name" className="block text-base font-medium text-gray-300 mb-2">
                   Save Prompt as a Set
               </label>
               <input
                   id="set-name"
                   type="text"
                   value={newSetName}
                   onChange={(e) => setNewSetName(e.target.value)}
                   placeholder="e.g., 'Cinematic Portrait Style'"
                   className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-accent focus:outline-none"
                   autoFocus
               />
               <div className="mt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsSaveSetModalOpen(false)} className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white font-semibold">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm bg-primary-accent hover:bg-indigo-500 rounded-md text-white font-semibold transition-colors">Save Set</button>
               </div>
           </form>
        </div>
      )}
    </>
  );
}

export default App;