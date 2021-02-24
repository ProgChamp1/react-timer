import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";

import { ChunkLoading } from "../ChunkLoadingComponent";
import { NotFound } from "../../pages/404";

const componentMap = {
  landingRoute: lazy(() => import("../../pages/Landing")),
  timerRoute: lazy(() => import("../../pages/Result")),
};

export function RouteLoader() {
  return (
    <BrowserRouter>
      <Suspense fallback={<ChunkLoading />}>
        <Switch>
          <Route exact path="/" component={componentMap.landingRoute} />
          <Route path="/t/:time" component={componentMap.timerRoute} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
