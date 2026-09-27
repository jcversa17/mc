/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabView, MascotType, ServerState, Player, ConsoleLogEntry } from './types';
import { AccessScreen } from './components/AccessScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { WorldDeployerScreen } from './components/WorldDeployerScreen';
import { PlayerRosterScreen } from './components/PlayerRosterScreen';
import { AddonsScreen } from './components/AddonsScreen';
import { MascotLoungeScreen } from './components/MascotLoungeScreen';
import { playClick, playPop, playSuccessChime, toggleSound, isSoundEnabled } from './utils/soundEffects';
import BellToggle from './components/ui-pro/BellToggle';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabView>('access');
  const [panelToken, setPanelToken] = useState('SHA256_ROOT_OPERATOR_BDS99X');
  const [currentMascot, setCurrentMascot] = useState<MascotType>('creeper');
  const [soundOn, setSoundOn] = useState(true);
  const [serverNotifications, setServerNotifications] = useState(true);
  const [alertCount, setAlertCount] = useState(2);
  const [activeModal, setActiveModal] = useState<'docs' | 'ops' | 'eula' | 'logs' | null>(null);

  // Parallax mouse position
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // BDS Server State
  const [serverState, setServerState] = useState<ServerState>({
    status: 'ONLINE',
    version: '1.20.73 Native',
    port: 19132,
    protocol: 649,
    tps: 20.0,
    uptimeSeconds: 14820,
    cpuPercent: 14.8,
    ramUsedMB: 3842,
    ramTotalMB: 8192,
    onlineCount: 6,
    maxPlayers: 40,
    difficulty: 'Normal',
    gameMode: 'Survival',
    whitelistEnabled: true,
    pvpEnabled: true,
    allowCheats: true,
    activeDimensionCount: 3,
  });

  // BDS Players Roster
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'p-1',
      name: 'NebulaAdmin',
      xuid: '2535418939281726',
      role: 'LVL 4 OP',
      ping: 18,
      device: 'Windows 11',
      status: 'online',
      dimension: 'Overworld',
      coordinates: { x: 42, y: 71, z: -108 },
      joinedAt: '4h 12m ago',
      avatarSeed: 'NebulaAdmin',
    },
    {
      id: 'p-2',
      name: 'AlexVanguard',
      xuid: '2535418939284411',
      role: 'LVL 2 OP',
      ping: 28,
      device: 'Xbox Series X',
      status: 'online',
      dimension: 'Nether Core',
      coordinates: { x: -312, y: 55, z: 890 },
      joinedAt: '2h 45m ago',
      avatarSeed: 'AlexVanguard',
    },
    {
      id: 'p-3',
      name: 'CraftMaster99',
      xuid: '2535418939289901',
      role: 'MEMBER',
      ping: 34,
      device: 'PlayStation 5',
      status: 'online',
      dimension: 'Overworld',
      coordinates: { x: 1205, y: 64, z: -450 },
      joinedAt: '1h 10m ago',
      avatarSeed: 'CraftMaster99',
    },
    {
      id: 'p-4',
      name: 'RedstoneWiz',
      xuid: '2535418939285512',
      role: 'MEMBER',
      ping: 42,
      device: 'Nintendo Switch',
      status: 'online',
      dimension: 'The End',
      coordinates: { x: 12, y: 58, z: 2 },
      joinedAt: '38m ago',
      avatarSeed: 'RedstoneWiz',
    },
    {
      id: 'p-5',
      name: 'PixelMiner',
      xuid: '2535418939287733',
      role: 'MEMBER',
      ping: 22,
      device: 'Windows 11',
      status: 'online',
      dimension: 'Overworld',
      coordinates: { x: -84, y: 12, z: 231 },
      joinedAt: '15m ago',
      avatarSeed: 'PixelMiner',
    },
    {
      id: 'p-6',
      name: 'EnderScout',
      xuid: '2535418939288821',
      role: 'VISITOR',
      ping: 58,
      device: 'Android',
      status: 'online',
      dimension: 'Overworld',
      coordinates: { x: 502, y: 68, z: 91 },
      joinedAt: '6m ago',
      avatarSeed: 'EnderScout',
    },
  ]);

  // Console Logs
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([
    {
      id: 'log-1',
      timestamp: '14:48:12',
      level: 'INFO',
      message: 'Bedrock Dedicated Server starting: v1.20.73 Native (Build 649, Protocol 649)',
    },
    {
      id: 'log-2',
      timestamp: '14:48:13',
      level: 'INFO',
      message: 'IPv4 supported, port: 19132. IPv6 supported, port: 19133.',
    },
    {
      id: 'log-3',
      timestamp: '14:48:14',
      level: 'INFO',
      message: 'Leveldb world "Nebula_Prime_BDS" loaded. Initialized Nether and The End dimensions.',
    },
    {
      id: 'log-4',
      timestamp: '14:48:15',
      level: 'SUCCESS',
      message: 'Server started successfully. BDS Cluster Online on port 19132.',
    },
    {
      id: 'log-5',
      timestamp: '14:49:01',
      level: 'INFO',
      message: 'Player connected: NebulaAdmin, xuid: 2535418939281726 (Operator Level 4)',
    },
    {
      id: 'log-6',
      timestamp: '14:49:02',
      level: 'SUCCESS',
      message: 'Session Shield verified: SHA-256 operator handshake valid.',
    },
  ]);

  // Parallax event handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallaxOffset({
        x: xRatio * -14,
        y: yRatio * -10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tick simulated timer
  useEffect(() => {
    const timer = setInterval(() => {
      setServerState((prev) => ({
        ...prev,
        uptimeSeconds: prev.uptimeSeconds + 1,
        // Small organic variance in TPS & RAM
        tps: Math.min(20.0, Math.max(19.8, 20.0 - (Math.random() > 0.85 ? 0.1 : 0.0))),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExecuteCommand = (cmd: string) => {
    const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const newLog: ConsoleLogEntry = {
      id: `cmd-${Date.now()}`,
      timestamp: timeStr,
      level: 'CMD',
      message: `/${cmd}`,
    };

    // Simulated responses
    let responseLog: ConsoleLogEntry | null = null;
    const lower = cmd.toLowerCase();

    if (lower.startsWith('weather')) {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'INFO',
        message: 'Changing to clear weather across all dimensions.',
      };
    } else if (lower.startsWith('time set')) {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'INFO',
        message: 'Set the time to 1000 (daylight cycle adjusted).',
      };
    } else if (lower.startsWith('list')) {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'INFO',
        message: `There are ${players.length}/${serverState.maxPlayers} players online: ${players.map((p) => p.name).join(', ')}`,
      };
    } else if (lower.startsWith('kill @e[type=item]')) {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'SUCCESS',
        message: 'Killed 84 dropped entity items to conserve memory heap.',
      };
    } else if (lower.startsWith('save hold')) {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'SUCCESS',
        message: 'Leveldb chunk tables flushed and locked for snapshot backup.',
      };
    } else if (lower.startsWith('say')) {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'INFO',
        message: `[Server Announcement Broadcasted to all Bedrock clients]`,
      };
    } else {
      responseLog = {
        id: `res-${Date.now()}`,
        timestamp: timeStr,
        level: 'SUCCESS',
        message: `Command executed successfully on BDS thread: ${cmd}`,
      };
    }

    setLogs((prev) => [...prev, newLog, ...(responseLog ? [responseLog] : [])]);
  };

  const handleQuickRestart = () => {
    handleExecuteCommand('say [Server] BDS Cluster restarting in 3 seconds for maintenance...');
    setServerState((prev) => ({ ...prev, status: 'RESTARTING' }));

    setTimeout(() => {
      handleExecuteCommand('stop');
      setTimeout(() => {
        handleExecuteCommand('Server rebooted. Bedrock Dedicated v1.20.73 cluster ready.');
        setServerState((prev) => ({ ...prev, status: 'ONLINE', tps: 20.0 }));
        playSuccessChime();
      }, 2000);
    }, 1500);
  };

  const navTabs: { id: TabView; label: string; icon: string }[] = [
    { id: 'access', label: 'Access Deck', icon: 'lock' },
    { id: 'dashboard', label: 'Live Operations', icon: 'terminal' },
    { id: 'world', label: 'World Deployer', icon: 'public' },
    { id: 'players', label: 'Player Roster', icon: 'shield_person' },
    { id: 'addons', label: 'Addons Hub', icon: 'extension' },
    { id: 'mascot', label: 'Mascot Lounge', icon: 'pets' },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between selection:bg-[#FEB776] selection:text-[#291307]">
      {/* ======================================================== */}
      {/* LAYER 4: SHADER-REALISTIC OVERWORLD/BEDROCK BACKGROUND  */}
      {/* ======================================================== */}
      <div
        className="fixed -inset-10 z-0 pointer-events-none scale-105 opacity-35 mix-blend-luminosity brightness-75 contrast-125 transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida/AEtjO1XnXPDQgoVkQQjY9mDHnPx9R4663GJS3MHlN6Lwd1xLzBzgDXqJ04bA2D01_MkmKRT49PMztni1WbpN356hux5fD3EJJY1BNH4GhoCEKHG6zfeIOeTZOXmvgfP2GNkkoMA6efmLmNlGuN-pdi7rWgHWKa9PIQarcu3SOVK_z3FYB-5brCa7-3oA9GRolPqRyMSU6i0jf5LJi-ma5BFXVIelsKS3P3JypaG1ATtvZPnI5_CxNQtxS5R-lQI')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0px) scale(1.05)`,
        }}
      />

      {/* Atmospheric Sunset / Nether Tint Blend */}
      <div className="fixed inset-0 pointer-events-none z-1 bg-gradient-to-tr from-[#1E1820]/80 via-transparent to-[#FFA067]/10 mix-blend-color-dodge" />

      {/* Golden / Peach Dust Motes & Fireflies */}
      <div className="fixed inset-0 pointer-events-none z-2 overflow-hidden">
        <div
          className="mote w-3 h-3 top-[65%] left-[22%]"
          style={{ animationDelay: '0.2s', animationDuration: '7s' }}
        />
        <div
          className="mote w-2 h-2 top-[72%] left-[48%]"
          style={{ animationDelay: '2.1s', animationDuration: '5.5s' }}
        />
        <div
          className="mote w-4 h-4 top-[58%] left-[78%]"
          style={{ animationDelay: '1.4s', animationDuration: '8.2s' }}
        />
        <div
          className="mote w-2 h-2 top-[80%] left-[35%]"
          style={{ animationDelay: '3.7s', animationDuration: '6.8s' }}
        />
        <div
          className="mote w-3 h-3 top-[68%] left-[62%]"
          style={{ animationDelay: '4.2s', animationDuration: '7.5s' }}
        />

        {/* Fireflies */}
        <div className="firefly top-[74%] left-[28%]" style={{ animationDelay: '0.8s' }} />
        <div className="firefly top-[67%] left-[82%]" style={{ animationDelay: '1.9s' }} />
        <div className="firefly top-[82%] left-[54%]" style={{ animationDelay: '2.7s' }} />
        <div className="firefly top-[62%] left-[41%]" style={{ animationDelay: '3.4s' }} />
      </div>

      {/* ======================================================== */}
      {/* LAYER 3: CONCENTRIC HALO RINGS & VIGNETTE                */}
      {/* ======================================================== */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#070608] via-[#070608]/85 to-[#070608]/90 flex items-center justify-center">
        <div className="w-[900px] h-[700px] bg-[#1E1820] rounded-full blur-[100px] opacity-80 transform -translate-y-4" />
        <div className="absolute w-[600px] h-[500px] bg-[#2E2433] rounded-full blur-[80px] opacity-35" />
      </div>

      {/* ======================================================== */}
      {/* FOREGROUND APPLICATION WORKSPACE                         */}
      {/* ======================================================== */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between px-3 sm:px-6 py-4 sm:py-6">
        {/* HEADER UTILITY & NAVIGATION BAR */}
        <header className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs tracking-wider font-sans-ui text-[#A89DAC] pb-4 border-b border-[#1E1820]/60">
          {/* Brand & BDS Cluster Status Pill */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveTab('access');
              }}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="w-6 h-6 rounded bg-[#2D2235] border border-[#FEB776]/40 flex items-center justify-center font-minecraft text-[10px] text-[#FEB776] shadow-sm">
                N
              </div>
              <span className="font-minecraft text-xs text-[#EFE9F1] group-hover:text-[#FEB776] transition-colors">
                NEBULA CRAFT
              </span>
            </button>

            <div className="flex items-center gap-2 bg-[#17131A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#352B3C] shadow-sm">
              <span
                className={`w-2 h-2 rounded-full inline-block ${
                  serverState.status === 'ONLINE'
                    ? 'bg-[#9AE5B0] animate-pulse shadow-[0_0_8px_#9AE5B0]'
                    : 'bg-[#ff7875]'
                }`}
              />
              <span className="font-mono text-[#9AE5B0] font-bold uppercase tracking-wider text-[11px]">
                BDS CLUSTER {serverState.status}
              </span>
              <span className="text-[#352B3C]">|</span>
              <span className="text-[#C6BCCA] font-mono text-[11px]">
                PORT {serverState.port}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto max-w-full p-1 bg-[#17131A]/80 backdrop-blur-md rounded-lg border border-[#352B3C] scrollbar-none">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-sans-ui font-medium flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2D2235] text-[#FEB776] shadow-sm border border-[#4E3D62]'
                      : 'text-[#A89DAC] hover:text-[#EFE9F1] hover:bg-[#1D1823]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Status / BellToggle & Audio */}
          <div className="hidden lg:flex items-center gap-2.5">
            <BellToggle
              pressed={serverNotifications}
              onChange={(next) => {
                setServerNotifications(next);
                if (next) {
                  playSuccessChime();
                  setAlertCount(0);
                } else {
                  playClick();
                }
              }}
              count={alertCount}
              badge={true}
              badgeColor="#FEB776"
              badgeTextColor="#291307"
              offLabel="Mute Ops Alerts"
              onLabel="Ops Alerts Live"
              background="#17131A"
              color="#A89DAC"
              onBackground="#2D2235"
              onColor="#FEB776"
              size="sm"
              radius={8}
            />

            <button
              type="button"
              onClick={() => {
                const nextSound = toggleSound();
                setSoundOn(nextSound);
              }}
              title={soundOn ? 'Mute Minecraft Sound Effects' : 'Enable Sound Effects'}
              className="p-1.5 rounded-lg bg-[#17131A] hover:bg-[#1D1823] border border-[#352B3C] text-[#C6BCCA] hover:text-[#FEB776] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {soundOn ? 'volume_up' : 'volume_off'}
              </span>
            </button>

            <div className="flex items-center gap-2 bg-[#17131A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#352B3C] text-[#A89DAC]">
              <span className="text-[#FEB776] text-xs">⚡</span>
              <span className="font-sans-ui text-xs">Bedrock Dedicated</span>
              <span className="font-mono text-[#C6BCCA] text-xs">v1.20.73</span>
            </div>
          </div>
        </header>

        {/* ACTIVE SCREEN CONTENT */}
        <main className="flex-1 flex flex-col justify-center py-4">
          {activeTab === 'access' && (
            <AccessScreen
              onLoginSuccess={() => setActiveTab('dashboard')}
              token={panelToken}
              setToken={setPanelToken}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardScreen
              serverState={serverState}
              setServerState={setServerState}
              players={players}
              logs={logs}
              onExecuteCommand={handleExecuteCommand}
              onQuickRestart={handleQuickRestart}
            />
          )}

          {activeTab === 'world' && (
            <WorldDeployerScreen onExecuteCommand={handleExecuteCommand} />
          )}

          {activeTab === 'players' && (
            <PlayerRosterScreen
              players={players}
              setPlayers={setPlayers}
              onExecuteCommand={handleExecuteCommand}
            />
          )}

          {activeTab === 'addons' && (
            <AddonsScreen onExecuteCommand={handleExecuteCommand} />
          )}

          {activeTab === 'mascot' && (
            <MascotLoungeScreen
              currentMascot={currentMascot}
              setCurrentMascot={setCurrentMascot}
            />
          )}
        </main>

        {/* BOTTOM FOOTER */}
        <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-inter text-[#A89DAC] gap-3 pt-4 border-t border-[#1E1820]">
          <div className="flex items-center flex-wrap gap-3">
            <span>© Nebula Craft Engine</span>
            <span className="text-[#352B3C]">•</span>
            <span className="text-[#C6BCCA]">Nether Core Architecture</span>
            <span className="text-[#352B3C]">•</span>
            <span className="text-[#FEB776] font-mono">BDS v1.20.73 Native</span>
          </div>

          <div className="flex items-center gap-5 text-[#A89DAC]">
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveModal('docs');
              }}
              className="hover:text-[#FEB776] transition-colors cursor-pointer"
            >
              Documentation
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveModal('ops');
              }}
              className="hover:text-[#FEB776] transition-colors cursor-pointer"
            >
              Server Ops
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveModal('eula');
              }}
              className="hover:text-[#FEB776] transition-colors cursor-pointer"
            >
              Mojang EULA
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveTab('dashboard');
              }}
              className="hover:text-[#FEB776] transition-colors cursor-pointer"
            >
              Console Log
            </button>
          </div>
        </footer>
      </div>

      {/* Documentation & Footer Dialog Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-entrance">
          <div className="card-surface max-w-lg w-full p-6 rounded-xl border border-[#352B3C] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2d2433] pb-3">
              <h3 className="font-sans-ui font-bold text-base text-[#FEB776] flex items-center gap-2">
                <span className="material-symbols-outlined">
                  {activeModal === 'docs'
                    ? 'menu_book'
                    : activeModal === 'ops'
                    ? 'tune'
                    : 'gavel'}
                </span>
                {activeModal === 'docs' && 'Nebula Craft BDS Documentation'}
                {activeModal === 'ops' && 'Bedrock Server Operations Protocol'}
                {activeModal === 'eula' && 'Mojang Commercial Server Guidelines & EULA'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#A89DAC] hover:text-[#EFE9F1] text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#C6BCCA] space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              {activeModal === 'docs' && (
                <>
                  <p>
                    <strong>Nebula Craft</strong> is a precision-engineered control deck for Minecraft Bedrock Dedicated Servers (BDS).
                  </p>
                  <p>
                    <strong>Port Allocation:</strong> Default IPv4 port 19132 (UDP) and IPv6 port 19133. Ensure UDP packet forwarding is open on edge firewalls.
                  </p>
                  <p>
                    <strong>Operator Levels:</strong> Level 1 (Bypass spawn protection), Level 2 (Cheat commands), Level 3 (Server management), Level 4 (Full cluster root operator).
                  </p>
                </>
              )}

              {activeModal === 'ops' && (
                <>
                  <p>
                    <strong>Clustering & Memory:</strong> Nebula Core allocates isolated Leveldb chunk caches with memory caps up to 8GB.
                  </p>
                  <p>
                    <strong>Ticking Areas:</strong> Keep specific spawn chunks or redstone machinery loaded continuously via <code className="text-[#FEB776] bg-[#141117] px-1 py-0.5 rounded font-mono">/tickingarea add</code>.
                  </p>
                  <p>
                    <strong>Hot-patching:</strong> Behavior packs and RTX shaders are hot-reloaded using WebSocket script connections without killing active player sessions.
                  </p>
                </>
              )}

              {activeModal === 'eula' && (
                <>
                  <p>
                    This deployment panel interfaces with the native Bedrock Dedicated Server software provided under the Mojang Minecraft End User License Agreement.
                  </p>
                  <p>
                    Operators must abide by Mojang Commercial Usage guidelines: no pay-to-win items, equal gameplay privileges for all connected players, and strict brand identity compliance.
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-[#2d2433]">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="peach-cta-btn px-4 py-2 rounded-lg text-xs font-bold font-sans-ui uppercase cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
