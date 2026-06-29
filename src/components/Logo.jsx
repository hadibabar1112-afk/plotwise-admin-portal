export default function Logo({ variant = "dark", className = "" }) {
  const src = variant === "white" ? "/plotwise-logo-white.png" : "/plotwise-logo-dark.png";
  return (
    <img
      src={src}
      alt="Plotwise"
      draggable={false}
      className={"select-none " + className}
      style={{ height: "24px", width: "auto", display: "block" }}
    />
  );
}
