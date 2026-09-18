export function ContinuityLoader() {
  return (
    <div className="assembly-loader" role="status" aria-live="polite">
      <div className="assembly-loader-inner">
        <span className="assembly-loader-ring" aria-hidden="true" />
        <span className="assembly-loader-label">Inicializando el sistema</span>
      </div>
    </div>
  );
}