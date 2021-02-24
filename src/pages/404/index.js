export function NotFound() {
  return (
    <div>
      The requested URL "{decodeURIComponent(window.location.pathname)}" was not
      found
    </div>
  );
}
