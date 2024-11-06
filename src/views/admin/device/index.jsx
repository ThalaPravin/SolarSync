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
import { MdWbSunny, MdFlashOn, MdCurrencyRupee, MdBolt } from 'react-icons/md';
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
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const energyUsed = 150; // in kWh (example value)
  const solarEnergyUsage = 55; // in kWh
  const electricityUsage = 95; // in kWh
  const expense = 35.79; // in currency

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} gap="20px" mb="20px">
        
        {/* Energy Used */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="20px" h="20px" as={MdBolt} color={brandColor} />} />
          }
          name="Energy Used"
          value={`${energyUsed} kWh`}
          growth="+8%"
          growthColor="green.500"
        />

        {/* Solar Energy Usage */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="20px" h="20px" as={MdWbSunny} color={brandColor} />} />
          }
          name="Solar Energy Usage"
          value={`${solarEnergyUsage} kWh`}
          growth="-5%"
          growthColor="red.500"
        />

        {/* Electricity Usage */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="25px" h="25px" as={MdFlashOn} color={brandColor} />} />
          }
          name="Electricity Usage"
          value={`${electricityUsage} kWh`}
          growth="+3%"
          growthColor="green.500"
        />

        {/* Expense */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="25px" h="25px" as={MdCurrencyRupee} color={brandColor} />} />
          }
          name="Expense"
          value={`₹${expense.toFixed(2)}`}
          growth="+12%"
          growthColor="green.500"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}
