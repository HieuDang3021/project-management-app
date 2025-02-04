"use client";
import { useGetTeamsWithUsernameQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassName, dataGridSxStyle } from "@/lib/utils";

const CustomToolBar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const {
    data: teamsWithUsername,
    isLoading,
    isError,
  } = useGetTeamsWithUsernameQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teamsWithUsername) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div className="h-[650px] w-full">
        <DataGrid
          rows={teamsWithUsername || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolBar,
          }}
          className={dataGridClassName}
          sx={dataGridSxStyle(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
