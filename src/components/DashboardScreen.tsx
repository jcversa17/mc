import React, { useState, useEffect, useRef } from 'react';
import { ConsoleLogEntry, ServerState, Player } from '../types';
import { playClick, playSuccessChime } from '../utils/soundEffects';
import FuseButton from './ui-pro/FuseButton';
import HoldButton from './ui-pro/HoldButton';
import SquishSwitch from './ui-pro/SquishSwitch';
import GlideSelect from './ui-pro/GlideSelect';

interface DashboardScreenProps {
  serverState: ServerState;
  setServerState: React.Dispatch<React.SetStateAction<ServerState>>;
  players: Player[];
  logs: ConsoleLogEntry[];
  onExecuteCommand: (cmd: string) => void;
  onQuickRestart: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  serverState,
  setServerState,
  players,
  logs,
  onExecuteCommand,
  onQuickRestart,
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmitCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    playClick();
    onExecuteCommand(commandInput.trim());
    setCommandInput('');
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    playClick();
    onExecuteCommand(`say [BROADCAST] ${announcementText.trim()}`);
    setAnnouncementText('');
    setBroadcastSent(true);
    playSuccessChime();
    setTimeout(() => setBroadcastSent(false), 2000);
  };

  const quickCommands = [
    { label: 'Clear Weather', cmd: 'weather clear' },
    { label: 'Set Day', cmd: 'time set day' },
    { label: 'Player List', cmd: 'list' },
    { label: 'Clean Items', cmd: 'kill @e[type=item]' },
    { label: 'Save World', cmd: 'save hold' },
    { label: 'Difficulty Hard', cmd: 'difficulty hard' },
  ];

  const onlinePlayers = players.filter((p) => p.status === 'online');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-entrance">
      {/* Top Deck Banner with Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: TPS */}
        <div className="card-surface p-4 rounded-xl border border-[#2d2433] relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#A89DAC] text-xs font-mono mb-1">
            <span>TICK RATE (TPS)</span>
            <span className="material-symbols-outlined text-[16px] text-[#9AE5B0]">speed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#9AE5B0]">
              {serverState.tps.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-[#A89DAC]">/ 20.0</span>
          </div>
          <div className="w-full bg-[#141117] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#9AE5B0] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#9AE5B0]"
              style={{ width: `${(serverState.tps / 20.0) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-[#A89DAC] mt-1.5 font-mono">MSPT: 12.4ms (Nominal)</div>
        </div>

        {/* Metric 2: Memory */}
        <div className="card-surface p-4 rounded-xl border border-[#2d2433] relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#A89DAC] text-xs font-mono mb-1">
            <span>DEDICATED RAM</span>
            <span className="material-symbols-outlined text-[16px] text-[#FEB776]">memory</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#EFE9F1]">
              {(serverState.ramUsedMB / 1024).toFixed(1)}
            </span>
            <span className="text-xs font-mono text-[#A89DAC]">
              / {(serverState.ramTotalMB / 1024).toFixed(1)} GB
            </span>
          </div>
          <div className="w-full bg-[#141117] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#FEB776] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#FEB776]"
              style={{
                width: `${(serverState.ramUsedMB / serverState.ramTotalMB) * 100}%`,
              }}
            />
          </div>
          <div className="text-[10px] text-[#A89DAC] mt-1.5 font-mono">
            {((serverState.ramUsedMB / serverState.ramTotalMB) * 100).toFixed(0)}% Allocated
          </div>
        </div>

        {/* Metric 3: Active Players */}
        <div className="card-surface p-4 rounded-xl border border-[#2d2433] relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#A89DAC] text-xs font-mono mb-1">
            <span>ACTIVE OPERATORS</span>
            <span className="material-symbols-outlined text-[16px] text-[#FFA067]">group</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#FFA067]">
              {onlinePlayers.length}
            </span>
            <span className="text-xs font-mono text-[#A89DAC]">/ {serverState.maxPlayers}</span>
          </div>
          <div className="w-full bg-[#141117] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#FFA067] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#FFA067]"
              style={{
                width: `${(onlinePlayers.length / serverState.maxPlayers) * 100}%`,
              }}
            />
          </div>
          <div className="text-[10px] text-[#A89DAC] mt-1.5 font-mono">
            {players.filter((p) => p.role.includes('OP')).length} Level 4 OPs
          </div>
        </div>

        {/* Metric 4: Cluster Status */}
        <div className="card-surface p-4 rounded-xl border border-[#2d2433] relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#A89DAC] text-xs font-mono mb-1">
            <span>BDS STATUS</span>
            <span className="w-2 h-2 rounded-full bg-[#9AE5B0] animate-pulse inline-block shadow-[0_0_8px_#9AE5B0]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#9AE5B0]">
              {serverState.status}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#C6BCCA] mt-1">
            PORT: {serverState.port} (IPv4/v6)
          </div>
          <div className="text-[10px] text-[#A89DAC] mt-1 font-mono">
            Uptime: {Math.floor(serverState.uptimeSeconds / 3600)}h{' '}
            {Math.floor((serverState.uptimeSeconds % 3600) / 60)}m
          </div>
        </div>
      </div>

      {/* Main Grid: Live Terminal & Quick Ops Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Live Interactive BDS Terminal */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-surface rounded-xl p-4 sm:p-5 border border-[#2d2433] flex flex-col h-[520px]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-[#2d2433] pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#EFE9F1]">
                  bds_console@bedrock-core:~$
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-[#A89DAC]">
                <span className="flex items-center gap-1 text-[#9AE5B0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9AE5B0] animate-ping" />
                  LIVE STREAM
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    onExecuteCommand('list');
                  }}
                  className="hover:text-[#FEB776] transition-colors cursor-pointer"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Terminal Log Area */}
            <div
              ref={logContainerRef}
              className="flex-1 overflow-y-auto space-y-1.5 pr-2 font-mono text-xs select-text bg-[#0E0B12]/80 p-3 rounded-lg border border-[#231A2B]"
            >
              {logs.map((log) => {
                let badgeColor = 'text-[#C6BCCA]';
                if (log.level === 'WARN') badgeColor = 'text-[#FEB776]';
                if (log.level === 'ERROR') badgeColor = 'text-[#ff7875]';
                if (log.level === 'SUCCESS') badgeColor = 'text-[#9AE5B0]';
                if (log.level === 'CMD') badgeColor = 'text-[#FFA067] font-bold';

                return (
                  <div key={log.id} className="leading-relaxed flex items-start gap-2">
                    <span className="text-[#685D70] shrink-0">{log.timestamp}</span>
                    <span className={`shrink-0 ${badgeColor}`}>[{log.level}]</span>
                    <span className="text-[#EFE9F1] break-all">{log.message}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Command Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
              <span className="text-[10px] font-mono text-[#A89DAC] uppercase shrink-0">
                Quick Cmds:
              </span>
              {quickCommands.map((qc) => (
                <button
                  key={qc.cmd}
                  type="button"
                  onClick={() => {
                    playClick();
                    onExecuteCommand(qc.cmd);
                  }}
                  className="px-2 py-1 rounded bg-[#1D1823] hover:bg-[#2D2235] text-[11px] font-mono text-[#C6BCCA] hover:text-[#FEB776] border border-[#352B3C] shrink-0 transition-colors cursor-pointer"
                >
                  /{qc.cmd}
                </button>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleSubmitCommand} className="flex gap-2 pt-1">
              <div className="relative flex-1 inventory-slot-inset rounded-lg p-1 flex items-center">
                <span className="font-mono text-[#FEB776] pl-2 text-sm select-none">/</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Enter BDS command (e.g. say Hello World, gamemode creative, op Player)..."
                  className="w-full bg-transparent px-2 py-1.5 font-mono text-xs text-[#EFE9F1] placeholder:text-[#A89DAC]/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="peach-cta-btn px-4 py-2 rounded-lg font-sans-ui font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>EXECUTE</span>
                <span className="text-sm">➜</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Server Power Deck & Broadcast */}
        <div className="space-y-4">
          {/* Server Operations Controls */}
          <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2d2433] pb-3">
              <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#FEB776]">
                  power_settings_new
                </span>
                CRITICAL SERVER OPERATIONS
              </h3>
            </div>

            {/* HoldButton for Restart (Safety Confirmation) & FuseButton for Snapshot */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-[11px] font-mono text-[#A89DAC] mb-1.5 flex justify-between">
                  <span>HOLD-TO-TRIGGER SAFETY:</span>
                  <span className="text-[#ff7875]">Restart BDS Cluster</span>
                </div>
                <HoldButton
                  size="md"
                  radius={12}
                  backgroundColor="#231718"
                  fillColor="#ff5f56"
                  textColor="#ffcfcf"
                  fillTextColor="#ffffff"
                  holdTime={1800}
                  onHold={onQuickRestart}
                  doneLabel="Restarting Server..."
                  icon={<span className="material-symbols-outlined text-[18px]">restart_alt</span>}
                  className="w-full font-mono text-xs font-bold"
                >
                  Hold to Restart Cluster
                </HoldButton>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#A89DAC] mb-1.5 flex justify-between">
                  <span>UNDOABLE SNAPSHOT (4s FUSE):</span>
                  <span className="text-[#FEB776]">Leveldb Lock</span>
                </div>
                <FuseButton
                  label="Create Snapshot & Backup"
                  undoLabel="Cancel Backup"
                  doneLabel="Snapshot Secured ✓"
                  fuseColor="#FEB776"
                  background="#1D1823"
                  color="#EFE9F1"
                  size="md"
                  radius={12}
                  undoWindow={4000}
                  commitOn="fuseEnd"
                  onCommit={() => {
                    onExecuteCommand('save hold');
                    playSuccessChime();
                  }}
                  className="w-full font-mono text-xs font-semibold"
                />
              </div>
            </div>

            {/* Quick Server Toggles Powered by SquishSwitch */}
            <div className="space-y-3 pt-3 border-t border-[#2d2433]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#A89DAC] uppercase">Physics & Access Flags:</span>
                <span className="text-[10px] font-mono text-[#9AE5B0]">Tactile Squish</span>
              </div>

              {/* Whitelist Toggle with SquishSwitch */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141117] border border-[#2d2433]">
                <div>
                  <div className="text-xs font-semibold text-[#EFE9F1]">Whitelist Enforcement</div>
                  <div className="text-[10px] text-[#A89DAC]">Strict Xbox XUID handshake</div>
                </div>
                <SquishSwitch
                  checked={serverState.whitelistEnabled}
                  onChange={(val) => {
                    setServerState((prev) => ({ ...prev, whitelistEnabled: val }));
                    onExecuteCommand(`whitelist ${val ? 'on' : 'off'}`);
                  }}
                  trackColor="#27272a"
                  trackOnColor="#9AE5B0"
                  thumbOnColor="#072212"
                  width={56}
                  height={28}
                  radius={14}
                  speed={60}
                  stretch={40}
                  ariaLabel="Toggle Whitelist Enforcement"
                />
              </div>

              {/* PvP Toggle with SquishSwitch */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141117] border border-[#2d2433]">
                <div>
                  <div className="text-xs font-semibold text-[#EFE9F1]">Player vs Player (PvP)</div>
                  <div className="text-[10px] text-[#A89DAC]">Allow player combat & damage</div>
                </div>
                <SquishSwitch
                  checked={serverState.pvpEnabled}
                  onChange={(val) => {
                    setServerState((prev) => ({ ...prev, pvpEnabled: val }));
                    onExecuteCommand(`gamerule pvp ${val}`);
                  }}
                  trackColor="#27272a"
                  trackOnColor="#FEB776"
                  thumbOnColor="#291307"
                  width={56}
                  height={28}
                  radius={14}
                  speed={60}
                  stretch={40}
                  ariaLabel="Toggle PvP"
                />
              </div>

              {/* Cheats Toggle with SquishSwitch */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141117] border border-[#2d2433]">
                <div>
                  <div className="text-xs font-semibold text-[#EFE9F1]">Allow BDS Cheats</div>
                  <div className="text-[10px] text-[#A89DAC]">Teleport & inventory commands</div>
                </div>
                <SquishSwitch
                  checked={serverState.allowCheats}
                  onChange={(val) => {
                    setServerState((prev) => ({ ...prev, allowCheats: val }));
                    onExecuteCommand(`changesetting allow-cheats ${val}`);
                  }}
                  trackColor="#27272a"
                  trackOnColor="#D4BEEB"
                  thumbOnColor="#1e122b"
                  width={56}
                  height={28}
                  radius={14}
                  speed={60}
                  stretch={40}
                  ariaLabel="Toggle Cheats"
                />
              </div>

              {/* Server Difficulty with GlideSelect */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141117] border border-[#2d2433]">
                <div>
                  <div className="text-xs font-semibold text-[#EFE9F1]">Difficulty Preset</div>
                  <div className="text-[10px] text-[#A89DAC]">Mob damage & hostile spawn</div>
                </div>
                <GlideSelect
                  value={serverState.difficulty}
                  onChange={(val) => {
                    setServerState((prev) => ({ ...prev, difficulty: val as any }));
                    onExecuteCommand(`difficulty ${val.toLowerCase()}`);
                  }}
                  options={[
                    { value: 'Peaceful', label: 'Peaceful', tag: 'Safe' },
                    { value: 'Easy', label: 'Easy', tag: 'Casual' },
                    { value: 'Normal', label: 'Normal', tag: 'Standard' },
                    { value: 'Hard', label: 'Hard', tag: 'Extreme' },
                  ]}
                  accentColor="#FEB776"
                  surfaceColor="#1D1823"
                  highlightColor="#352B3C"
                  textColor="#EFE9F1"
                  size="sm"
                  radius={8}
                  menuWidth={140}
                  align="right"
                />
              </div>
            </div>
          </div>

          {/* Broadcast Message to BDS world */}
          <div className="card-surface rounded-xl p-5 border border-[#2d2433] space-y-3">
            <h3 className="font-sans-ui font-bold text-sm text-[#EFE9F1] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#FEB776]">campaign</span>
              WORLD BROADCAST (/say)
            </h3>
            <form onSubmit={handleSendAnnouncement} className="space-y-2">
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Alert all online Bedrock players..."
                className="w-full bg-[#1D1823] px-3 py-2 rounded-lg font-sans-ui text-xs text-[#EFE9F1] border border-[#352B3C] focus:border-[#FEB776] focus:outline-none"
              />
              <button
                type="submit"
                disabled={broadcastSent}
                className="w-full py-2 px-3 rounded-lg bg-[#2D2235] hover:bg-[#3D2C48] text-xs font-semibold text-[#FEB776] border border-[#4E3D62] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {broadcastSent ? (
                  <>
                    <span className="text-[#9AE5B0]">✓ Message Broadcasted!</span>
                  </>
                ) : (
                  <>
                    <span>Send Announcement</span>
                    <span className="material-symbols-outlined text-[14px]">send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
