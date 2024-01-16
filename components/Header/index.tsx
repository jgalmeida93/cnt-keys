import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  return (
    <Carousel className="h-[300px] flex items-center justify-center">
      <CarouselContent>
        <CarouselItem className="text-center">
          <h1>Repertório 19/01 e 20/01</h1>

          <ul>
            <li className="text-sm">O nome Dele é Jesus - E</li>
            <li className="text-sm"> Ruja o Leão - Original C#m</li>
            <li className="text-sm"> Jesus em Tua Presença - C </li>
            <li className="text-sm"> Jeová Jireh - G</li>
            <li className="text-sm"> Clamo Jesus - D</li>
            <li className="text-sm"> Nosso General - C</li>
          </ul>
        </CarouselItem>
        <CarouselItem className="text-center">
          <h1>Ceu na terra</h1>
        </CarouselItem>
        <CarouselItem className="text-center">
          <h1>Ceu na terra</h1>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
