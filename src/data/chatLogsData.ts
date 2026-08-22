import { ChatLog } from '../types';

export const chatLogsData: ChatLog[] = [
  {
    id: 'chat-marrow-98',
    channel: '#marrow',
    server: 'irc.efnet.net:6667',
    date: '1998-11-19',
    description: 'IRC log recorded on EFnet during the first observed /~room/ anomaly on Marrow.net.',
    messages: [
      { time: '02:14:10', nick: 'nyxgirl', text: 'anyone else getting crazy lag on the server?' },
      { time: '02:14:22', nick: 'pixelpunk', text: 'fine here on campus ethernet' },
      { time: '02:14:45', nick: 'unknown', text: 'no', isAnomalous: true },
      { time: '02:15:02', nick: 'nyxgirl', text: 'who is unknown? you are not on the /names list' },
      { time: '02:15:10', nick: 'SYSTEM', text: '*** unknown has quit (Connection closed by remote peer)', isSystem: true },
      { time: '02:15:20', nick: 'pixelpunk', text: 'nobody was in the channel with that nick Noemi... I have channel log bot running' },
      { time: '02:15:40', nick: 'nyxgirl', text: 'i swear i saw text on my screen' }
    ]
  },
  {
    id: 'chat-afterhours-03',
    channel: '#afterhours-ops',
    server: 'irc.afterhours.org:7000',
    date: '2003-10-14',
    description: 'Internal moderator IRC transcript recorded during the Oct 14 2003 disaster.',
    messages: [
      { time: '03:12:00', nick: 'janus', text: 'Server load is spiking. 200 new connections from 0.0.0.0' },
      { time: '03:13:15', nick: 'lucidwitch', text: 'Alden my screen just flashed white' },
      { time: '03:14:02', nick: 'janus', text: 'A broadcast thread just got posted to the root board. I cannot delete it' },
      { time: '03:15:40', nick: 'lucidwitch', text: 'it described my apartment Alden. It said I was sitting on my beige carpet.' },
      { time: '03:16:10', nick: 'glasshouse', text: 'It knows I am holding my lens cap' },
      { time: '03:18:22', nick: 'janus', text: 'Pulling the server power cord right now.' },
      { time: '03:19:00', nick: 'SYSTEM', text: '*** Server power terminated', isSystem: true },
      { time: '03:19:05', nick: 'janus', text: 'The power cord is in my hand. Why is the terminal still on?', isAnomalous: true },
      { time: '03:24:00', nick: 'janus', text: 'Do not look behind the monitor.', isAnomalous: true },
      { time: '03:25:19', nick: 'SYSTEM', text: '*** janus has quit (Physical EOF reached)', isSystem: true, isAnomalous: true }
    ]
  },
  {
    id: 'chat-greyline-98',
    channel: '#greyline-eng',
    server: 'internal-irc.greyline.net',
    date: '1998-11-20',
    description: 'Greyline engineering shift chat regarding Milwaukee core router anomalous temperature drop.',
    messages: [
      { time: '04:00:10', nick: 'vanhouten_d', text: 'Has anyone checked the Milwaukee caisson this morning?' },
      { time: '04:02:15', nick: 'mike_ops', text: 'Yeah, ambient temp in the room is 72F, but rack 4 chassis is frosted at 42F' },
      { time: '04:03:00', nick: 'vanhouten_d', text: 'Do not touch the fiber leads. It is absorbing entropy from the line.' }
    ]
  },
  {
    id: 'chat-marrow-laundry-98', channel: '#marrow-offtopic', server: 'irc.efnet.net:6667', date: '1998-10-23', description: 'Dorm laundry conversation later connected to the cross-city red sweater photographs.',
    messages: [
      { time: '22:08:01', nick: 'nyxgirl', text: 'who stole my red sweater from dryer 4' },
      { time: '22:08:14', nick: 'pixelpunk', text: 'the dryer accepts tribute' },
      { time: '22:09:03', nick: 'janus', text: 'check the lost shelf by the vending machines' },
      { time: '22:09:28', nick: 'nyxgirl', text: 'one mitten, calculus notes, no sweater' },
      { time: '22:10:02', nick: 'cassia_r', text: 'radio station has a red cardigan nobody owns but it has buttons not a zipper' },
      { time: '22:11:45', nick: 'unknown', text: 'it is warmer in portland', isAnomalous: true },
      { time: '22:12:01', nick: 'SYSTEM', text: '*** unknown is not on this channel', isSystem: true }
    ]
  },
  {
    id: 'chat-marrow-zine-99', channel: '#copyroom', server: 'irc.marrow.net:6697', date: '1999-02-06', description: 'Planning log for a photocopied campus zine assembled by Marrow users.',
    messages: [
      { time: '19:04:12', nick: 'pixelpunk', text: 'bring scissors glue sticks and anything that looks good at 300 percent zoom' },
      { time: '19:05:30', nick: 'nyxgirl', text: 'i have old telephone diagrams and three terrible poems' },
      { time: '19:06:02', nick: 'janus', text: 'i can print after 9 when the lab monitor stops counting pages' },
      { time: '19:07:44', nick: 'cassia_r', text: 'title idea: STATIC GARDEN' },
      { time: '19:08:01', nick: 'pixelpunk', text: 'accepted instantly no democracy needed' },
      { time: '23:52:16', nick: 'janus', text: 'printer added an extra page. black rectangle with ROOM 4 in white.' },
      { time: '23:52:40', nick: 'nyxgirl', text: 'do not include it. put it in an envelope.' }
    ]
  },
  {
    id: 'chat-afterhours-quiet-02', channel: '#kitchenlight', server: 'irc.afterhours.org:7000', date: '2002-01-20', description: 'Low-traffic support channel created for sleepless members who did not want advice.',
    messages: [
      { time: '01:01:03', nick: 'matchlight', text: 'room rule: company is allowed, interrogation is not' },
      { time: '01:02:11', nick: 'lucidwitch', text: 'adding: no diagnosing strangers and no demanding immediate replies' },
      { time: '01:03:42', nick: 'glasshouse', text: 'can we post what we are making to eat' },
      { time: '01:03:58', nick: 'janus', text: 'yes but now i have to admit dinner was cereal from a mug' },
      { time: '01:04:20', nick: 'lucidwitch', text: 'moderator sanction: use a bowl next time' },
      { time: '01:08:00', nick: 'matchlight', text: 'porch light on. no response required.' }
    ]
  },
  {
    id: 'chat-terminal21-food-02', channel: '#t21-lounge', server: 'irc.terminal21.org:6669', date: '2002-11-09', description: 'Terminal 21 lounge transcript preserved because it establishes the night-shift participants and bakery trip.',
    messages: [
      { time: '02:07:01', nick: 'rackrat', text: 'bakery run. requests?' },
      { time: '02:07:18', nick: 'root_overflow', text: 'coffee black and anything with cinnamon' },
      { time: '02:07:30', nick: 'bitrot_betty', text: 'tea. coffee after midnight makes my hands shake' },
      { time: '02:08:02', nick: 'dk_holland', text: 'one cinnamon thing for Maribel, label it CUSTOMER CARE OR ELSE' },
      { time: '02:22:14', nick: 'SYSTEM', text: '*** dk_holland has signed on from MKE-CORE-04', isSystem: true, isAnomalous: true },
      { time: '02:22:19', nick: 'rackrat', text: 'douglas you are standing next to me outside the bakery' },
      { time: '02:22:31', nick: 'dk_holland', text: 'I know. Do not answer the other session.' }
    ]
  },
  {
    id: 'chat-bluewindow-move-04', channel: '#bluewindow-expats', server: 'irc.afterhours.org:7000', date: '2004-06-02', description: 'Friends planning Noemi’s move from Madison to Chicago.',
    messages: [
      { time: '20:14:01', nick: 'noemi_c', text: 'inventory: books 7 boxes. clothes 2. kitchen 1. mysterious cables 4.' },
      { time: '20:14:20', nick: 'glasshouse', text: 'throw away zero cables. every cable becomes essential 24 hours after disposal' },
      { time: '20:15:03', nick: 'cassia_r', text: 'i am taking the basil plant because you will murder it on the highway' },
      { time: '20:15:28', nick: 'corbin_k', text: 'do not transport old modem or beige carpet' },
      { time: '20:16:01', nick: 'noemi_c', text: 'carpet already gone. modem is in evidence bag. basil has rights apparently.' }
    ]
  },
  {
    id: 'chat-palisade-response-07', channel: '#oldfriends', server: 'irc.terminal21.org:6669', date: '2007-06-20', description: 'Private response coordination after an account using Alden Corliss’s identity posted on Palisade.',
    messages: [
      { time: '04:39:02', nick: 'corbin_k', text: 'screenshot saved headers sanitized account reported' },
      { time: '04:39:19', nick: 'noemi_c', text: 'good. nobody replies. nobody clicks links.' },
      { time: '04:39:41', nick: 'glasshouse', text: 'marcus notified?' },
      { time: '04:40:03', nick: 'corbin_k', text: 'yes. i apologized before sending screenshot.' },
      { time: '04:40:18', nick: 'noemi_c', text: 'we treat this as harassment until evidence says otherwise' },
      { time: '04:41:00', nick: 'SYSTEM', text: '*** janus has joined #oldfriends', isSystem: true, isAnomalous: true },
      { time: '04:41:02', nick: 'janus', text: 'thank you for not feeding the door', isAnomalous: true },
      { time: '04:41:03', nick: 'SYSTEM', text: '*** janus has quit (No route to host)', isSystem: true, isAnomalous: true }
    ]
  },
  {
    id: 'chat-nhf-ingest-26', channel: '#ingest-review', server: 'internal.nethistoryfoundation.org', date: '2026-07-14', description: 'Foundation staff review of newly received Blue Window text from decommissioned infrastructure.',
    messages: [
      { time: '03:24:01', nick: 'scraper07', text: 'classifier recommends discarding low-value domestic tokens' },
      { time: '03:24:18', nick: 'szilard_c', text: 'override. retain all tokens and preserve original ordering' },
      { time: '03:24:44', nick: 'falk_g', text: 'agree. kettle and library fine are stronger identity markers than repeated anomaly language' },
      { time: '03:25:02', nick: 'scraper07', text: 'new inbound email received from unknown@0.0.0.0' },
      { time: '03:25:09', nick: 'szilard_c', text: 'quarantine attachment. preserve body. do not reply.' },
      { time: '03:25:11', nick: 'unknown', text: 'the basil is flowering', isAnomalous: true }
    ]
  }
];
