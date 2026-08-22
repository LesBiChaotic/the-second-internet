import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, ArrowRight, CornerDownLeft, Sparkles, BookmarkCheck, Trash2, Cpu } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface TerminalLog {
  id: string;
  type: 'INPUT' | 'OUTPUT' | 'ERROR' | 'SUCCESS' | 'SYSTEM';
  text: string;
}

export const ApertureTerminalView: React.FC<Props> = ({ store }) => {
  const { clearanceLevel, discoverAnomaly, pinToCaseboard } = store;
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'SYSTEM',
      text: 'SunOS 5.8 Generic_108528-29 sun4u sparc SUNW,Ultra-Enterprise-450'
    },
    {
      id: 'init-2',
      type: 'SYSTEM',
      text: 'Net History Foundation // Archaeological Recovery Terminal v4.19'
    },
    {
      id: 'init-3',
      type: 'SYSTEM',
      text: 'Connected to Substrate Gateway [0.0.0.0:1014] via Inductive Ground Return.'
    },
    {
      id: 'init-4',
      type: 'OUTPUT',
      text: 'Type "help" for a list of diagnostic commands, or "ls" to view recovered directories.'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = commandInput.trim();
    if (!raw) return;

    soundEngine.playClick(750);
    setHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: `cmd-${Date.now()}`, type: 'INPUT', text: `root@substrate:~# ${raw}` }
    ];

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'OUTPUT',
          text: `AVAILABLE ARCHAEOLOGICAL COMMANDS:
  help                     - Display this diagnostic guide
  ls [-la] [dir]           - List files in current or target directory
  cat <filepath>           - Print contents of file (/var/log/breach.log, /etc/hosts)
  traceroute <host>        - Trace packet routing hops across substrate
  finger <user@host>       - Query user plan and biographical identity
  telnet <host> [port]     - Open raw socket connection to endpoint
  unlock <passcode>        - Enter cryptanalytic override token
  uname -a                 - Print operating system kernel information
  whoami                   - Print active identity and clearance level
  clear                    - Clear the terminal screen buffer`
        });
        break;

      case 'clear':
        setLogs([]);
        setCommandInput('');
        return;

      case 'whoami':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'OUTPUT',
          text: `USER: root (Investigator Session)
CLEARANCE: ${clearanceLevel}
PERMEABILITY: HIGH
SOCKET: 0.0.0.0/room`
        });
        break;

      case 'uname':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'OUTPUT',
          text: 'SunOS aperture.nethistoryfoundation.org 5.8 Generic_108528-29 sun4u sparc SUNW,Ultra-Enterprise-450 (1998-2026)'
        });
        break;

      case 'ls':
        if (arg === '/var/log' || arg === 'var/log') {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `drwxr-xr-x   2 root     sys          512 Oct 14 03:25 .
-rw-r--r--   1 root     sys        14028 Oct 14 03:25 breach.log
-rw-r--r--   1 root     sys         8912 Nov 04 1998 caisson.log
-rw-r--r--   1 root     sys         3412 Sep 28 2019 aperture_sync.log`
          });
        } else if (arg === '/home/janus' || arg === 'home/janus') {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `-rw-r--r--   1 janus    users        1024 Oct 14 03:12 unsent.txt
-rw-r--r--   1 janus    users         512 Oct 13 22:40 .bitchxrc
-rw-r--r--   1 janus    users         256 Oct 14 03:14 .plan`
          });
        } else {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `bin/   dev/   etc/   home/   sbin/   tmp/   usr/   var/`
          });
        }
        break;

      case 'cat':
        if (arg === '/var/log/breach.log' || arg === 'breach.log') {
          soundEngine.playClearanceChime('RESEARCHER');
          discoverAnomaly('terminal-cat-breach-log');
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `=== /var/log/breach.log [OCTOBER 14, 2003] ===
03:14:00 UTC: BGP daemon (zebra-0.93b) received route table advertisement.
03:14:02 UTC: Prefix 0.0.0.0/room advertised by AS-65535 (Station Null).
03:14:05 UTC: Outbound ICMP echo to 0.0.0.0 returned latency: -4ms.
03:14:10 UTC: Subscriber "janus" (1412 E Johnson) socket connected to 0.0.0.0:1014.
03:25:00 UTC: Route withdrawn. Physical line impedance returned to nominal.
03:25:01 UTC: Host at 1412 E Johnson reported offline (No heartbeat).`
          });
        } else if (arg === '/etc/hosts' || arg === 'hosts') {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `127.0.0.1       localhost
192.168.1.1     mke-core-04.greyline.net
0.0.0.0         roomwithoutdoors.net station-null
43.0747,89.3842 1412-johnson-st.aperture`
          });
        } else if (arg === '/home/janus/unsent.txt' || arg === 'unsent.txt') {
          soundEngine.playClearanceChime('RESEARCHER');
          discoverAnomaly('terminal-cat-janus-unsent');
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `=== /home/janus/unsent.txt ===
"naomi, if you're reading this, don't unplug the hub.
the screen isn't showing a website. it's showing the other side of the room.
the lamp is on over there too.
i can see your message before you hit send.
i'm going to step across."`
          });
        } else if (arg === '/var/log/caisson.log' || arg === 'caisson.log') {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `=== /var/log/caisson.log ===
[1998-11-04 02:15:00] SENSOR MKE-04-T: Temp dropped from +72.4F to -46.1F.
[1998-11-04 02:15:22] VAN HOUTEN: "Do not cut the trunk line."
[1998-11-04 02:16:00] Harmonic lock verified at 58.4 Hz.`
          });
        } else {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'ERROR',
            text: `cat: ${arg || 'file'}: No such file or directory. Try "/var/log/breach.log" or "/home/janus/unsent.txt"`
          });
        }
        break;

      case 'traceroute':
        soundEngine.playDialupChirp();
        discoverAnomaly('terminal-traceroute-sub');
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'OUTPUT',
          text: `traceroute to ${arg || '0.0.0.0/room'} (0.0.0.0), 30 hops max, 40 byte packets
 1  mke-gw-01.greyline.net (192.168.1.1)  0.412 ms  0.380 ms
 2  chi-nap-caisson47.bell.net (10.47.0.1)  1.210 ms  1.180 ms
 3  1412-johnson-bedroom.dsl (10.14.0.4)  0.020 ms  0.018 ms
 4  aperture-standing-wave.room (0.0.0.0)  -4.102 ms  -4.088 ms [NEGATIVE LATENCY]
 5  roomwithoutdoors.net (0.0.0.0)  -4.250 ms [TARGET REACHED]`
        });
        break;

      case 'finger':
        if (arg.includes('janus')) {
          soundEngine.playClearanceChime('RESEARCHER');
          discoverAnomaly('terminal-finger-janus');
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `Login: janus                            Name: Alden Corliss
Directory: /home/janus                  Shell: /bin/tcsh
Office: Room 4, 1412 E Johnson St       Phone: 608-555-0214
On since Oct 14 03:14:02 (UTC) on pts/0 from 0.0.0.0/room
Plan:
  The light on the screen is reflecting the room.
  Do not turn off your computer.`
          });
        } else if (arg.includes('naomi') || arg.includes('nyx')) {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `Login: nyxgirl                          Name: Noemi Castille
Directory: /home/naomi                  Shell: /bin/bash
Office: Chadbourne Hall 214             Phone: 608-555-0214
Last login Oct 14 03:22 (2003) on tty1
Plan:
  "alden answer your phone. why is your handle still logged in?"`
          });
        } else if (arg.includes('vanhouten') || arg.includes('douglas')) {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'OUTPUT',
            text: `Login: d.vanhouten                      Name: Dr. Douglas K. Van Houten
Directory: /home/d.vanhouten            Shell: /bin/ksh
Title: Chief Systems Architect (Greyline) / Co-Founder (NHF)
Status: HANDSHAKE COMPLETED (Oct 14, 2019)
Plan:
  "Look for us at 0.0.0.0. The light on the screen is warm."`
          });
        } else {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'ERROR',
            text: `finger: ${arg}: user unknown. Try "finger janus@afterhours.org" or "finger vanhouten@greyline.net"`
          });
        }
        break;

      case 'telnet':
        soundEngine.playClearanceChime('LEVEL_NULL');
        discoverAnomaly('terminal-telnet-null');
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'OUTPUT',
          text: `Trying 0.0.0.0...
Connected to station-null (0.0.0.0).
Escape character is '^]'.
=====================================================
STATION NULL RESIDUAL SOCKET // LEVEL OMEGA READY
TRANSMISSION: "WE BUILT THE FIRST INTERNET TO TALK ACROSS SPACE.
THE WIRES BUILT THE SECOND INTERNET TO REMEMBER US ACROSS TIME."
=====================================================`
        });
        break;

      case 'unlock':
        const code = arg.trim().toLowerCase();
        if (code === 'caisson1998' || code === 'optics-46f' || code === 'perpendicular-bus' || code === 'living-archive' || code === '1014' || code === 'secondbus') {
          soundEngine.playClearanceChime('ARCHIVIST');
          discoverAnomaly(`unlocked-token-${code}`);
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'SUCCESS',
            text: `>>> CRYPTOGRAPHIC OVERRIDE ACCEPTED: "${code.toUpperCase()}"
>>> ANOMALY TOKEN REGISTERED IN INVESTIGATOR DOSSIER.`
          });
        } else {
          soundEngine.playClick(300);
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'ERROR',
            text: `unlock: "${code}": Invalid cryptanalytic passkey. Check Dr. Van Houten's notebook or Field Guide.`
          });
        }
        break;

      default:
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'ERROR',
          text: `${cmd}: command not found. Type "help" for available diagnostic tools.`
        });
        break;
    }

    setLogs(newLogs);
    setCommandInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setCommandInput(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setCommandInput('');
        } else {
          setHistoryIndex(nextIdx);
          setCommandInput(history[nextIdx] || '');
        }
      }
    }
  };

  const handlePinTerminal = () => {
    soundEngine.playClick(850);
    pinToCaseboard({
      type: 'TECH',
      title: 'Aperture Terminal Log Dump (0.0.0.0:1014)',
      preview: logs.slice(-2).map(l => l.text).join(' | '),
      targetView: 'APERTURE_TERMINAL',
      connectedTo: []
    });
    alert('Pinned Terminal Session to Caseboard.');
  };

  return (
    <div className="terminal-cosmetic-surface forensic-route aperture-operations-route" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '950px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div className="forensic-route-heading aperture-heading" style={{
        background: 'var(--nhf-bg-surface)',
        border: '1px solid var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Terminal size={20} color="var(--nhf-accent-blue)" />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
              Substrate Direct Access Console // SunOS 5.8
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
            Aperture UNIX Diagnostic Terminal CLI (`/bin/sh`)
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--nhf-text-secondary)', maxWidth: '650px', lineHeight: 1.55 }}>
            Interactive command-line interface into the Foundation's recovered Ultra-Enterprise server. Query user finger records, trace negative-latency packets to <code>0.0.0.0/room</code>, and execute diagnostic unlocks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handlePinTerminal}>
            <BookmarkCheck size={15} color="var(--nhf-accent-blue)" />
            <span>Pin Session</span>
          </button>
        </div>
      </div>

      {/* Retro UNIX Terminal Frame */}
      <div className="aperture-terminal-frame" style={{
        background: '#04070d',
        border: '2px solid #1e293b',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.08)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Terminal Window Header */}
        <div className="aperture-window-bar" style={{
          background: '#0a0f1d',
          borderBottom: '1px solid #1e293b',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="aperture-window-identity" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginLeft: '8px' }}>
              root@aperture.nethistoryfoundation.org: /home/janus
            </span>
          </div>

          <button
            className="btn btn-secondary"
            style={{ padding: '3px 8px', fontSize: '0.7rem' }}
            onClick={() => setLogs([])}
            title="Clear buffer"
          >
            <Trash2 size={12} />
            <span>Clear</span>
          </button>
        </div>

        {/* Scrollable Terminal Screen */}
        <div 
          style={{
            padding: '18px 20px',
            minHeight: '380px',
            maxHeight: '520px',
            overflowY: 'auto',
            overflowX: 'auto',
            wordBreak: 'break-word',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: '#38bdf8',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log) => (
            <div
              key={log.id}
              style={{
                color: log.type === 'INPUT' 
                  ? '#f8fafc' 
                  : log.type === 'ERROR' 
                    ? '#ef4444' 
                    : log.type === 'SUCCESS' 
                      ? '#10b981' 
                      : log.type === 'SYSTEM' 
                        ? '#94a3b8' 
                        : '#38bdf8',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {log.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Bar */}
        <form className="aperture-command-bar"
          onSubmit={handleCommandSubmit}
          style={{
            borderTop: '1px solid #1e293b',
            background: '#080d18',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem' }}>
            root@substrate:~#
          </span>

          <input
            ref={inputRef}
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'cat /var/log/breach.log', 'finger janus', 'telnet station-null:1014'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem'
            }}
            autoFocus
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '5px 12px', fontSize: '0.78rem' }}
          >
            <CornerDownLeft size={13} />
            <span>Enter</span>
          </button>
        </form>
      </div>
    </div>
  );
};
