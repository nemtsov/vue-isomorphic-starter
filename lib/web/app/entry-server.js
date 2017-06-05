import { createApp } from './app';

export default async (context) => {
  const { app, router, store } = createApp();

  router.push(context.url);

  await new Promise(resolve => router.onReady(resolve));

  const matchedComponents = router.getMatchedComponents();

  if (!matchedComponents.length) {
    throw { code: 404 };
  }

  await Promise.all(matchedComponents.map(Component =>
    Component.asyncData && Component.asyncData({ store, route: router.currentRoute })
  ));

  // After all preFetch hooks are resolved, our store is now
  // filled with the state needed to render the app.
  // When we attach the state to the context, and the `template` option
  // is used for the renderer, the state will automatically be
  // serialized and injected into the HTML as window.__INITIAL_STATE__.
  context.state = store.state

  return app;
};
