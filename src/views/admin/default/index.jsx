import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdWbSunny, MdFlashOn, MdCurrencyRupee } from 'react-icons/md';
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React from 'react';
import CheckTable from 'views/admin/default/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import {
  columnsDataCheck,
  columnsDataComplex,
} from 'views/admin/default/variables/columnsData';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck.json';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex.json';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // Sample values for energy difference
  const solarEnergyProduced = 1200; // in kWh
  const electricityUsage = 950; // in kWh
  const energyDifference = solarEnergyProduced - electricityUsage;
  const differenceColor = energyDifference >= 0 ? "green.500" : "red.500";

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap="20px" mb="20px">
        
        {/* Total Solar Energy Produced */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="20px" h="20px" as={MdWbSunny} color={brandColor} />} />
          }
          name="Solar Production"
          value={`${solarEnergyProduced} kWh`}
        />

        {/* Total Electricity Usage */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="25px" h="25px" as={MdFlashOn} color={brandColor} />} />
          }
          name="Electricity Usage"
          value={`${electricityUsage} kWh`}
          growth={`+${energyDifference} KWh`}
        />
        

        {/* Monthly Expenses */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="25px" h="25px" as={MdCurrencyRupee} color={brandColor} />} />
          }
          name="Monthly Expenses"
          value="₹345.67"
          growth="+15%"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
