// Basic type definitions for the application

export interface GitCommit {
  id: string;
  message: string;
  author: string;
  date: string;
  [key: string]: any;
}

export interface GitAnalyzerProps {
  gitAnalyzer: any; // Keep as any for now to avoid complex typing
}

export interface LayoutState {
  leftPaneWidth: number;
  clusterOverviewWidth: number;
  rightPaneWidth: number;
  rightPaneMargin: number;
  temporalSelectorHeight: number;
  clusterOverviewHeight: number;
  orgClusterOverviewHeight: number;
}

export interface RootState {
  layout: LayoutState;
  capturedSummaryInfoListForCompare: any;
  useHeuristicMerge: boolean;
  scrollToRight: boolean;
  [key: string]: any;
}

export interface ComponentProps {
  width?: number;
  height?: number;
  gitAnalyzer?: any;
  [key: string]: any;
}
