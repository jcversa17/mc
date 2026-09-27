import React, { useState } from 'react';
import { MascotDisplay } from './MascotDisplay';
import { playClick, playLevelUp, playSuccessChime } from '../utils/soundEffects';
import SpecularButton from './ui-pro/SpecularButton';
import SlideCommit from './ui-pro/SlideCommit';

interface AccessScreenProps {
  onLoginSuccess: () => void;
  token: string;
  setToken: (token: string) => void;
}

export const AccessScreen: React.FC<AccessScreenProps> = ({
  onLoginSuccess,
  token,
  setToken,
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showHelperModal, setShowHelperModal] = useState(false);
  const [entryMode, setEntryMode] = useState<'button' | 'slider'>('slider');

  const sampleTokens = [
    { label: 'OP LVL 4 (Full Admin)', val: 'SHA256_ROOT_OPERATOR_BDS99X' },
    { label: 'OP LVL 2 (Moderator)', val: 'SHA256_MOD_CLUSTER_ACCESS_44' },
    { label: 'Demo Inspector', val: 'SHA256_GUEST_TELEMETRY_KEY' },
  ];

  const triggerAuthFlow = () => {
    if (!token.trim()) {
      setToken('SHA256_ROOT_OPERATOR_BDS99X');
    }

    playClick();
    setIsAuthenticating(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAuthSuccess(true);
        playSuccessChime();
        playLevelUp();

        setTimeout(() => {
          setIsAuthenticating(false);
          onLoginSuccess();
          resolve();
        }, 900);
      }, 1200);
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAuthFlow();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-auto py-6 sm:py-10">
      {/* Title section above card */}
      <div className="text-center mb-8 sm:mb-10 animate-entrance">
        <p className="font-sans-ui text-[11px] font-bold text-[#A89DAC] tracking-[0.18em] uppercase mb-2">
          BEDROCK CONTROL DECK
        </p>
        <h1 className="font-minecraft text-3xl sm:text-4xl md:text-5xl tracking-tight [text-shadow:_3px_3px_0_#1E1820,_5px_5px_0_rgba(0,0,0,0.85)]">
          <span className="text-[#EFE9F1]">NEBULA</span>{' '}
          <span className="text-[#FEB776]">CRAFT</span>
        </h1>
        <p className="font-sans-ui font-medium text-xs sm:text-sm text-[#A89DAC] tracking-widest uppercase mt-2.5 flex items-center justify-center gap-2">
          <span className="inline-block w-8 h-[1px] bg-[#FEB776]/40" />
          Bedrock Server Deployment Panel
          <span className="inline-block w-8 h-[1px] bg-[#FEB776]/40" />
        </p>
      </div>

      {/* Main card + Creeper Mascot */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-4xl px-4">
        {/* LOGIN CARD */}
        <section className="w-full max-w-[430px] card-surface rounded-xl p-6 sm:p-8 animate-entrance relative z-20">
          {/* Card Header & Badge */}
          <div className="flex items-center justify-between border-b border-[#2d2433] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 pixelated rounded-md border border-[#352B3C] shadow-sm flex items-center justify-center bg-[#1D1823]">
                <span className="material-symbols-outlined text-[16px] text-[#FEB776]">
                  admin_panel_settings
                </span>
              </div>
              <h2 className="font-sans-ui font-bold text-sm text-[#EFE9F1] tracking-wide">
                OPERATOR ACCESS
              </h2>
            </div>
            {/* Lock Badge in #4E3D62 */}
            <span className="font-sans-ui text-[11px] font-semibold px-2.5 py-1 bg-[#4E3D62] text-[#EFE9F1] rounded-md border border-[#6b5585]/50 flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[13px] text-[#FEB776]">lock</span>
              LVL 4 OP
            </span>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="panelToken"
                  className="block font-sans-ui font-semibold text-xs text-[#C6BCCA] tracking-wide uppercase"
                >
                  Panel Token
                </label>
                <span className="text-[11px] font-mono text-[#A89DAC]">SHA-256</span>
              </div>

              {/* Inset Inventory Slot Input */}
              <div className="inventory-slot-inset rounded-lg p-1 relative group">
                <input
                  id="panelToken"
                  name="panelToken"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="••••••••••••••••"
                  autoComplete="current-password"
                  className="w-full bg-transparent px-3.5 py-2.5 font-mono text-sm text-[#EFE9F1] placeholder:text-[#A89DAC]/50 focus:outline-none tracking-widest"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A89DAC] group-focus-within:text-[#FEB776] text-xs font-mono transition-colors">
                  [#]
                </div>
              </div>

              <div className="font-inter text-xs text-[#A89DAC] flex items-center justify-between pt-1">
                <span>Enter BDS admin secret / XUID hash</span>
                <button
                  type="button"
                  onClick={() => setShowHelperModal(true)}
                  className="text-[#FEB776] hover:text-[#FFA067] transition-colors underline underline-offset-2 cursor-pointer"
                >
                  Lost Token?
                </button>
              </div>
            </div>

            {/* Quick Demo Token Chips for instant testing */}
            <div className="bg-[#141117] p-2.5 rounded-lg border border-[#2d2433] space-y-1.5">
              <div className="text-[10px] text-[#A89DAC] uppercase font-mono tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-[#FEB776]">key</span>
                Quick Access Profiles:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sampleTokens.map((st) => (
                  <button
                    key={st.val}
                    type="button"
                    onClick={() => {
                      playClick();
                      setToken(st.val);
                    }}
                    className={`text-[10px] font-mono px-2 py-1 rounded transition-colors border ${
                      token === st.val
                        ? 'bg-[#FEB776]/20 text-[#FEB776] border-[#FEB776]'
                        : 'bg-[#1D1823] text-[#C6BCCA] border-[#352B3C] hover:border-[#FEB776]/50'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Entry Mode Switcher (Slider Security vs Ray-traced Specular Button) */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#A89DAC] border-t border-[#2d2433]">
              <span>AUTHENTICATION TRIGGER:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setEntryMode('slider')}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    entryMode === 'slider'
                      ? 'bg-[#FEB776]/20 text-[#FEB776] border border-[#FEB776]/40'
                      : 'text-[#A89DAC] hover:text-[#EFE9F1]'
                  }`}
                >
                  Slide Lock
                </button>
                <button
                  type="button"
                  onClick={() => setEntryMode('button')}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    entryMode === 'button'
                      ? 'bg-[#FEB776]/20 text-[#FEB776] border border-[#FEB776]/40'
                      : 'text-[#A89DAC] hover:text-[#EFE9F1]'
                  }`}
                >
                  Specular Glow
                </button>
              </div>
            </div>

            {/* Interactive Components: SlideCommit or WebGL SpecularButton */}
            <div className="pt-1 flex justify-center">
              {entryMode === 'slider' ? (
                <div className="w-full flex justify-center">
                  <SlideCommit
                    label="Slide to Connect BDS"
                    doneLabel="Operator Connected ✓"
                    errorLabel="Cluster Auth Denied"
                    trackColor="#100D14"
                    handleColor="#FEB776"
                    successColor="#9AE5B0"
                    dangerColor="#ff7875"
                    width={360}
                    height={52}
                    radius={14}
                    onConfirm={triggerAuthFlow}
                    disabled={isAuthenticating || authSuccess}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <SpecularButton
                    size="lg"
                    radius={12}
                    tint="#FEB776"
                    tintOpacity={0.12}
                    textColor="#291307"
                    lineColor="#FEB776"
                    baseColor="#4E3D62"
                    intensity={1.4}
                    shineSize={18}
                    shineFade={50}
                    thickness={1.5}
                    speed={0.4}
                    autoAnimate={true}
                    followMouse={true}
                    disabled={isAuthenticating}
                    onClick={handleLogin}
                    className="w-full peach-cta-btn !py-3.5 font-sans-ui font-bold text-sm tracking-wider uppercase"
                  >
                    {isAuthenticating && !authSuccess ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-[#291307]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>AUTHENTICATING...</span>
                      </span>
                    ) : authSuccess ? (
                      <span className="flex items-center gap-1.5 text-[#0a2914]">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        <span>OPERATOR ACCESS GRANTED</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>JOIN SERVER</span>
                        <span className="text-base leading-none">➜</span>
                      </span>
                    )}
                  </SpecularButton>
                </div>
              )}
            </div>
          </form>

          {/* Card Footer */}
          <div className="mt-6 pt-4 border-t border-[#2d2433] flex items-center justify-between font-mono text-[11px] text-[#A89DAC]">
            <span className="flex items-center gap-1.5 text-[#9AE5B0]">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span>Session Shield</span>
            </span>
            <span className="text-[#C6BCCA]/80">LATENCY 18ms</span>
          </div>
        </section>

        {/* CREEPER MASCOT */}
        <div className="animate-entrance" style={{ animationDelay: '0.15s' }}>
          <MascotDisplay currentMascot="creeper" customQuote="Hello!" />
        </div>
      </div>

      {/* Lost Token Modal */}
      {showHelperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-entrance">
          <div className="card-surface max-w-md w-full p-6 rounded-xl border border-[#352B3C] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2d2433] pb-3">
              <h3 className="font-sans-ui font-bold text-base text-[#FEB776] flex items-center gap-2">
                <span className="material-symbols-outlined">vpn_key</span>
                Operator Secret Recovery
              </h3>
              <button
                type="button"
                onClick={() => setShowHelperModal(false)}
                className="text-[#A89DAC] hover:text-[#EFE9F1] text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[#C6BCCA] leading-relaxed">
              In Bedrock Dedicated Server (BDS), operator permissions are linked to your Xbox Live XUID or panel hash configured in <code className="text-[#FEB776] bg-[#141117] px-1 py-0.5 rounded font-mono text-xs">server.properties</code>.
            </p>
            <div className="bg-[#141117] p-3 rounded-lg border border-[#2d2433] text-xs font-mono text-[#EFE9F1] space-y-1">
              <div className="text-[#A89DAC]">Example command to grant in BDS console:</div>
              <div className="text-[#9AE5B0]">op Steve_Xbox_123 4</div>
              <div className="text-[#A89DAC] mt-2">Emergency root token:</div>
              <div className="text-[#FEB776]">SHA256_ROOT_OPERATOR_BDS99X</div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setToken('SHA256_ROOT_OPERATOR_BDS99X');
                  setShowHelperModal(false);
                }}
                className="peach-cta-btn px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Auto-Fill Root Token
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
