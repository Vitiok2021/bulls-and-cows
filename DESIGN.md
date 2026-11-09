Bulls and Cows Game - Design Documentation
1. Data Structures and Algorithms
The application manages game state immutably using standard TypeScript/JavaScript data structures tailored for functional programming principles.

Game State & Configuration:

activeLength (number): Stores the current digit length of the secret (ranging from 2 to 6).

activeBase (number): Stores the number base (2 for binary, 8 for octal, 10 for decimal, 16 for hexadecimal).

currentSecret (string): Stores the generated secret code as a string to prevent precision loss and preserve leading zeros (e.g., "01").

startTime (number): Stores the timestamp (Date.now()) when the "Start" button is clicked, used for calculating total match duration.

History & Leaderboard State:

history (Array of objects): An immutable array tracking each user attempt.

Structure: { guess: string, bulls: number, cows: number }

Updated immutably using the spread operator ([...history, newAttempt]).

records (Array of objects): Stored in localStorage under the key 'bulls-cows-records'.

Structure: { attempts: number, time: number, length: number, base: number }[]

Sorted primarily by ascending attempts, and secondarily by ascending time. Trimmed strictly to top 10 entries.

2. Big O Complexity Analysis
Here is the time and space complexity analysis for the four core utility functions powering the application logic:

generateSecret(length, base)

Time Complexity: 
O(L), where 
L is the length of the secret. The algorithm iterates 
L times to pick unique random digits according to the specified base.

Space Complexity: 
O(L) to store the resulting string/array of generated unique digits.

isValidGuess(guess, length, base)

Time Complexity: 
O(L), where 
L is the length of the guess string. The function checks string length and iterates through each character once to validate uniqueness and boundaries against the number base.

Space Complexity: 
O(1) as it only uses a fixed set of local variables and boolean flags during iteration.

evaluateGuess(secret, guess)

Time Complexity: 
O(L), where 
L is the length of the code. The algorithm performs a linear pass to count bulls (exact matches) and a secondary lookup/counting pass to evaluate cows (misplaced matches).

Space Complexity: 
O(L) to maintain frequency maps or tracking arrays for unmatched digits.

saveRecord / leaderboard sorting

Time Complexity: 
O(NlogN), where 
N is the number of saved records in localStorage (capped at 10 items, making 
NlogN virtually 
O(1) in practice). Sorting compares attempts and execution time.

Space Complexity: 
O(N) to parse, mutate, and re-serialize the records array for localStorage.

3. Clean Code Principles & Application
The project strictly adheres to Clean Code and functional programming paradigms, implemented across specific modules:

Pure Functions & Immutability:

Where applied: In core game logic modules (generateSecret.ts, evaluateGuess.ts, isValidGuess.ts). Functions depend solely on their input arguments, produce no side effects, and do not mutate external state. Game history state uses immutable array transformations (...history).

Single Responsibility Principle (SRP):

Where applied: DOM manipulation helpers are isolated in dom.ts, validation logic resides strictly in isValidGuess.ts, and leaderboard persistence logic is separated into dedicated storage functions.

Meaningful Naming & Readability:

Where applied: Variables and functions use descriptive domain-specific names (activeLength, activeBase, currentSecret, renderRecords), avoiding magic numbers or ambiguous abbreviations.

Strict Type Safety:

Where applied: Explicit TypeScript typing is enforced across all functions, event handlers, and data structures, strictly prohibiting the use of any types to comply with ESLint configuration rules.