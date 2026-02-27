interface BackgroundFXProps {
  lite?: boolean;
}

export default function BackgroundFX({ lite = false }: BackgroundFXProps) {
  return (
    <>
      <div className={`bg${lite ? " bg-lite" : ""}`} />
      <div className={`grain${lite ? " grain-lite" : ""}`} />
    </>
  );
}
