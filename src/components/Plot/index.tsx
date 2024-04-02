import { InfoCircledIcon } from "@radix-ui/react-icons";
import { merge } from "lodash";
import { PlotParams } from "react-plotly.js";
import React, { Suspense, lazy } from "react";
import { cn } from "#/lib";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "..";

// @ts-ignore Type 'Promise<typeof /@types/react-plotly.js/index")>' is not assignable to type 'Promise<{ default: ComponentType<any>; }>'
const PlotPrimitive = lazy(() => import("react-plotly.js"));

interface PlotProps extends PlotParams {
  title?: string;
  toolTip?: string;
}

export const defaultAxisLayout = {
  linewidth: 0.5,
  automargin: true,
};

export const defaultPlotProps = {
  className: "w-full h-full",
  useResizeHandler: true,
  responsive: true,
  layout: {
    margin: {
      b: 10,
      t: 30,
      r: 200,
    },
    plot_bgcolor: "transparent",
    paper_bgcolor: "transparent",
    xaxis: defaultAxisLayout,
    yaxis: defaultAxisLayout,
    modebar: {
      orientation: "h",
    },
  },
  config: {
    displaylogo: false,
    showAxisRangeEntryBoxes: false,
    showSendToCloud: false,
    showEditInChartStudio: false,
    showLink: false,
    watermark: false,
    scrowZoom: true,
    lassoSelect: false,
  },
  revision: 0,
};

export function PlotTitle({
  title,
  tooltip,
  justifyCenter = true,
  classNames,
}: {
  classNames?: string;
  justifyCenter?: boolean;
  title: string;
  tooltip?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2",
        justifyCenter ? "justify-center" : "",
        classNames
      )}
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            {tooltip && (
              <>
                <div className="flex items-center gap-x-2">
                  <TooltipTrigger disabled>
                    <InfoCircledIcon />
                  </TooltipTrigger>
                </div>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
export function Plot(props: PlotProps) {
  const defaultPlotPropsDeepCopy = JSON.parse(JSON.stringify(defaultPlotProps));
  const plotProps = merge(defaultPlotPropsDeepCopy, props); // deep copy is needed because merge mutates the first argument
  return (
    <div className="overflow-hidden rounded-md bg-background border-2">
      <div className="flex w-full flex-col">
        {plotProps.title && (
          <PlotTitle title={plotProps.title} tooltip={plotProps.toolTip} />
        )}
        {/* @ts-ignore */}
        <Suspense fallback={<div>Loading...</div>}>
          <PlotPrimitive {...plotProps} />
        </Suspense>
      </div>
    </div>
  );
}
