import React, { useState, useEffect, useRef } from 'react';
import { Radio, Volume2, VolumeX, Activity, Lock, Unlock, Play, Square, BookmarkPlus, Zap } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface SignalPreset {
  id: string;
  name: string;
  targetFreq: number;
  waveType: 'sine' | 'sawtooth' | 'triangle';
  description: string;
  decryptedMessage: string;
  isAnomalous?: boolean;
}

const PRESETS: SignalPreset[] = [
  {
    id: 'freq-crt-58',
    name: '58.4 Hz // Cathode Flyback & Room Resonance',
    targetFreq: 58.4,
    waveType: 'sine',
    description: 'The exact frequency recorded by Madison police in Alden Corliss\'s room. Emitted continuously by his ViewSonic CRT monitor.',
    decryptedMessage: '[RECONSTRUCTED TELEMETRY]: "The window does not open from the street. The light on the screen is reflecting the second bus."',
    isAnomalous: true
  },
  {
    id: 'freq-mains-120',
    name: '120.0 Hz // Chicago Exchange #47 Ground Loop',
    targetFreq: 120.0,
    waveType: 'sawtooth',
    description: 'Electrical transformer baseline captured at Bell System 212 W Washington exchange.',
    decryptedMessage: '[EXCHANGE 47 TRACE]: "Selector relays stepping on pair 47. 1,400 active subscribers holding on unrouted dial tone."'
  },
  {
    id: 'freq-modem-1200',
    name: '1200.0 Hz // Bell 202 FSK Mark Tone',
    targetFreq: 1200.0,
    waveType: 'sine',
    description: 'Standard 1990s analog modem carrier frequency for binary 1 transmissions.',
    decryptedMessage: '[MODEM DATA BLOCK]: "SYN SYN ACK :: HOST NYXGIRL CONNECTED TO MSN-POP-02 :: DUPLEX VOLTAGE NOMINAL"'
  },
  {
    id: 'freq-modem-2400',
    name: '2400.0 Hz // V.22bis Space Frequency',
    targetFreq: 2400.0,
    waveType: 'triangle',
    description: 'High-band quadrant modulation tone utilized during 2400 baud handshake negotiations.',
    decryptedMessage: '[ROUTING OVERRIDE]: "MKE-CORE-04 ACCEPTED BGP ADVERTISEMENT FOR UNALLOCATED SUBNET 0.0.0.0/ROOM"'
  },
  {
    id: 'freq-null-4625',
    name: '4625.0 Hz // Station Null Shortwave Harmonics',
    targetFreq: 4625.0,
    waveType: 'sawtooth',
    description: 'Electromagnetic harmonics of Siberian / Scottish coastal telecommunications beacons.',
    decryptedMessage: '[VOICE RECONSTRUCTION]: "STATION NULL TO ALL INTERMEDIARIES: DO NOT CUT THE WIRE. WE ARE LISTENING."',
    isAnomalous: true
  }
];

export const CarrierTunerTool: React.FC<Props> = ({ store }) => {
  const { discoverAnomaly, pinToCaseboard } = store;
  const [frequency, setFrequency] = useState<number>(58.4);
  const [waveType, setWaveType] = useState<'sine' | 'sawtooth' | 'triangle'>('sine');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.04);
  const [lockedSignal, setLockedSignal] = useState<SignalPreset | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Check signal lock whenever frequency changes
  useEffect(() => {
    const matched = PRESETS.find(p => Math.abs(p.targetFreq - frequency) < 0.8);
    if (matched) {
      setLockedSignal(matched);
      if (matched.isAnomalous) {
        discoverAnomaly(`tuner-lock-${matched.id}`);
      }
    } else {
      setLockedSignal(null);
    }
  }, [frequency, discoverAnomaly]);

  // Handle active audio frequency adjustments
  useEffect(() => {
    if (isPlaying) {
      soundEngine.setTunerFrequency(frequency, waveType, volume);
    } else {
      soundEngine.stopTuner();
    }
    return () => {
      soundEngine.stopTuner();
    };
  }, [isPlaying, frequency, waveType, volume]);

  // Real-time Canvas Oscilloscope render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = soundEngine.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 128;
    const dataArray = new Uint8Array(bufferLength);

    let phase = 0;

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;

      // Dark phosphor background
      ctx.fillStyle = '#050a0f';
      ctx.fillRect(0, 0, width, height);

      // Draw Green Gridlines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshairs
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Oscilloscope Trace
      ctx.lineWidth = 2;
      ctx.strokeStyle = lockedSignal ? '#38bdf8' : isPlaying ? '#10b981' : '#334155';
      ctx.shadowColor = lockedSignal ? '#38bdf8' : '#10b981';
      ctx.shadowBlur = isPlaying ? 8 : 0;
      ctx.beginPath();

      if (isPlaying && analyser) {
        analyser.getByteTimeDomainData(dataArray);
        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
      } else if (isPlaying) {
        // Fallback procedural wave
        phase += 0.05;
        for (let x = 0; x < width; x++) {
          const normX = (x / width) * Math.PI * 4;
          const y = (height / 2) + Math.sin(normX * (frequency / 20) + phase) * 35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        // Flat baseline
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    draw();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, frequency, lockedSignal]);

  const togglePlayback = () => {
    soundEngine.playClick(800);
    setIsPlaying(!isPlaying);
  };

  const handleSelectPreset = (preset: SignalPreset) => {
    soundEngine.playClick(650);
    setFrequency(preset.targetFreq);
    setWaveType(preset.waveType);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePin = () => {
    if (!lockedSignal) return;
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'TECH',
      title: `Signal: ${lockedSignal.name}`,
      preview: `${lockedSignal.description} • Decoded: ${lockedSignal.decryptedMessage}`,
      targetView: 'TUNER',
      connectedTo: []
    });
    alert(`Pinned signal ${lockedSignal.name} to Caseboard.`);
  };

  return (
    <div className="forensic-route carrier-bench-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div className="forensic-route-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Radio size={20} color="#10b981" />
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Archival Telecommunications Instrumentation // Lab Tool #07
          </span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
          Carrier Resonance Frequency Tuner & Demodulator
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.6 }}>
          Live Web Audio synthesis and real-time cathode oscilloscope. Drag the tuner dial across electromagnetic spectrum bands to locate resonant carrier hums, recover 1990s modem handshakes, and demodulate classified telecom packets.
        </p>
      </div>

      {/* Main Grid: Oscilloscope Canvas + Control Dashboard */}
      <div className="responsive-grid-sidebar signal-bench-grid" style={{ gap: '20px' }}>
        {/* Left: Oscilloscope Screen */}
        <div style={{
          backgroundColor: '#03070d',
          border: '1px solid #1e293b',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} /> LIVE CRT PHOSPHOR TRACE
            </span>
            <span style={{ color: lockedSignal ? '#38bdf8' : isPlaying ? '#34d399' : '#64748b' }}>
              STATUS: {lockedSignal ? 'CARRIER SYNCHRONIZED' : isPlaying ? 'SCANNING BAND...' : 'OSCILLATOR MUTED'}
            </span>
          </div>

          {/* HTML5 Canvas */}
          <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#020508', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <canvas
              ref={canvasRef}
              width={560}
              height={240}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
            {lockedSignal && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid #38bdf8',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Unlock size={12} /> SIGNAL LOCKED (±0.8Hz)
              </div>
            )}
          </div>

          {/* Decoded Telemetry Box */}
          <div style={{
            backgroundColor: '#070c14',
            border: '1px solid #1e293b',
            borderRadius: '4px',
            padding: '14px',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>DEMODULATOR OUTPUT BUFFER:</span>
              {lockedSignal && (
                <button
                  onClick={handlePin}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}
                >
                  <BookmarkPlus size={12} /> Pin Signal
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: lockedSignal ? '#38bdf8' : '#64748b', marginTop: '6px', lineHeight: 1.5 }}>
              {lockedSignal ? lockedSignal.decryptedMessage : '[NO CARRIER LOCK DETECTED — SCAN DIAL TO MATCH HARMONIC FREQUENCIES]'}
            </div>

            {lockedSignal && (
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '8px', borderTop: '1px dashed #1e293b', paddingTop: '6px' }}>
                Source: {lockedSignal.description}
              </div>
            )}
          </div>
        </div>

        {/* Right: Tuner Controls */}
        <div style={{
          backgroundColor: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Main Play/Stop Button */}
          <button
            onClick={togglePlayback}
            className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
            style={{
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.92rem'
            }}
          >
            {isPlaying ? (
              <>
                <Square size={16} />
                <span>MUTE OSCILLATOR</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>ENGAGE OSCILLATOR</span>
              </>
            )}
          </button>

          {/* Frequency Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-secondary)' }}>
                TUNING FREQUENCY:
              </label>
              <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--nhf-accent-blue)' }}>
                {frequency.toFixed(1)} Hz
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="5000"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)', marginTop: '2px' }}>
              <span>20 Hz (VLF)</span>
              <span>1200 Hz</span>
              <span>5000 Hz (Shortwave)</span>
            </div>
          </div>

          {/* Waveform Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-secondary)', marginBottom: '6px' }}>
              WAVEFORM SYNTHESIS:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['sine', 'sawtooth', 'triangle'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => { soundEngine.playClick(600); setWaveType(w); }}
                  className={`btn ${waveType === w ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1, padding: '6px', fontSize: '0.78rem', textTransform: 'capitalize', borderRadius: '6px' }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Volume2 size={13} /> GAIN:
              </label>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-secondary)' }}>
                {Math.round(volume * 1000)}%
              </span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.08"
              step="0.005"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Recovered Frequency Presets */}
          <div style={{ borderTop: '1px dashed var(--nhf-border)', paddingTop: '12px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              RECORDED CARRIER PRESETS (CLICK TO LOCK):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  style={{
                    textAlign: 'left',
                    backgroundColor: Math.abs(frequency - p.targetFreq) < 0.8 ? 'rgba(56, 189, 248, 0.15)' : 'var(--nhf-bg-card)',
                    border: '1px solid',
                    borderColor: Math.abs(frequency - p.targetFreq) < 0.8 ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: 'var(--nhf-text-primary)',
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ fontWeight: 600, color: p.isAnomalous ? '#f87171' : '#38bdf8' }}>
                    {p.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
