interface GrainOverlayProps {
  opacity?: number;
}

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")";

export default function GrainOverlay({ opacity = 0.08 }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 'var(--z-grain)',
        backgroundImage: NOISE_SVG,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
        opacity,
      }}
    />
  );
}
