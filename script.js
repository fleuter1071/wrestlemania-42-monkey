const observer = typeof window !== 'undefined' && 'IntersectionObserver' in window
  ? new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  })
  : null;

const bindReveals = (root = document) => {
  root.querySelectorAll('.reveal').forEach((el) => {
    if (el.dataset.revealBound === 'true') {
      return;
    }

    el.dataset.revealBound = 'true';

    if (observer) {
      observer.observe(el);
      return;
    }

    el.classList.add('is-visible');
  });
};

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const normalizeComparisonKey = (value) => String(value ?? '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const getYouTubeId = (entry) => {
  if (typeof entry === 'string') {
    return entry.trim();
  }

  if (!entry || typeof entry !== 'object') {
    return '';
  }

  if (entry.embedId) {
    return String(entry.embedId).trim();
  }

  const source = entry.embedUrl || entry.youtubeUrl || '';

  if (!source) {
    return '';
  }

  const match =
    String(source).match(/youtube\.com\/embed\/([^?&/]+)/i) ||
    String(source).match(/[?&]v=([^?&/]+)/i) ||
    String(source).match(/youtu\.be\/([^?&/]+)/i);

  return match ? match[1] : String(source).trim();
};

const extrasVideos = (Array.isArray(window.EXTRAS_EMBEDS) ? window.EXTRAS_EMBEDS : [])
  .map((entry, index) => {
    const embedId = getYouTubeId(entry);

    if (!embedId) {
      return null;
    }

    const data = typeof entry === 'object' ? entry : {};

    return {
      id: data.id || `extras-video-${index + 1}`,
      label: data.label || `Clip ${String(index + 1).padStart(2, '0')}`,
      title: data.title || `Featured video ${index + 1}`,
      embedId,
      embedUrl: `https://www.youtube.com/embed/${embedId}`,
      thumbnailUrl: data.thumbnailUrl || `https://i.ytimg.com/vi/${embedId}/hqdefault.jpg`
    };
  })
  .filter(Boolean);

const normalizePredictionEntry = (entry, index) => {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const yourPrediction = entry.yourPrediction && typeof entry.yourPrediction === 'object'
    ? entry.yourPrediction
    : {};
  const sonPrediction = entry.sonPrediction && typeof entry.sonPrediction === 'object'
    ? entry.sonPrediction
    : {};

  return {
    id: entry.id || `prediction-${index + 1}`,
    night: entry.night ? String(entry.night).trim() : '',
    match: entry.match ? String(entry.match).trim() : `Match ${index + 1}`,
    yourWinner: yourPrediction.winner ? String(yourPrediction.winner).trim() : 'Add Pup Pup pick',
    yourCommentary: yourPrediction.commentary ? String(yourPrediction.commentary).trim() : 'Add your reasoning here.',
    sonWinner: sonPrediction.winner ? String(sonPrediction.winner).trim() : "Add Fiddle's pick",
    sonCommentary: sonPrediction.commentary ? String(sonPrediction.commentary).trim() : 'Add his reasoning here.'
  };
};

const localPredictions = (Array.isArray(window.EXTRAS_PREDICTIONS) ? window.EXTRAS_PREDICTIONS : [])
  .map((entry, index) => normalizePredictionEntry(entry, index))
  .filter(Boolean);

let predictionEntries = [...localPredictions];

const predictionSheetConfig = window.EXTRAS_PREDICTIONS_SHEET && typeof window.EXTRAS_PREDICTIONS_SHEET === 'object'
  ? window.EXTRAS_PREDICTIONS_SHEET
  : {};
const liveSheetConfig = window.EXTRAS_LIVE_SHEET && typeof window.EXTRAS_LIVE_SHEET === 'object'
  ? window.EXTRAS_LIVE_SHEET
  : {};

const matchStories = [
  {
    id: 'ic-ladder',
    night: 'night-two',
    tag: 'Ladder Match',
    belt: 'Intercontinental Championship',
    title: 'Penta vs. Rey Mysterio vs. Je’Von Evans vs. Rusev vs. Dragon Lee vs. JD McDonagh vs. El Grande Americano',
    graphicLabel: 'Seven men. One title. Zero control.',
    hook: 'A seven-man title collision built from qualifiers, old rivalries, and the kind of ladder-match chaos no champion can truly prepare for.',
    story: 'Penta arrives at WrestleMania carrying the Intercontinental Title into the most unstable environment possible. Rey Mysterio, Dragon Lee, JD McDonagh, Je’Von Evans and Rusev all earned or forced their way into the field, turning one championship defense into a swarm of unfinished business and opportunistic ambition.',
    whyNow: 'What started as a standard title picture spiraled into a traffic jam of contenders, each claiming momentum, history, or a path earned in qualifiers. Instead of sorting them one by one, WrestleMania becomes the place where all those claims collide at once above the ring.',
    stakes: [
      'The Intercontinental Championship in the most volatile match type on the card',
      'A breakout WrestleMania moment for any challenger who can outlast six other threats',
      'Proof that Penta can survive chaos, not just singles-match pressure'
    ],
    meta: ['Champion: Penta', 'Stipulation: 7-Man Ladder Match'],
    accent1: '#ff365f',
    accent2: '#f59e0b',
    image: 'Assets/WM-42-IC-Ladder-Match.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 38%',
    featured: true
  },
  {
    id: 'iyo-asuka',
    night: 'night-two',
    tag: 'Singles Match',
    belt: 'Personal Rivalry',
    title: 'Iyo Sky vs. Asuka',
    graphicLabel: 'Broken trust inside the joshi elite.',
    hook: 'Former allies and elite stylists collide after betrayal, faction fracture, and months of tension around who truly leads the division.',
    story: 'The emotional core of this match comes from damage inside Iyo Sky’s own orbit. Asuka and Kairi Sane helped fracture Iyo’s world, leaving her isolated before she rebuilt herself alongside Rhea Ripley. That history makes this more than a showcase of two great wrestlers; it is a score-settling fight about trust, loyalty, and respect.',
    whyNow: 'WrestleMania is where the fallout finally becomes unavoidable. Iyo has a chance to prove she can stand on her own after the betrayal, while Asuka can remind the division that her instincts, edge, and ruthlessness still make her impossible to overlook.',
    stakes: [
      'Division control between two of the sharpest in-ring minds on the card',
      'Iyo’s chance to close the chapter on the betrayal that changed her path',
      'Asuka’s chance to reassert fear and hierarchy around her name'
    ],
    meta: ['Ringside factor: Kairi Sane', 'Theme: Trust turned violent'],
    accent1: '#8b5cf6',
    accent2: '#ff365f'
  },
  {
    id: 'danhausen-miz',
    night: 'night-two',
    tag: 'Singles Match',
    belt: 'Cursed Grudge',
    title: 'Danhausen vs. The Miz',
    graphicLabel: 'A-list ego meets very evil payback.',
    hook: 'Weeks of curses, public humiliation, and Miz TV chaos turn one of SmackDown’s strangest feuds into a direct showdown.',
    story: 'The issue grew out of repeated embarrassment for The Miz. WWE.com has framed Danhausen as a chaos agent who lurks backstage to deliver curses, and that energy landed directly on Miz when Danhausen cursed him on SmackDown in March. From there, Miz’s orbit only got messier: Jelly Roll accidentally punched him on “Miz TV,” Danhausen later offered to uncurse both Miz and Kit Wilson, and Danhausen eventually backed up the talk by beating Wilson in his in-ring debut.',
    whyNow: 'The WrestleMania match-up is the logical payoff from that TV run. Miz has every reason to stop treating Danhausen like a nuisance and finally fight him directly, while Danhausen has enough momentum, crowd support, and mischief behind him to make a one-on-one match feel earned instead of random. This WrestleMania framing is an inference from the current WWE.com story beats rather than an officially announced match.',
    stakes: [
      'Miz trying to restore control after weeks of being cursed, mocked, and embarrassed on television',
      'Danhausen proving he is more than a backstage attraction after winning his first SmackDown match',
      'A crowd-pleasing WrestleMania moment built on whether A-list arrogance can survive very evil chaos'
    ],
    meta: ['Story beat: Danhausen cursed The Miz on SmackDown', 'Momentum: Danhausen beat Kit Wilson on April 10'],
    accent1: '#f59e0b',
    accent2: '#ff365f'
  },
  {
    id: 'faction-showcase',
    night: 'night-one',
    tag: 'Faction Showcase',
    belt: 'Six-Man Spotlight',
    title: 'The Usos & LA Knight vs. The Vision & IShowSpeed',
    graphicLabel: 'Pride, noise, and a team war built for a stadium.',
    hook: 'Months of faction harassment and viral chaos finally cash out in a six-man collision where swagger matters almost as much as the win.',
    story: 'The Usos and LA Knight have spent months trying to stop a rival crew from hijacking their spotlight. In WWE canon, that tension has revolved around Logan Paul, Austin Theory, and IShowSpeed weaponizing attention and momentum; in this version, The Vision represent that same disruptive force, using Speed as a chaos amplifier around every confrontation.',
    whyNow: 'This match belongs at WrestleMania because it is louder than a normal grudge match. Every entrance, every staredown, and every hot tag is about which side owns the crowd, the momentum, and the narrative coming out of the weekend.',
    stakes: [
      'Faction credibility on a card built around spectacle',
      'A major WrestleMania spotlight for IShowSpeed if his chaos changes the result',
      'The Usos and LA Knight proving substance beats noise'
    ],
    meta: ['Wild card: IShowSpeed', 'Theme: Attention vs. authenticity'],
    accent1: '#3b82f6',
    accent2: '#f97316',
    image: 'Assets/Usos-VisionJ-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 30%'
  },
  {
    id: 'womens-us',
    night: 'night-two',
    tag: 'Championship Match',
    belt: 'Women’s United States Championship',
    title: 'Giulia vs. Tiffany Stratton',
    graphicLabel: 'Cold precision meets flash-star confidence.',
    hook: 'Giulia’s new-title aura crashes into Tiffany Stratton’s entitlement and rising-star confidence, with Kiana James adding another layer of instability.',
    story: 'Giulia has carried the Women’s United States Championship with a sharp, composed edge that makes every challenger look slightly unready. Tiffany Stratton is the opposite kind of threat: glamorous, loud, and convinced the spotlight should naturally bend toward her. Kiana James hovering around Giulia only adds more tension to every exchange.',
    whyNow: 'The build works because Tiffany sees Giulia as a champion she can outshine, while Giulia sees Tiffany as a challenger who has not yet earned her right to dictate the division. WrestleMania becomes the perfect place to settle whether prestige or bravado really leads this title.',
    stakes: [
      'The credibility of a still-young championship',
      'Tiffany’s chance to turn charisma into a defining title win',
      'Giulia’s chance to establish a colder, harder standard for the division'
    ],
    meta: ['Champion: Giulia', 'Ringside tension: Kiana James'],
    accent1: '#ff365f',
    accent2: '#f59e0b'
  },
  {
    id: 'us-triple-threat',
    night: 'night-one',
    tag: 'Triple Threat',
    belt: 'United States Championship',
    title: 'Sami Zayn vs. Trick Williams vs. Carmelo Hayes',
    graphicLabel: 'One title. Three egos. No clean escape.',
    hook: 'Sami’s shocking title win lit the fuse, Trick demanded his moment, and Carmelo refused to let the story move past him.',
    story: 'Sami Zayn shocked Carmelo Hayes in an open challenge to walk out with the United States Championship, instantly changing the whole division. Trick Williams already had reason to demand a WrestleMania shot, but Carmelo’s pride and unfinished business made a clean singles road impossible.',
    whyNow: 'As a triple threat, the match becomes about more than the title. Sami has to defend a belt he grabbed in explosive fashion, Trick wants the breakout WrestleMania statement, and Carmelo wants the narrative to stop pretending his loss ended the story.',
    stakes: [
      'The United States Championship and control of the division’s pace',
      'A star-making WrestleMania win for Trick or Carmelo',
      'Sami proving the title change was not just one perfect night'
    ],
    meta: ['Champion: Sami Zayn', 'Pressure point: Carmelo won’t let it go'],
    accent1: '#06b6d4',
    accent2: '#f59e0b'
  },
  {
    id: 'womens-ic',
    night: 'night-one',
    tag: 'No Holds Barred',
    belt: 'Women’s Intercontinental Championship',
    title: 'AJ Lee vs. Becky Lynch',
    graphicLabel: 'Old edge. New title. Personal damage.',
    hook: 'One of the most personal women’s feuds on the card reaches WrestleMania with a title, a grudge, and no reason to keep things clean.',
    story: 'AJ Lee’s return reignited old insecurities and unfinished rivalry with Becky Lynch. AJ has repeatedly found ways to outmaneuver, outtalk, and outfight Becky through mixed-tag chaos, title tension, and a sharper psychological edge than Becky expected.',
    whyNow: 'By the time Becky attacked after another AJ defense, this had stopped being a technical contest and turned into a fight about pride, legacy, and who gets to define this era. No Holds Barred simply admits what the rivalry has already become.',
    stakes: [
      'The Women’s Intercontinental Championship',
      'Legacy control between two of the division’s sharpest personalities',
      'Proof of whether Becky can solve AJ when the fight gets ugly'
    ],
    meta: ['Champion: AJ Lee', 'Stipulation: No Holds Barred'],
    accent1: '#ef4444',
    accent2: '#8b5cf6',
    image: 'Assets/Becky-AJ-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '52% 32%'
  },
  {
    id: 'world-heavyweight',
    night: 'night-two',
    tag: 'World Title Match',
    belt: 'World Heavyweight Championship',
    title: 'CM Punk vs. Roman Reigns',
    graphicLabel: 'History, resentment, and absolute main-event gravity.',
    hook: 'Royal Rumble power, years of resentment, and two giant egos make this feel less like a title match and more like a generational argument.',
    story: 'Roman Reigns earned the right to choose his WrestleMania path by winning the Royal Rumble, then pointed directly at CM Punk. The choice made sense because their issue runs deeper than one season: legacy, old grudges, power shifts, and the lingering history of what each man believes he represents in WWE.',
    whyNow: 'Punk wants validation that his comeback story can still end on top. Roman wants to prove that even after everything, he remains the gravitational center of the biggest stage. WrestleMania is where that argument has to become physical.',
    stakes: [
      'The World Heavyweight Championship and control of the top of Raw',
      'Legacy leverage in one of WWE’s biggest modern rivalries',
      'A definitive WrestleMania headline win for either man'
    ],
    meta: ['Champion: CM Punk', 'Earned by: Roman’s Royal Rumble win'],
    accent1: '#ff365f',
    accent2: '#3b82f6',
    image: 'Assets/Roman-Punk-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 32%',
    featured: true
  },
  {
    id: 'undisputed',
    night: 'night-one',
    tag: 'Main Event',
    belt: 'WWE Undisputed Championship',
    title: 'Cody Rhodes vs. Randy Orton',
    graphicLabel: 'Legacy, betrayal, and the Pat McAfee backlash.',
    hook: 'What should have been a pure legacy main event is now tangled up in Pat McAfee’s interference and the fan blowback that came with it.',
    story: 'The emotional core is still Cody Rhodes versus Randy Orton. Orton knows Cody better than almost anyone because he helped shape him during the Legacy era, and that history should have been enough to make this feel massive. But the texture of the feud changed on April 3, 2026, when Pat McAfee returned to SmackDown, aligned with Orton, and helped attack the Undisputed WWE Champion. WWE.com then leaned into the fallout by framing Cody’s response around both Orton and McAfee, which made McAfee a central part of the angle instead of a one-night surprise.',
    whyNow: 'WrestleMania is now the payoff for two connected stories at once. The first is Cody versus Randy: champion against mentor, history against ambition, and the deepest personal issue on the card. The second is whether that story has been compromised by McAfee’s involvement. Outside coverage from WrestleZone, TPWW, and Cageside Seats shows a clear negative fan reaction to Pat becoming such a major part of the feud, with criticism centered on the idea that the Rhodes-Orton story was already strong enough on its own. That blowback is now part of the match’s reality, so the card should reflect both the heat of the angle and the frustration around how crowded it has become.',
    stakes: [
      'The WWE Undisputed Championship in the feud with the deepest personal history on the card',
      'Cody trying to defend his reign while neutralizing both Orton and the disruption caused by Pat McAfee',
      'Orton’s chance to turn a 20-year bond and a controversial new alliance into one more defining act of control'
    ],
    meta: ['Champion: Cody Rhodes', 'April 3: Pat McAfee helped Orton attack Cody', 'Fan reaction: McAfee’s role drew notable backlash'],
    accent1: '#3b82f6',
    accent2: '#f59e0b',
    image: 'Assets/Cody-Randy-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '54% 34%',
    featured: true
  },
  {
    id: 'wwe-womens',
    night: 'night-two',
    tag: 'Women’s Title Match',
    belt: 'WWE Women’s Championship',
    title: 'Jade Cargill vs. Rhea Ripley',
    graphicLabel: 'Power vs. power with nothing to hide behind.',
    hook: 'This is the collision of two alpha-level presences, where strength, aura, and division leadership all hit at once.',
    story: 'Jade Cargill has carried herself like a defining champion, while Rhea Ripley fought through the Chamber path to earn the right to challenge her. On paper it is simple, but that simplicity is what makes it big: two women who look like centerpieces, both convinced the division should orbit them.',
    whyNow: 'WrestleMania is the exact place for an attraction like this because it turns championship stakes into a statement about hierarchy. Jade wants to prove her reign is the future. Rhea wants to show that earning the shot the hard way means more than aura alone.',
    stakes: [
      'The WWE Women’s Championship',
      'Division leadership between two physically dominant stars',
      'Proof of whether earned momentum beats reigning force'
    ],
    meta: ['Champion: Jade Cargill', 'Challenge path: Elimination Chamber winner'],
    accent1: '#f59e0b',
    accent2: '#ff365f',
    image: 'Assets/Jade-Ripley-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 26%'
  },
  {
    id: 'womens-world',
    night: 'night-one',
    tag: 'Women’s World Title',
    belt: 'Women’s World Championship',
    title: 'Stephanie Vaquer vs. Liv Morgan',
    graphicLabel: 'Rumble glory meets champion’s defiance.',
    hook: 'Liv Morgan earned the WrestleMania shot, but Stephanie Vaquer made sure the road to the title stayed tense, personal, and loaded with doubt.',
    story: 'Liv Morgan punched her ticket by winning the Women’s Royal Rumble, instantly becoming one of the central figures of WrestleMania season. Stephanie Vaquer, meanwhile, carried the champion’s posture of someone who refuses to let a signature moment for the challenger turn into a coronation.',
    whyNow: 'Liv’s journey says she earned this through survival and timing. Stephanie’s response says earning a shot is not the same as being ready to take the title. WrestleMania forces both ideas into the same ring.',
    stakes: [
      'The Women’s World Championship',
      'Liv’s chance to cash in the biggest win of her year',
      'Stephanie’s chance to define her reign by shutting down a Rumble winner'
    ],
    meta: ['Champion: Stephanie Vaquer', 'Challenge path: Women’s Royal Rumble winner'],
    accent1: '#ec4899',
    accent2: '#3b82f6',
    image: 'Assets/Liv-Stephanie-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '52% 28%'
  },
  {
    id: 'brock-oba',
    night: 'night-two',
    tag: 'Special Attraction',
    belt: 'Collision Course',
    title: 'Brock Lesnar vs. Oba Femi',
    graphicLabel: 'The old monster meets the new one.',
    hook: 'Lesnar wanted a statement opponent. Oba answered by dropping him and making the challenge feel real in seconds.',
    story: 'The story is brutally efficient: Brock Lesnar issued the challenge, and Oba Femi answered it with no fear and no hesitation. By planting Brock with Fall From Grace and standing over him, Oba turned what could have been a novelty attraction into a genuine threat assessment.',
    whyNow: 'WrestleMania is where WWE can ask the biggest question possible: is Brock still the measuring stick for destruction, or has a new monster arrived who can physically shove the legend aside and claim the spotlight in one night?',
    stakes: [
      'A potential passing-of-the-torch moment in raw physical dominance',
      'Oba’s chance to become an instant main-roster force',
      'Brock’s chance to remind everyone that one ambush is not the same as beating him'
    ],
    meta: ['Instigator: Brock’s open challenge', 'Turning point: Fall From Grace'],
    accent1: '#f97316',
    accent2: '#94a3b8'
  },
  {
    id: 'unsanctioned',
    night: 'night-one',
    tag: 'Unsanctioned',
    belt: 'Personal Vengeance',
    title: 'Jacob Fatu vs. Drew McIntyre',
    graphicLabel: 'So violent the company won’t own it.',
    hook: 'This stopped being a normal feud the moment ambushes, revenge, and all-out brawls pushed WWE to wash its hands of the fight.',
    story: 'Jacob Fatu and Drew McIntyre dragged each other into a rivalry where retaliation replaced strategy. Interference, payback, and escalating violence kept raising the emotional cost of every encounter until the conflict felt too reckless for standard rules to contain.',
    whyNow: 'An unsanctioned label fits because the issue is no longer about rankings or titles. It is about punishment. WrestleMania becomes the place where both men can stop pretending this is a sporting contest and admit it is a violent attempt to end a grudge.',
    stakes: [
      'Pride, revenge, and reputational damage rather than a championship',
      'Which man can survive the ugliest fight on the card',
      'Whether Drew or Fatu leaves WrestleMania looking impossible to control'
    ],
    meta: ['Theme: Revenge over rules', 'Stipulation: WWE is not responsible'],
    accent1: '#dc2626',
    accent2: '#f97316',
    image: 'Assets/drew-fatu-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 32%'
  },
  {
    id: 'womens-tag',
    night: 'night-one',
    tag: 'Fatal Four Way',
    belt: 'WWE Women’s Tag Team Championship',
    title: 'The Irresistible Forces vs. Charlexa vs. Bayley & Lyra Valkyria vs. The Bella Twins',
    graphicLabel: 'Four teams, one title, zero trust.',
    hook: 'Dominant champions, uneasy alliances, and returning star power turn the women’s tag division into a WrestleMania traffic jam.',
    story: 'The reigning champions came in with brute force and swagger, but the challengers all bring different danger. Charlotte and Alexa bring star power and unpredictability, Bayley and Lyra bring chemistry and veteran poise, and the Bella Twins bring legacy and crowd energy that can instantly swing a WrestleMania match.',
    whyNow: 'Fatal four-way title matches are less about perfect teamwork and more about who can survive the confusion better than everyone else. That makes this a division snapshot: every team sees WrestleMania as the moment to seize control before the landscape shifts again.',
    stakes: [
      'The WWE Women’s Tag Team Championship',
      'A division-defining win in the most chaotic tag match on the weekend',
      'Momentum for whichever partnership can prove it is more than a temporary alliance'
    ],
    meta: ['Champions: The Irresistible Forces', 'Dynamic: alliances can break instantly'],
    accent1: '#a855f7',
    accent2: '#f59e0b',
    image: 'Assets/womens-tag-team-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 28%'
  },
  {
    id: 'gunther-rollins',
    night: 'night-one',
    tag: 'Dream Match',
    belt: 'Elite Collision',
    title: 'Gunther vs. Seth Rollins',
    graphicLabel: 'Precision cruelty meets restless genius.',
    hook: 'A late-breaking WrestleMania collision between two elite operators who each think they define high-end wrestling.',
    story: 'Gunther’s return and immediate attack on Seth Rollins gave this match instant credibility. There is no need for cartoon heat here; both men already carry the presence of top-level threat. One suffocates opponents with control and punishment. The other turns chaos, stamina, and instinct into high-end offense.',
    whyNow: 'Because the matchup itself feels like an event. WrestleMania is where WWE can place two world-class performers in a ring and let the tension come from style, legacy, and professional disdain rather than a long melodramatic backstory.',
    stakes: [
      'A statement win between two men who each think they define elite wrestling',
      'Momentum for the next wave of main-event positioning',
      'Proof of whether control or creativity wins when both are world class'
    ],
    meta: ['Spark: Gunther’s return attack', 'Theme: Standard-bearer vs. standard-bearer'],
    accent1: '#f59e0b',
    accent2: '#ef4444',
    image: 'Assets/Rollins-Gunther-head-to-head.png',
    imageMode: 'replace',
    imagePosition: 'center center',
    imagePositionMobile: '50% 32%'
  },
  {
    id: 'balor-dominik',
    night: 'night-two',
    tag: 'Grudge Match',
    belt: 'Judgment Day Fallout',
    title: '“The Demon” Finn Bálor vs. “Dirty” Dominik Mysterio',
    graphicLabel: 'Family fractured. Faction fractured. No hiding left.',
    hook: 'Judgment Day betrayal finally explodes when Finn turns full demon against the man who helped shove him out of the group.',
    story: 'The relationship broke down after Finn’s title obsession and the group’s internal distrust pushed Judgment Day to a breaking point. Dominik survived the split on one side of the fallout, while Finn carried the humiliation and rage of being forced out of the faction he helped define.',
    whyNow: 'Finn challenging Dominik at WrestleMania turns faction politics into something personal and theatrical. Bringing back The Demon raises the emotional temperature even more: this is not Finn trying to win an argument, it is Finn trying to haunt the man who represents the group moving on without him.',
    stakes: [
      'Personal revenge after one of the most dramatic faction fractures in WWE',
      'Dominik proving he can survive without hiding behind the group',
      'Finn proving exile did not weaken him, it weaponized him'
    ],
    meta: ['Theme: Judgment Day betrayal', 'Persona: The Demon returns'],
    accent1: '#22c55e',
    accent2: '#8b5cf6'
  }
];

const matchStoriesContainer = document.getElementById('matchStories');
let activeStoryId = null;
const extrasFeature = document.getElementById('extrasFeature');
const extrasRail = document.getElementById('extrasRail');
let activeExtrasVideoId = extrasVideos.length > 0 ? extrasVideos[0].id : null;
const predictionsList = document.getElementById('predictionsList');
const liveReactionsFeatured = document.getElementById('liveReactionsFeatured');
const liveReactionsTimeline = document.getElementById('liveReactionsTimeline');
let liveReactionEntries = [];

const parseCsvRow = (line) => {
  const values = [];
  let current = '';
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (character === ',' && !insideQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += character;
  }

  values.push(current);
  return values.map((value) => value.trim());
};

const parseCsvText = (csvText) => {
  const normalizedText = String(csvText || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows = [];
  let currentLine = '';
  let insideQuotes = false;

  for (let index = 0; index < normalizedText.length; index += 1) {
    const character = normalizedText[index];
    const nextCharacter = normalizedText[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        currentLine += '""';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
        currentLine += character;
      }
      continue;
    }

    if (character === '\n' && !insideQuotes) {
      if (currentLine.trim()) {
        rows.push(parseCsvRow(currentLine));
      }
      currentLine = '';
      continue;
    }

    currentLine += character;
  }

  if (currentLine.trim()) {
    rows.push(parseCsvRow(currentLine));
  }

  return rows;
};

const normalizeHeaderKey = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const mapSheetRowsToPredictions = (rows) => {
  if (!Array.isArray(rows) || rows.length < 2) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const headerMap = headerRow.reduce((accumulator, columnName, index) => {
    accumulator[normalizeHeaderKey(columnName)] = index;
    return accumulator;
  }, {});

  const readColumn = (row, ...keys) => {
    for (const key of keys) {
      const columnIndex = headerMap[normalizeHeaderKey(key)];

      if (columnIndex !== undefined && row[columnIndex] !== undefined) {
        return String(row[columnIndex]).trim();
      }
    }

    return '';
  };

  return dataRows
    .map((row, index) => normalizePredictionEntry({
      id: readColumn(row, 'id'),
      night: readColumn(row, 'night'),
      match: readColumn(row, 'match'),
      yourPrediction: {
        winner: readColumn(row, 'pup_pup_winner', 'puppupwinner', 'your_winner', 'yourwinner'),
        commentary: readColumn(row, 'pup_pup_commentary', 'puppupcommentary', 'your_commentary', 'yourcommentary')
      },
      sonPrediction: {
        winner: readColumn(row, 'fiddle_winner', 'fiddlewinner', 'son_winner', 'sonwinner'),
        commentary: readColumn(row, 'fiddle_commentary', 'fiddlecommentary', 'son_commentary', 'soncommentary')
      }
    }, index))
    .filter((entry) => entry && entry.match);
};

const mergePredictionEntries = (baseEntries, sheetEntries) => {
  const baseById = new Map(baseEntries.map((entry) => [entry.id, entry]));
  const mergedEntries = [];

  baseEntries.forEach((baseEntry) => {
    const sheetEntry = sheetEntries.find((entry) => entry.id === baseEntry.id);

    if (!sheetEntry) {
      mergedEntries.push(baseEntry);
      return;
    }

    mergedEntries.push({
      ...baseEntry,
      night: sheetEntry.night || baseEntry.night,
      match: sheetEntry.match || baseEntry.match,
      yourWinner: sheetEntry.yourWinner !== 'Add Pup Pup pick' ? sheetEntry.yourWinner : baseEntry.yourWinner,
      yourCommentary: sheetEntry.yourCommentary !== 'Add your reasoning here.' ? sheetEntry.yourCommentary : baseEntry.yourCommentary,
      sonWinner: sheetEntry.sonWinner !== "Add Fiddle's pick" ? sheetEntry.sonWinner : baseEntry.sonWinner,
      sonCommentary: sheetEntry.sonCommentary !== 'Add his reasoning here.' ? sheetEntry.sonCommentary : baseEntry.sonCommentary
    });
  });

  sheetEntries.forEach((sheetEntry) => {
    if (!baseById.has(sheetEntry.id)) {
      mergedEntries.push(sheetEntry);
    }
  });

  return mergedEntries;
};

const normalizeLiveEntry = (entry, index) => {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  return {
    id: entry.id || `live-note-${index + 1}`,
    timestamp: entry.timestamp ? String(entry.timestamp).trim() : '',
    night: entry.night ? String(entry.night).trim() : '',
    tag: entry.tag ? String(entry.tag).trim() : '',
    match: entry.match ? String(entry.match).trim() : '',
    entry: entry.entry ? String(entry.entry).trim() : '',
    featured: String(entry.featured || '').trim().toLowerCase() === 'yes',
    sortOrder: Number.isFinite(Number(entry.sortOrder)) ? Number(entry.sortOrder) : index
  };
};

const mapSheetRowsToLiveEntries = (rows) => {
  if (!Array.isArray(rows) || rows.length < 2) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const headerMap = headerRow.reduce((accumulator, columnName, index) => {
    accumulator[normalizeHeaderKey(columnName)] = index;
    return accumulator;
  }, {});

  const readColumn = (row, ...keys) => {
    for (const key of keys) {
      const columnIndex = headerMap[normalizeHeaderKey(key)];

      if (columnIndex !== undefined && row[columnIndex] !== undefined) {
        return String(row[columnIndex]).trim();
      }
    }

    return '';
  };

  return dataRows
    .map((row, index) => normalizeLiveEntry({
      id: readColumn(row, 'id'),
      timestamp: readColumn(row, 'timestamp'),
      night: readColumn(row, 'night'),
      tag: readColumn(row, 'tag'),
      match: readColumn(row, 'match'),
      entry: readColumn(row, 'entry'),
      featured: readColumn(row, 'featured'),
      sortOrder: readColumn(row, 'sort_order', 'sortorder')
    }, index))
    .filter((entry) => entry && entry.entry);
};

const loadPredictionSheet = async () => {
  const csvUrl = predictionSheetConfig.csvUrl ? String(predictionSheetConfig.csvUrl).trim() : '';

  if (!csvUrl || typeof fetch !== 'function') {
    return;
  }

  try {
    const separator = csvUrl.includes('?') ? '&' : '?';
    const bustUrl = `${csvUrl}${separator}t=${Date.now()}`;
    const response = await fetch(bustUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Prediction sheet request failed: ${response.status}`);
    }

    const csvText = await response.text();
    const sheetPredictions = mapSheetRowsToPredictions(parseCsvText(csvText));

    if (sheetPredictions.length > 0) {
      predictionEntries = mergePredictionEntries(localPredictions, sheetPredictions);
      renderPredictions();
    }
  } catch (error) {
    console.warn('Prediction sheet load failed, using local fallback.', error);
  }
};

const renderLiveReactionCard = (entry, featured = false) => {
  const tagKey = normalizeComparisonKey(entry.tag);
  const matchKey = normalizeComparisonKey(entry.match);
  const contextLabel = entry.match
    ? entry.match
    : (entry.tag && tagKey !== matchKey ? entry.tag : '');

  const chips = [
    entry.night ? `<span class="story-chip gold">${escapeHtml(entry.night)}</span>` : '',
    !featured && contextLabel ? `<span class="story-chip">${escapeHtml(contextLabel)}</span>` : ''
  ].filter(Boolean).join('');
  const timestamp = entry.timestamp
    ? `<span class="live-note-time">${escapeHtml(entry.timestamp)}</span>`
    : '';
  const footer = featured
    ? `<div class="live-note-footer"><span>Live now</span>${timestamp}</div>`
    : (timestamp ? `<div class="live-note-meta">${timestamp}</div>` : '');

  return `
    <article class="live-note-card ${featured ? 'is-featured' : ''}" data-live-note="${escapeHtml(entry.id)}">
      <div class="live-note-top">
        <div class="story-chip-row live-note-chips">${chips}</div>
      </div>
      <div class="live-note-body">${escapeHtml(entry.entry)}</div>
      ${footer}
    </article>
  `;
};

const renderLiveReactions = () => {
  if (!liveReactionsFeatured || !liveReactionsTimeline) {
    return;
  }

  if (liveReactionEntries.length === 0) {
    liveReactionsFeatured.innerHTML = `
      <article class="live-note-card is-empty">
        <div class="story-chip-row">
          <span class="story-chip">No live notes yet</span>
        </div>
        <div class="live-note-body">Add rows to the live reactions sheet and they will appear here during the show.</div>
      </article>
    `;
    liveReactionsTimeline.innerHTML = '';
    return;
  }

  const orderedEntries = [...liveReactionEntries].sort((left, right) => left.sortOrder - right.sortOrder);
  const featuredEntry = orderedEntries.find((entry) => entry.featured) || orderedEntries[0];
  const timelineEntries = orderedEntries.filter((entry) => entry.id !== featuredEntry.id);

  liveReactionsFeatured.innerHTML = renderLiveReactionCard(featuredEntry, true);
  liveReactionsTimeline.innerHTML = timelineEntries.map((entry) => renderLiveReactionCard(entry)).join('');
};

const loadLiveSheet = async () => {
  const csvUrl = liveSheetConfig.csvUrl ? String(liveSheetConfig.csvUrl).trim() : '';

  if (!csvUrl || typeof fetch !== 'function') {
    renderLiveReactions();
    return;
  }

  try {
    const separator = csvUrl.includes('?') ? '&' : '?';
    const bustUrl = `${csvUrl}${separator}t=${Date.now()}`;
    const response = await fetch(bustUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Live sheet request failed: ${response.status}`);
    }

    const csvText = await response.text();
    liveReactionEntries = mapSheetRowsToLiveEntries(parseCsvText(csvText));
    renderLiveReactions();
  } catch (error) {
    console.warn('Live reactions sheet load failed.', error);
    renderLiveReactions();
  }
};

const matchNightConfigs = [
  {
    id: 'night-one',
    label: 'Night One',
    title: 'Saturday Spotlight',
    description: 'The officially announced Saturday card is anchored by Cody Rhodes vs. Randy Orton, with Gunther vs. Seth Rollins, Drew McIntyre vs. Jacob Fatu, and the women’s tag-title chaos filling out a louder first-night mix.',
    modifier: 'night-one'
  },
  {
    id: 'night-two',
    label: 'Night Two',
    title: 'Sunday Fallout',
    description: 'Sunday is officially built around CM Punk vs. Roman Reigns, Brock Lesnar vs. Oba Femi, the Intercontinental Title ladder match, and the rest of the title-heavy close to the weekend.',
    modifier: 'night-two'
  }
];

const renderStoryCard = (match) => {
  const metaTags = match.meta.map((item) => `<span>${item}</span>`).join('');
  const stakes = match.stakes.map((item) => `<li>${item}</li>`).join('');
  const cardStyle = [
    `--accent-1:${match.accent1};`,
    `--accent-2:${match.accent2};`,
    match.imagePosition ? `--graphic-position:${match.imagePosition};` : '',
    match.imagePositionMobile ? `--graphic-position-mobile:${match.imagePositionMobile};` : ''
  ].filter(Boolean).join(' ');
  const imageStyle = match.image
    ? match.imageMode === 'replace'
      ? `background-image: linear-gradient(160deg, rgba(0,0,0,0.28), rgba(0,0,0,0.82)), url('${match.image}');`
      : `background-image: linear-gradient(160deg, rgba(0,0,0,0.18), rgba(0,0,0,0.78)), radial-gradient(circle at top right, ${match.accent2}, transparent 48%), radial-gradient(circle at bottom left, ${match.accent1}, transparent 52%), url('${match.image}');`
    : '';

  return `
    <article class="story-card reveal ${match.featured ? 'featured' : ''}" style="${cardStyle}" data-story-card="${match.id}">
      <button
        class="story-card-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="story-panel-${match.id}"
        data-story-toggle="${match.id}"
      >
        <div class="story-graphic" style="${imageStyle}">
          <div class="story-chip-row">
            <span class="story-chip">${match.tag}</span>
            <span class="story-chip gold">${match.belt}</span>
          </div>
          <div class="story-graphic-copy">
            <p class="story-kicker">${match.graphicLabel}</p>
            <h3>${match.title}</h3>
          </div>
        </div>
        <div class="story-card-body">
          <div class="story-card-body-top">
            <strong class="story-summary-label">${match.belt}</strong>
            ${match.featured ? '<span class="story-feature-flag">Featured</span>' : ''}
          </div>
          <p class="story-hook">${match.hook}</p>
          <div class="story-card-footer">
            <strong class="story-toggle-label">Read story</strong>
            <span class="story-chevron">⌄</span>
          </div>
        </div>
      </button>
      <div class="story-panel" id="story-panel-${match.id}" hidden>
        <div class="story-divider"></div>
        <div class="story-copy-grid">
          <section class="story-block">
            <h5>Story So Far</h5>
            <p>${match.story}</p>
          </section>
          <section class="story-block">
            <h5>Why This Match Is Happening Now</h5>
            <p>${match.whyNow}</p>
          </section>
          <section class="story-block">
            <h5>What’s At Stake</h5>
            <ul class="story-stakes">${stakes}</ul>
          </section>
          <div class="story-meta">${metaTags}</div>
        </div>
      </div>
    </article>
  `;
};

const renderExtrasFeature = (video) => {
  if (!video || !extrasFeature) {
    return;
  }

  extrasFeature.innerHTML = `
    <article class="extras-feature-card">
      <div class="extras-feature-top">
        <div class="extras-video-chip-row">
          <span class="story-chip">${video.label}</span>
        </div>
      </div>
      <div class="extras-feature-frame">
        <iframe
          src="${video.embedUrl}?rel=0&modestbranding=1"
          title="${video.title}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="extras-feature-footer">
        <strong>${video.label}</strong>
        <a class="extras-feature-link" href="https://www.youtube.com/watch?v=${video.embedId}" target="_blank" rel="noopener noreferrer">
          Watch on YouTube
        </a>
      </div>
    </article>
  `;
};

const renderExtrasRail = () => {
  if (!extrasFeature || !extrasRail || extrasVideos.length === 0) {
    return;
  }

  const activeVideo = extrasVideos.find((video) => video.id === activeExtrasVideoId) ?? extrasVideos[0];
  activeExtrasVideoId = activeVideo.id;
  renderExtrasFeature(activeVideo);

  extrasRail.innerHTML = extrasVideos.map((video) => {
    const isActive = video.id === activeExtrasVideoId;

    return `
      <button
        class="extras-thumb ${isActive ? 'is-active' : ''}"
        type="button"
        data-video-select="${video.id}"
        role="tab"
        aria-selected="${isActive}"
      >
        <span class="extras-thumb-poster" style="background-image: linear-gradient(180deg, rgba(5,5,8,0.1), rgba(5,5,8,0.7)), url('${video.thumbnailUrl}');"></span>
        <span class="extras-thumb-copy">
          <span class="extras-thumb-label">${video.label}</span>
          <strong>${isActive ? 'Now selected' : 'Select clip'}</strong>
        </span>
      </button>
    `;
  }).join('');
};

const renderPredictions = () => {
  if (!predictionsList) {
    return;
  }

  if (predictionEntries.length === 0) {
    predictionsList.innerHTML = `
      <article class="prediction-empty">
        <div class="story-chip-row">
          <span class="story-chip">No picks yet</span>
        </div>
        <h3>Add your final card to the Google Sheet or extras-predictions.js</h3>
        <p>
          This board can load from a published Google Sheet for shared editing, with the local file
          acting as a fallback if the sheet is unavailable.
        </p>
      </article>
    `;
    return;
  }

  predictionsList.innerHTML = predictionEntries.map((entry) => `
    <article class="prediction-card" data-prediction-card="${escapeHtml(entry.id)}">
      <div class="prediction-card-header">
        <div class="story-chip-row prediction-card-chips">
          ${entry.night ? `<span class="story-chip gold">${escapeHtml(entry.night)}</span>` : '<span class="story-chip">Prediction</span>'}
        </div>
        <h3>${escapeHtml(entry.match)}</h3>
      </div>
      <div class="prediction-grid">
        <section class="prediction-pane prediction-pane-yours" aria-label="Your prediction for ${escapeHtml(entry.match)}">
          <div class="prediction-pane-top">
            <span class="prediction-namechip prediction-namechip-yours">Pup Pup</span>
            <p class="prediction-label">Pup Pup's Pick</p>
          </div>
          <h4>${escapeHtml(entry.yourWinner)}</h4>
          <p>${escapeHtml(entry.yourCommentary)}</p>
        </section>
        <section class="prediction-pane prediction-pane-son" aria-label="Your son's prediction for ${escapeHtml(entry.match)}">
          <div class="prediction-pane-top">
            <span class="prediction-namechip prediction-namechip-son">Fiddle</span>
            <p class="prediction-label">Fiddle's Pick</p>
          </div>
          <h4>${escapeHtml(entry.sonWinner)}</h4>
          <p>${escapeHtml(entry.sonCommentary)}</p>
        </section>
      </div>
    </article>
  `).join('');
};

const renderMatchStories = () => {
  matchStoriesContainer.innerHTML = matchNightConfigs.map((night) => {
    const matchesForNight = matchStories.filter((match) => match.night === night.id);

    return `
      <section class="match-night match-night-${night.modifier}" id="${night.id}">
        <div class="match-night-header reveal">
          <div>
            <div class="eyebrow">${night.label}</div>
            <h3>${night.title}</h3>
          </div>
          <p>${night.description}</p>
        </div>
        <div class="story-grid" aria-label="${night.label} match stories">
          ${matchesForNight.map((match) => renderStoryCard(match)).join('')}
        </div>
      </section>
    `;
  }).join('');

  bindReveals(matchStoriesContainer);
};

const syncStoryCards = () => {
  matchStoriesContainer.querySelectorAll('[data-story-card]').forEach((card) => {
    const storyId = card.dataset.storyCard;
    const isOpen = activeStoryId === storyId;
    const toggle = card.querySelector('[data-story-toggle]');
    const panel = card.querySelector('.story-panel');
    const label = card.querySelector('.story-toggle-label');

    card.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
    label.textContent = isOpen ? 'Hide story' : 'Read story';
  });
};

matchStoriesContainer.addEventListener('click', (event) => {
  const toggle = event.target.closest('[data-story-toggle]');

  if (!toggle) {
    return;
  }

  const { storyToggle } = toggle.dataset;
  activeStoryId = activeStoryId === storyToggle ? null : storyToggle;
  syncStoryCards();
});

renderMatchStories();
syncStoryCards();
renderExtrasRail();
renderPredictions();
renderLiveReactions();
bindReveals();
loadPredictionSheet();
loadLiveSheet();

if (extrasRail) {
  extrasRail.addEventListener('click', (event) => {
    const thumb = event.target.closest('[data-video-select]');

    if (!thumb) {
      return;
    }

    activeExtrasVideoId = thumb.dataset.videoSelect;
    renderExtrasRail();
  });
}

const curseTrigger = document.getElementById('curseTrigger');
const curseBats = document.getElementById('curseBats');
const curseCallout = document.getElementById('curseCallout');
const curseAudio = document.getElementById('curseAudio');
let curseTimeoutId = null;

curseTrigger.addEventListener('click', () => {
  if (curseBats) {
    curseBats.classList.remove('is-active');
    void curseBats.offsetWidth;
    curseBats.classList.add('is-active');
  }

  curseCallout.classList.add('is-active');

  if (curseAudio) {
    curseAudio.currentTime = 0;
    curseAudio.play().catch(() => {});
  }

  if (curseTimeoutId) {
    clearTimeout(curseTimeoutId);
  }

  curseTimeoutId = setTimeout(() => {
    if (curseBats) {
      curseBats.classList.remove('is-active');
    }

    curseCallout.classList.remove('is-active');
  }, 2200);
});
