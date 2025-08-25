import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import TemporalFilter from '../../src/components/TemporalFilter';
import GitAnalyzer from '../../src/components/analyzer/GitAnalyzer';
import TemporalSelector from '../../src/components/TemporalSelector';
import CommitGraph from '../../src/components/CommitGraph';
import { AttributeColors, BranchColors, changeRGBColorByOpacity } from '../../src/components/ColorClasses';
// import KeywordTextAreaFilter from '../../src/components/KeywordTextAreaFilter';
// import PreferenceSliders from '../../src/components/PreferenceSliders';
// import ManageParameters from '../../src/components/ManageParameters';
import InformationFragments from '../../src/components/InformationFragments';
import CaptureTab from '../../src/components/CaptureTab';
import CompareSummary from '../../src/components/CompareSummary';
import HighlightQuery from '../../src/components/HighlightQuery';
import { SidePanelContentUnit } from '../../src/components/container/SidePanelContentUnit';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { AttributeIconSpecs } from '../../src/components/LegendIcons';
import { DataTypeByNameMap } from '../../src/components/analyzer/GithruClasses';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as actions from '../../src/modules';

const AppV2 = () => {
  // Hardcode to Vue repository - simulate the original props.match.params structure
  const defaultThresholdStep = 25;
  const gitAnalyzerRef = useRef<any>(undefined);
  
  // Simulate the original props structure that GitAnalyzer expects
  const repo = 'vue';
  const mainStemBranchName = undefined; // This was often undefined in the original
  const releasePrefix = undefined;
  
  console.log("mainStemBranchName", repo, mainStemBranchName);

  // Import Vue JSON files exactly like the original
  const data = require('../../src/json/' + repo + '.commits.json');
  const scoreData = require('../../src/json/' + repo + '.score.json');
  const corpusData = require('../../src/json/' + repo + '.corpus.json');
  const pullData = require('../../src/json/' + repo + '.pulls.json');

  const {
    leftPaneWidth,
    clusterOverviewWidth,
    rightPaneWidth,
    rightPaneMargin,
    temporalSelectorHeight,
    clusterOverviewHeight,
    orgClusterOverviewHeight,
    capturedSummaryInfoListForCompare,
    useHeuristicMerge,
  } = useSelector((state: any) => ({
    leftPaneWidth: state.layout.leftPaneWidth,
    clusterOverviewWidth: state.layout.clusterOverviewWidth,
    rightPaneWidth: state.layout.rightPaneWidth,
    rightPaneMargin: state.layout.rightPaneMargin,
    temporalSelectorHeight: state.layout.temporalSelectorHeight,
    clusterOverviewHeight: state.layout.clusterOverviewHeight,
    orgClusterOverviewHeight: state.layout.orgClusterOverviewHeight,
    capturedSummaryInfoListForCompare: state.capturedSummaryInfoListForCompare,
    useHeuristicMerge: state.useHeuristicMerge,
  }), shallowEqual);

  const prevUseHeuristicMergeRef = useRef<any>(undefined);
  if (gitAnalyzerRef.current === undefined || prevUseHeuristicMergeRef.current !== useHeuristicMerge) {
    gitAnalyzerRef.current = new GitAnalyzer(data, scoreData, corpusData, pullData,
      defaultThresholdStep, repo, releasePrefix, mainStemBranchName);
    prevUseHeuristicMergeRef.current = useHeuristicMerge;
  }
  const gitAnalyzer = gitAnalyzerRef.current;

  return (
          <>
        <Head>
          <title>GIThru - Vue.js Repository Analysis</title>
          <meta name="description" content="Contextual History of Vue.js repository" />
        </Head>
      <div className="bodyDiv flexContainer" id="app-screen-root">
        <div className="sidebar" id="main-sidebar">
          <div className="flexVerticalContainer">
            <SidePanelContentUnit title="Global Temporal Filter" show={true}>
              <TemporalFilter
                gitAnalyzer={gitAnalyzer}
              />
            </SidePanelContentUnit>

            <SidePanelContentUnit title="Preferences Weights" show={true}>
              {/* <PreferenceSliders /> */}
            </SidePanelContentUnit>

            <SidePanelContentUnit title="Parameters">
              {/* <ManageParameters /> */}
            </SidePanelContentUnit>

            <SidePanelContentUnit title="Highlight">
              <HighlightQuery />
            </SidePanelContentUnit>

            <SidePanelContentUnit title="Keyword Filter" show={true}>
              {/* <KeywordTextAreaFilter
                gitAnalyzer={gitAnalyzer}
              />             */}
            </SidePanelContentUnit>
            
          </div>
        </div>

        <div className="flexVerticalContainer" id="center-pane">
          <div id="title-panel">
            <div id="repository-name">
              GIThru: Contextual History of "{repo}" repository.
            </div>
            <div id="legend-container">
              ATTRS:
              {[ "authors", "keywords", "commitTypes", "clocByFiles", "clocByDirs" ].map((d, i) => {
              let color = AttributeColors[ DataTypeByNameMap[d] ][ 3 ];
              return (
                <div key={i} className="legend-element" style={{
                  background: color,
                }}>
                  <Icon>{AttributeIconSpecs[ d ]}</Icon>
                  <span>{d.split("clocBy").slice(-1)[ 0 ]}</span>
                </div>
              );
            })}
              <div style={{ width: "20px" }} />
              BRANCH:
              {Object.entries(BranchColors).map((d, i) => {
                let [ key, originalColor ] = d;
                const color = changeRGBColorByOpacity(originalColor as any, 0.7);

                return (
                  <div key={i} className="legend-element" style={{
                    background: color,
                  }}>{key}</div>
                );
              })}
            </div>
          </div>
          <div id="main-panel-content">
            <div id="overviewPane">
              <TemporalSelector
                gitAnalyzer={gitAnalyzer}
              />
            </div>
            <div id="clusterAndDetail" className="flexContainer">
              <div id="clusterAndDetailPane" className="flexVerticalContainer">
                <div id="clusterPane">
                  <CommitGraph
                    gitAnalyzer={gitAnalyzerRef.current}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="rightPane"
          style={{
            width: rightPaneWidth + "px",
          }}
          className="flexVerticalContainer"
        >
          <div
            id="verticalTab"
            style={{
              width: rightPaneWidth + "px",
            }}
          >
            <CaptureTab
              width={rightPaneWidth}
              height={temporalSelectorHeight + orgClusterOverviewHeight}
            />
          </div>
          <div style={{"backgroundColor": "#7a7c90", height : "439px"}}>
            {/*<div id="fragments">
              <InformationFragments
                width={rightPaneWidth}
              />
          </div>*/}
          </div>
        </div>
        <div>
          <ScrollButton />
        </div>
        <div
          id="comparePane"
          style={{
            width: "1900px",
            display: "none",
          }}
        >
          <CompareSummary
            gitAnalyzer={gitAnalyzer}
            capturedSummaryInfoListForCompare={capturedSummaryInfoListForCompare}
          />
        </div>
      </div>
    </>
  );
}

export default AppV2;

const ScrollButton = () => {
  const { scrollToRight } = useSelector((state: any) => state);
  const dispatch = useDispatch();  
  
  return (
    <div>
      {scrollToRight &&
        <Button onClick={() => {
          dispatch(actions.updateScrollToRight(false));
          window.scrollTo(0, 0);
        }}>
          <ArrowBackIcon fontSize="large"/>
        </Button>
      }
      {!scrollToRight &&
        <Button onClick={() => {
          dispatch(actions.updateScrollToRight(true));
          window.scrollTo({top:0, left:4000});
        }}>
          <ArrowForwardIcon fontSize="large" />
        </Button>
      }
    </div>
  );
}
