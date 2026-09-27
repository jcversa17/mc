import React, { useState } from 'react';
import { MascotType } from '../types';
import { playClick, playCreeperHiss, playPop } from '../utils/soundEffects';

interface MascotDisplayProps {
  currentMascot?: MascotType;
  customQuote?: string;
  onMascotClick?: () => void;
  interactive?: boolean;
}

export const MascotDisplay: React.FC<MascotDisplayProps> = ({
  currentMascot = 'creeper',
  customQuote,
  onMascotClick,
  interactive = true,
}) => {
  const [clickedTimes, setClickedTimes] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState(customQuote || 'Hello!');

  const creeperQuotes = [
    'Hello!',
    'Cluster nominal!',
    'Sssssssss... 💥',
    'Port 19132 ready!',
    'TPS: 20.0 stable!',
    'Nether Core hot!',
    'Ready to craft?',
    'OP LVL 4 verified.',
  ];

  const handleClick = () => {
    if (!interactive) return;
    setIsWobbling(true);
    setClickedTimes((prev) => prev + 1);

    if (currentMascot === 'creeper') {
      playCreeperHiss();
    } else {
      playPop();
    }

    const nextQuote = creeperQuotes[(clickedTimes + 1) % creeperQuotes.length];
    setActiveSpeech(nextQuote);

    setTimeout(() => {
      setIsWobbling(false);
    }, 600);

    if (onMascotClick) {
      onMascotClick();
    }
  };

  return (
    <div className="flex flex-col items-center relative select-none w-full max-w-[260px]">
      {/* Speech Bubble */}
      <div className="relative z-30 mb-3 animate-bubble-pop">
        <div
          onClick={() => {
            playClick();
            const nextQuote = creeperQuotes[Math.floor(Math.random() * creeperQuotes.length)];
            setActiveSpeech(nextQuote);
          }}
          className="mc-sign-bubble px-4 py-2 text-center rounded-lg relative cursor-pointer hover:border-[#FEB776] transition-all hover:scale-105 active:scale-95"
          title="Click to talk"
        >
          <span className="font-minecraft text-xs text-[#EFE9F1] font-bold tracking-wider inline-block">
            {customQuote || activeSpeech}
          </span>
          {/* Downward-pointing triangular speech tail */}
          <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#1E1820]" />
          <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#352B3C] -z-10" />
        </div>
      </div>

      {/* Mascot Mob Render */}
      <div
        onClick={handleClick}
        className={`relative z-20 flex flex-col items-center drop-shadow-[0_12px_24px_rgba(7,6,8,0.9)] cursor-pointer transition-transform duration-200 ${
          isWobbling ? 'scale-110 rotate-3' : 'hover:scale-105'
        }`}
        title="Click me!"
      >
        {currentMascot === 'creeper' && (
          <div className="animate-creeper-idle relative flex flex-col items-center select-none filter drop-shadow-[0_8px_16px_rgba(7,6,8,0.9)]">
            {/* Head: 8x8 texels -> 80x80px */}
            <div
              className="pixelated relative z-10 rounded-[2px]"
              style={{
                width: '80px',
                height: '80px',
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5pUxNhn1vRdxJA4Nl4gQ0OZKC3Q9Hju4dlXHbX0FMbd06qz2qIKC5CnyyVSOuHnJ5HjOIPb4ozKmU-ricPV2_1B8G1M5EtK1WjC81Ym7T_mNh2E4wqZkhR6ECXimpK4HaSbPF_9U834Hpocv0t5en99YYDvQAYccEjPJvwmlReqsh0-WkKv7kgeg6DeWJrDaKrg53g26t81LRVHCIhU72XOOFq1cYw9pCOmUBVLyOIYbdQ-oSSYy602Oe1pRNZKRJbA')",
                backgroundSize: '640px 320px',
                backgroundPosition: '-80px -80px',
              }}
            />

            {/* Torso / Body: 8x12 texels -> 80x120px */}
            <div
              className="pixelated relative z-10"
              style={{
                width: '80px',
                height: '120px',
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIfwb3FpsaVR5PABADybMt-8u5JOYWvVpwJB9HHqkLLrd3_zOEpXxJsc25Z77tDgByWXPc5zQuQV03KL2cWpp3bFgCHJuNHZ-2W7x84ilvo1ZfmHe8l3BRlfaQRR995mi1_ipUt8vnKP3UkfYGEkdQJXLyZSqX6BLmrNcwi-wcRRTxGDQ1b1X_gDQMOfwBcxBjHtJzKy_zkYIQPcFtQyivp-IoHJbwAB_SIVWPXwH2nuHS8FMNItfhsXuqyDdVAJlG2w')",
                backgroundSize: '640px 320px',
                backgroundPosition: '-200px -200px',
              }}
            />

            {/* Front Legs: 2 legs side by side, each 4x6 texels -> 40x60px */}
            <div className="flex justify-center items-center relative z-10 w-[80px]">
              <div
                className="pixelated relative"
                style={{
                  width: '40px',
                  height: '60px',
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaVeXesj1kkogx5IfhiLyVhMj9AehKWwyFqy-PknNSCBqrIDQ1vpNzl_pcubTMIEQ_qXysX3HCro_hGc9PwQ4p44jjbdbsY3RJxnK1TfjHgVBCLx9oYWpYdPhtdM8UFzv8J6FFj-7JQcmmYu_JMUC8Liqn41jlMk4y3gMyjCm0jOXVrx9wpTaWRygT024wWRDes28Ih2VO8C0JCsvJq5Ye3cSNewHCM5ayJ4kwoDRyaVRAmQlePXBOvrIaPBbGGGgzGQ')",
                  backgroundSize: '640px 320px',
                  backgroundPosition: '-40px -200px',
                  boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.25)',
                }}
              />
              <div
                className="pixelated relative"
                style={{
                  width: '40px',
                  height: '60px',
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkFqWmeo8E4SVpa_JY7C48IBL2jzs9y_YfIiZDH5KGzh1fXR1di8T0J7FLydyZbQIC7ZYMgvwK5i_A401CA5kYZkGAG5snN8tQQVQI50LwVTHZy7e0fah7n0ri5w3e__ZYswHNVgA5_ecAHmRWLNfTj2aJxAEj6CHtU5rimg46MQO2G7D9n5tdIUUwyr8R2xLEh4r4Ksp3pBoWHY8Z4MHshN9QLUVCGXAh2RS3CNHqzCPoemQgSzKM-3AEKhoiUtSBxA')",
                  backgroundSize: '640px 320px',
                  backgroundPosition: '-40px -200px',
                  boxShadow: 'inset 1px 0 0 rgba(0,0,0,0.15)',
                }}
              />
            </div>
          </div>
        )}

        {currentMascot === 'enderman' && (
          <div className="relative flex flex-col items-center select-none animate-creeper-idle">
            {/* Enderman Head */}
            <div className="w-[64px] h-[64px] bg-[#120F16] border border-[#2D1B4E] relative shadow-lg">
              <div className="absolute top-[28px] left-[10px] w-[14px] h-[6px] bg-[#B565F3] shadow-[0_0_8px_#E0A5FF]" />
              <div className="absolute top-[28px] right-[10px] w-[14px] h-[6px] bg-[#B565F3] shadow-[0_0_8px_#E0A5FF]" />
              <div className="absolute top-[30px] left-[14px] w-[6px] h-[3px] bg-[#FFFFFF]" />
              <div className="absolute top-[30px] right-[14px] w-[6px] h-[3px] bg-[#FFFFFF]" />
            </div>
            {/* Slender Enderman Body */}
            <div className="w-[36px] h-[130px] bg-[#0E0C12] border-x border-[#201830] relative">
              <div className="absolute -left-[14px] top-0 w-[12px] h-[160px] bg-[#0A080E] border border-[#2D1B4E]/60" />
              <div className="absolute -right-[14px] top-0 w-[12px] h-[160px] bg-[#0A080E] border border-[#2D1B4E]/60" />
            </div>
            {/* Long Legs */}
            <div className="flex gap-2 w-[40px] justify-between">
              <div className="w-[14px] h-[80px] bg-[#0B0910]" />
              <div className="w-[14px] h-[80px] bg-[#0B0910]" />
            </div>
          </div>
        )}

        {currentMascot === 'warden' && (
          <div className="relative flex flex-col items-center select-none animate-creeper-idle">
            {/* Warden Antlers */}
            <div className="flex justify-between w-[96px] mb-[-6px] relative z-20">
              <div className="w-[18px] h-[24px] bg-[#0A333A] border border-[#00FFFF]/40 shadow-[0_0_6px_#00FFFF]" />
              <div className="w-[18px] h-[24px] bg-[#0A333A] border border-[#00FFFF]/40 shadow-[0_0_6px_#00FFFF]" />
            </div>
            {/* Warden Head */}
            <div className="w-[88px] h-[70px] bg-[#0B1E24] border border-[#16505C] relative flex items-center justify-center">
              <div className="w-[40px] h-[20px] bg-[#040C0F] border border-[#0A333A]" />
            </div>
            {/* Warden Torso with glowing sculk heart */}
            <div className="w-[96px] h-[120px] bg-[#08171C] border border-[#16505C] relative flex items-center justify-center">
              <div className="w-[32px] h-[32px] bg-[#005566] border border-[#00FFFF] rounded shadow-[0_0_12px_#00FFFF] animate-pulse flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-[#00FFFF]">graphic_eq</span>
              </div>
            </div>
            {/* Warden Heavy Legs */}
            <div className="flex justify-center gap-1 w-[80px]">
              <div className="w-[36px] h-[55px] bg-[#061216] border border-[#103E48]" />
              <div className="w-[36px] h-[55px] bg-[#061216] border border-[#103E48]" />
            </div>
          </div>
        )}

        {currentMascot === 'steve' && (
          <div className="relative flex flex-col items-center select-none animate-creeper-idle">
            {/* Diamond Helm */}
            <div className="w-[72px] h-[72px] bg-[#49B3A9] border border-[#85F1E5] relative shadow-md">
              {/* Face */}
              <div className="absolute bottom-2 left-3 right-3 h-[32px] bg-[#BA8C63] flex flex-col justify-end px-1 pb-1">
                <div className="flex justify-between px-1">
                  <div className="w-[6px] h-[6px] bg-[#224488]" />
                  <div className="w-[6px] h-[6px] bg-[#224488]" />
                </div>
                <div className="w-[12px] h-[4px] bg-[#61361F] mx-auto mt-1" />
              </div>
            </div>
            {/* Diamond Armor Body */}
            <div className="w-[72px] h-[100px] bg-[#2C857D] border border-[#85F1E5] relative">
              <div className="absolute -left-[18px] top-0 w-[18px] h-[90px] bg-[#206760] border-t border-l border-[#85F1E5]" />
              <div className="absolute -right-[18px] top-0 w-[18px] h-[90px] bg-[#206760] border-t border-r border-[#85F1E5]" />
            </div>
            {/* Diamond Greaves */}
            <div className="flex w-[72px]">
              <div className="w-[36px] h-[65px] bg-[#1E5D57] border-r border-[#0D3834]" />
              <div className="w-[36px] h-[65px] bg-[#1E5D57]" />
            </div>
          </div>
        )}

        {currentMascot === 'axolotl' && (
          <div className="relative flex flex-col items-center select-none animate-creeper-idle">
            {/* Gills */}
            <div className="flex justify-between w-[96px] mb-[-4px]">
              <div className="w-[20px] h-[12px] bg-[#FF7FA3] rounded-t" />
              <div className="w-[20px] h-[12px] bg-[#FF7FA3] rounded-t" />
            </div>
            {/* Cute Axolotl Head */}
            <div className="w-[84px] h-[60px] bg-[#FFAEC4] border-2 border-[#FF7FA3] relative rounded-md flex items-center justify-between px-3">
              <div className="w-[8px] h-[12px] bg-[#2A151C] rounded-full" />
              <div className="w-[12px] h-[4px] bg-[#FF7FA3] rounded-full" />
              <div className="w-[8px] h-[12px] bg-[#2A151C] rounded-full" />
            </div>
            {/* Body */}
            <div className="w-[68px] h-[90px] bg-[#FF9BB6] border border-[#FF7FA3] relative rounded-b-md">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[16px] h-[36px] bg-[#FF7FA3] rounded-b-full" />
            </div>
          </div>
        )}

        {/* Shadow beneath Mascot */}
        <div className="w-28 h-3.5 bg-[#070608]/90 rounded-full blur-sm -mt-1 -z-10" />
      </div>

      {/* Mascot Caption Tag */}
      <div className="mt-3 text-center">
        <span className="font-mono text-[10px] font-semibold text-[#9AE5B0] bg-[#1E1820] px-2.5 py-1 rounded-full border border-[#352B3C] tracking-wider uppercase inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9AE5B0] animate-ping" />
          {currentMascot.toUpperCase()} MASCOT
        </span>
      </div>
    </div>
  );
};
