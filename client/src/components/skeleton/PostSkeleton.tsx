import { CardContent, CardHeader } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Fragment } from "react/jsx-runtime";

const PostSkeletonComponent = () => {
  return (
    <div className="mt-4">
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </Fragment>
      </CardContent>
    </div>
  );
};

export const PostSkeleton = () => {
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < 6; i++) {
      components.push(<PostSkeletonComponent key={i} />);
    }
    return components;
  };

  return <>{renderComponents()}</>;
};
