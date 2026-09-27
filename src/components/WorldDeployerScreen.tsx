import React, { useState } from 'react';
import { DimensionConfig } from '../types';
import { playClick, playPop, playLevelUp } from '../utils/soundEffects';
import SpringCheck from './ui-pro/SpringCheck';
import GlideSelect from './ui-pro/GlideSelect';
import HoldButton from './ui-pro/HoldButton';

interface WorldDeployerScreenProps {
  onExecuteCommand: (cmd: string) => void;
}

export const WorldDeployerScreen: React.FC<WorldDeployerScreenProps> = ({ onExecuteCommand }) => {
  const [activeDimension, setActiveDimension] = useState<string>('overworld');
  const [worldSeed, setWorldSeed] = useState('849102938472910');
  const [worldName, setWorldName] = useState('Nebula_Prime_BDS');
  const [worldType, setWorldType] = useState<string>('Default');
  const [renderDistance, setRenderDistance] = useState(16);
  const [simulationDistance, setSimulationDistance] = useState(8);
  const [deploySuccess, setDeploySuccess] = useState(false);

  // Gamerules state
  const [gamerules, setGamerules] = useState({
    keepInventory: true,
    mobGriefing: false,
    doDaylightCycle: true,
    doWeatherCycle: true,
    naturalRegeneration: true,
    showCoordinates: true,
    tntExplodes: true,
    immediateRespawn: false,
  });

  const dimensions: DimensionConfig[] = [
    {
      id: 'overworld',
      name: 'Overworld Sector',
      themeColor: '#4CAF50',
      accentColor: '#9AE5B0',
      seed: worldSeed,
      chunksLoaded: 1240,
      activeEntities: 312,
      ambientLight: 'Dynamic Sun/Moon',
      description: 'Lush temperate biome cluster with subterranean deepslate and lush caves.',
    },
    {
      id: 'nether',
      name: 'Nether Core Architecture',
      themeColor: '#F44336',
      accentColor: '#FFA067',
      seed: worldSeed + '_N',
      chunksLoaded: 680,
      activeEntities: 148,
      ambientLight: 'Lava Glow / Fog',
      description: 'Crimson Forest and Basalt Deltas linked with 8:1 dimensional travel ratio.',
    },
    {
      id: 'end',
      name: 'The Void Outer Islands',
      themeColor: '#9C27B0',
      accentColor: '#D4BEEB',
      seed: worldSeed + '_E',
      chunksLoaded: 420,
      activeEntities: 64,
      ambientLight: 'Void Starlight',
      description: 'Purpur city clusters, chorus plant groves, and Elytra airships.',
    },
  ];

  const handleGenerateNewSeed = () => {
    playClick();
    const newSeed = Math.floor(Math.random() * 900000000000000 + 100000000000000).toString();
    setWorldSeed(newSeed);
    playPop();
  };

  const toggleGamerule = (key: keyof typeof gamerules, nextVal: boolean) => {
    playPop();
    setGamerules((prev) => ({ ...prev, [key]: nextVal }));
    onExecuteCommand(`gamerule ${key} ${nextVal}`);
  };

  const handleDeployWorld = () => {
    playClick();
    onExecuteCommand(`save hold`);
    onExecuteCommand(`say [DEPLOYER] Rebuilding dimension caches for seed ${worldSeed}...`);
    playLevelUp();
    setDeploySuccess(true);
    setTimeout(() => setDeploySuccess(false), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-entrance">
      {/* Visual Dimension Showcase Banner */}
      <div className="card-surface rounded-2xl overflow-hidden border border-[#2d2433] relative">
        <div className="relative h-44 sm:h-56 w-full">
          <img
            src="/src/assets/images/bedrock_world_banner_1790545831567.jpg"
            alt="Minecraft Bedrock Tri-Dimension World"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-80 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17131A] via-[#17131A]/40 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] text-[#FEB776] bg-[#1E1820]/90 px-2 py-0.5 rounded border border-[#352B3C] uppercase tracking-wider">
                Multi-Dimension Matrix
              </span>
              <h2 className="font-sans-ui text-xl sm:text-2xl font-bold text-[#EFE9F1] mt-1">
                World & Dimension Deployment
              </h2>
              <p className="text-xs text-[#C6BCCA] mt-0.5">
                Seed configuration, leveldb chunk allocation, and server-side gamerules.
              </p>
            </div>

            {/* HoldButton for world commit */}
            <div>
              <HoldButton
                size="md"
                radius={12}
                backgroundColor="#2D2235"
                fillColor="#FEB776"
                textColor="#FEB776"
                fillTextColor="#291307"
                holdTime={1500}
                onHold={handleDeployWorld}
                doneLabel="World Deployed ✓"
                icon={<span className="material-symbols-outlined text-[16px]">cloud_upload</span>}
                className="font-sans-ui font-bold text-xs uppercase"
              >
                Hold to Commit & Deploy
              </HoldButton>
            </div>
          </div>
        </div>
      </div>

      {/* Dimensions Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {dimensions.map((dim) => {
          const isActive = activeDimension === dim.id;
          return (
            <button
              key={dim.id}
              type="button"
              onClick={() => {
                playClick();
                setActiveDimension(dim.id);
              }}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isActive
                  ? 'card-surface border-[#FEB776] shadow-[0_0_20px_rgba(254,183,118,0.15)] ring-1 ring-[#FEB776]/50'
                  : 'bg-[#141117] border-[#2d2433] hover:border-[#352B3C]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: dim.accentColor }}
                />
                <span className="font-mono text-[10px] text-[#A89DAC]">
                  {dim.chunksLoaded} CHUNKS
                </span>
              </div>
              <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1]">{dim.name}</h3>
              <p className="text-xs text-[#A89DAC] mt-1 line-clamp-2">{dim.description}</p>
              <div className="mt-3 pt-2 border-t border-[#2d2433] flex justify-between text-[10px] font-mono text-[#C6BCCA]">
                <span>Entities: {dim.activeEntities}</span>
                <span className="text-[#FEB776]">Active</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* World Parameters Card */}
        <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-4">
          <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2 border-b border-[#2d2433] pb-3">
            <span className="material-symbols-outlined text-[18px] text-[#FEB776]">tune</span>
            WORLD SEED & SIMULATION
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-[#C6BCCA] mb-1">WORLD NAME (LEVEL-NAME)</label>
              <input
                type="text"
                value={worldName}
                onChange={(e) => setWorldName(e.target.value)}
                className="w-full bg-[#1D1823] px-3.5 py-2 rounded-lg font-mono text-xs text-[#EFE9F1] border border-[#352B3C] focus:border-[#FEB776] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-[#C6BCCA]">LEVEL SEED (BEDROCK 64-BIT)</label>
                <button
                  type="button"
                  onClick={handleGenerateNewSeed}
                  className="text-[11px] font-mono text-[#FEB776] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">casino</span>
                  Reroll Seed
                </button>
              </div>
              <input
                type="text"
                value={worldSeed}
                onChange={(e) => setWorldSeed(e.target.value)}
                className="w-full bg-[#1D1823] px-3.5 py-2 rounded-lg font-mono text-xs text-[#EFE9F1] border border-[#352B3C] focus:border-[#FEB776] focus:outline-none"
              />
            </div>

            {/* World Generator Type with GlideSelect */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-mono text-[#C6BCCA]">GENERATOR TYPE:</span>
              <GlideSelect
                value={worldType}
                onChange={(val) => setWorldType(val)}
                options={[
                  { value: 'Default', label: 'Default', tag: 'Standard Biomes' },
                  { value: 'Flat', label: 'Superflat', tag: 'Creative Testing' },
                  { value: 'LargeBiomes', label: 'Large Biomes', tag: 'Expansive' },
                ]}
                accentColor="#FEB776"
                surfaceColor="#1D1823"
                highlightColor="#352B3C"
                textColor="#EFE9F1"
                size="sm"
                radius={8}
                menuWidth={170}
                align="right"
              />
            </div>

            {/* Slider: Render Distance */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs font-mono text-[#C6BCCA]">
                <span>VIEW DISTANCE:</span>
                <span className="text-[#FEB776] font-bold">{renderDistance} Chunks</span>
              </div>
              <input
                type="range"
                min="6"
                max="32"
                value={renderDistance}
                onChange={(e) => setRenderDistance(Number(e.target.value))}
                className="w-full accent-[#FEB776] cursor-pointer"
              />
            </div>

            {/* Slider: Simulation Distance */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-[#C6BCCA]">
                <span>SIMULATION DISTANCE:</span>
                <span className="text-[#9AE5B0] font-bold">{simulationDistance} Chunks</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                value={simulationDistance}
                onChange={(e) => setSimulationDistance(Number(e.target.value))}
                className="w-full accent-[#9AE5B0] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Game Rules Card with SpringCheck Interactive Checkboxes */}
        <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-4">
          <div className="flex items-center justify-between border-b border-[#2d2433] pb-3">
            <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#FEB776]">gavel</span>
              BEDROCK GAMERULES
            </h3>
            <span className="text-[10px] font-mono text-[#9AE5B0]">Spring Animated</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(gamerules).map(([key, val]) => (
              <div
                key={key}
                className="p-2.5 rounded-lg bg-[#141117] border border-[#2d2433] hover:border-[#352B3C] flex items-center justify-between transition-colors"
              >
                <SpringCheck
                  label={key}
                  checked={val}
                  onChange={(checked) => toggleGamerule(key as keyof typeof gamerules, checked)}
                  color="#C6BCCA"
                  fillColor="#FEB776"
                  checkColor="#291307"
                  boxSize={22}
                  boxRadius={6}
                  fontSize={12}
                  strike="none"
                  ariaLabel={`Toggle gamerule ${key}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
