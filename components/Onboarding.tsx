import React, { useState } from 'react';

interface OnboardingProps {
    onComplete: () => void;
    onSkip: () => void;
}

const steps = [
    {
        title: "Welcome to the Prompt Architect!",
        text: "Let's take a quick tour of the key features to get you started.",
        targetClass: '',
        position: 'items-center justify-center text-center'
    },
    {
        title: "1. The Workspace",
        text: "This is where you'll build your prompts. It features syntax highlighting and real-time error checking.",
        targetClass: '#workspace-area',
        position: 'items-end justify-start'
    },
    {
        title: "2. The Component Library",
        text: "Click components here to add them to your prompt. Use the global search to find anything instantly.",
        targetClass: '#component-grid-area',
        position: 'items-start justify-start'
    },
    {
        title: "3. The Real-Time Linter",
        text: "Get instant feedback and suggestions here to perfect your V7 prompts.",
        targetClass: '#linter-area',
        position: 'items-end justify-end'

    },
    {
        title: "You're all set!",
        text: "Start creating amazing images. Happy prompting!",
        targetClass: '',
        position: 'items-center justify-center text-center'
    }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
    const [stepIndex, setStepIndex] = useState(0);

    const handleNext = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onSkip();
    };

    const currentStep = steps[stepIndex];
    const targetElement = currentStep.targetClass ? document.querySelector(currentStep.targetClass) : null;
    const targetRect = targetElement?.getBoundingClientRect();

    const popoverStyle: React.CSSProperties = targetRect ? {
        position: 'absolute',
        top: targetRect.bottom + 10,
        left: targetRect.left,
        transform: 'translateX(0)',
        maxWidth: '300px'
    } : {};
    
    if(targetRect && currentStep.targetClass === '#linter-area'){
        popoverStyle.left = 'auto';
        popoverStyle.right = window.innerWidth - targetRect.right;
    }


    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={handleNext}>
            {steps.map((step, index) => (
                step.targetClass &&
                <div key={index} className={`absolute border-2 border-dashed border-primary-accent rounded-lg transition-opacity duration-300 ${stepIndex === index ? 'opacity-100' : 'opacity-0'}`} style={targetRect && step.targetClass === steps[stepIndex].targetClass ? { top: targetRect.top - 4, left: targetRect.left - 4, width: targetRect.width + 8, height: targetRect.height + 8, pointerEvents: 'none' } : {}}></div>
            ))}
            
            <div className="fixed inset-0 flex p-6" style={targetRect ? {} : {alignItems: 'center', justifyContent: 'center'}}>
                <div
                    className={`bg-surface rounded-lg shadow-2xl p-6 border border-white/10 max-w-sm transition-all duration-300 relative`}
                    style={targetRect ? popoverStyle : {}}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="text-lg font-bold text-primary-accent mb-2">{currentStep.title}</h3>
                    <p className="text-gray-300 mb-4">{currentStep.text}</p>
                    <div className="flex justify-between items-center">
                        <button onClick={handleSkip} className="text-xs text-gray-500 hover:text-white transition-colors">Skip Tour</button>
                        <button onClick={handleNext} className="px-4 py-2 text-sm bg-primary-accent hover:bg-indigo-500 rounded-md text-white font-semibold transition-colors">
                            {stepIndex === steps.length - 1 ? 'Get Started' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;