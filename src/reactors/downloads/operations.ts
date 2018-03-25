import { Watcher } from "../watcher";
import { actions } from "../../actions";
import { messages, withLogger } from "../../butlerd";

import rootLogger from "../../logger";
const logger = rootLogger.child({ name: "download-operations" });
const call = withLogger(logger);

export default function(watcher: Watcher) {
  watcher.on(actions.prioritizeDownload, async (store, action) => {
    const { id } = action.payload;
    await call(messages.DownloadsPrioritize, { downloadId: id });
    store.dispatch(actions.refreshDownloads({}));
  });

  watcher.on(actions.discardDownload, async (store, action) => {
    const { id } = action.payload;
    await call(messages.DownloadsDiscard, { downloadId: id });
    store.dispatch(actions.refreshDownloads({}));
  });

  watcher.on(actions.retryDownload, async (store, action) => {
    const { id } = action.payload;
    await call(messages.DownloadsRetry, { downloadId: id });
    store.dispatch(actions.refreshDownloads({}));
  });

  watcher.on(actions.clearFinishedDownloads, async (store, action) => {
    await call(messages.DownloadsClearFinished, {});
    store.dispatch(actions.refreshDownloads({}));
  });
}
