import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Activity, 
  Sparkles, 
  Tv, 
  CheckCircle2, 
  Compass, 
  RotateCcw,
  Sliders,
  BookmarkCheck
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface StationPreset {
  freqMhz: number;
  mode: 'AM' | 'USB' | 'CW' | 'SSTV';
  name: string;
  location: string;
  description: string;
  telemetry: string;
  isAnomalous?: boolean;
  anomalyId?: string;
}

const PRESETS: StationPreset[] = [
  {
    freqMhz: 4.625,
    mode: 'USB',
    name: 'STATION NULL // THE HYDRO-BUZZER',
    location: 'Non-Local Coordinate (1877–2026)',
    description: 'Continuous repetitive harmonic tone followed by synthesized NATO voice reading 5-character cipher blocks.',
    telemetry: 'TRANSMISSION: "T-A-N-G-O - Z-E-R-O - F-O-U-R - B-R-A-V-O - N-O-V-E-M-B-E-R // DO NOT CUT THE TRUNK."',
    isAnomalous: true,
    anomalyId: 'radio-buzzer-4625'
  },
  {
    freqMhz: 14.230,
    mode: 'SSTV',
    name: 'ROBOT-36 TELECOMMUNICATIONS BEACON',
    location: 'Madison Substation / 1412 E. Johnson',
    description: 'Slow-Scan Television (SSTV) sub-carrier transmitting raster scanlines containing encoded geographic coordinates.',
    telemetry: 'SSTV DEMODULATION: "LAT 43.0747° N, LON 89.3842° W // APERTURE ACTIVE"',
    isAnomalous: true,
    anomalyId: 'radio-sstv-14230'
  },
  {
    freqMhz: 0.0584,
    mode: 'CW',
    name: 'CRT FLYBACK ROOM 4 RESONANCE',
    location: 'Madison Apartment Bedroom (2003)',
    description: 'Very Low Frequency (VLF) inductive radiation emitted by ViewSonic cathode ray monitor.',
    telemetry: 'INDUCTIVE CARRIER: "The phosphor is still warm. Look behind the screen."',
    isAnomalous: true,
    anomalyId: 'radio-vlf-584'
  },
  {
    freqMhz: 0.120,
    mode: 'AM',
    name: 'CHICAGO 1933 ROTARY EXCHANGE PAIR 47',
    location: 'Bell System 212 W. Washington, Chicago IL',
    description: '120 BPM mechanical relay stepping cadence recorded on decommissioned step-by-step selector.',
    telemetry: 'SELECTOR LOOP: "Relay 47 permanently energized. Ground return loop open."',
    isAnomalous: true,
    anomalyId: 'radio-am-120'
  }
];

export const StationNullRadioTool: React.FC<Props> = ({ store }) => {
  const { discoverAnomaly, pinToCaseboard } = store;
  const [frequency, setFrequency] = useState<number>(4.625);
  const [selectedMode, setSelectedMode] = useState<'AM' | 'USB' | 'CW' | 'SSTV'>('USB');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sstvProgress, setSstvProgress] = useState<number>(0);
  const [decodedSignal, setDecodedSignal] = useState<StationPreset | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sstvCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Check matching preset
  useEffect(() => {
    const roundedFreq = Math.round(frequency * 1000) / 1000;
    const match = PRESETS.find(p => Math.abs(p.freqMhz - roundedFreq) < 0.005);
    
    if (match) {
      setDecodedSignal(match);
      if (match.anomalyId) {
        discoverAnomaly(match.anomalyId);
      }
      if (match.mode === 'SSTV') {
        setSelectedMode('SSTV');
      }
    } else {
      setDecodedSignal(null);
      setSstvProgress(0);
    }
  }, [frequency]);

  // SSTV Image Drawing Simulator
  useEffect(() => {
    if (decodedSignal && decodedSignal.mode === 'SSTV' && isPlaying) {
      const interval = setInterval(() => {
        setSstvProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setSstvProgress(0);
    }
  }, [decodedSignal, isPlaying]);

  // Real-time audio telemetry synthesis when demodulator is engaged
  useEffect(() => {
    if (!isPlaying) {
      soundEngine.stopTuner();
      return;
    }

    if (decodedSignal) {
      if (decodedSignal.mode === 'CW') {
        const interval = setInterval(() => {
          soundEngine.playMorseTone(0.08, 680);
        }, 340);
        return () => clearInterval(interval);
      } else if (decodedSignal.mode === 'SSTV') {
        soundEngine.setTunerFrequency(1200, 'sawtooth', 0.018);
      } else {
        soundEngine.setTunerFrequency(440, 'sine', 0.015);
      }
    } else {
      soundEngine.setTunerFrequency(180, 'triangle', 0.006);
    }

    return () => {
      soundEngine.stopTuner();
    };
  }, [isPlaying, decodedSignal]);

  // Draw Live Waterfall Spectrograph on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const render = () => {
      offset += 1;
      const w = canvas.width;
      const h = canvas.height;

      // Shift existing image down
      const imgData = ctx.getImageData(0, 0, w, h - 1);
      ctx.putImageData(imgData, 0, 1);

      // Generate new top line
      for (let x = 0; x < w; x++) {
        let noise = Math.random() * 0.35;

        // If locked on signal, draw intense harmonic bands
        if (decodedSignal) {
          const center = w / 2;
          const dist = Math.abs(x - center);
          if (dist < 8) noise = 0.95 - dist * 0.08;
          else if (Math.abs(dist - 40) < 4) noise = 0.7;
          else if (Math.abs(dist - 80) < 3) noise = 0.5;
        }

        // Color mapping
        const r = Math.floor(noise * 56);
        const g = Math.floor(noise * 189);
        const b = Math.floor(noise * 248);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, 0, 1, 1);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [decodedSignal]);

  const handleTune = (targetFreq: number, targetMode: 'AM' | 'USB' | 'CW' | 'SSTV') => {
    soundEngine.playClick(800);
    setFrequency(targetFreq);
    setSelectedMode(targetMode);
  };

  const handleToggleAudio = () => {
    if (!isPlaying) {
      soundEngine.playDialupChirp();
      setIsPlaying(true);
    } else {
      soundEngine.playClick(400);
      setIsPlaying(false);
    }
  };

  const handlePinRadio = () => {
    soundEngine.playClick(850);
    pinToCaseboard({
      type: 'TECH',
      title: `Radio Intercept: ${frequency.toFixed(3)} MHz (${selectedMode})`,
      preview: decodedSignal ? decodedSignal.telemetry : 'Carrier signal tuned across high-frequency spectrum.',
      targetView: 'RADIO_SPECTROGRAPH',
      targetId: `${frequency}`,
      connectedTo: []
    });
    alert(`Pinned Radio Intercept ${frequency.toFixed(3)} MHz to Caseboard.`);
  };

  return (
    <div className="forensic-route radio-rack-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '950px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div className="forensic-route-heading radio-rack-heading" style={{
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
            <Radio size={20} color="var(--nhf-accent-blue)" />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
              Archaeological Hardware // Receiver Rig Model R-1014
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
            Station Null Shortwave Receiver & Waterfall Spectrogram
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--nhf-text-secondary)', maxWidth: '650px', lineHeight: 1.55 }}>
            Direct software-defined radio tap into the unallocated substrate. Tune across HF and VLF bands to capture synthetic numbers station broadcasts, Morse telemetry, and SSTV image transmissions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handlePinRadio}>
            <BookmarkCheck size={15} color="var(--nhf-accent-blue)" />
            <span>Pin Telemetry</span>
          </button>
        </div>
      </div>

      {/* Main Radio Tuner Chassis */}
      <div className="radio-chassis" style={{
        background: '#0a0e17',
        border: '2px solid #1e293b',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Top Chassis Control Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '16px'
        }}>
          {/* Large Digital Frequency Readout */}
          <div style={{
            background: '#04070d',
            border: '2px inset #1e293b',
            borderRadius: '8px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            <span style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '2.8rem',
              fontWeight: 700,
              color: decodedSignal ? '#38bdf8' : '#64748b',
              letterSpacing: '0.08em',
              textShadow: decodedSignal ? '0 0 12px rgba(56, 189, 248, 0.6)' : 'none'
            }}>
              {frequency.toFixed(3)}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#94a3b8', fontWeight: 600 }}>
              MHz
            </span>
          </div>

          {/* Mode Selector Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['AM', 'USB', 'CW', 'SSTV'] as const).map(mode => (
              <button
                key={mode}
                className="btn btn-secondary"
                onClick={() => { soundEngine.playClick(700); setSelectedMode(mode); }}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  borderColor: selectedMode === mode ? '#38bdf8' : '#334155',
                  color: selectedMode === mode ? '#38bdf8' : '#94a3b8',
                  background: selectedMode === mode ? 'rgba(56, 189, 248, 0.15)' : '#0f1623'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Power / Audio Toggle Button */}
          <button
            className="btn btn-primary"
            onClick={handleToggleAudio}
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              background: isPlaying ? '#ef4444' : 'var(--nhf-accent-blue)',
              borderColor: isPlaying ? '#dc2626' : undefined
            }}
          >
            {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isPlaying ? 'Mute Demodulator' : 'Engage Demodulator'}</span>
          </button>
        </div>

        {/* Frequency Tuning Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
            <span>0.000 MHz (VLF)</span>
            <span>VFO TUNING SLIDER</span>
            <span>20.000 MHz (HF)</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="0.005"
            value={frequency}
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#38bdf8',
              cursor: 'pointer',
              height: '8px'
            }}
          />
        </div>

        {/* Presets List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {PRESETS.map(p => (
            <button
              key={p.name}
              className="btn btn-secondary"
              onClick={() => handleTune(p.freqMhz, p.mode)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '8px 12px',
                textAlign: 'left',
                background: Math.abs(frequency - p.freqMhz) < 0.01 ? 'rgba(56, 189, 248, 0.12)' : '#0f1623',
                borderColor: Math.abs(frequency - p.freqMhz) < 0.01 ? '#38bdf8' : '#1e293b'
              }}
            >
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {p.freqMhz.toFixed(3)} MHz ({p.mode})
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                {p.name}
              </span>
            </button>
          ))}
        </div>

        {/* Live Waterfall Canvas Display */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
            <span>LIVE WATERFALL SPECTROGRAPH [FFT 1024-PT]</span>
            <span style={{ color: decodedSignal ? '#10b981' : '#f59e0b' }}>
              {decodedSignal ? '● CARRIER PHASE-LOCKED' : '○ NO SIGNAL (NOISE)'}
            </span>
          </div>
          <canvas
            ref={canvasRef}
            width={850}
            height={140}
            style={{
              width: '100%',
              height: '140px',
              backgroundColor: '#030712',
              borderRadius: '6px',
              border: '1px solid #1e293b'
            }}
          />
        </div>

        {/* Decoded Signal Card */}
        {decodedSignal ? (
          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#38bdf8" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc', letterSpacing: '0.04em' }}>
                  {decodedSignal.name}
                </span>
              </div>
              <span className="badge badge-blue">📍 {decodedSignal.location}</span>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              {decodedSignal.description}
            </p>

            <div style={{
              background: '#04070d',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              padding: '10px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#38bdf8',
              lineHeight: 1.45
            }}>
              {decodedSignal.telemetry}
            </div>

            {/* SSTV Image Rendering Frame */}
            {decodedSignal.mode === 'SSTV' && (
              <div style={{
                marginTop: '10px',
                background: '#020617',
                border: '1px solid #38bdf8',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
                  <span>SSTV RASTER DEMODULATION [ROBOT-36]</span>
                  <span>PROGRESS: {sstvProgress}%</span>
                </div>

                <div style={{
                  width: '280px',
                  height: '160px',
                  backgroundColor: '#030712',
                  border: '1px dashed #38bdf8',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {sstvProgress > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${sstvProgress}%`,
                      background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.15), rgba(16, 185, 129, 0.2))',
                      borderBottom: '2px solid #38bdf8',
                      transition: 'height 0.3s ease'
                    }} />
                  )}

                  <div style={{ zIndex: 2, textAlign: 'center', padding: '10px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#f8fafc', fontWeight: 700 }}>
                      [ APERTURE ANCHOR 01 ]
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#38bdf8', marginTop: '4px' }}>
                      43.0747° N, 89.3842° W
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                      1412 E. JOHNSON ST, MADISON WI
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: '#070b12',
            border: '1px dashed #1e293b',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)'
          }}>
            [ STATIC INTERFERENCE — TUNE DIAL OR SELECT PRESET TO LOCK FREQUENCY ]
          </div>
        )}
      </div>
    </div>
  );
};
