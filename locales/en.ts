
import { CharContent } from '../types';

export const EN_CONTENT = {
  ui: {
    title: 'MorseMastery',
    modes: {
      learn: 'Learn',
      practice: 'Practice',
      reference: 'Reference'
    },
    days: {
      d1: 'Day 1',
      d1_sub: 'Basic',
      d2: 'Day 2',
      d2_sub: 'Intermediate',
      d3: 'Day 3',
      d3_sub: 'Advanced'
    },
    dayPlans: {
      d1_title: 'Day 1: Basics & Symmetry',
      d1_desc: 'Start with simple symmetrical shapes and basic dots/dashes.',
      d2_title: 'Day 2: Visual Logic',
      d2_desc: 'Master characters with strong visual and auditory connections.',
      d3_title: 'Day 3: Complex Mastery',
      d3_desc: 'Tackle the most complex characters to complete the alphabet.'
    },
    card: {
      visual: 'Visual Memory',
      core: 'Mnemonic',
      ai_btn: 'Can\'t remember? Ask AI',
      ai_loading: 'AI is thinking...',
      next: 'Next',
      prev: 'Previous',
      play_sound: 'Play Sound'
    },
    practice: {
      title: 'Practice Arena',
      modes: {
        visual: 'Sight Reflex',
        visual_desc: 'Instantly recognize characters from their dot/dash patterns.',
        audio: 'Audio Intel',
        audio_desc: 'Identify characters by ear alone. The core skill.',
        words: 'Code Cracker',
        words_desc: 'Challenge yourself with high-frequency words (SOS, THE, etc).'
      },
      categories: {
        ABBR: 'Abbreviation',
        COMMON: 'Common Word',
        EMERGENCY: 'Emergency'
      },
      rank_title: 'Current Rank',
      streak: 'Streak',
      hint: 'Hint',
      hint_no_score: 'Hint (No Score)',
      input_char: 'Enter char...',
      input_word: 'Enter word...',
      enter_confirm: 'Press Enter',
      replay: 'Replay',
      back_menu: 'Back to Menu',
      complete: 'Training Complete!',
      score: 'Score'
    },
    game: {
      title: 'Reinforcement',
      audio_title: 'Audio Intercept',
      visual_title: 'Visual Decode',
      pass: 'Training Passed!',
      fail: 'Keep Trying!',
      accuracy: 'Accuracy',
      finish: 'Finish',
      continue: 'Continue',
      retry: 'Retry'
    },
    reference: {
      title: 'Reference',
      subtitle: 'Complete database of numbers, punctuation, and abbreviations.',
      tabs: { num: 'Numbers', sym: 'Symbols', abbr: 'Abbr & Prosigns' },
      num_title: 'Standard Numbers',
      num_desc: 'Morse numbers always have 5 elements. 1-5 start with dots; 6-0 start with dashes.',
      sym_title: 'Punctuation',
      pro_title: 'Prosigns',
      pro_desc: 'Prosigns are sent as a single character (no gap) to control communication flow.',
      abbr_title: 'Common Abbreviations & Q-Codes',
      abbr_desc: 'Used extensively in CW (Continuous Wave) to save time.'
    }
  },
  chars: {
    // Day 1
    'E': { mnemonic: 'E = Eye', description: 'One dot, like a single eye. E is the simplest unit.' },
    'T': { mnemonic: 'T = Table/Top', description: 'A flat top table (-). One dash.' },
    'I': { mnemonic: 'I = Ice', description: 'Two dots (..) like two drips of melting ice.' },
    'M': { mnemonic: 'M = Motor', description: 'Two long dashes (--) sounding like a revving motor: Vroom-Vroom.' },
    'A': { mnemonic: 'A = Archery', description: 'Aim (.) then Shoot (-). A steady dot followed by a long arrow.' },
    'N': { mnemonic: 'N = Navy', description: '(-.) Big ship (-) and a small tugboat (.).' },
    'O': { mnemonic: 'O = OMG', description: 'Three long gasps (---): Oh My God!' },
    'S': { mnemonic: 'S = Snake', description: 'Three dots (...) like the hissing of a snake.' },
    'H': { mnemonic: 'H = Huts', description: 'Four dots (....) representing the four corners of a hut.' },
    // Day 2
    'D': { mnemonic: 'D = Dog', description: 'One dash for the body (-), two dots for the running paws (..).' },
    'K': { mnemonic: 'K = Kangaroo', description: '(-.-) Long back, pouch in the middle, long tail.' },
    'R': { mnemonic: 'R = Racecar', description: '(.-.) Dot (headlight), Dash (chassis), Dot (headlight).' },
    'U': { mnemonic: 'U = Uniform', description: '(..-) Two buttons on the chest, one long belt.' },
    'W': { mnemonic: 'W = Waves', description: '(.--) A small ripple followed by two big waves.' },
    'G': { mnemonic: 'G = Golf', description: '(--.) Two long swings and a hit ball.' },
    'B': { mnemonic: 'B = Banjo', description: '(-...) Long neck (-) and three tuning pegs (...).' },
    'V': { mnemonic: 'V = Victory', description: '(...-) Beethoven\'s 5th: da-da-da-DAAAH!' },
    // Day 3
    'C': { mnemonic: 'C = Coca Cola', description: '(-.-.) Rhythmic: Co-ca Co-la. Long, short, long, short.' },
    'F': { mnemonic: 'F = Flag', description: '(..-.) Two flying corners, a long pole, and a base.' },
    'J': { mnemonic: 'J = Jet', description: '(.---) A nose (.) followed by three long streams of exhaust.' },
    'L': { mnemonic: 'L = Leg', description: '(.-..) Hip (.), Thigh (-), Knee (.), Foot (.).' },
    'P': { mnemonic: 'P = Park', description: '(.--.) A car (.) between two white lines (--).' },
    'Q': { mnemonic: 'Q = God Save The Queen', description: '(--.-) Rhythm: God Save The Queen. Da-Da-Di-Da.' },
    'X': { mnemonic: 'X = X-ray', description: '(-..-) Dash, two dots inside, dash. Like bones inside an arm.' },
    'Y': { mnemonic: 'Y = Yell', description: '(-.--) Open mouth (-) screaming (dot) loudly (--).' },
    'Z': { mnemonic: 'Z = Zebra', description: '(--..) Two stripes (--) and two hooves (..).' },
  } as Record<string, CharContent>,
  ref: {
     // English defaults to the key usually, but nice to have explicit
    '.': 'Period', ',': 'Comma', '?': 'Question Mark', "'": 'Apostrophe', '!': 'Exclamation', '/': 'Slash',
    '(': 'Left Bracket', ')': 'Right Bracket', '&': 'Wait', ':': 'Colon', ';': 'Semicolon', '=': 'Equals',
    '+': 'Plus', '-': 'Hyphen', '_': 'Underscore', '"': 'Quote', '$': 'Dollar', '@': 'At',
    // Prosigns
    'SOS': 'Distress Signal', 'HH': 'Correction', 'BT': 'Separator (=)', 'AR': 'End of Message (+)',
    'SK': 'End of Contact', 'KA': 'Start Signal', 'AS': 'Wait',
    // Abbr
    'AA': 'All after', 'AB': 'All before', 'ABT': 'About',
    'ADS': 'Address', 'AGN': 'Again', 'ANT': 'Antenna',
    'ARRL': 'American Radio Relay League', 'BN': 'All between', 'BUG': 'Semiautomatic key',
    'C': 'Yes', 'CBA': 'Callbook address', 'CFM': 'Confirm',
    'CLG': 'Calling', 'CQ': 'Calling any station', 'CUL': 'See you later',
    'CUZ': 'Because', 'CW': 'Continuous wave', 'CX': 'Conditions',
    'CY': 'Copy', 'DE': 'From', 'DX': 'Distance',
    'ES': 'And', 'FB': 'Fine business', 'FCC': 'Federal Communications Commission',
    'FER': 'For', 'FREQ': 'Frequency', 'GA': 'Good afternoon/Go ahead',
    'GE': 'Good evening', 'GM': 'Good morning', 'GND': 'Ground',
    'GUD': 'Good', 'HI': 'Laughter', 'HR': 'Here', 'HV': 'Have',
    'LID': 'Lid', 'MILS': 'Milliamperes', 'NIL': 'Nothing',
    'NR': 'Number', 'OB': 'Old boy', 'OC': 'Old chap',
    'OM': 'Old man', 'OO': 'Official Observer', 'OP': 'Operator',
    'OT': 'Old timer', 'OTC': 'Old timers club', 'PSE': 'Please',
    'PWR': 'Power', 'R': 'Received', 'RCVR': 'Receiver',
    'RPT': 'Repeat/Report', 'RST': 'Readability-Strength-Tone',
    'RTTY': 'Radioteletype', 'RX': 'Receive', 'SAE': 'Self addressed envelope',
    'SASE': 'Self addressed, stamped envelope', 'SED': 'Said', 'SEZ': 'Says',
    'SIG': 'Signal', 'SIGS': 'Signals', 'SKED': 'Schedule',
    'SN': 'Soon', 'SRI': 'Sorry', 'STN': 'Station',
    'TEMP': 'Temperature', 'TMW': 'Tomorrow', 'TNX': 'Thanks',
    'TU': 'Thank you', 'TX': 'Transmit', 'U': 'You',
    'UR': 'Your', 'URS': 'Yours', 'VY': 'Very',
    'WDS': 'Words', 'WKD': 'Worked', 'WL': 'Will/Well',
    'WUD': 'Would', 'WX': 'Weather', 'XMTR': 'Transmitter',
    'XYL': 'Wife', 'YL': 'Young Lady', '73': 'Best regards',
    '88': 'Love and kisses', '99': 'Go way',
  } as Record<string, string>
};
