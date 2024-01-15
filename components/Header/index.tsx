import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  return (
    <Carousel className="py-20">
      <CarouselContent>
        <CarouselItem className="text-center">
          <h1>Ceu na terra</h1>
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
