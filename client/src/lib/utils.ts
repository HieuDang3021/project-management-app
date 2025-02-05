export const dataGridClassName = 
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-bg-2 dark:text-gray-200 overflow-x-auto"

  export const dataGridSxStyle = (isDarkMode: boolean) => {
    return {
      "& .MuiDataGrid-columnHeaders": {
        color: `${isDarkMode ? "#e5e7eb" : ""}`,
        '& [role="row"] > *': {
          backgroundColor: `${isDarkMode ? "#1f2937" : "white"}`,
          borderColor: `${isDarkMode ? "#2d3135" : ""}`
        },
      },
      "& .MuiIconButton-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`
      },
      "& .MuiTablePagination-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`
      },
      "& .MuiTablePagination-selectIcon": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`
      },
      "& .MuiDataGrid-menuIcon": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`
      },
      "& .MuiDataGrid-cell": {
        border: "none"
      },
      "& .MuiDataGrid-row": {
        borderBottom: `1xp solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`
      },
      "& .MuiDataGrid-withBorderColor": {
        borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`
      },
    }
  }