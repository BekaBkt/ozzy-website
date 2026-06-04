import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export default function OzzyHeroAnimation() {
  const { RiveComponent } = useRive({
    src: '/ozzy-hero.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className="w-full h-full aspect-[1024/576] rounded-[2rem] overflow-hidden shadow-lg border border-gray-100">
      <RiveComponent className="w-full h-full" />
    </div>
  );
}
