import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useTableState } from "./useTableState";
import { constructFullUrlWithParams } from "#/lib/constructFullUrlWithParams";

function formatRequestParams(originalObj) {
  return {
    ...originalObj,
    grouping: originalObj.grouping.length > 0 ? originalObj.grouping[0] : null,
    sorting: originalObj?.sorting?.length > 0 ? originalObj.sorting[0] : null,
    columnFilters: originalObj.columnFilters.reduce((acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {}),
  };
}

class FetchError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

const dataTableFetcher = async ([pathOrUrl, paramsObject]) => {
  const formattedParams = formatRequestParams(paramsObject);

  const fullUrl = constructFullUrlWithParams(pathOrUrl, formattedParams);

  const response = await fetch(fullUrl, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new FetchError("Failed to fetch", response);
  }
  return response.json();
};

const dataTableMutator = async (url, { arg }) => {
  const { id, field, value } = arg;

  const response = await fetch(url.replace(":RESOURCE_ID", id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id,
      [field]: value,
    }),
  });

  if (!response.ok) {
    throw new FetchError("Failed to update", response);
  }

  return response.json();
};

export function useSWRDataTable(
  path,
  initialSearch = {},
  options = {},
  mutationPath: string | null = null,
  dataFetcher: typeof dataTableFetcher = dataTableFetcher,
  dataMutator: typeof dataTableMutator = dataTableMutator
) {
  const { tableState, setTableState } = useTableState(initialSearch);

  const { data, error, isLoading, mutate } = useSWR(
    [
      path,
      {
        pageIndex: tableState.pagination.pageIndex,
        pageSize: tableState.pagination.pageSize,
        sorting: tableState.sorting,
        columnFilters: tableState.columnFilters,
        grouping: tableState.grouping,
      },
    ],
    dataFetcher,
    { keepPreviousData: true, ...options }
  );

  const mutation = useSWRMutation(
    mutationPath || "__no_mutation__",
    mutationPath ? dataMutator : () => Promise.resolve(),
    {
      onSuccess: () => {
        // revalidate the main data after successful mutation
        mutate();
      },
    }
  );

  return {
    data,
    error,
    isLoading,
    tableState,
    setTableState,
    updateCell: mutationPath ? mutation.trigger : null,
    isMutating: mutationPath ? mutation.isMutating : false,
  };
}
