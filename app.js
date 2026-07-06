if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => {
                console.log('Gravity Chamber ServiceWorker registered successfully!', reg);
                reg.onupdatefound = () => {
                    const newWorker = reg.installing;
                    newWorker.onstatechange = () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New training matrix update installed. Syncing Gravity Chamber...');
                            window.location.reload();
                        }
                    };
                };
            })
            .catch(err => console.warn('Gravity Chamber ServiceWorker registration failed:', err));
    });
}

// Saiyan Strength - Application Logic


// Default Program Split - Scientific 4-Day Recovery/Strength Split
const DEFAULT_PROGRAM = [
    // --- SAGA 1: STABILIZATION & SCIENTIFIC ADAPTATION (WEEK 1-2) ---
    {
        dayName: "Day 1: Upper A (Stabilization Focus)",
        description: "Focus: Shoulder stabilizer activation & rotator cuff base. Physio notes: Keep motion controlled.",
        exercises: [
            { name: "Cable External Rotations", target: "3 sets x 12-15 reps", description: "Jeff Nippard rotator cuff staple. Core stabilization dynamic warm-up.", sets: [
                { targetReps: 12, targetWeight: 5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 5, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Neutral-Grip DB Chest Press", target: "3 sets x 8-10 reps", description: "Neutral grip (palms face each other) reduces anterior labrum strain.", sets: [
                { targetReps: 8, targetWeight: 20, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 20, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 20, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Chest-Supported Dumbbell Row", target: "3 sets x 10-12 reps", description: "Supported chest isolates back muscles, eliminating torso twist risk.", sets: [
                { targetReps: 10, targetWeight: 25, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 25, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 25, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Prone Dumbbell Y-Raise", target: "3 sets x 12-15 reps", description: "Scapular mobility and lower trap stabilization. Lift at 45 degrees.", sets: [
                { targetReps: 12, targetWeight: 4, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 4, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 4, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 2: Lower A (Leg Base & Core)",
        description: "Focus: Leg base strength. Fully safe on shoulders.",
        exercises: [
            { name: "Barbell Back Squat", target: "3 sets x 6-8 reps", description: "Maintain tight upper back. Solid spine bracing.", sets: [
                { targetReps: 6, targetWeight: 80, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 6, targetWeight: 80, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 6, targetWeight: 80, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Romanian Deadlift (RDL)", target: "3 sets x 8-10 reps", description: "Hamstring and glute hinge. Focus on hip drive and neutral spine.", sets: [
                { targetReps: 8, targetWeight: 90, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 90, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 90, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Seated Leg Press", target: "3 sets x 10-12 reps", description: "Controlled deep leg extension. Quad overload.", sets: [
                { targetReps: 10, targetWeight: 120, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 120, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 120, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Cable Woodchoppers", target: "3 sets x 12-15 reps", description: "Core rotational strength. Keep arms extended but controlled.", sets: [
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 3: Upper B (Post-Op Hypertrophy)",
        description: "Focus: Lat width, rear delt activation, scapular health.",
        exercises: [
            { name: "Lat Pulldown (Underhand Grip)", target: "3 sets x 10-12 reps", description: "Safer on SLAP tear. Stop short of full lock at top.", sets: [
                { targetReps: 10, targetWeight: 45, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 45, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 45, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Face Pulls (External Rotation Focus)", target: "3 sets x 12-15 reps", description: "Jeff Nippard Rear Delt recommendation. Focus on dynamic external rotation.", sets: [
                { targetReps: 12, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Cable Lateral Raises", target: "3 sets x 12-15 reps", description: "Constant lateral tension profile. Perform in scaption plane.", sets: [
                { targetReps: 12, targetWeight: 7.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 7.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 7.5, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Hammer Curls", target: "3 sets x 10-12 reps", description: "Load forearm, brachialis, and biceps tendon structures.", sets: [
                { targetReps: 10, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 15, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 4: Lower B (Hinges & Posterior Base)",
        description: "Focus: Deadlifts, hamstrings, glute power.",
        exercises: [
            { name: "Barbell Romanian Deadlift", target: "3 sets x 8-10 reps", description: "Slight knee bend. Load hamstrings and glutes.", sets: [
                { targetReps: 8, targetWeight: 90, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 90, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 90, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Bulgarian Split Squat", target: "3 sets x 10-12 reps", description: "Unilateral leg focus. Keep spine stacked.", sets: [
                { targetReps: 10, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 15, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Seated Calf Raises", target: "4 sets x 12-15 reps", description: "Isolate calf complex. Hold stretch at bottom.", sets: [
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    // --- SAGA 2: HYPERTROPHY & CONSTANT TENSION (WEEK 3-4) ---
    {
        dayName: "Day 5: Upper C (Cable Tension Focus)",
        description: "Focus: Continuous tension profile using cables. High hypertrophy stimulus.",
        exercises: [
            { name: "Cable Lateral Raises (Behind Back)", target: "3 sets x 12-15 reps", description: "Jeff Nippard recommendation for massive side-delt stretch tension.", sets: [
                { targetReps: 12, targetWeight: 7.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 7.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 7.5, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Single-Arm Cable Lat Row", target: "3 sets x 10-12 reps", description: "Allows customized rotational pulling plane, very safe on labrum.", sets: [
                { targetReps: 10, targetWeight: 22.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 22.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 22.5, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Machine Chest Press (Horizontal plane)", target: "3 sets x 8-10 reps", description: "Stable, fixed movement. Push without shoulder instability.", sets: [
                { targetReps: 8, targetWeight: 45, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 45, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 45, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Reverse Cable Flyes", target: "3 sets x 12-15 reps", description: "Isolates posterior delt heads. Constant cable loading.", sets: [
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 6: Lower C (Quad Strength)",
        description: "Focus: Knee stability and quad progression.",
        exercises: [
            { name: "Barbell Goblet Squat", target: "3 sets x 8-10 reps", description: "Front loading improves torso posture and decreases lower back load.", sets: [
                { targetReps: 8, targetWeight: 32, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 32, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 32, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Leg Extensions", target: "3 sets x 12-15 reps", description: "Isolate quads. Peak contraction at top.", sets: [
                { targetReps: 12, targetWeight: 50, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 50, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 50, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Lying Leg Curl", target: "3 sets x 10-12 reps", description: "Posterior hamstring isolate.", sets: [
                { targetReps: 10, targetWeight: 35, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 35, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 35, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 7: Upper D (Rear Delt & Lat Focus)",
        description: "Focus: Upper back thickness, posterio-lateral shoulder balance.",
        exercises: [
            { name: "Chest-Supported Row (Wide Grip)", target: "3 sets x 8-10 reps", description: "Nippard back builder. Focus on drawing elbows back.", sets: [
                { targetReps: 8, targetWeight: 30, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 30, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 30, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Reverse Pec Deck Machine", target: "3 sets x 12-15 reps", description: "Stable rear delt fly. Keep chest firmly against pad.", sets: [
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 40, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Leaning-Away DB Lateral Raise", target: "3 sets x 12-15 reps", description: "Improves dumbbell loading curve at the bottom stretch position.", sets: [
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Incline Dumbbell Bicep Curl", target: "3 sets x 10-12 reps", description: "Biceps long head stretch tension. Keep elbows locked.", sets: [
                { targetReps: 10, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 8: Lower D (Hamstring & Posterior Power)",
        description: "Focus: Glute-ham string adaptation and calves.",
        exercises: [
            { name: "Glute Ham Raise (GHR)", target: "3 sets x 8-10 reps", description: "Excellent hamstring overload. High eccentric control.", sets: [
                { targetReps: 8, targetWeight: 0, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 0, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 0, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Barbell Hip Thrust", target: "3 sets x 10-12 reps", description: "Glute isolation without spinal shearing compression.", sets: [
                { targetReps: 10, targetWeight: 100, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 100, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 100, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Standing Calf Raise", target: "4 sets x 12-15 reps", description: "Explode to peak, hold contraction.", sets: [
                { targetReps: 12, targetWeight: 60, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 60, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 60, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 60, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    // --- SAGA 3: STRENGTH & PROGRESSIVE LOAD (WEEK 5-6) ---
    {
        dayName: "Day 9: Upper E (Compound Overhead Strength)",
        description: "Focus: Front delts and chest compound lifts. Safe plane overhead loading.",
        exercises: [
            { name: "Machine Shoulder Press", target: "3 sets x 8-10 reps", description: "Nippard Front Delt builder. Safer than barbell overhead. Keep plane control.", sets: [
                { targetReps: 8, targetWeight: 35, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 35, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 35, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Neutral-Grip Dumbbell Flat Bench", target: "3 sets x 6-8 reps", description: "Heavy chest press. Lower slowly, drive with chest.", sets: [
                { targetReps: 6, targetWeight: 25, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 6, targetWeight: 25, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 6, targetWeight: 25, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Seated Cable Row (Close Grip)", target: "3 sets x 8-10 reps", description: "Back thickness focus. Pull low towards hips.", sets: [
                { targetReps: 8, targetWeight: 50, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 50, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 50, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Cable Lateral Raises", target: "3 sets x 12-15 reps", description: "Constant tension side-delt isolator. Dynamic control.", sets: [
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 10, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 10: Lower E (Squat Strength Run)",
        description: "Focus: Peak leg power and brace mechanics.",
        exercises: [
            { name: "Barbell Back Squat", target: "3 sets x 5 reps", description: "Strength phase. Drive feet through floor.", sets: [
                { targetReps: 5, targetWeight: 90, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 5, targetWeight: 90, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 5, targetWeight: 90, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Romanian Deadlift", target: "3 sets x 6-8 reps", description: "Strength hinge. Maintain flat back.", sets: [
                { targetReps: 6, targetWeight: 100, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 6, targetWeight: 100, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 6, targetWeight: 100, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Leg Press", target: "3 sets x 10 reps", description: "Deep range press. Keep knees aligned.", sets: [
                { targetReps: 10, targetWeight: 140, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 140, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 140, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 11: Upper F (Volume Hypertrophy Finisher)",
        description: "Focus: High repetitions, pump focus, advanced shoulder care.",
        exercises: [
            { name: "Lat Pulldown (Neutral Grip)", target: "3 sets x 10-12 reps", description: "Bilateral back pull. Stop short of full extension.", sets: [
                { targetReps: 10, targetWeight: 50, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 50, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 50, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Face Pulls with External Rotation", target: "3 sets x 12-15 reps", description: "Focus on pulling to forehead and rotating hands out.", sets: [
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Incline Dumbbell Flyes", target: "3 sets x 12-15 reps", description: "Controlled upper chest isolation. Do not over-stretch shoulder.", sets: [
                { targetReps: 12, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 12.5, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Overhead Rope Tricep Extension", target: "3 sets x 12-15 reps", description: "Tricep long head emphasis. Keep elbows facing forward.", sets: [
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 12, targetWeight: 15, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    },
    {
        dayName: "Day 12: Lower F (Posterior Chain Mastery)",
        description: "Focus: Glute-ham split and calf endurance.",
        exercises: [
            { name: "Barbell Romanian Deadlift", target: "3 sets x 8 reps", description: "Hinge focus. Keep bar close to legs.", sets: [
                { targetReps: 8, targetWeight: 100, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 100, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 8, targetWeight: 100, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Goblet Squats", target: "3 sets x 10-12 reps", description: "Constant tension depth squats.", sets: [
                { targetReps: 10, targetWeight: 36, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 36, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 36, done: false, actualWeight: '', actualReps: '' }
            ]},
            { name: "Single-Leg Calf Raises", target: "4 sets x 10-12 reps", description: "Unilateral calves training. Fully controlled.", sets: [
                { targetReps: 10, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 10, done: false, actualWeight: '', actualReps: '' },
                { targetReps: 10, targetWeight: 10, done: false, actualWeight: '', actualReps: '' }
            ]}
        ]
    }
];

const MOTIVATION_QUOTES = [
    { text: "Power comes in response to a need, not a desire. You have to create that need.", author: "Goku" },
    { text: "There's only one certainty in life. A Saiyan always keeps his pride!", author: "Vegeta" },
    { text: "Every time I reach a new level of strength, a stronger opponent appears to challenge me. It is a never-ending cycle.", author: "Vegeta" },
    { text: "I am the hope of the universe. I am the answer to all living things that cry out for peace. I am Super Saiyan Goku!", author: "Goku" },
    { text: "Even with the power of a Super Saiyan, you're still just a child. Focus on discipline and form first!", author: "Piccolo" },
    { text: "Strength is the only thing that matters in this world. Everything else is just a delusion for the weak.", author: "Vegeta" },
    { text: "Push past your limits. No matter how hard it gets, keep fighting. Kaio-Ken!", author: "Goku" },
    { text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it!", author: "Goku" },
    { text: "No overhead barbell presses today! Master your form, protect the labrum, and your power level will soar.", author: "Physio Scouter" }
];

const AVATARS = {
    Goku: `<img src="goku.jpg" class="w-full h-full object-cover rounded-full border-2 border-orange-500/80 shadow-2xl" alt="Goku">`,
    Vegeta: `<img src="vegeta.jpg" class="w-full h-full object-cover rounded-full border-2 border-orange-500/80 shadow-2xl" alt="Vegeta">`,
    Trunks: `<img src="trunks.jpg" class="w-full h-full object-cover rounded-full border-2 border-orange-500/80 shadow-2xl" alt="Trunks">`,
    Gohan: `<img src="gohan.jpg" class="w-full h-full object-cover rounded-full border-2 border-orange-500/80 shadow-2xl" alt="Gohan">`,
    Shashank: `<img src="shashank.jpg" class="w-full h-full object-cover rounded-full border-2 border-orange-500/80 shadow-2xl" alt="Shashank">`,
    Frieza: `<img src="frieza.jpg" class="w-full h-full object-cover rounded-full border-2 border-orange-500/80 shadow-2xl" alt="Frieza">`
};

const WATERMARKS = {
    Goku: "亀",
    Vegeta: "王",
    Trunks: "未来",
    Gohan: "魔",
    Shashank: "萌",
    Frieza: "悪"
};

const BOSSES = [
    { name: "FRIEZA", maxHp: 100, class: "text-purple-400" },
    { name: "CELL", maxHp: 120, class: "text-emerald-400" },
    { name: "MAJIN BUU", maxHp: 150, class: "text-pink-400" },
    { name: "BEERUS", maxHp: 200, class: "text-indigo-400" }
];

const NOTE_FREQS = {
    "F#4": 369.99, "G#4": 415.30, "A#4": 466.16, "B4": 493.88,
    "C#5": 554.37, "D#5": 622.25, "E5": 659.25, "F#5": 739.99,
    "E4": 329.63, "B3": 246.94, "G4": 392.00, "A4": 440.00,
    "D4": 293.66, "G5": 783.99, "D5": 587.33, "A5": 880.00,
    "C5": 523.25, "F5": 698.46
};

const MELODY = [
    { note: "F#4", dur: 0.25 }, { note: "G#4", dur: 0.25 }, { note: "B4", dur: 0.25 },
    { note: "C#5", dur: 0.25 }, { note: "E5", dur: 0.5 }, { note: "D#5", dur: 0.25 },
    { note: "C#5", dur: 0.25 }, { note: "B4", dur: 0.5 }, { note: "G#4", dur: 0.25 },
    { note: "B4", dur: 0.25 }, { note: "C#5", dur: 0.5 }, { note: "B4", dur: 0.5 },
    { note: "F#4", dur: 0.25 }, { note: "G#4", dur: 0.25 }, { note: "B4", dur: 0.25 },
    { note: "C#5", dur: 0.25 }, { note: "E5", dur: 0.5 }, { note: "F#5", dur: 0.25 },
    { note: "E5", dur: 0.25 }, { note: "F#5", dur: 0.75 }
];

const VEGETA_MELODY = [
    { note: "E4", dur: 0.2 }, { note: "B4", dur: 0.2 }, { note: "E5", dur: 0.2 },
    { note: "G5", dur: 0.2 }, { note: "F#5", dur: 0.2 }, { note: "D5", dur: 0.2 },
    { note: "E5", dur: 0.4 }, { note: "rest", dur: 0.2 },
    { note: "E4", dur: 0.2 }, { note: "B4", dur: 0.2 }, { note: "E5", dur: 0.2 },
    { note: "A5", dur: 0.2 }, { note: "G5", dur: 0.2 }, { note: "F#5", dur: 0.2 },
    { note: "E5", dur: 0.4 }, { note: "rest", dur: 0.2 }
];

const GOHAN_MELODY = [
    { note: "G4", dur: 0.25 }, { note: "C5", dur: 0.25 }, { note: "D5", dur: 0.25 },
    { note: "D#5", dur: 0.5 }, { note: "D5", dur: 0.25 }, { note: "C5", dur: 0.25 },
    { note: "G4", dur: 0.5 }, { note: "rest", dur: 0.2 },
    { note: "C5", dur: 0.25 }, { note: "D5", dur: 0.25 }, { note: "D#5", dur: 0.25 },
    { note: "G5", dur: 0.5 }, { note: "F5", dur: 0.25 }, { note: "D#5", dur: 0.25 },
    { note: "D5", dur: 0.5 }, { note: "rest", dur: 0.2 }
];

const EXERCISE_DIALOGUES = {
    "Neutral-Grip DB Chest Press": {
        speaker: "Vegeta",
        text: "Press with your palms facing each other to reduce anterior joint strain! Do NOT let your elbows drop below the bench level—keep the shoulders secure!"
    },
    "Chest-Supported T-Bar or DB Row": {
        speaker: "Gohan",
        text: "Fully relax your shoulders at the bottom, then pull your elbows back towards your hips. Chest support keeps your spine safe!"
    },
    "Chest Press Machine (Controlled)": {
        speaker: "Vegeta",
        text: "Adjust the seat so the handles align with your lower chest. Push in a strict line. Machine stabilization is your shield!"
    },
    "Lat Pulldown (Neutral or Underhand Grip)": {
        speaker: "Goku",
        text: "Avoid wide overhand pull grips! Pull the bar to your collarbone using a neutral grip to prevent shoulder impingement!"
    },
    "Cable Lateral Raises": {
        speaker: "Trunks",
        text: "Keep the cables slightly in front of you. Lift to chin height, never higher. This protects the repaired SLAP tear!"
    },
    "Hammer Curls & Rope Pushdown Superset": {
        speaker: "Goku",
        text: "Neutral grips build the brachialis muscle and load the triceps safely. Power up your arm base!"
    },
    "Barbell Back Squat": {
        speaker: "Vegeta",
        text: "Brace your core like you're charging a final flash! Keep the spine neutral. Leg drive starts from the glutes!"
    },
    "Romanian Deadlift (RDL)": {
        speaker: "Goku",
        text: "Hinge at your hips and lower the bar to mid-shin. Keep your back completely flat to avoid low-back strain!"
    },
    "Leg Press Machine": {
        speaker: "Trunks",
        text: "Place your feet high on the platform to emphasize your glutes and hamstrings while keeping pressure off your lower back!"
    },
    "Seated Leg Curls": {
        speaker: "Gohan",
        text: "Pin your thighs down securely and pull down slow. Keep a steady tempo to build hamstring thickness!"
    },
    "Calf Raises (Standing)": {
        speaker: "Vegeta",
        text: "Control the stretch at the bottom for one second before exploding onto your toes. Strong calves support heavy squats!"
    },
    "Cable Woodchoppers": {
        speaker: "Goku",
        text: "Rotate your torso using your obliques. Keep your arms extended but controlled. Core stability is key!"
    },
    "Underhand Grip Chin-Ups": {
        speaker: "Goku",
        text: "Underhand grip recruits the biceps and keeps your shoulders in a safer, neutral path compared to standard pull-ups!"
    },
    "Incline DB Press (Low 15-30 deg)": {
        speaker: "Vegeta",
        text: "Keep the angle low—no more than 30 degrees! A high incline will load your anterior deltoids and risk impingement!"
    },
    "Single-Arm DB Row": {
        speaker: "Trunks",
        text: "Support yourself on the bench. Pull the dumbbell to your hip, not your chest. Keep your shoulder blade retracted at the top!"
    },
    "Cable Crossover (High-to-Low Flyes)": {
        speaker: "Vegeta",
        text: "Do not let the cables pull your hands too far back. Squeeze your chest hard at the bottom. Safety first, insect!"
    },
    "Face Pulls": {
        speaker: "Vegeta",
        text: "Pull the rope to your nose while pulling your hands apart at the end. This builds the rear delts and rotator cuffs!"
    },
    "DB Incline Bicep Curls & Overhead Tricep Extension": {
        speaker: "Gohan",
        text: "Build the arm base! Keep control of the eccentric phase and stay pain-free."
    },
    "Conventional Barbell Deadlift": {
        speaker: "Vegeta",
        text: "Brace your core, push through the floor, and pull the bar up in a straight line. Focus on lat tension!"
    },
    "Bulgarian Split Squat": {
        speaker: "Trunks",
        text: "Keep your chest slightly forward. Control the descent to maximize quad and glute loading on the working leg!"
    },
    "Leg Extensions": {
        speaker: "Goku",
        text: "Fully extend your knees at the top. This isolates the rectus femoris and quad base beautifully!"
    },
    "Lying Hamstring Curls": {
        speaker: "Gohan",
        text: "Keep your hips flat on the pad as you curl the weight up. Squeeze at the peak contraction!"
    },
    "Seated Calf Raises": {
        speaker: "Vegeta",
        text: "Slow, disciplined reps. Squeeze at the peak. Do not bounce the weight!"
    },
    "Hanging Knee Raises (or Hollow Body)": {
        speaker: "Goku",
        text: "Tuck your knees up towards your chest. This deep core flexion is essential for muscle-up transition strength!"
    },
    "Physio Safeguard": {
        speaker: "Vegeta",
        text: "Silence! Your SLAP tear is in the loading phase. Under no circumstances should you flare your elbows or lift weights over your head. Keep the pain score below 2/10!"
    }
};

const STORY_SCRIPT = [
    {
        speaker: "Goku",
        text: "Hey there, Shashank! Welcome to the Gravity Chamber! We designed this special rehabilitation split to get you back to 100% power after your shoulder surgery!"
    },
    {
        speaker: "Vegeta",
        text: "Hmph! Don't make me laugh, Kakarot. Shashank, if you flare your elbows during the bench press or lift overhead, I will personally throw you out of this chamber! Perfect form only!"
    },
    {
        speaker: "Gohan",
        text: "Shashank, don't worry, my dad and Vegeta just want you to train safe. We've got scapular shrugs and incline DB presses to build up your tendon base. Let's do this together!"
    },
    {
        speaker: "Frieza",
        text: "Hohoho... look at these monkeys talking about shoulder rehab. You think a tiny post-op recovery program will save you, Shashank? I'll be waiting in the active training tab!"
    },
    {
        speaker: "Shashank",
        text: "I am Shashank, the cute Saiyan recovery prince! I will protect my shoulder joint, complete every set, and reach a power level over 9,000! Let's enter gravity!"
    }
];

class SaiyanApp {
    constructor() {
        this.state = {
            powerLevel: 250,
            xp: 0,
            xpNeeded: 1000,
            tier: "Low-Class Rehab Warrior",
            profile: {
                character: "Vegeta",
                weight: 80.0,
                bodyfat: 20.0,
                height: 172,
                targetBf: 12.5
            },
            goals: {
                pullups: false,
                dips: false,
                hollow: false,
                explosive: false
            },
            program: JSON.parse(JSON.stringify(DEFAULT_PROGRAM)),
            history: [],
            activeWorkout: null
        };
        
        this.timer = {
            intervalId: null,
            secondsRemaining: 0,
            isRunning: false
        };

        this.music = {
            isPlaying: false,
            audioCtx: null,
            melodyIndex: 0,
            timeoutId: null
        };

        this.init();
    }

    init() {
        // iOS standalone link helper
        if (("standalone" in window.navigator) && window.navigator.standalone) {
            document.addEventListener('click', (event) => {
                let noddy = event.target;
                while (noddy && noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
                    noddy = noddy.parentNode;
                }
                if (noddy && 'href' in noddy && noddy.href.indexOf('http') !== -1 && noddy.href.indexOf(document.location.host) !== -1) {
                    event.preventDefault();
                    document.location.href = noddy.href;
                }
            }, false);
        }

        // Load saved state if any
        const saved = localStorage.getItem('saiyan_strength_state_v5');
        if (saved) {
            try {
                this.state = JSON.parse(saved);
            } catch (e) {
                console.error("Error restoring local state", e);
            }
        }
        
        // Setup initial views
        this.updateHUD();
        this.updateGoalUI();
        this.renderPlan();
        this.renderHistory();
        this.loadProfileIntoForm();
        this.updateCharacterAvatar(this.state.profile.character);
        this.initInteractiveEffects();
        this.showTab('scouter');
        this.randomizeQuote();

        if (this.state.activeWorkout) {
            this.resumeActiveWorkout();
        }
    }

    save() {
        localStorage.setItem('saiyan_strength_state_v5', JSON.stringify(this.state));
        this.updateHUD();
    }

    showTab(tabId) {
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.add('hidden');
        });
        document.getElementById(`tab-${tabId}`).classList.remove('hidden');

        // Nav active styles
        document.querySelectorAll('nav button').forEach(btn => {
            btn.classList.remove('text-orange-500');
            btn.classList.add('text-slate-400');
        });
        const activeNav = document.getElementById(`nav-${tabId}`);
        if (activeNav) {
            activeNav.classList.remove('text-slate-400');
            activeNav.classList.add('text-orange-500');
        }

        // Active workout badge check
        const badge = document.getElementById('training-badge');
        if (this.state.activeWorkout) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    updateHUD() {
        const powerLvlEl = document.getElementById('hud-power-level');
        if (powerLvlEl) powerLvlEl.innerText = this.state.powerLevel.toLocaleString();
        
        const charNameEl = document.getElementById('user-character-name');
        if (charNameEl) charNameEl.innerText = `${this.state.profile.character.toUpperCase()} (TRAINEE)`;
        
        const tierEl = document.getElementById('user-tier');
        if (tierEl) tierEl.innerText = this.state.tier;
        
        const weightEl = document.getElementById('stats-weight');
        if (weightEl) weightEl.innerText = `${this.state.profile.weight} kg`;
        
        const bfEl = document.getElementById('stats-bodyfat');
        if (bfEl) bfEl.innerText = `${this.state.profile.bodyfat}%`;
        
        const xpTextEl = document.getElementById('level-progress-text');
        if (xpTextEl) xpTextEl.innerText = `${this.state.xp} / ${this.state.xpNeeded} XP`;
        
        const progressEl = document.getElementById('level-progress-bar');
        if (progressEl) {
            const pct = Math.min(100, Math.round((this.state.xp / this.state.xpNeeded) * 100));
            progressEl.style.width = `${pct}%`;
        }
    }

    updateCharacterAvatar(name) {
        const container = document.getElementById('avatar-container');
        if (container) {
            container.innerHTML = AVATARS[name] || AVATARS.Goku;
        }
        
        // Update watermark
        const watermarkEl = document.getElementById('card-watermark');
        if (watermarkEl) {
            watermarkEl.innerText = WATERMARKS[name] || "亀";
        }

        // Update header logo
        const headerLogoEl = document.getElementById('header-kanji-logo');
        if (headerLogoEl) {
            headerLogoEl.innerText = WATERMARKS[name] || "亀";
        }

        // Update large character sprite
        const spriteEl = document.getElementById('scouter-character-sprite');
        if (spriteEl) {
            spriteEl.innerHTML = AVATARS[name] || AVATARS.Goku;
        }
        
        // Update large character name tag
        const nametagEl = document.getElementById('character-nametag');
        if (nametagEl) {
            nametagEl.innerText = name.toUpperCase();
        }

        this.updateCharacterTheme(name);
    }

    updateCharacterTheme(name) {
        let scouterColor = '#10B981'; // Mint Green (Goku / Trunks)
        let dimColor = 'rgba(16, 185, 129, 0.25)';
        let bgColor = 'rgba(16, 185, 129, 0.08)';
        
        if (name === 'Vegeta') {
            scouterColor = '#3B82F6'; // Royal Blue (Vegeta)
            dimColor = 'rgba(59, 130, 246, 0.25)';
            bgColor = 'rgba(59, 130, 246, 0.08)';
        } else if (name === 'Gohan') {
            scouterColor = '#A855F7'; // Latent Purple (Gohan)
            dimColor = 'rgba(168, 85, 247, 0.25)';
            bgColor = 'rgba(168, 85, 247, 0.08)';
        } else if (name === 'Shashank') {
            scouterColor = '#EC4899'; // Cute Pink (Shashank)
            dimColor = 'rgba(236, 72, 153, 0.25)';
            bgColor = 'rgba(236, 72, 153, 0.08)';
        }
        
        document.documentElement.style.setProperty('--saiyan-scouter', scouterColor);
        document.documentElement.style.setProperty('--saiyan-scouter-dim', dimColor);
        document.documentElement.style.setProperty('--saiyan-scouter-bg', bgColor);
    }

    playCharacterTapEffect() {
        const spriteEl = document.getElementById('scouter-character-sprite');
        if (spriteEl) {
            // Apply attack pulse impact & brightness flash
            spriteEl.style.transform = 'perspective(500px) scale(1.22) rotate(4deg)';
            spriteEl.classList.add('brightness-125', 'contrast-125');
            
            // Play punch/impact sound!
            if (typeof synth !== 'undefined') {
                synth.playHit();
            }
            
            // Return to rest
            setTimeout(() => {
                spriteEl.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
                spriteEl.classList.remove('brightness-125', 'contrast-125');
            }, 250);
        }
    }

    initInteractiveEffects() {
        const sprite = document.getElementById('scouter-character-sprite');
        if (!sprite) return;
        
        // 3D Parallax Tilt Effect
        sprite.addEventListener('mousemove', (e) => {
            const rect = sprite.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const tiltX = -(y / (rect.height / 2)) * 18;
            const tiltY = (x / (rect.width / 2)) * 18;
            
            sprite.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.06)`;
            sprite.style.boxShadow = `0 15px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(249, 115, 22, 0.3)`;
        });
        
        sprite.addEventListener('mouseleave', () => {
            sprite.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
            sprite.style.boxShadow = '';
        });
        
        // Start rising sparks aura loop
        this.startSparksAura();
    }

    startSparksAura() {
        const container = document.getElementById('sparks-container');
        if (!container) return;
        
        // Clear previous sparks
        container.innerHTML = '';
        
        // Spawn sparks periodically
        setInterval(() => {
            const spark = document.createElement('div');
            spark.className = "spark-particle";
            
            const randomX = Math.floor(Math.random() * 80) + 10;
            spark.style.left = `${randomX}%`;
            spark.style.bottom = `10%`;
            
            const delay = Math.random() * 0.4;
            spark.style.animationDelay = `${delay}s`;
            
            const duration = 1.0 + Math.random() * 0.6;
            spark.style.animationDuration = `${duration}s`;
            
            const character = this.state.profile.character;
            if (character === "Vegeta") {
                spark.style.backgroundColor = Math.random() > 0.5 ? '#3B82F6' : '#FBBF24';
            } else if (character === "Gohan") {
                spark.style.backgroundColor = Math.random() > 0.5 ? '#A855F7' : '#FBBF24';
            } else {
                spark.style.backgroundColor = Math.random() > 0.5 ? '#F97316' : '#FBBF24';
            }
            
            container.appendChild(spark);
            
            setTimeout(() => {
                spark.remove();
            }, (duration + delay) * 1000);
        }, 400);
    }

    randomizeQuote() {
        const quoteEl = document.getElementById('motivational-quote');
        const authorEl = document.getElementById('motivational-author');
        if (quoteEl && authorEl) {
            const quote = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
            quoteEl.innerText = `"${quote.text}"`;
            authorEl.innerText = `- ${quote.author}`;
        }
    }

    updateGoalUI() {
        const reqs = ['pullups', 'dips', 'hollow', 'explosive'];
        let checkedCount = 0;
        reqs.forEach(req => {
            const checkbox = document.getElementById(`mu-req-${req}`);
            if (checkbox) {
                checkbox.checked = this.state.goals[req] || false;
                if (checkbox.checked) checkedCount++;
            }
        });
        
        const pct = Math.round((checkedCount / reqs.length) * 100);
        document.getElementById('mu-overall-percent').innerText = `${pct}% Ready`;
        
        // Detailed goal descriptions
        document.getElementById('mu-pullups-count').innerText = this.state.goals.pullups ? '15 (Target Met!)' : '10';
        document.getElementById('mu-dips-count').innerText = this.state.goals.dips ? '15 (Target Met!)' : '12';
        document.getElementById('mu-hollow-time').innerText = this.state.goals.hollow ? '45s (Target Met!)' : '30s';
        document.getElementById('mu-explosive-count').innerText = this.state.goals.explosive ? '5 (Target Met!)' : '2';
    }

    saveGoalData() {
        this.state.goals.pullups = document.getElementById('mu-req-pullups').checked;
        this.state.goals.dips = document.getElementById('mu-req-dips').checked;
        this.state.goals.hollow = document.getElementById('mu-req-hollow').checked;
        this.state.goals.explosive = document.getElementById('mu-req-explosive').checked;
        this.save();
        this.updateGoalUI();
    }

    renderPlan() {
        const container = document.getElementById('plan-days-container');
        container.innerHTML = '';
        
        const program = this.state.program || DEFAULT_PROGRAM;
        program.forEach((day, index) => {
            const card = document.createElement('div');
            card.className = "bg-saiyan-card border border-slate-800 rounded-xl p-4 space-y-3.5";
            const boss = BOSSES[index % BOSSES.length];
            card.innerHTML = `
                <div class="space-y-1">
                    <h3 class="font-black text-slate-100 text-xs tracking-widest uppercase flex items-center justify-between">
                        <span>${day.dayName}</span>
                        <span class="text-[8px] bg-slate-950/80 text-orange-500 border border-orange-500/20 px-1.5 py-0.5 rounded font-mono font-bold">VS ${boss.name.toUpperCase()}</span>
                    </h3>
                    <p class="text-xs text-slate-400 font-mono leading-relaxed">${day.description}</p>
                </div>
                
                <div class="space-y-2 pt-2.5 border-t border-slate-900">
                    ${day.exercises.map((ex, exIndex) => `
                        <div class="w-full flex justify-between items-center text-sm py-1.5 hover:bg-slate-950/40 rounded px-1.5 transition-colors">
                            <button onclick="app.showExerciseDialogue('${ex.name}')" class="flex items-center space-x-1.5 text-left hover:text-orange-400">
                                <span class="text-slate-200 font-semibold">${ex.name}</span>
                                <span class="text-[8px] bg-slate-950/80 text-slate-500 border border-slate-800/80 px-1 py-0.5 rounded font-mono font-bold">TIPS</span>
                            </button>
                            <div class="flex items-center space-x-2 text-xs font-mono">
                                <span class="text-slate-400">${ex.target}</span>
                                <button onclick="app.deletePlanExercise(${index}, ${exIndex})" class="text-[8px] bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/20 px-1 py-0.5 rounded font-mono font-bold transition-colors">
                                    DEL
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="pt-2">
                    <button onclick="app.startWorkout(${index})" class="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-black py-2.5 rounded-lg uppercase font-mono tracking-widest transition-all active:scale-98 shadow-md flex items-center justify-center space-x-1.5">
                        <span>ENTER GRAVITY CHAMBER ☄️</span>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    deletePlanExercise(dayIndex, exIndex) {
        if (confirm("Permanently remove this exercise from your training plan calendar?")) {
            if (!this.state.program) {
                this.state.program = JSON.parse(JSON.stringify(DEFAULT_PROGRAM));
            }
            this.state.program[dayIndex].exercises.splice(exIndex, 1);
            this.save();
            this.renderPlan();
        }
    }

    startWorkout(dayIndex) {
        if (this.state.activeWorkout) {
            if (!confirm("A training session is already active. Abort and start this one instead?")) {
                return;
            }
        }
        
        const program = this.state.program || DEFAULT_PROGRAM;
        const template = program[dayIndex];
        // Deep copy template
        const exercises = JSON.parse(JSON.stringify(template.exercises));
        const bossTemplate = BOSSES[dayIndex % BOSSES.length];
        
        this.state.activeWorkout = {
            title: template.dayName,
            dayIndex: dayIndex,
            startedAt: new Date().toISOString(),
            exercises: exercises,
            boss: {
                name: bossTemplate.name,
                hp: bossTemplate.maxHp,
                maxHp: bossTemplate.maxHp
            }
        };
        
        this.save();
        this.resumeActiveWorkout();
        this.showTab('training');
        
        if (typeof synth !== 'undefined') {
            synth.playAura();
        }
    }

    resumeActiveWorkout() {
        document.getElementById('no-active-workout').classList.add('hidden');
        document.getElementById('active-workout-panel').classList.remove('hidden');
        document.getElementById('active-workout-title').innerText = this.state.activeWorkout.title;
        
        this.renderActiveExercises();
        this.updateBattleUI();
    }

    updateBattleUI() {
        const workout = this.state.activeWorkout;
        if (!workout || !workout.boss) return;
        
        const boss = workout.boss;
        document.getElementById('battle-opponent-name').innerText = `BOSS: ${boss.name}`;
        document.getElementById('battle-boss-name').innerText = boss.name;
        document.getElementById('battle-boss-hp-text').innerText = `${boss.hp} / ${boss.maxHp} HP`;
        
        const hpPct = Math.round((boss.hp / boss.maxHp) * 100);
        const hpBar = document.getElementById('battle-boss-hp-bar');
        if (hpBar) {
            hpBar.style.width = `${hpPct}%`;
            if (hpPct < 30) {
                hpBar.className = "bg-red-600 h-full rounded-full transition-all duration-300";
            } else if (hpPct < 60) {
                hpBar.className = "bg-amber-500 h-full rounded-full transition-all duration-300";
            } else {
                hpBar.className = "bg-red-500 h-full rounded-full transition-all duration-300";
            }
        }
        
        // Character Name on Battle Card
        document.getElementById('battle-hero-name').innerText = this.state.profile.character.toUpperCase();
    }

    renderActiveExercises() {
        const container = document.getElementById('active-exercises-list');
        container.innerHTML = '';
        
        this.state.activeWorkout.exercises.forEach((ex, exIndex) => {
            const exDiv = document.createElement('div');
            exDiv.className = "bg-saiyan-card border border-slate-800 rounded-xl p-4 space-y-3";
            exDiv.innerHTML = `
                <div>
                    <h3 class="font-black text-slate-100 text-sm tracking-widest uppercase flex items-center justify-between">
                        <button onclick="app.showExerciseDialogue('${ex.name}')" class="hover:text-orange-400 flex items-center space-x-1.5 transition-colors text-left">
                            <span>${ex.name}</span>
                            <span class="text-[9px] bg-slate-950/80 text-orange-500 border border-orange-500/20 px-1.5 py-0.5 rounded font-mono font-bold">TIPS</span>
                        </button>
                        <div class="flex items-center space-x-2">
                            <span class="text-xs text-orange-500 font-mono font-bold">${ex.target}</span>
                            <button onclick="app.deleteActiveExercise(${exIndex})" class="text-[8px] bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-mono font-bold transition-colors">
                                REMOVE
                            </button>
                        </div>
                    </h3>
                </div>
                
                <div class="space-y-2 mt-2.5">
                    <div class="grid grid-cols-4 gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black text-center">
                        <div class="text-left pl-2">Set</div>
                        <div>Target</div>
                        <div>Weight</div>
                        <div>Reps</div>
                    </div>
                    ${ex.sets.map((set, setIndex) => `
                        <div class="grid grid-cols-4 gap-2 items-center">
                            <button onclick="app.toggleSetDone(${exIndex}, ${setIndex})" class="w-full text-left py-2 px-2.5 rounded-lg border transition-colors flex items-center space-x-2 text-sm font-mono font-black ${
                                set.done 
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' 
                                : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700'
                            }">
                                <span class="w-2 h-2 rounded-full border transition-all ${set.done ? 'bg-emerald-400 border-emerald-300' : 'bg-transparent border-slate-600'}"></span>
                                <span>Set ${setIndex + 1}</span>
                            </button>
                            <span id="target-display-${exIndex}-${setIndex}" class="text-sm text-slate-300 font-mono text-center font-bold">${set.targetWeight}kg x ${set.targetReps}</span>
                            <input type="number" id="input-weight-${exIndex}-${setIndex}" step="0.5" placeholder="${set.targetWeight} kg" value="${set.actualWeight || ''}" 
                                oninput="app.updateSetInput(${exIndex}, ${setIndex}, 'actualWeight', this.value)"
                                class="bg-slate-950/60 border border-slate-800 rounded-lg px-2 py-2 text-slate-200 text-sm font-mono focus:border-orange-500 focus:outline-none text-center w-full font-black">
                            <input type="number" id="input-reps-${exIndex}-${setIndex}" placeholder="${set.targetReps} r" value="${set.actualReps || ''}" 
                                oninput="app.updateSetInput(${exIndex}, ${setIndex}, 'actualReps', this.value)"
                                class="bg-slate-950/60 border border-slate-800 rounded-lg px-2 py-2 text-slate-200 text-sm font-mono focus:border-orange-500 focus:outline-none text-center w-full font-black font-black">
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(exDiv);
        });
    }

    toggleSetDone(exIndex, setIndex) {
        const workout = this.state.activeWorkout;
        if (!workout) return;
        
        const set = workout.exercises[exIndex].sets[setIndex];
        set.done = !set.done;
        
        // Auto fill target if actual values are blank
        if (set.done) {
            if (!set.actualWeight) set.actualWeight = set.targetWeight;
            if (!set.actualReps) set.actualReps = set.targetReps;
            
            // Hit sound!
            if (typeof synth !== 'undefined') {
                synth.playHit();
            }
            
            // Trigger 90s timer automatically on set completion for rest
            this.startRestTimer(90);
        }
        
        // Calculate dynamic Boss HP based on progress
        this.recalculateBossHP();
        
        if (workout.boss) {
            const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
            const damage = totalSets > 0 ? Math.round((1 / totalSets) * workout.boss.maxHp) : 0;
            const logEl = document.getElementById('battle-log');
            if (logEl) {
                if (workout.boss.hp <= 0) {
                    logEl.innerText = "💥 BOSS DEFEATED! Final Kamehameha finisher unlocked!";
                } else {
                    logEl.innerText = `⚔️ ${this.state.profile.character.toUpperCase()} hits ${workout.boss.name} for ${damage} DMG using ${workout.exercises[exIndex].name}!`;
                }
            }
        }
        
        this.save();
        this.renderActiveExercises();
        this.updateBattleUI();
    }

    recalculateBossHP() {
        const workout = this.state.activeWorkout;
        if (!workout) return;
        
        const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
        const doneSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.done).length, 0);
        
        if (workout.boss) {
            if (totalSets === 0) {
                workout.boss.hp = 0;
            } else {
                workout.boss.hp = Math.max(0, workout.boss.maxHp - Math.round((doneSets / totalSets) * workout.boss.maxHp));
            }
        }
    }

    updateSetInput(exIndex, setIndex, field, value) {
        const exercise = this.state.activeWorkout.exercises[exIndex];
        exercise.sets[setIndex][field] = value;
        
        // Dynamic Target Propagator: auto-fill remaining sets if weight is changed
        if (field === 'actualWeight') {
            const weightVal = parseFloat(value);
            if (!isNaN(weightVal) && weightVal > 0) {
                for (let i = setIndex + 1; i < exercise.sets.length; i++) {
                    const nextSet = exercise.sets[i];
                    nextSet.targetWeight = weightVal;
                    nextSet.actualWeight = value; // Sync model
                    
                    // Update DOM directly to avoid focus loss
                    const wInput = document.getElementById(`input-weight-${exIndex}-${i}`);
                    if (wInput) wInput.value = value;
                    
                    const tDisplay = document.getElementById(`target-display-${exIndex}-${i}`);
                    if (tDisplay) tDisplay.innerText = `${weightVal}kg x ${nextSet.targetReps}`;
                }
            }
        }
        
        // Propagate reps to remaining sets
        if (field === 'actualReps') {
            const repsVal = parseInt(value);
            if (!isNaN(repsVal) && repsVal > 0) {
                for (let i = setIndex + 1; i < exercise.sets.length; i++) {
                    const nextSet = exercise.sets[i];
                    nextSet.targetReps = repsVal;
                    nextSet.actualReps = value; // Sync model
                    
                    const rInput = document.getElementById(`input-reps-${exIndex}-${i}`);
                    if (rInput) rInput.value = value;
                    
                    const tDisplay = document.getElementById(`target-display-${exIndex}-${i}`);
                    if (tDisplay) tDisplay.innerText = `${nextSet.targetWeight}kg x ${repsVal}`;
                }
            }
        }
        
        this.save();
    }

    deleteActiveExercise(exIndex) {
        if (!this.state.activeWorkout) return;
        if (confirm("Are you sure you want to remove this exercise from today's training?")) {
            this.state.activeWorkout.exercises.splice(exIndex, 1);
            this.recalculateBossHP();
            this.save();
            this.renderActiveExercises();
            this.updateBattleUI();
        }
    }

    cancelWorkout() {
        if (confirm("Are you sure you want to abort your gravity chamber training? No PL points will be awarded.")) {
            this.state.activeWorkout = null;
            this.save();
            document.getElementById('no-active-workout').classList.remove('hidden');
            document.getElementById('active-workout-panel').classList.add('hidden');
            this.showTab('plan');
        }
    }

    finishWorkout() {
        const workout = this.state.activeWorkout;
        if (!workout) return;
        
        // Calculate points
        let totalSets = 0;
        let completedSets = 0;
        workout.exercises.forEach(ex => {
            ex.sets.forEach(set => {
                totalSets++;
                if (set.done) completedSets++;
            });
        });
        
        if (completedSets === 0) {
            alert("No completed sets logged. Finish at least one set before checking in!");
            return;
        }

        // Complete XP calculations
        const xpEarned = completedSets * 30; // 30 XP per completed set
        this.state.xp += xpEarned;
        
        let levelUp = false;
        if (this.state.xp >= this.state.xpNeeded) {
            this.state.xp -= this.state.xpNeeded;
            this.state.powerLevel += 500;
            levelUp = true;
        } else {
            this.state.powerLevel += 150;
        }
        
        // Dynamic Tier Thresholds based on Power Level
        if (this.state.powerLevel >= 9000) {
            this.state.tier = "Super Saiyan (Rehab Mastered!)";
        } else if (this.state.powerLevel >= 6000) {
            this.state.tier = "Class 1 Elite";
        } else if (this.state.powerLevel >= 3000) {
            this.state.tier = "Class 2 Combatant";
        } else if (this.state.powerLevel >= 1000) {
            this.state.tier = "Class 3 Combatant";
        } else {
            this.state.tier = "Low-Class Rehab Warrior";
        }
        
        // Progressive Overload (2-for-2 Rule & Manual Overrides):
        if (this.state.program) {
            const planDayIndex = workout.dayIndex;
            if (this.state.program[planDayIndex]) {
                workout.exercises.forEach(completedEx => {
                    const planEx = this.state.program[planDayIndex].exercises.find(e => e.name === completedEx.name);
                    if (planEx) {
                        // 1. Check for manual overrides (did they lift heavier than plan target?)
                        let manualWeightOverride = 0;
                        completedEx.sets.forEach((completedSet, setIndex) => {
                            if (completedSet.done && completedSet.actualWeight && planEx.sets[setIndex]) {
                                const newWeight = parseFloat(completedSet.actualWeight);
                                if (!isNaN(newWeight) && newWeight > planEx.sets[setIndex].targetWeight) {
                                    manualWeightOverride = Math.max(manualWeightOverride, newWeight);
                                }
                            }
                        });
                        
                        if (manualWeightOverride > 0) {
                            // Update baseline target to match their manual weight success
                            planEx.sets.forEach(s => {
                                s.targetWeight = manualWeightOverride;
                            });
                            console.log(`Manual override: baseline target weight for ${completedEx.name} updated to ${manualWeightOverride}kg`);
                            return; // Skip 2-for-2 auto-progression since they manually stepped up
                        }

                        // 2. Clinical 2-for-2 Rule auto-progression
                        const lastSet = completedEx.sets[completedEx.sets.length - 1];
                        if (lastSet && lastSet.done && lastSet.actualReps && lastSet.actualWeight) {
                            const actualReps = parseInt(lastSet.actualReps);
                            const targetReps = lastSet.targetReps;
                            
                            if (actualReps >= targetReps + 2) {
                                // Check history for the previous time they did this exercise
                                let consecutiveClear = false;
                                // Find previous log that contains this exercise
                                const previousLog = this.state.history.find(log => {
                                    const pastEx = log.exercises.find(e => e.name === completedEx.name);
                                    if (pastEx) {
                                        const pastLastSet = pastEx.sets[pastEx.sets.length - 1];
                                        if (pastLastSet && pastLastSet.done && pastLastSet.actualReps) {
                                            return parseInt(pastLastSet.actualReps) >= pastLastSet.targetReps + 2;
                                        }
                                    }
                                    return false;
                                });
                                
                                if (previousLog) {
                                    consecutiveClear = true;
                                }
                                
                                if (consecutiveClear) {
                                    const currentTargetWeight = planEx.sets[0].targetWeight;
                                    let increment = currentTargetWeight * 0.05; // Conservative 5% step
                                    
                                    const isLowerBody = completedEx.name.toLowerCase().includes("squat") || 
                                                        completedEx.name.toLowerCase().includes("press") || 
                                                        completedEx.name.toLowerCase().includes("deadlift") || 
                                                        completedEx.name.toLowerCase().includes("thrust");
                                                        
                                    if (isLowerBody) {
                                        increment = Math.max(2.5, Math.round(increment / 2.5) * 2.5);
                                    } else {
                                        increment = Math.max(0.5, Math.round(increment / 0.5) * 0.5);
                                    }
                                    
                                    const newTargetWeight = currentTargetWeight + increment;
                                    planEx.sets.forEach(s => {
                                        s.targetWeight = newTargetWeight;
                                    });
                                    alert(`⚡ CLINICAL PROGRESSIVE OVERLOAD ACQUIRED!\nYou met the NSCA 2-for-2 rehab criteria for ${completedEx.name} (cleared 2+ reps on final set for 2 consecutive sessions).\nTarget weight increased by +${increment}kg to ${newTargetWeight}kg!`);
                                }
                            }
                        }
                    }
                });
            }
        }
        
        // Save to history
        workout.completedAt = new Date().toISOString();
        workout.xpEarned = xpEarned;
        this.state.history.unshift(workout);
        
        // Reset active
        this.state.activeWorkout = null;
        this.save();
        
        document.getElementById('no-active-workout').classList.remove('hidden');
        document.getElementById('active-workout-panel').classList.add('hidden');
        
        // Play Kamehameha sound finisher and alert
        if (typeof synth !== 'undefined') {
            synth.playKamehameha();
        }
        
        if (workout.boss) {
            alert(`🔥 KAMEHAMEHA FINISHER! You vaporized ${workout.boss.name}!\nEarned: +${xpEarned} XP!`);
        }
        
        if (levelUp) {
            if (typeof synth !== 'undefined') {
                setTimeout(() => synth.playLevelUp(), 2000);
            }
            alert(`🔥 POWER LEVEL INCREASED! New Level: ${this.state.powerLevel} PL (${this.state.tier})`);
        }
        
        this.renderHistory();
        this.showTab('history');
    }

    renderHistory() {
        const container = document.getElementById('history-container');
        container.innerHTML = '';
        
        if (this.state.history.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-slate-500 font-mono text-xs">
                    NO COMPLETED GRAVITY RUNS DETECTED.
                </div>
            `;
            return;
        }
        
        this.state.history.forEach(log => {
            const date = new Date(log.completedAt).toLocaleDateString(undefined, {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            
            const card = document.createElement('div');
            card.className = "bg-saiyan-card border border-slate-800 rounded-xl p-3 space-y-2";
            card.innerHTML = `
                <div class="flex justify-between items-center text-xs">
                    <div>
                        <h4 class="font-bold text-slate-200 uppercase">${log.title}</h4>
                        <span class="text-[9px] text-slate-500 font-mono">${date}</span>
                    </div>
                    <div class="flex items-center space-x-1.5">
                        <span class="bg-orange-950/40 border border-orange-500/30 text-orange-400 font-mono text-[9px] px-2 py-0.5 rounded">
                            +${log.xpEarned} XP
                        </span>
                        <button onclick="app.deleteHistoryLog('${log.completedAt}')" class="text-red-500 hover:text-red-400 font-mono text-[9px] px-1 bg-slate-950/60 border border-slate-800 rounded transition-colors">
                            DEL
                        </button>
                    </div>
                </div>
                <div class="text-[10px] text-slate-400 leading-normal font-mono">
                    ${log.exercises.map(ex => {
                        const doneSets = ex.sets.filter(s => s.done);
                        if (doneSets.length === 0) return '';
                        return `<div>• ${ex.name}: ${doneSets.map(s => `${s.actualWeight}kg x ${s.actualReps}`).join(', ')}</div>`;
                    }).join('')}
                </div>
            `;
            container.appendChild(card);
        });
    }

    deleteHistoryLog(completedAt) {
        if (confirm("Delete this training session log from your history?")) {
            this.state.history = this.state.history.filter(log => log.completedAt !== completedAt);
            this.save();
            this.renderHistory();
        }
    }

    // Rest Timer Logic
    startRestTimer(seconds) {
        clearInterval(this.timer.intervalId);
        this.timer.secondsRemaining = seconds;
        this.timer.isRunning = true;
        this.updateTimerUI();
        
        this.timer.intervalId = setInterval(() => {
            this.timer.secondsRemaining--;
            if (this.timer.secondsRemaining <= 0) {
                clearInterval(this.timer.intervalId);
                this.timer.isRunning = false;
                this.timer.secondsRemaining = 0;
                
                // Alarm
                if (typeof synth !== 'undefined') {
                    synth.playTimerBeep();
                }
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]);
                }
            }
            this.updateTimerUI();
        }, 1000);
    }

    toggleRestTimer() {
        if (this.timer.isRunning) {
            clearInterval(this.timer.intervalId);
            this.timer.isRunning = false;
            document.getElementById('timer-btn-toggle').innerText = "Resume";
            document.getElementById('timer-btn-toggle').className = "bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-1.5 rounded font-mono font-bold";
        } else {
            const display = document.getElementById('timer-display').innerText;
            const parts = display.split(':');
            const secs = parseInt(parts[0]) * 60 + parseInt(parts[1]);
            this.startRestTimer(secs > 0 ? secs : 90);
        }
    }

    updateTimerUI() {
        const mins = Math.floor(this.timer.secondsRemaining / 60);
        const secs = this.timer.secondsRemaining % 60;
        document.getElementById('timer-display').innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const toggleBtn = document.getElementById('timer-btn-toggle');
        if (toggleBtn) {
            if (this.timer.isRunning) {
                toggleBtn.innerText = "Pause";
                toggleBtn.className = "bg-amber-600 hover:bg-amber-500 text-white text-xs px-4 py-1.5 rounded font-mono font-bold";
            } else {
                toggleBtn.innerText = "Start";
                toggleBtn.className = "bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-1.5 rounded font-mono font-bold";
            }
        }
    }

    // Profile Settings
    loadProfileIntoForm() {
        document.getElementById('profile-character').value = this.state.profile.character;
        document.getElementById('profile-weight').value = this.state.profile.weight;
        document.getElementById('profile-bodyfat').value = this.state.profile.bodyfat;
        document.getElementById('profile-height').value = this.state.profile.height;
        document.getElementById('profile-target-bf').value = this.state.profile.targetBf;
    }

    saveProfile(event) {
        event.preventDefault();
        this.state.profile.character = document.getElementById('profile-character').value;
        this.state.profile.weight = parseFloat(document.getElementById('profile-weight').value);
        this.state.profile.bodyfat = parseFloat(document.getElementById('profile-bodyfat').value);
        this.state.profile.height = parseInt(document.getElementById('profile-height').value);
        this.state.profile.targetBf = parseFloat(document.getElementById('profile-target-bf').value);
        
        this.updateCharacterAvatar(this.state.profile.character);
        this.save();
        alert("Saiyan Bio-Data Synchronized!");
        this.showTab('scouter');
    }

    // Music Sequencer Methods
    toggleMusic() {
        if (this.music.isPlaying) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
    }

    startMusic() {
        if (!this.music.audioCtx) {
            this.music.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.music.audioCtx.state === 'suspended') {
            this.music.audioCtx.resume();
        }
        this.music.isPlaying = true;
        this.music.melodyIndex = 0;
        
        document.getElementById('music-icon').innerText = "🔊";
        document.getElementById('music-label').innerText = "ON";
        document.getElementById('music-btn').classList.remove('bg-slate-900', 'border-slate-800');
        document.getElementById('music-btn').classList.add('bg-orange-950/40', 'border-orange-500', 'text-orange-500');
        
        this.playNextNote();
    }

    stopMusic() {
        this.music.isPlaying = false;
        clearTimeout(this.music.timeoutId);
        
        document.getElementById('music-icon').innerText = "🔇";
        document.getElementById('music-label').innerText = "OFF";
        document.getElementById('music-btn').classList.remove('bg-orange-950/40', 'border-orange-500', 'text-orange-500');
        document.getElementById('music-btn').classList.add('bg-slate-900', 'border-slate-800');
    }

    playNextNote() {
        if (!this.music.isPlaying) return;
        
        const character = this.state.profile.character;
        let track = MELODY;
        if (character === "Vegeta") {
            track = VEGETA_MELODY;
        } else if (character === "Gohan") {
            track = GOHAN_MELODY;
        }
        
        // Safety bounds check
        if (this.music.melodyIndex >= track.length) {
            this.music.melodyIndex = 0;
        }
        
        const noteObj = track[this.music.melodyIndex];
        const freq = NOTE_FREQS[noteObj.note];
        const duration = noteObj.dur;
        
        if (freq && noteObj.note !== "rest") {
            const ctx = this.music.audioCtx;
            const now = ctx.currentTime;
            
            // Lead Melody Oscillator
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = (character === "Vegeta" || character === "Gohan") ? 'sawtooth' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            
            gain.gain.setValueAtTime((character === "Vegeta" || character === "Gohan") ? 0.04 : 0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.02);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
            
            // Heavy Polyphonic Sub-Bass layer for Vegeta/Gohan metal themes
            if (character === "Vegeta" || character === "Gohan") {
                const subOsc = ctx.createOscillator();
                const subGain = ctx.createGain();
                
                subOsc.type = 'sawtooth';
                // Play heavy octave-backing 2 octaves down
                subOsc.frequency.setValueAtTime(freq / 4, now);
                
                subGain.gain.setValueAtTime(0.06, now);
                subGain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.02);
                
                subOsc.connect(subGain);
                subGain.connect(ctx.destination);
                subOsc.start(now);
                subOsc.stop(now + duration);
            }
        }
        
        this.music.melodyIndex = (this.music.melodyIndex + 1) % track.length;
        this.music.timeoutId = setTimeout(() => {
            this.playNextNote();
        }, duration * 1000);
    }

    showExerciseDialogue(name) {
        const key = name.trim();
        let info = EXERCISE_DIALOGUES[key];
        if (!info) {
            info = {
                speaker: "Vegeta",
                text: `Maintain strict discipline with ${key}! Retract your scapula, control the eccentric phase, and focus on absolute joint stability. Do not fail me!`
            };
        }
        
        const overlay = document.getElementById('dialog-overlay');
        const avatarEl = document.getElementById('dialog-character-avatar');
        const nameEl = document.getElementById('dialog-character-name');
        const textEl = document.getElementById('dialog-text');
        
        if (overlay && avatarEl && nameEl && textEl) {
            avatarEl.innerHTML = `<img src="${info.speaker.toLowerCase()}.jpg" class="w-full h-full object-cover" alt="${info.speaker}">`;
            nameEl.innerText = info.speaker.toUpperCase();
            textEl.innerText = `"${info.text}"`;
            
            const btn = overlay.querySelector('button');
            if (btn) {
                btn.innerText = "Understand ☄️";
                btn.onclick = () => this.closeDialog();
            }
            
            overlay.classList.remove('hidden');
            
            if (typeof synth !== 'undefined') {
                synth.playAura();
            }
        }
    }

    startStoryBriefing() {
        this.storyIndex = 0;
        this.playStoryStep();
    }

    playStoryStep() {
        if (this.storyIndex >= STORY_SCRIPT.length) {
            this.closeDialog();
            return;
        }
        
        const step = STORY_SCRIPT[this.storyIndex];
        const overlay = document.getElementById('dialog-overlay');
        const avatarEl = document.getElementById('dialog-character-avatar');
        const nameEl = document.getElementById('dialog-character-name');
        const textEl = document.getElementById('dialog-text');
        
        if (overlay && avatarEl && nameEl && textEl) {
            const speakerImg = step.speaker.toLowerCase() + ".jpg";
            avatarEl.innerHTML = `<img src="${speakerImg}" class="w-full h-full object-cover" alt="${step.speaker}">`;
            nameEl.innerText = step.speaker.toUpperCase();
            textEl.innerText = `"${step.text}"`;
            
            const btn = overlay.querySelector('button');
            if (btn) {
                btn.innerText = (this.storyIndex === STORY_SCRIPT.length - 1) ? "Enter Gravity ☄️" : "Next ☄️";
                btn.onclick = () => {
                    this.storyIndex++;
                    this.playStoryStep();
                };
            }
            
            overlay.classList.remove('hidden');
            
            if (typeof synth !== 'undefined') {
                synth.playAura();
            }
        }
    }

    closeDialog() {
        const overlay = document.getElementById('dialog-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            if (typeof synth !== 'undefined') {
                synth.playClick();
            }
        }
    }

    // Export/Import
    exportData() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `saiyan_strength_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }

    importData() {
        document.getElementById('import-file').click();
    }

    handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed && typeof parsed === 'object' && parsed.powerLevel) {
                    this.state = parsed;
                    this.save();
                    this.init();
                    alert("Saiyan strength backup loaded successfully!");
                } else {
                    alert("Invalid backup file structure.");
                }
            } catch (err) {
                alert("Error reading file.");
            }
        };
        reader.readAsText(file);
    }
}

// Instantiate global app runner
window.app = new SaiyanApp();
