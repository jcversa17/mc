import React, { useState } from 'react';
import { MascotType } from '../types';
import { MascotDisplay } from './MascotDisplay';
import {
  playClick,
  playCreeperHiss,
  playLevelUp,
  playPop,
  playSuccessChime,
} from '../utils/soundEffects';
import RubberSegment from './ui-pro/RubberSegment';
import PulseHeart from './ui-pro/PulseHeart';
import SpecularButton from './ui-pro/SpecularButton';

interface MascotLoungeScreenProps {
  currentMascot: MascotType;
  setCurrentMascot: (m: MascotType) => void;
}

export const MascotLoungeScreen: React.FC<MascotLoungeScreenProps> = ({
  currentMascot,
  setCurrentMascot,
}) => {
  const [customPhrase, setCustomPhrase] = useState('');
  const [activeSpeech, setActiveSpeech] = useState('Hello!');
  const [mascotLikes, setMascotLikes] = useState<Record<string, number>>({
    creeper: 4210,
    enderman: 3120,
    warden: 2840,
    steve: 1980,
    axolotl: 5430,
  });

  const mobs: { id: MascotType; name: string; tag: string; description: string }[] = [
    {
      id: 'creeper',
      name: 'Creeper Mascot',
      tag: 'CANONICAL MOB',
      description: 'The iconic green pixel mascot from the Nebula Craft login terminal deck.',
    },
    {
      id: 'enderman',
      name: 'Ender Sentinel',
      tag: 'VOID PROTECTOR',
      description: 'Tall void dweller with purple glowing eyes and dimensional teleport particles.',
    },
    {
      id: 'warden',
      name: 'Sculk Warden',
      tag: 'DEEP DARK GUARDIAN',
      description: 'Pulsing cyan sonic sculk heart and acoustic telemetry monitoring.',
    },
    {
      id: 'steve',
      name: 'Steve Diamond Operator',
      tag: 'LVL 4 OP SUIT',
      description: 'Fully enchanted diamond armor vanguard ready to deploy BDS clusters.',
    },
    {
      id: 'axolotl',
      name: 'Pink Axolotl Scout',
      tag: 'AQUATIC RECON',
      description: 'Friendly regenerating companion bringing luck to all server deployments.',
    },
  ];

  const handleMobSelect = (id: MascotType) => {
    playClick();
    setCurrentMascot(id);
    if (id === 'creeper') {
      playCreeperHiss();
    } else {
      playPop();
    }
  };

  const handleUpdateSpeech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPhrase.trim()) return;
    playClick();
    setActiveSpeech(customPhrase.trim());
    playSuccessChime();
    setCustomPhrase('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-entrance">
      <div className="card-surface p-5 rounded-xl border border-[#2d2433] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-sans-ui text-lg font-bold text-[#EFE9F1] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FEB776]">pets</span>
            Companion Mascot Lounge & Sound Deck
          </h2>
          <p className="text-xs text-[#A89DAC] mt-0.5">
            Switch your deployment mascot, test Web Audio synthesis, and customize panel dialogues.
          </p>
        </div>

        {/* Rubber Segment Switcher */}
        <div className="overflow-x-auto max-w-full pb-1 md:pb-0">
          <RubberSegment
            items={[
              { value: 'creeper', label: 'Creeper' },
              { value: 'enderman', label: 'Enderman' },
              { value: 'warden', label: 'Warden' },
              { value: 'steve', label: 'Steve' },
              { value: 'axolotl', label: 'Axolotl' },
            ]}
            value={currentMascot}
            onChange={(val) => handleMobSelect(val as MascotType)}
            trackColor="#141117"
            thumbColor="#FEB776"
            textColor="#A89DAC"
            activeTextColor="#291307"
            size="sm"
            radius={8}
            speed={1.1}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mob Selector & Speech Maker & Soundboard */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mob Selection Grid */}
          <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-3">
            <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#FEB776]">
                smart_toy
              </span>
              ACTIVE PANEL MASCOT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mobs.map((m) => {
                const isSelected = currentMascot === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMobSelect(m.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#251B2E] border-[#FEB776] shadow-[0_0_15px_rgba(254,183,118,0.2)] ring-1 ring-[#FEB776]'
                        : 'bg-[#141117] border-[#2d2433] hover:border-[#352B3C]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans-ui font-bold text-xs text-[#EFE9F1]">
                        {m.name}
                      </span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#1D1823] text-[#9AE5B0] border border-[#352B3C]">
                        {m.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A89DAC] mt-1.5 leading-relaxed">
                      {m.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speech Bubble Customizer with SpecularButton */}
          <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-3">
            <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#FEB776]">
                chat_bubble
              </span>
              CUSTOMIZE MASCOT DIALOGUE
            </h3>
            <form onSubmit={handleUpdateSpeech} className="flex gap-2">
              <input
                type="text"
                value={customPhrase}
                onChange={(e) => setCustomPhrase(e.target.value)}
                placeholder="Type a new speech message for the sign (e.g. Cluster ready!, Welcome Admin)..."
                className="w-full bg-[#1D1823] px-3.5 py-2 rounded-lg font-sans-ui text-xs text-[#EFE9F1] border border-[#352B3C] focus:border-[#FEB776] focus:outline-none"
              />
              <SpecularButton
                size="sm"
                radius={8}
                tint="#FEB776"
                tintOpacity={0.2}
                textColor="#FEB776"
                lineColor="#FEB776"
                baseColor="#352B3C"
                intensity={1.2}
                onClick={handleUpdateSpeech as any}
                className="bg-[#2D2235] border border-[#4E3D62] text-xs font-bold uppercase shrink-0 px-4"
              >
                Say Phrase
              </SpecularButton>
            </form>
          </div>

          {/* Web Audio Soundboard */}
          <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-3">
            <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#FEB776]">
                volume_up
              </span>
              RETRO MINECRAFT SOUNDBOARD (WEB AUDIO API)
            </h3>
            <p className="text-xs text-[#A89DAC]">
              100% synthesized in-browser, no external audio network requests required.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <button
                type="button"
                onClick={playCreeperHiss}
                className="p-3 rounded-lg bg-[#1D1823] hover:bg-[#2A2033] border border-[#352B3C] text-center cursor-pointer transition-colors"
              >
                <div className="text-lg">💥</div>
                <div className="text-xs font-mono font-bold text-[#FEB776] mt-1">Creeper Hiss</div>
                <div className="text-[10px] text-[#A89DAC]">Sssssssss...</div>
              </button>

              <button
                type="button"
                onClick={playLevelUp}
                className="p-3 rounded-lg bg-[#1D1823] hover:bg-[#2A2033] border border-[#352B3C] text-center cursor-pointer transition-colors"
              >
                <div className="text-lg">⭐</div>
                <div className="text-xs font-mono font-bold text-[#9AE5B0] mt-1">Level Up Chime</div>
                <div className="text-[10px] text-[#A89DAC]">XP Chord</div>
              </button>

              <button
                type="button"
                onClick={playPop}
                className="p-3 rounded-lg bg-[#1D1823] hover:bg-[#2A2033] border border-[#352B3C] text-center cursor-pointer transition-colors"
              >
                <div className="text-lg">🎈</div>
                <div className="text-xs font-mono font-bold text-[#D4BEEB] mt-1">Item Pop</div>
                <div className="text-[10px] text-[#A89DAC]">Pickup tick</div>
              </button>

              <button
                type="button"
                onClick={playClick}
                className="p-3 rounded-lg bg-[#1D1823] hover:bg-[#2A2033] border border-[#352B3C] text-center cursor-pointer transition-colors"
              >
                <div className="text-lg">🔘</div>
                <div className="text-xs font-mono font-bold text-[#FFA067] mt-1">Block Click</div>
                <div className="text-[10px] text-[#A89DAC]">Switch trigger</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Interactive Mascot Preview Stage */}
        <div className="card-surface rounded-xl p-6 border border-[#2d2433] flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[#FEB776]/5 via-transparent to-transparent pointer-events-none" />
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-[#A89DAC] uppercase tracking-wider">
              Live Companion Stage
            </span>
            <PulseHeart
              liked={true}
              count={mascotLikes[currentMascot] || 2500}
              size={26}
              pillColor="#141117"
              likedColor="#ff4d6d"
              idleColor="#8b8b93"
              textColor="#EFE9F1"
              onChange={(_liked, count) => {
                setMascotLikes((prev) => ({ ...prev, [currentMascot]: count }));
              }}
            />
          </div>
          <MascotDisplay currentMascot={currentMascot} customQuote={activeSpeech} />
          <div className="mt-8 text-center text-xs text-[#A89DAC]">
            Click the speech bubble or mascot to interact!
          </div>
        </div>
      </div>
    </div>
  );
};
