/* eslint-disable */

import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
import { MdCancel, MdCheckCircle, MdOutlineError, MdWbSunny, MdBolt } from 'react-icons/md';

const columnHelper = createColumnHelper();

export default function EnergySavingsTable(props) {
  const { tableData } = props;
  console.log("this is complex table data ", tableData);
  console.log("Received tableData:", tableData); // Debug: Check if data is received correctly

  const [sorting, setSorting] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Set data from props directly to ensure updates
  const [data, setData] = React.useState(tableData || []);
  
  React.useEffect(() => {
    console.log("Updated tableData:", tableData); // Debug: Check if tableData updates
    setData(tableData || []);
  }, [tableData]); // Update data if tableData changes

  const columns = [
    columnHelper.accessor('device', {
      id: 'device',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Device
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('energyType', {
      id: 'energyType',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Energy Type
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              info.getValue() === 'Solar'
                ? 'yellow.500'
                : info.getValue() === 'Electric'
                ? 'blue.500'
                : info.getValue() === 'E'
                ? 'green.500'
                : 'red.500'  // Default for non-renewable or unknown types
            }
            as={
              info.getValue() === 'Solar'
                ? MdWbSunny  // Sun icon for Solar
                : info.getValue() === 'Electric'
                ? MdBolt  // Bolt icon for Electric
                : info.getValue() === 'Renewable'
                ? MdCheckCircle
                : MdCancel  // Default for non-renewable
            }
          />
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('time', {
      id: 'time',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Time
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('energySavings', {
      id: 'energySavings',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Energy Savings (kWh)
        </Text>
      ),
      cell: (info) => (
        <Text color="green.500" fontSize="sm" fontWeight="700">
          {info.getValue()} kWh
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Smart Scheduling
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽' : null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
              .map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Flex justifyContent="space-between" mt={4}>
          <Button
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            isDisabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPageIndex((old) => Math.min(old + 1, Math.ceil(data.length / pageSize) - 1))}
            isDisabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Card>
  );
}
