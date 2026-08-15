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
  }
];
