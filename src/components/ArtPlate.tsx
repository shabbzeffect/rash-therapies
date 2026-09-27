export type PlateVariant = "portrait" | "room" | "stage" | "circle" | "detail" | "journal";

const DESCRIPTIONS: Record<PlateVariant, string> = {
  portrait: "A tall arched studio portrait lit by warm daylight",
  room: "A calm therapy room with an arched window and soft chairs",
  stage: "A speaker on a warmly lit stage before a blurred audience",
  circle: "A circle of women journaling together in daylight",
  detail: "An open journal and a cup of tea on linen in morning light",
  journal: "An abstract editorial composition in sage and gold",
};

export function ArtPlate({
  variant,
  className = "",
  label,
  src,
  eager = false,
}: {
  variant: PlateVariant;
  className?: string;
  label?: string;
  /** Real photograph path from `site.art`. Falls back to the SVG when empty. */
  src?: string;
  /** Set for above-the-fold imagery only. */
  eager?: boolean;
}) {
  const alt = label ?? DESCRIPTIONS[variant];

  if (src) {
    return (
      <div className={`grain relative overflow-hidden bg-parchment ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div role="img" aria-label={alt} className={`grain relative overflow-hidden bg-parchment ${className}`}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#F6F1E7" />
            <stop offset="55%" stopColor="#EDE4D4" />
            <stop offset="100%" stopColor="#DFD3BC" />
          </linearGradient>
          <linearGradient id={`beam-${variant}`} x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`gold-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C6A664" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C27A4A" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={`deep-${variant}`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#22443A" />
            <stop offset="100%" stopColor="#11211C" />
          </linearGradient>
        </defs>

        <rect width="400" height="500" fill={`url(#sky-${variant})`} />

        {variant === "portrait" ? (
          <>
            <path d="M60 500V210a140 140 0 0 1 280 0v290z" fill="#E3D8C2" />
            <path d="M86 500V214a114 114 0 0 1 228 0v286z" fill="#F4EEE1" />
            <path d="M150 120h100l-50 0z" fill={`url(#beam-${variant})`} />
            <circle cx="200" cy="238" r="66" fill="#8A6A4C" opacity="0.9" />
            <path d="M200 172c40 0 68 30 66 66-2 30-8 44-14 54 8-30 4-56-12-70-16-14-46-20-70-8-18 9-26 26-26 44-8-16-10-32-8-46 4-24 32-40 64-40z" fill="#2B211A" />
            <path d="M96 500c6-96 48-140 104-140s98 44 104 140z" fill="#F7F3EA" />
            <path d="M170 356c10 16 50 16 60 0l6 12c-14 20-58 20-72 0z" fill={`url(#gold-${variant})`} />
            <path d="M232 150a74 74 0 0 1 0 148 92 92 0 0 0 0-148z" fill="#C6A664" opacity="0.28" />
            <rect x="286" y="392" width="70" height="6" rx="3" fill="#C6A664" opacity="0.5" />
            <rect x="286" y="410" width="46" height="6" rx="3" fill="#C6A664" opacity="0.3" />
          </>
        ) : null}

        {variant === "room" ? (
          <>
            <path d="M40 500V150a90 90 0 0 1 180 0v350z" fill="#E9DFC9" />
            <path d="M58 500V154a72 72 0 0 1 144 0v346z" fill="#FBF7EF" />
            <path d="M58 500 202 154 96 500z" fill="#FFFDF6" opacity="0.75" />
            <ellipse cx="286" cy="392" rx="66" ry="46" fill="#C7BBA2" />
            <ellipse cx="286" cy="378" rx="66" ry="42" fill="#DCD0BA" />
            <rect x="268" y="416" width="36" height="60" rx="8" fill="#BCAE93" />
            <ellipse cx="118" cy="424" rx="58" ry="40" fill="#D6C9B1" />
            <rect x="104" y="440" width="28" height="52" rx="7" fill="#B7A88C" />
            <rect x="150" y="452" width="120" height="10" rx="5" fill="#8A7A60" />
            <path d="M330 500V330" stroke="#7C8F7F" strokeWidth="4" />
            <path d="M330 356c-24-8-34-30-28-48 22 2 34 22 28 48z" fill="#8AA99A" />
            <path d="M330 388c24-10 32-32 26-50-22 4-32 24-26 50z" fill="#5F7F71" />
            <path d="M330 340c-16-14-18-34-8-48 18 10 22 32 8 48z" fill="#A8BFAF" />
            <path d="M28 500h344" stroke="#C6A664" strokeWidth="2" opacity="0.5" />
          </>
        ) : null}

        {variant === "stage" ? (
          <>
            <rect width="400" height="500" fill={`url(#deep-${variant})`} />
            <path d="M200 -20 320 300H80z" fill="#FFF6E4" opacity="0.14" />
            <path d="M200 -20 268 300H132z" fill="#FFF6E4" opacity="0.12" />
            <circle cx="200" cy="200" r="52" fill="#3A3128" />
            <path d="M148 500c4-104 24-158 52-158s48 54 52 158z" fill="#F3EDE1" />
            <path d="M182 300h36l-6 34h-24z" fill="#E4DACA" />
            <rect x="292" y="250" width="6" height="140" rx="3" fill="#C6A664" />
            <circle cx="295" cy="242" r="15" fill="#C6A664" />
            <rect x="266" y="300" width="34" height="8" rx="4" fill="#2C3A34" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <circle key={i} cx={24 + i * 50} cy={452 + (i % 3) * 12} r={20} fill="#0A1512" opacity="0.55" />
            ))}
            <path d="M40 500h320" stroke="#C6A664" strokeWidth="2" opacity="0.35" />
          </>
        ) : null}

        {variant === "circle" ? (
          <>
            <circle cx="118" cy="150" r="92" fill="#EDE3D1" />
            <circle cx="300" cy="196" r="72" fill="#E2D8C3" />
            <path d="M0 330h400v170H0z" fill="#E6DCC8" />
            {[
              [96, 344, "#2F2721"],
              [176, 330, "#5A4636"],
              [258, 342, "#3A2E25"],
              [140, 300, "#6B5540"],
              [222, 296, "#4A3A2C"],
            ].map(([x, y, c], i) => (
              <g key={i}>
                <circle cx={x as number} cy={(y as number) - 4} r="26" fill={c as string} />
                <path
                  d={`M${(x as number) - 40} 500c2-72 16-104 40-104s38 32 40 104z`}
                  fill={i % 2 ? "#F6F1E6" : "#EFE7D7"}
                />
              </g>
            ))}
            <rect x="26" y="392" width="34" height="46" rx="5" fill="#B9AB8E" />
            <path d="M43 392c-12-6-16-20-12-32 14 2 20 16 12 32z" fill="#8AA99A" />
            <path d="M43 400c12-6 16-20 12-32-14 2-20 16-12 32z" fill="#5F7F71" />
            <path d="M340 440h34" stroke="#C6A664" strokeWidth="3" opacity="0.6" />
            <path d="M340 452h54" stroke="#C6A664" strokeWidth="3" opacity="0.35" />
          </>
        ) : null}

        {variant === "detail" || variant === "journal" ? (
          <>
            <path d="M0 340 400 214v286H0z" fill="#EFE7D7" />
            <path d="M0 380 400 254" stroke="#D6C9B1" strokeWidth="2" />
            <g transform={variant === "detail" ? "rotate(-6 200 250)" : "rotate(3 200 250)"}>
              <rect x="76" y="150" width="248" height="180" rx="10" fill="#FAF6EE" />
              <rect x="76" y="150" width="248" height="180" rx="10" fill="none" stroke="#C6A664" strokeOpacity="0.5" />
              <rect x="200" y="150" width="3" height="180" fill="#DCD0BA" />
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect x="98" y={196 + i * 24} width="82" height="5" rx="2.5" fill="#B9AE97" />
                  <rect x="222" y={196 + i * 24} width={58 - i * 8} height="5" rx="2.5" fill="#C8BDA6" />
                </g>
              ))}
            </g>
            {variant === "detail" ? (
              <>
                <ellipse cx="304" cy="352" rx="52" ry="18" fill="#DCCFBA" />
                <path d="M258 300h92v52a30 30 0 0 1-30 30h-32a30 30 0 0 1-30-30z" fill="#FBF7EF" />
                <path d="M350 314c22 0 22 30 0 30" stroke="#FBF7EF" strokeWidth="7" fill="none" />
                <ellipse cx="304" cy="302" rx="46" ry="11" fill="#8A5F3C" />
                <path d="M96 400c22 0 34 12 34 26" stroke="#8AA99A" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M96 400c-22 0-34 12-34 26" stroke="#5F7F71" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M96 400v34" stroke="#7C8F7F" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="312" cy="300" r="66" fill={`url(#gold-${variant})`} />
                <path d="M60 452h280" stroke="#C6A664" strokeWidth="2" opacity="0.5" />
                <path d="M96 428h210" stroke="#C6A664" strokeWidth="2" opacity="0.3" />
              </>
            )}
          </>
        ) : null}
      </svg>
    </div>
  );
}
