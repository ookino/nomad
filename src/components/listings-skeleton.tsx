import Container from "./container";
import { Skeleton } from "./ui/skeleton";

const ListingsSkeleton = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className=" h-72" />
        ))}
      </div>
    </Container>
  );
};

export default ListingsSkeleton;
