import React from "react";
import { ErrorHandler } from "utils/errorHandler";
import { GetOverview } from "../api";
import { OverviewData } from "../type";

const HomeStateFn = () => {
  const [overview, setOverview] = React.useState<OverviewData>();

  React.useEffect(() => {
    GetOverview()
      .then((res) => setOverview(res.data))
      .catch(ErrorHandler);
  }, []);

  return { overview };
};

export default HomeStateFn;
