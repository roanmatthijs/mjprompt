
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PromptComponent, PlacementRule, CustomSet } from '../types';
import { OTHER_CATEGORIES, PARAMETER_SUB_CATEGORIES, PROMPT_COMPONENTS, PARAMETER_CATEGORIES_SET } from '../constants';
import { InfoIcon, ChevronDownIcon } from './icons';

interface ComponentGridProps {
  onComponentClick: (component: PromptComponent, value?: string) => void;
  onSetApply: (prompt: string) => void;
  customSets: CustomSet[];
}

const ComponentGrid: React.FC<ComponentGridProps> = ({ onComponentClick, customSets, onSetApply }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(OTHER_CATEGORIES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customValueInput, setCustomValueInput] = useState<{ component: PromptComponent; target: EventTarget & HTMLButtonElement } | null>(null);
  const [customValue, setCustomValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isParametersExpanded, setIsParametersExpanded] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollTop = 0;
    }
  }, [activeCategory]);
  
  const { componentsToRender, categoriesWithResults, firstCategoryWithResults } = useMemo(() => {
    if (searchTerm) {
      const globallyFiltered = PROMPT_COMPONENTS.filter(c =>
        c.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const catsWithResultsArr = Array.from(new Set(globallyFiltered.map(c => c.category)));
      const catsWithResults = new Set(catsWithResultsArr);
      let componentsToRender;
      if (selectedCategory) {
        componentsToRender = globallyFiltered.filter(c => c.category === selectedCategory);
      } else {
        componentsToRender = globallyFiltered;
      }
      return { componentsToRender, categoriesWithResults: catsWithResults, firstCategoryWithResults: catsWithResultsArr[0] };
    }
    // Not searching
    return {
      componentsToRender: PROMPT_COMPONENTS.filter(c => c.category === activeCategory),
      categoriesWithResults: new Set(),
      firstCategoryWithResults: undefined
    };
  }, [searchTerm, activeCategory, selectedCategory]);

  // Auto-switch activeCategory to first category with results when searching (only if not filtering by selectedCategory)
  useEffect(() => {
    if (searchTerm && firstCategoryWithResults && !selectedCategory && activeCategory !== firstCategoryWithResults) {
      setActiveCategory(firstCategoryWithResults);
    }
  }, [searchTerm, firstCategoryWithResults, activeCategory, selectedCategory]);

  const hasParameterResults = useMemo(() => {
    if (!searchTerm) return false;
    return PARAMETER_SUB_CATEGORIES.some(cat => categoriesWithResults.has(cat));
  }, [searchTerm, categoriesWithResults]);
  
  const handleCustomClick = (component: PromptComponent, e: React.MouseEvent<HTMLButtonElement>) => {
    setCustomValueInput({ component, target: e.currentTarget });
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  
  const handleCustomValueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customValue && customValueInput) {
      onComponentClick(customValueInput.component, customValue);
    }
    setCustomValue('');
    setCustomValueInput(null);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customValueInput && !((event.target as HTMLElement).closest('.modal-content'))) {
        setCustomValueInput(null);
        setCustomValue('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [customValueInput]);

  const renderCategoryButton = (cat: string) => {
    const hasResults = searchTerm && categoriesWithResults.has(cat);
    const isActive = searchTerm ? selectedCategory === cat : activeCategory === cat;
    return (
      <button
        key={cat}
        onClick={() => {
          if (searchTerm) {
            setSelectedCategory(selectedCategory === cat ? null : cat);
          } else {
            setActiveCategory(cat);
          }
        }}
        className={`relative px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${isActive ? 'bg-primary-accent text-white' : 'bg-black/20 text-gray-400 hover:bg-white/10 hover:text-gray-200'} ${hasResults ? 'ring-2 ring-offset-2 ring-offset-surface ring-primary-accent' : ''}`}
      >
        {cat}
      </button>
    );
  };

  return (
    <div id="component-grid-area" className="h-full flex flex-col p-4 bg-surface/70 rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search all components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-auto md:max-w-xs bg-black/20 border border-white/10 rounded-md px-3 py-2 text-base text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-primary-accent focus:outline-none transition-all"
        />
        <div className="flex-grow flex items-center gap-2 flex-wrap">
          {customSets.length > 0 && renderCategoryButton("My Sets")}
          {OTHER_CATEGORIES.map(renderCategoryButton)}
          <div className="relative">
            <button
              onClick={() => setIsParametersExpanded(!isParametersExpanded)}
              className={`flex items-center gap-2 relative px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${PARAMETER_SUB_CATEGORIES.includes(activeCategory) ? 'bg-primary-accent text-white' : 'bg-black/20 text-gray-400 hover:bg-white/10 hover:text-gray-200'} ${hasParameterResults ? 'ring-2 ring-offset-2 ring-offset-surface ring-primary-accent' : ''}`}
            >
              Midjourney Parameters
              <ChevronDownIcon className={`transition-transform duration-200 ${isParametersExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {isParametersExpanded && (
        <div className="pb-4 border-b border-white/10 mb-4 flex items-center gap-2 flex-wrap animate-cascade-in">
           {PARAMETER_SUB_CATEGORIES.map(renderCategoryButton)}
        </div>
      )}

      <div ref={gridRef} key={activeCategory} className="flex-grow overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pr-2 -mr-2 pt-16">
        {activeCategory === "My Sets" ? (
            customSets.map((set, index) => (
                <button
                    key={set.id}
                    onClick={() => onSetApply(set.prompt)}
                    className="group relative p-3 bg-indigo-900/50 rounded-lg text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-md btn-lift-glow animate-cascade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                >
                    <p className="font-semibold text-indigo-200 pr-2">{set.name}</p>
                    <div role="tooltip" className="absolute bottom-full left-1/2 z-20 w-max max-w-xs -translate-x-1/2 mb-2 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10">
                        {set.prompt}
                    </div>
                </button>
            ))
        ) : (
            (() => {
                const [infoHoverIndex, setInfoHoverIndex] = useState<number | null>(null);
                // We need to use a wrapper function to use state inside map
                return componentsToRender.map((component, index) => (
                    <button
                        key={component.id}
                        onClick={(e) => component.accepts_value ? handleCustomClick(component, e) : onComponentClick(component)}
                        className="relative p-3 bg-black/20 rounded-lg text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-md btn-lift-glow animate-cascade-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                    >
                        <div className="flex justify-between items-center h-full">
                            <p className="font-semibold text-base text-gray-200 pr-2">{component.text}</p>
                            <div
                                className="flex-shrink-0 text-gray-600 hover:text-primary-accent transition-colors relative"
                                onMouseEnter={() => setInfoHoverIndex(index)}
                                onMouseLeave={() => setInfoHoverIndex(null)}
                            >
                                <InfoIcon />
                                {infoHoverIndex === index && (
                                    <div role="tooltip" className="absolute right-full top-1/2 z-20 w-56 -translate-y-1/2 mr-2 inline-block bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl opacity-100 transition-all duration-300 pointer-events-none border border-white/20 overflow-hidden px-1.5 py-1 text-xs">
                                        <div className="p-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold text-white text-sm">{component.text}</h4>
                                                <span className="text-[10px] px-1.5 py-0.5 bg-primary-accent/20 text-primary-accent rounded-full font-medium">
                                                    {component.category}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-xs leading-snug">
                                                {component.description}
                                            </p>
                                            {component.param && (
                                                <div className="mt-2 pt-1 border-t border-white/10">
                                                    <span className="text-[10px] text-gray-400 font-mono bg-black/30 px-1.5 py-0.5 rounded">
                                                        {component.param}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                ));
            })()
        )}
      </div>
       {customValueInput && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in">
           <form onSubmit={handleCustomValueSubmit} className="modal-content bg-surface p-5 rounded-lg shadow-2xl border border-white/10 w-full max-w-sm transition-transform duration-300 animate-scale-in">
               <label className="block text-base font-medium text-gray-300 mb-2">
                   Enter value for {customValueInput.component.param}
               </label>
               <input
                   ref={inputRef}
                   type="text"
                   value={customValue}
                   onChange={(e) => setCustomValue(e.target.value)}
                   className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-primary-accent focus:outline-none"
               />
               <div className="mt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setCustomValueInput(null)} className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white font-semibold">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm bg-primary-accent hover:bg-indigo-500 rounded-md text-white font-semibold transition-colors">Add</button>
               </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default ComponentGrid;
