import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";

const CountriesList = () => {
  //data fetched from the server, only once
  const [data, setData] = useState([]);
  //data that is displayed. Takes from the data, and applies filters to it. Also, implements pagination
  const [displayData, setDisplayData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);

  //values used for the filters and pagination
  const lithuanaArea = 62500;
  const region = "Oceania";

//implementing pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    //initial loading
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  // refresh run on displayed data on all filter updates.
  useEffect(() => {
    setDisplayData(() => {
      return data
        .filter((entry) => {
            if(!filter1){
                return true
            }
            return filter1 && entry['area']<lithuanaArea
        //   return !(filter1 && entry["region"] === region);
        })
        .filter((entry) => {
            if(!filter2){
                return true
            }
            return filter2 && entry['region']<region
        //   return !(filter2 && entry["area"] < lithuanaArea);
        });
    });
    //on every filter, we shift to page 1
    setCurrentPage(0);
  }, [filter1, filter2]);

  useEffect(() => {
    setTotalPages(Math.ceil(displayData.length / recordsPerPage));
  }, [displayData]);

  useEffect(() => {}, [totalPages]);

  const sortToggle = () => {
    setAscending(!ascending);
    setDisplayData((prevData) => [...prevData].reverse());
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" mt="20px">
        <Button
          onClick={sortToggle}
          sx={{ bgcolor: "#FF9F1C", color: "white" }}
        >
          {ascending ? "Ascending" : "Descending"}
        </Button>
        <Box display="flex" justifyContent="space-between">
          <Button
            sx={{
              bgcolor: filter1 ? "#2EC4B6" : "#CBF3F0",
              mr: "20px",
              color: "white",
            }}
            onClick={() => {
              setFilter1((prev) => !prev);
            }}
          >
            62500
          </Button>
          <Button
            sx={{ bgcolor: filter2 ? "#2EC4B6" : "#CBF3F0", color: "white" }}
            onClick={() => {
              setFilter2((prev) => !prev);
            }}
          >
            {region}
          </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          {displayData
            .slice(10 * currentPage, 10 * currentPage + 10)
            .map(({ name, region, area }) => {
              return (
                <Box key={name} bgcolor="#FF9F1C" p={1} pl={3} mt={3}>
                  <Typography
                    variant="body1"
                    bgcolor="#FFBF69"
                    width="fit-content"
                    pl="7px"
                    pr="7px"
                  >
                    {name}
                  </Typography>

                  <Typography
                    variant="body1"
                    bgcolor="#FFBF69"
                    width="fit-content"
                    mt={1}
                    pl="7px"
                    pr="7px"
                  >
                    {region}
                  </Typography>
                  <Typography
                    variant="body1"
                    bgcolor="#FFBF69"
                    width="fit-content"
                    mt={1}
                    pl="7px"
                    pr="7px"
                  >
                    {area}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Box>
      {/* pagination component */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" mt="10px">
        {[...Array(totalPages)].map((page, index) => {
          return (
            <Button
              key={index}
              onClick={() => setCurrentPage(index)}
              sx={{
                color: "#2EC4B6",
                bgcolor: index == currentPage ? "#FFBF69" : "#FFFFFF",
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default CountriesList;
