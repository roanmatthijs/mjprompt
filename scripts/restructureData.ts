// In scripts/restructureData.ts

import fs from 'fs';
import path from 'path';
import { PROMPT_COMPONENTS } from '../constants'; // We will execute this with ts-node
import { ThemedDatabase, ThemedComponent } from '../types';

const themify = (): ThemedDatabase => {
    const db: ThemedDatabase = {};

    const getRole = (category: string): string => {
        if ([
            'Subjects & Characters',
            'Food & Consumables'
        ].includes(category)) return 'Main Subject';
        if ([
            'Art & Design Styles',
            'Artists',
            'Art Mediums',
            'Anime & Manga Series'
        ].includes(category)) return 'Medium & Style';
        if ([
            'Geographic Locations',
            'Architecture & Structures'
        ].includes(category)) return 'Environment';
        if ([
            'Lighting',
            'Lighting Phenomena',
            'Lighting Styles'
        ].includes(category)) return 'Lighting';
        if ([
            'Camera & Cinematography',
            'Composition & Framing',
            'Composition Principles'
        ].includes(category)) return 'Composition & Framing';
        return 'Detail'; // Default for everything else
    };

    const getThemes = (text: string, category: string): string[] => {
        const themes = new Set<string>();
        const lowerText = text.toLowerCase();

        // Theme keywords
        if (/\b(fantasy|elf|dragon|magic|sorceress|mythical|mythology)\b/.test(lowerText)) themes.add('fantasy');
        if (/\b(sci-fi|cyberpunk|futuristic|robot|mecha|space|dystopian)\b/.test(lowerText)) themes.add('sci-fi');
        if (/\b(horror|creepy|sinister|dark|gothic|undead|eldritch)\b/.test(lowerText)) themes.add('horror');
        if (/\b(nature|forest|mountain|ocean|animal|plant|fauna|flora)\b/.test(lowerText)) themes.add('nature');
        if (/\b(city|urban|street|architecture|metropolis)\b/.test(lowerText)) themes.add('urban');
        if (/\b(abstract|surreal|dreamlike|conceptual)\b/.test(lowerText)) themes.add('abstract');
        if (/\b(serene|peaceful|calm|tranquil)\b/.test(lowerText)) themes.add('serene');
        if (/\b(vintage|retro|historical|ancient|medieval)\b/.test(lowerText) || category === 'Historical Eras & Dynasties') themes.add('historical');
        if (/\b(cute|kawaii|chibi|adorable)\b/.test(lowerText)) themes.add('cute');
        if (/\b(epic|grand|cinematic|dramatic)\b/.test(lowerText)) themes.add('epic');

        if (themes.size === 0) themes.add('general'); // Default theme
        return Array.from(themes);
    };

    PROMPT_COMPONENTS.forEach(component => {
        // We only want to include creative components, not technical parameters
        if (!component.param && component.category !== 'Advanced Syntax') {
            const themedComponent: ThemedComponent = {
                ...component,
                role: getRole(component.category),
                themes: getThemes(component.text, component.category)
            };
            if (!db[themedComponent.role]) {
                db[themedComponent.role] = [];
            }
            db[themedComponent.role].push(themedComponent);
        }
    });

    return db;
};

const themedData = themify();
// Ensure the 'public' directory exists
if (!fs.existsSync(path.join(__dirname, '../public'))){
    fs.mkdirSync(path.join(__dirname, '../public'));
}
fs.writeFileSync(path.join(__dirname, '../public/themedComponentData.json'), JSON.stringify(themedData, null, 2));

console.log('Themed data generated successfully at public/themedComponentData.json');
