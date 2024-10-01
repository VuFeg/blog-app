import Skeleton from "@mui/material/Skeleton";

const NotificationSkeletonComponent = () => {
  return (
    <div className="mt-2 mx-4 flex items-center gap-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 border-b pb-2 shadow-sm">
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </div>
    </div>
  );
};

export const NotificationSkeleton = () => {
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < 10; i++) {
      components.push(<NotificationSkeletonComponent key={i} />);
    }
    return components;
  };
  return <>{renderComponents()}</>;
};
