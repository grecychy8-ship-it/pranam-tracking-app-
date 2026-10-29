export function HeroSlider({}: { scrollTargetId: string }) {
  return (
    <div className="overflow-hidden rounded-3xl shadow-lift">
      <img
        src="/pranam-team-slider.png"
        alt="Pranam Software team"
        className="block h-auto w-full"
      />
    </div>
  );
}
