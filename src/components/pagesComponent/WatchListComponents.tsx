import { memo, useEffect, useState } from "react";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import { useService } from "@/hooks/useService";
import CardWithDetail from "@/components/common/Card/CardWithDetail";
import { DetailSourceMovies } from "@/hooks/useMovies";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Chip, CircularProgress } from "@mui/material";
import { Theaters, DataArray } from "@mui/icons-material";

const WatchListComponents = memo(() => {
  const { getCurrentUser } = useAuthenticateRequest();
  const { isLoading, fetchSourceUserHave } = useService();
  const [userWl, setUserWl] = useState<DetailSourceMovies[]>([]);

  const user = getCurrentUser();

  useEffect(() => {
    const getUserWl = async () => {
      const data = await fetchSourceUserHave();

      if (data) setUserWl(data);
    };

    getUserWl();
  }, []);

  if (isLoading) {
    return (
      <div className='w-full h-full grid place-content-center'>
        <CircularProgress sx={{ color: "#717171" }} />
      </div>
    );
  }

  if (userWl.length === 0) {
    return (
      <div className='text-secondary w-full h-full flex flex-col justify-center items-center text-[10rem]'>
        <DataArray
          fontSize='inherit'
          sx={{ opacity: 0.2 }}
        />
        <p className='text-sm text-center'>
          {user ? "No one here's try to adding Watchlist" : "Login for access your watchlist"}
        </p>
      </div>
    );
  }

  return (
    <div className='p-5'>
      <h5 className='text-base p-5'>Hello {user?.name} Here's your Watchlist</h5>
      <Chip
        sx={{ mx: 2, my: 1, py: 1, color: "#fafafa" }}
        variant='outlined'
        color='default'
        icon={<Theaters />}
        label='Movies'
        size='small'
      />
      <div className='flex flex-col'>
        <LazyLoadComponent>
          {userWl.map((item, index) => (
            <CardWithDetail
              key={index}
              data={item}
              size='max-h-[260px]'
            />
          ))}
        </LazyLoadComponent>
      </div>
    </div>
  );
});

export default WatchListComponents;
