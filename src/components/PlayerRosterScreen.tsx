import React, { useState } from 'react';
import { Player } from '../types';
import { playClick, playSuccessChime } from '../utils/soundEffects';
import SwipeRow, { SwipeActionItem } from './ui-pro/SwipeRow';
import FuseButton from './ui-pro/FuseButton';

interface PlayerRosterScreenProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  onExecuteCommand: (cmd: string) => void;
}

export const PlayerRosterScreen: React.FC<PlayerRosterScreenProps> = ({
  players,
  setPlayers,
  onExecuteCommand,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'online' | 'ops'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGamertag, setNewGamertag] = useState('');
  const [newXuid, setNewXuid] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.xuid.includes(searchTerm);
    if (!matchesSearch) return false;
    if (filterType === 'online') return player.status === 'online';
    if (filterType === 'ops') return player.role.includes('OP');
    return true;
  });

  const handleToggleOp = (player: Player) => {
    playClick();
    const isOp = player.role.includes('OP');
    const newRole = isOp ? 'MEMBER' : 'LVL 4 OP';

    setPlayers((prev) =>
      prev.map((p) => (p.id === player.id ? { ...p, role: newRole } : p))
    );

    if (isOp) {
      onExecuteCommand(`deop ${player.name}`);
      showFeedback(`Deopped ${player.name}`);
    } else {
      onExecuteCommand(`op ${player.name} 4`);
      showFeedback(`Granted Level 4 OP to ${player.name}`);
    }
  };

  const handleKick = (player: Player) => {
    playClick();
    onExecuteCommand(`kick ${player.name} Operator disciplinary action`);
    setPlayers((prev) =>
      prev.map((p) => (p.id === player.id ? { ...p, status: 'whitelisted' } : p))
    );
    showFeedback(`Kicked ${player.name} from BDS cluster`);
  };

  const handleTeleport = (player: Player) => {
    playClick();
    onExecuteCommand(`tp @s ${player.name}`);
    showFeedback(`Teleported operator to ${player.name}`);
  };

  const showFeedback = (msg: string) => {
    setActionNotice(msg);
    playSuccessChime();
    setTimeout(() => setActionNotice(null), 2500);
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGamertag.trim()) return;

    const generatedXuid =
      newXuid.trim() ||
      Math.floor(Math.random() * 8999999999999999 + 1000000000000000).toString();

    const newP: Player = {
      id: `p-${Date.now()}`,
      name: newGamertag.trim(),
      xuid: generatedXuid,
      role: 'MEMBER',
      ping: 24,
      device: 'Windows 11',
      status: 'online',
      dimension: 'Overworld',
      coordinates: { x: 120, y: 64, z: -88 },
      joinedAt: 'Just now',
      avatarSeed: newGamertag.trim(),
    };

    setPlayers((prev) => [newP, ...prev]);
    onExecuteCommand(`whitelist add ${newGamertag.trim()}`);
    showFeedback(`Added ${newGamertag.trim()} to whitelist`);
    setNewGamertag('');
    setNewXuid('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-entrance">
      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="bg-[#18221D] border border-[#2B4C38] text-[#9AE5B0] p-3 rounded-xl flex items-center gap-2 font-mono text-xs shadow-lg animate-entrance">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Roster Controls Bar */}
      <div className="card-surface p-4 sm:p-5 rounded-xl border border-[#2d2433] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="inventory-slot-inset rounded-lg p-1 flex items-center w-full sm:w-64">
            <span className="material-symbols-outlined text-[#A89DAC] text-[18px] pl-2">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Gamertag or XUID..."
              className="bg-transparent px-2 py-1.5 font-sans-ui text-xs text-[#EFE9F1] placeholder:text-[#A89DAC]/50 focus:outline-none w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-1 bg-[#141117] p-1 rounded-lg border border-[#2d2433] shrink-0">
            <button
              type="button"
              onClick={() => {
                playClick();
                setFilterType('all');
              }}
              className={`px-3 py-1 text-xs font-mono rounded cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#1D1823] text-[#FEB776] border border-[#352B3C]'
                  : 'text-[#A89DAC] hover:text-[#EFE9F1]'
              }`}
            >
              All ({players.length})
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setFilterType('online');
              }}
              className={`px-3 py-1 text-xs font-mono rounded cursor-pointer ${
                filterType === 'online'
                  ? 'bg-[#1D1823] text-[#9AE5B0] border border-[#352B3C]'
                  : 'text-[#A89DAC] hover:text-[#EFE9F1]'
              }`}
            >
              Online ({players.filter((p) => p.status === 'online').length})
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setFilterType('ops');
              }}
              className={`px-3 py-1 text-xs font-mono rounded cursor-pointer ${
                filterType === 'ops'
                  ? 'bg-[#1D1823] text-[#D4BEEB] border border-[#352B3C]'
                  : 'text-[#A89DAC] hover:text-[#EFE9F1]'
              }`}
            >
              OPs ({players.filter((p) => p.role.includes('OP')).length})
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playClick();
            setShowAddModal(true);
          }}
          className="peach-cta-btn px-4 py-2 rounded-lg font-sans-ui font-bold text-xs uppercase flex items-center gap-1.5 shrink-0 cursor-pointer w-full sm:w-auto justify-center"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          <span>Whitelist Player</span>
        </button>
      </div>

      {/* Swipeable Interactive Roster List (Mobile & Touch-Optimized with Gesture Physics) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#A89DAC] px-1">
          <span>GESTURE SWIPE ROWS (SWIPE LEFT TO OP / TP / KICK):</span>
          <span className="text-[#9AE5B0]">Physics Rail Active</span>
        </div>

        <div className="space-y-2">
          {filteredPlayers.map((player) => {
            const isOnline = player.status === 'online';
            const isOp = player.role.includes('OP');

            const rowActions: SwipeActionItem[] = [
              {
                id: 'kick',
                label: 'Kick Player',
                color: '#e5484d',
                onSelect: () => handleKick(player),
              },
              {
                id: 'tp',
                label: 'Teleport',
                color: '#2b4c38',
                onSelect: () => handleTeleport(player),
              },
              {
                id: 'op',
                label: isOp ? 'Revoke OP' : 'Make OP',
                color: isOp ? '#4E3D62' : '#FEB776',
                onSelect: () => handleToggleOp(player),
              },
            ];

            return (
              <SwipeRow
                key={player.id}
                actions={rowActions}
                direction="left"
                height={68}
                radius={12}
                rowColor="#17131A"
                drawerColor="#27272a"
                actionColor="#e5484d"
                actionWidth={88}
                label={`Player ${player.name}`}
                className="border border-[#2d2433] hover:border-[#352B3C] shadow-sm transition-colors"
              >
                <div className="w-full flex items-center justify-between gap-3 text-xs font-sans-ui">
                  {/* Name and Platform */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-[#2D2235] border border-[#4E3D62] flex items-center justify-center font-minecraft text-[11px] text-[#FEB776] shadow-sm shrink-0">
                      {player.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[#EFE9F1] flex items-center gap-2">
                        <span>{player.name}</span>
                        {isOnline && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9AE5B0] inline-block shadow-[0_0_6px_#9AE5B0]" />
                        )}
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                            isOp
                              ? 'bg-[#4E3D62] text-[#FEB776] border-[#6b5585]'
                              : 'bg-[#1D1823] text-[#C6BCCA] border-[#352B3C]'
                          }`}
                        >
                          {player.role}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#A89DAC] font-mono flex items-center gap-2 mt-0.5">
                        <span>XUID: {player.xuid}</span>
                        <span>•</span>
                        <span>{player.device}</span>
                        <span>•</span>
                        <span className="text-[#C6BCCA]">{player.dimension}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Ping & Direct Teleport / Fuse Action */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right font-mono text-[11px] hidden sm:block">
                      <div
                        className={
                          player.ping < 35
                            ? 'text-[#9AE5B0]'
                            : player.ping < 70
                            ? 'text-[#FEB776]'
                            : 'text-[#ff7875]'
                        }
                      >
                        {player.ping}ms
                      </div>
                      <div className="text-[9px] text-[#A89DAC]">
                        {player.coordinates.x}, {player.coordinates.y}, {player.coordinates.z}
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <FuseButton
                        label="Fast TP"
                        undoLabel="Cancel"
                        doneLabel="Teleported!"
                        fuseColor="#9AE5B0"
                        background="#1D1823"
                        color="#C6BCCA"
                        size="sm"
                        radius={8}
                        undoWindow={2000}
                        commitOn="fuseEnd"
                        onCommit={() => handleTeleport(player)}
                      />
                    </div>
                  </div>
                </div>
              </SwipeRow>
            );
          })}
        </div>
      </div>

      {/* Add Player Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-entrance">
          <div className="card-surface max-w-md w-full p-6 rounded-xl border border-[#352B3C] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2d2433] pb-3">
              <h3 className="font-sans-ui font-bold text-base text-[#FEB776] flex items-center gap-2">
                <span className="material-symbols-outlined">person_add</span>
                Whitelist Bedrock Player
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#A89DAC] hover:text-[#EFE9F1] text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddPlayer} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[#C6BCCA] mb-1">
                  XBOX GAMERTAG
                </label>
                <input
                  type="text"
                  required
                  value={newGamertag}
                  onChange={(e) => setNewGamertag(e.target.value)}
                  placeholder="e.g. MasterMiner99"
                  className="w-full bg-[#1D1823] px-3.5 py-2 rounded-lg font-mono text-xs text-[#EFE9F1] border border-[#352B3C] focus:border-[#FEB776] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C6BCCA] mb-1">
                  XUID (OPTIONAL / AUTO-GENERATED)
                </label>
                <input
                  type="text"
                  value={newXuid}
                  onChange={(e) => setNewXuid(e.target.value)}
                  placeholder="e.g. 2535418939281726"
                  className="w-full bg-[#1D1823] px-3.5 py-2 rounded-lg font-mono text-xs text-[#EFE9F1] border border-[#352B3C] focus:border-[#FEB776] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-[#A89DAC] hover:text-[#EFE9F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="peach-cta-btn px-4 py-2 rounded-lg text-xs font-bold font-sans-ui uppercase cursor-pointer"
                >
                  Add to Whitelist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
