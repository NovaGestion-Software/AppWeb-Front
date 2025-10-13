
import { useProveedoresStore } from "../Store";
import { useShallow } from "zustand/react/shallow";

export const useTabs = () =>
  useProveedoresStore(
    useShallow((s) => ({
      tabs: s.tabs,
      activeTabIndex: s.activeTabIndex,
      activeTabId: s.activeTabId,
    }))
  );

export const useActiveTabIndex = () =>
  useProveedoresStore((s) => s.activeTabIndex);

export const useActiveTabId = () =>
  useProveedoresStore((s) => s.activeTabId);

export const useTabsActions = () =>
  useProveedoresStore(
    useShallow((s) => ({
      setActiveTabIndex: s.setActiveTabIndex,
      setActiveTabId: s.setActiveTabId,
      goNextTab: s.goNextTab,
      goPrevTab: s.goPrevTab,
      resetTabs: s.resetTabs,
    }))
  );
