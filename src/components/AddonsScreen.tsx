import React, { useState } from 'react';
import { AddonModule } from '../types';
import { playClick, playPop, playSuccessChime } from '../utils/soundEffects';
import RubberSegment from './ui-pro/RubberSegment';
import PulseHeart from './ui-pro/PulseHeart';
import SquishSwitch from './ui-pro/SquishSwitch';

interface AddonsScreenProps {
  onExecuteCommand: (cmd: string) => void;
}

export const AddonsScreen: React.FC<AddonsScreenProps> = ({ onExecuteCommand }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  const [addons, setAddons] = useState<(AddonModule & { likes: number; liked: boolean })[]>([
    {
      id: 'addon-1',
      title: 'Nebula RTX Definitive PBR',
      author: 'Nebula Labs',
      version: 'v2.4.1',
      category: 'Ray Tracing / RTX',
      description:
        'Volumetric water caustic shaders, physically based rendering (PBR) roughness maps, and glowing redstone circuits.',
      badge: 'RTX ULTRA',
      enabled: true,
      size: '28.4 MB',
      downloads: '142.8k',
      likes: 1240,
      liked: true,
      iconBg: 'from-amber-600 to-orange-800',
      iconEmoji: '✨',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'addon-2',
      title: 'Advanced Nether Core Behavior',
      author: 'Mojang Engine Contrib',
      version: 'v1.8.0',
      category: 'Behavior Pack',
      description:
        'Adds custom piglin bartering AI, ancient debris radar scanners, and Netherite tier 5 weapon forging mechanics.',
      badge: 'GAMEPLAY',
      enabled: true,
      size: '14.2 MB',
      downloads: '98.1k',
      likes: 852,
      liked: false,
      iconBg: 'from-red-600 to-rose-900',
      iconEmoji: '🔥',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'addon-3',
      title: 'Faithful 64x Crisp Pixel Textures',
      author: 'VoxelCrafters Studio',
      version: 'v3.1.0',
      category: 'Resource Pack',
      description:
        'High-resolution clean pixel textures maintaining canonical Minecraft vanilla aesthetics without lag.',
      badge: 'TEXTURES',
      enabled: false,
      size: '42.1 MB',
      downloads: '310.5k',
      likes: 2419,
      liked: true,
      iconBg: 'from-emerald-600 to-teal-800',
      iconEmoji: '🧱',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'addon-4',
      title: 'Security Craft & Shield Terminals',
      author: 'OP Security Foundation',
      version: 'v1.0.5',
      category: 'Gameplay Expansion',
      description:
        'Laser grids, reinforced obsidian doors, keypad locks, and wireless alarm alarms for Bedrock servers.',
      badge: 'SECURITY',
      enabled: true,
      size: '8.6 MB',
      downloads: '56.3k',
      likes: 412,
      liked: false,
      iconBg: 'from-blue-600 to-indigo-900',
      iconEmoji: '🛡️',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'addon-5',
      title: 'Dynamic Lighting & Handheld Torches',
      author: 'Luminance Engine',
      version: 'v2.0.2',
      category: 'Behavior Pack',
      description:
        'Emits dynamic light while holding torches, lanterns, glowstone, or mining helmets in offhand.',
      badge: 'LIGHTING',
      enabled: true,
      size: '4.8 MB',
      downloads: '215.0k',
      likes: 1890,
      liked: true,
      iconBg: 'from-yellow-600 to-amber-700',
      iconEmoji: '💡',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'addon-6',
      title: 'Dragon Mounts & Aerial Elytra Boosters',
      author: 'SkyHigh Devs',
      version: 'v1.4.3',
      category: 'Gameplay Expansion',
      description:
        'Tame Ender Dragons, hatch Nether drakes, and craft sonic nitro boosters for continuous gliding.',
      badge: 'EXPANSION',
      enabled: false,
      size: '19.8 MB',
      downloads: '88.7k',
      likes: 673,
      liked: false,
      iconBg: 'from-purple-600 to-violet-900',
      iconEmoji: '🐉',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  const categories = [
    { value: 'All', label: 'All Packs' },
    { value: 'Behavior Pack', label: 'Behavior' },
    { value: 'Resource Pack', label: 'Textures' },
    { value: 'Ray Tracing / RTX', label: 'RTX PBR' },
    { value: 'Gameplay Expansion', label: 'Expansion' },
  ];

  const filteredAddons =
    activeCategory === 'All'
      ? addons
      : addons.filter((item) => item.category === activeCategory);

  const toggleAddon = (id: string, name: string) => {
    playPop();
    setAddons((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.enabled;
          const statusText = nextState ? 'Enabled' : 'Disabled';
          onExecuteCommand(`reload ${id}`);
          setNotification(`${name} has been ${statusText.toLowerCase()}`);
          setTimeout(() => setNotification(null), 2500);
          return { ...item, enabled: nextState };
        }
        return item;
      })
    );
    playSuccessChime();
  };

  const handleLikeChange = (addonId: string, liked: boolean, count: number) => {
    playClick();
    setAddons((prev) =>
      prev.map((item) =>
        item.id === addonId ? { ...item, liked, likes: count } : item
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-entrance">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#18221D] border border-[#2B4C38] text-[#9AE5B0] p-3 rounded-xl flex items-center gap-2 font-mono text-xs shadow-lg animate-entrance">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="card-surface p-5 rounded-xl border border-[#2d2433] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-sans-ui text-lg font-bold text-[#EFE9F1] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FEB776]">extension</span>
            Bedrock Addons & Behavior Engine
          </h2>
          <p className="text-xs text-[#A89DAC] mt-0.5">
            Hot-load .mcaddon and .mcpack scripts with zero-lag physics.
          </p>
        </div>

        {/* RubberSegment Category Filter */}
        <div className="overflow-x-auto max-w-full pb-1 md:pb-0">
          <RubberSegment
            items={categories}
            value={activeCategory}
            onChange={(val) => {
              playClick();
              setActiveCategory(val);
            }}
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

      {/* Addon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAddons.map((addon) => (
          <div
            key={addon.id}
            className={`card-surface rounded-xl border transition-all flex flex-col justify-between overflow-hidden group ${
              addon.enabled
                ? 'border-[#352B3C] shadow-md'
                : 'border-[#2d2433] opacity-75'
            }`}
          >
            {/* Visual Header / Cover Image Fallback */}
            <div className="relative h-28 w-full overflow-hidden bg-[#100D14]">
              {addon.imageUrl ? (
                <img
                  src={addon.imageUrl}
                  alt={addon.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 contrast-110"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-r ${addon.iconBg} opacity-40`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17131A] via-transparent to-black/30" />
              <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-black/60 text-[#FEB776] border border-[#FEB776]/30 backdrop-blur-xs uppercase">
                  {addon.badge}
                </span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/60 text-[#C6BCCA] backdrop-blur-xs">
                  {addon.version}
                </span>
              </div>
              <div className="absolute top-2.5 right-3 text-lg">{addon.iconEmoji}</div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] group-hover:text-[#FEB776] transition-colors">
                  {addon.title}
                </h3>
                <div className="text-[10px] text-[#A89DAC] font-mono mt-0.5">
                  by {addon.author} · {addon.category}
                </div>
                <p className="text-xs text-[#C6BCCA] mt-2 line-clamp-3 leading-relaxed">
                  {addon.description}
                </p>
              </div>

              {/* Footer with PulseHeart Like Counter & SquishSwitch */}
              <div className="pt-3 mt-3 border-t border-[#2d2433] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PulseHeart
                    liked={addon.liked}
                    count={addon.likes}
                    size={28}
                    pillColor="#141117"
                    likedColor="#ff4d6d"
                    idleColor="#8b8b93"
                    textColor="#EFE9F1"
                    onChange={(liked, count) => handleLikeChange(addon.id, liked, count)}
                  />
                  <span className="text-[10px] font-mono text-[#A89DAC] hidden sm:inline">
                    {addon.downloads} dl
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono ${
                      addon.enabled ? 'text-[#9AE5B0]' : 'text-[#A89DAC]'
                    }`}
                  >
                    {addon.enabled ? 'ACTIVE' : 'OFF'}
                  </span>
                  <SquishSwitch
                    checked={addon.enabled}
                    onChange={() => toggleAddon(addon.id, addon.title)}
                    trackColor="#27272a"
                    trackOnColor="#9AE5B0"
                    thumbOnColor="#0a2a16"
                    width={48}
                    height={24}
                    radius={12}
                    speed={65}
                    stretch={42}
                    ariaLabel={`Toggle ${addon.title}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
