import React from "react";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

type typeSkeleton = {
  variant?: "rounded" | "rectangular" | "circular";
  width: string | number;
  height: string | number;
};

const LoadingSkeleton = (props) => {
  const { variant = "rounded", width, height }: typeSkeleton = props;

  return (
    <Stack spacing={2}>
      {Array(10)
        .fill("")
        .map((_, i) => (
          <Skeleton key={i} variant={variant} width={width} height={height} />
        ))}
    </Stack>
  );
};

export default LoadingSkeleton;
