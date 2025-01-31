"use client";
import { useGetUsersQuery } from "@/state/api";
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
import Image from "next/image";
import { dataGridClassName, dataGridSxStyle } from "@/lib/utils";

const CustomToolBar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex size-full items-center justify-center">
        <div className="size-9">
          <Image
            src={
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              require(`@/assets/images/${params.value!}`).default
            }
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div className="h-[650px] w-full">
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.id}
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

export default Users;
