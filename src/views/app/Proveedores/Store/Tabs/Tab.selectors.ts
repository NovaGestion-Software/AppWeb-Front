
import { useProovedoresStore } from "../Store";
import { useShallow } from "zustand/react/shallow";

export const useTabs = () =>
  useProovedoresStore(
    useShallow((s) => ({
      tabs: s.tabs,
      activeTabIndex: s.activeTabIndex,
      activeTabId: s.activeTabId,
    }))
  );

export const useActiveTabIndex = () =>
  useProovedoresStore((s) => s.activeTabIndex);

export const useActiveTabId = () =>
  useProovedoresStore((s) => s.activeTabId);

export const useTabsActions = () =>
  useProovedoresStore(
    useShallow((s) => ({
      setActiveTabIndex: s.setActiveTabIndex,
      setActiveTabId: s.setActiveTabId,
      goNextTab: s.goNextTab,
      goPrevTab: s.goPrevTab,
      resetTabs: s.resetTabs,
    }))
  );
